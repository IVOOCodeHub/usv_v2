<%@LANGUAGE="VBSCRIPT" %> 
<!--#include file="fctgene.asp" -->
<!--#include file="fctgene_compta.asp" -->
<%
' vérification de la session
if trim(session("identifiant"))="" then
	txtpageerreur="erreur.asp?titre=FIN DE SESSION&pageretour=menu0.htm&message=Délai de connection expiré, merci de vous ré-identifier..." 
	response.redirect(txtpageerreur)
end if

' Données reçues
date_echeancer=session("comptaprev_filtre_date_echeance")
cler=trim(request.querystring("cler"))
societer=trim(request.querystring("societer"))
defiltre=trim(request.querystring("defiltre"))
coltri=trim(request.querystring("coltri"))
ancre="ancre" & request.querystring("ancre")

' Liste des sociétés
txtsql="SELECT nomsociete,code_compta FROM societes WHERE active=1 ORDER BY nomsociete"
set listesoc = Server.CreateObject("ADODB.Recordset")
listesoc.ActiveConnection = dsnemployes
listesoc.Source = txtsql
listesoc.Open()

' Initialisation
if coltri="" then ' demande de tri non
	if session("compta_ordrtri_mg")="" then session("compta_ordrtri_mg")="ASC" ' si pas de tri existant alors tri ascendant
else ' demande de tri oui
	if session("compta_coltri_mg")<>"" then ' colonne de tri existante oui
		if "rubrique_treso," & coltri=session("compta_coltri_mg") then ' colonne demandée = colonne exitante oui
			if session("compta_ordrtri_mg")="ASC" then session("compta_ordrtri_mg")="DESC" else session("compta_ordrtri_mg")="ASC"' inversion du tri
		else ' colonne demandée = colonne existante non
			session("compta_ordrtri_mg")="ASC" ' tri réinitialisé à ascendant
		end if ' colonne demandée = colonne existante ?
	else ' colonne de tri existante non
		session("compta_ordrtri_mg")="ASC" ' tri réinitialisé à ascendant
	end if' colonne de tri existante ?
end if ' demande de tri ?
ordre=session("compta_ordrtri_mg")


' Traitement colonne de tri
if coltri="" then ' tri demandé non
	if session("compta_coltri_mg")="" then ' tri existant non 
		session("compta_coltri_mg")="rubrique_treso"
	else ' tri existant oui
		' on garde la colonne de tri et l'ordre déjà stockés 
	end if ' tri existant ?
else ' tri demandé oui
	session("compta_coltri_mg")="rubrique_treso," & coltri
end if ' tri demandé ?
colonne=session("compta_coltri_mg")
tri=colonne & " " & ordre

' Traitement filtre
if defiltre="1" then ' défiltrage demandé oui
	cler=""
	societer="" : session("comptaprev_filtre_societe")=""
end if ' défiltrage demandé ?

if cler<>"" then ' filtre par cle oui
	txtwhere=txtwhere & "AND cle=" & cler & " "
else ' filtre par cle non
	if societer="" then ' filtre demandé non
		if trim(session("comptaprev_filtre_societe"))<>"" then societer=trim(session("comptaprev_filtre_societe")) ' filtre déjà connu
	else ' filtre demandé oui
		session("comptaprev_filtre_societe")=trim(societer)
	end if ' filtre demandé ?
	if societer<>"" then txtwhere=txtwhere & "AND societe='" & societer & "' "
end if ' filtre par cle ?


' Liste des écritures
txtsql="SELECT cle,societe,rubrique_treso,date_saisie,date_echeance,date_ordo,libelle_compte_tiers,libelle_ecriture,credit,commentaire,cle_courrier,manu,marque,mat_mark "
txtsql=txtsql & "FROM previsions "
txtsql=txtsql & "WHERE date_echeance<='" & date_echeancer & "' "
txtsql=txtsql & "AND statut='VALIDE' "
txtsql=txtsql & "AND code_journal<>'VENTES' "
txtsql=txtsql & "AND reference_paiement=0 "
txtsql=txtsql & txtwhere & " "
txtsql=txtsql & "ORDER BY " & tri
t1=txtsql
set liste = Server.CreateObject("ADODB.Recordset")
liste.ActiveConnection = dsncompta
liste.Source = txtsql
liste.Open()
if not liste.eof then rub=liste("rubrique_treso")
nmark=0

' function =================================================================================================
' function =================================================================================================
function colorligne(cc,manu)
	' retourne la couleur fond de case :
	' bleu clair si prévision manu (= aucun courrier ne sera jamais associé puisque prévision manuelle) sinon,
	' jaune clair si pas de courrier associé,
	' jaune foncé si courrier associé
	' manu abandonné en aout 2021
	'if manu then 
	'	colorligne="#77bbff"
	'else
		if cc<>"0" then colorligne="#FFFF66" else colorligne="#FFFFCC"
	'end if
end function

%>
<html>
<head>
<title>Ordres paiements</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="Styles/gboutons.css" type="text/css">
<script language="JavaScript">
<!--

function vaalaligne(){
	location.href="#<%=ancre%>";
}

function filtrer(){
	txtfiltre="?cler="+document.getElementById("cler").value;
	txtfiltre=txtfiltre+"&societer="+document.getElementById("societer").value;
	location.href="compta_vir_menu.asp"+creerfiltre();
}

function defiltrer(){
	location.href="compta_vir_menu.asp?defiltre=1";
}

function creerfiltre(){
	txtfiltre="?cler="+document.getElementById("cler").value;
	txtfiltre=txtfiltre+"&societer="+document.getElementById("societer").value;
	return txtfiltre;
}

function trier(v){
	f=creerfiltre();
	location.href="compta_vir_menu.asp"+f+"&coltri="+v;
}

function modif(c){
	location.href="compta_modif_ordopaimanu0.asp?cle="+c+"&pageretour=compta_vir_menu.asp&titre=ORDRES PAIEMENTS";
}

function marque(c,m){
	location.href="treso_prevaordo_marquage0.asp?cle="+c+"&mat_mark="+m;
}

function surligne(self) {
	self.oldbgcolor=self.style.backgroundColor;
	self.style.backgroundColor="#cccccc";
}

function desurligne(self) {
	self.style.backgroundColor=self.oldbgcolor;
}

function ouvreaide(){
	window.open("aide.asp?sujet=aide_gestionfacturation_role","","top=10,left=10,height=740,width=980,scrollbar=no,toolbar=no,location=no,channelmode=no,status=no,menubar=no,resizable");
}

//-->
</script>
</head>

<body link="#FFFFFF" vlink="#FFFFFF" alink="#FFFFFF" onload="vaalaligne()">
<div id="ltitrepage" style="text-align:center; position:absolute; width:100%; height:28px; z-index:1; left:0px; top:0px"> 
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr> 
			<td width="10%" height="19" align="left"><img src="images/ivoo-logo.jpg" width="123" height="47" style="cursor: pointer;" onclick="location.href='menugeneral.asp'"></td>
			<td width="82%" height="19" bgcolor="<%=session("couleursite")%>" align="center"><span class="titrepage"><b><%=nomappli%></b> | PREVISONS A ORDONNANCER JUSQU'AU <%=date_echeancer%></span></td>
			<td width="8%" height="19" align="right"><input type="button" name="baide" value="Aide" class="baide" onClick="ouvreaide()"></td>
		</tr>
	</table>
	<hr align="center">
</div>



<div id="llegende" style="position:absolute; width:150; height:10px; z-index:2; left:100px; top:12px;">
	<table width="150" border="0" cellspacing="0" cellpadding="0">
		<!--<tr>
			<td width="75%" align="right"><font face="Arial, Helvetica, sans-serif" size="1">Prévision&nbsp;</font></td>
			<td width="25%" bgcolor="#77bbff"><font face="Arial, Helvetica, sans-serif" size="1">&nbsp;</font></td>
		</tr>-->
		<tr>
			<td width="75%" align="right"><font face="Arial, Helvetica, sans-serif" size="1">Sans courrier&nbsp;</font></td>
			<td width="25%" bgcolor="#FFFFCC"><font face="Arial, Helvetica, sans-serif" size="1">&nbsp;</font></td>
		</tr>
		<tr>		
			<td width="75%" align="right"><font face="Arial, Helvetica, sans-serif" size="1">Avec courrier&nbsp;</font></td>
			<td width="25%" bgcolor="#FFFF66"><font face="Arial, Helvetica, sans-serif" size="1">&nbsp;</font></td>
		</tr>
	</table>
</div>



<div id="lentetefiltre" style="position:absolute; width:1220; height:10px; z-index:2; left:10px; top:70px;">
	<table width="1200" border="0" cellspacing="0" cellpadding="0">
		<tr>
      <td width="20%" bgcolor="<%=couleurfondcase%>" align="right"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF" size="1">Code prévision :&nbsp;</font></b></td>
      <td width="20%" bgcolor="#FFFFCC" align="left">&nbsp;<input type="text" name="cler" id="cler" size="10" maxlength="20" value="<%=cler%>"></td>
      <td width="20%" bgcolor="<%=couleurfondcase%>" align="right"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF" size="1">Société :&nbsp;</font></b></td>
      <td width="20%" bgcolor="#FFFFCC" align="left">&nbsp;
        <select name="societer">
          <option value="" <%=valsel("",societer)%>>Toutes</option>
					<%while not listesoc.eof%>
						<option value="<%=trim(listesoc("code_compta"))%>" <%=valsel(trim(listesoc("code_compta")),societer)%>><%=trim(listesoc("nomsociete"))%></option>
					<%listesoc.movenext : wend%>
        </select>
			</td>
      <td width="20%" bgcolor="#FFFFFF" align="center"><input type="button" name="btnfiltre" value="&nbsp;&nbsp;Filtrer&nbsp;&nbsp;" onclick="filtrer()">&nbsp;<input type="button" name="btndfiltre" value="D&eacute;filtrer" onclick="defiltrer()"></td>
    </tr>
	</table>
</div>


<div id="lenteteliste" style="position:absolute; width:1220; height:10px; z-index:1; left:40px; top:100px;">
	<table width="1200" border="0" cellspacing="0" cellpadding="0">
		<tr bgcolor="<%=couleurfondcase%>">
			<td width="10"  align="center"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF" size="1">Sél.</font></b></td>
      <td width="130" align="left"><font face="Arial, Helvetica, sans-serif" color="#000000" size="2">&nbsp;</font></td>
      <td width= "50" align="left"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF" size="1"><a href="#" onclick="trier('cle')">Code</a></font></b></td>
      <td width= "60" align="center"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF" size="1"><a href="#" onclick="trier('date_echeance')">Echéance</a></font></b></td>
      <td width= "100" align="center"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF" size="1"><a href="#" onclick="trier('date_ordo')">Ordo</a></font></b></td>
      <td width="250" align="left"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF" size="1"><a href="#" onclick="trier('libelle_compte_tiers')">Fournisseurs</a></font></b></td>
      <td width="240" align="left"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF" size="1"><a href="#" onclick="trier('libelle_ecriture')">Libellé écriture</a></font></b></td>
      <td width= "70" align="right"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF" size="1"><a href="#" onclick="trier('credit')">Montant&nbsp;</a></font></b></td>
      <td width= "290" align="left"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF" size="1">&nbsp;Commentaire</font></b></td>
    </tr>
	</table>
</div>

<div id="lliste" style="position:absolute; width:1220; height:600px; z-index:1; left:40px; top:115px; overflow:auto;">
	<table width="1200" border="0" cellspacing="0" cellpadding="0">
		<%if not liste.eof then%>
			<tr bgcolor="#FFFFFF"style="cursor:not-allowed">
				<td width="10" align="center">&nbsp;</td>
				<td colspan="3" align="left"><b><font face="Arial, Helvetica, sans-serif" color="#000000" size="3"><%=liste("rubrique_treso")%></font></b></td>
				<td width="100" align="center">&nbsp;</td>
				<td width="250" align="left">&nbsp;</td>
				<td width="240" align="left">&nbsp;</td>
				<td width="70" align="right">&nbsp;</td>
				<td width="290" align="left">&nbsp;</td>
			</tr>
		<%end if
		while not liste.eof
			radiobouton="<input type=""radio"" name=""radiobutton" & liste("cle") & """ value=""radiobutton"" onclick=""marque(" & liste("cle") & "," & liste("mat_mark") & ")"" "
			if liste("mat_mark")<>0 then 
				radiobouton=radiobouton & "checked>" 
				nmark=nmark+1
			else 
				radiobouton=radiobouton & ">"
			end if
			if rub<>liste("rubrique_treso") then ' rupture de rubrique oui%>
				<tr bgcolor="#FFFFFF"style="cursor:not-allowed">
					<td width="10"  align="center"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF" size="1">&nbsp;</font></b></td>
					<td colspan="3" align="left"><b><font face="Arial, Helvetica, sans-serif" color="#000000" size="3"><%=liste("rubrique_treso")%></font></b></td>
					<td width="100" align="center">&nbsp;</td>
					<td width="250" align="left">&nbsp;</td>
					<td width="240" align="left">&nbsp;</td>
					<td width="70" align="right">&nbsp;</td>
					<td width="290" align="left">&nbsp;</td>
				</tr>
				<%rub=liste("rubrique_treso")
			end if ' rupture de rubrique ?
			if isdate(liste("date_echeance")) then dea=left(formatdatetime(liste("date_echeance")),10) else dea=""
			if isdate(liste("date_ordo")) then doa=left(formatdatetime(liste("date_ordo")),10) else doa=""
		%>
		<tr bgcolor="<%=colorligne(liste("cle_courrier"),liste("manu"))%>" style="cursor:pointer" onMouseOver="surligne(this)" onMouseOut="desurligne(this)">
			<td width="10" align="center"><a name="ancre<%=liste("cle")%>"></a><%=radiobouton%></td>
	    <td width="130" align="left" onClick="modif(<%=liste("cle")%>)"><font face="Arial, Helvetica, sans-serif" color="#000000" size="2"><%=liste("societe")%></font></td>
      <td width="50" align="left" onClick="modif(<%=liste("cle")%>)"><font face="Arial, Helvetica, sans-serif" color="#000000" size="2"><%=liste("cle")%></font></td>
      <td width="60" align="center" onClick="modif(<%=liste("cle")%>)"><font face="Arial, Helvetica, sans-serif" color="#000000" size="2"><%=dea%></font></td>
      <td width="100" align="center" onClick="modif(<%=liste("cle")%>)"><font face="Arial, Helvetica, sans-serif" color="#000000" size="2"><%=doa%></font></td>
      <td width="250" align="left" onClick="modif(<%=liste("cle")%>)"><font face="Arial, Helvetica, sans-serif" color="#000000" size="2"><%=left(liste("libelle_compte_tiers"),30)%></font></td>
      <td width="240" align="left" onClick="modif(<%=liste("cle")%>)"><font face="Arial, Helvetica, sans-serif" color="#000000" size="2"><%=liste("libelle_ecriture")%></font></td>
      <td width="70" align="right" onClick="modif(<%=liste("cle")%>)"><font face="Arial, Helvetica, sans-serif" color="#000000" size="2"><%=formatnumber(liste("credit"))%>&nbsp;</font></td>
      <td width="290" align="left" onClick="modif(<%=liste("cle")%>)"><font face="Arial, Helvetica, sans-serif" color="#000000" size="2">&nbsp;<%=liste("commentaire")%></font></td>
    </tr>
		<%liste.movenext : wend%>
	</table>
</div>

<div id="lmenu" style="position:absolute; width:1200; height:28px; z-index:1; left:40px; top:726px"> 
  <table width="1200" border="0" cellspacing="4" cellpadding="0">
    <tr height="40"> 
			<td align="center" bgcolor="#93A6D2" width="20%"><font face="arial">&nbsp;<%=nmark%> prévision<%=singulierpluriel(nmark)%> marquée<%=singulierpluriel(nmark)%></font></td>
			<td align="center" bgcolor="#93A6D2" width="20%">&nbsp;</td>
			<td align="center" bgcolor="#93A6D2" width="20%">&nbsp;</td>
			<td align="center" bgcolor="#93A6D2" width="20%">&nbsp;</td>
      <td align="center" bgcolor="#cec8c6" width="20%"><a href="compta_vir_choix_societe0.asp" class="lien">Retour</a></td>
		</tr>
  </table>
</div>
</body>
</html>
<%
listesoc.Close()
liste.Close()
%>