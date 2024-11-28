<%@LANGUAGE="VBSCRIPT" %> 
<!--#include file="fctgene.asp" -->
<%
' vérification de la session
if trim(session("identifiant"))="" then
	txtpageerreur="erreur.asp?titre=FIN DE SESSION&pageretour=menu0.htm&message=Délai de connection expiré, merci de vous ré-identifier..." 
	response.redirect(txtpageerreur)
end if

' Données reçues
pageretour=trim(request.querystring("pageretour"))
if pageretour="" then ' retour demandé non
	if session("tcpd_pageretour")="" then ' retour existant non
		pageretour="tresor_menu.asp" ' page retour par défaut
	else ' retour existant oui
		pageretour=session("tcpd_pageretour")
	end if ' retour existant ?
else ' retour demandé oui
	session("tcpd_pageretour")=pageretour
end if ' retour demandé ?
cle_courrier=request.querystring("cle_courrier")
code_tiers=request.querystring("code_tiers") : if code_tiers="" or code_tiers="0" then code_tiers="-1"
type_prevision=request.querystring("type_prevision")
if type_prevision="R" then
	type_prevision_affichee="RETRO"
else	
	type_prevision="P"
	type_prevision_affichee=""
end if
date_piece=request.querystring("date_piece") : if date_piece="" then date_piece=date
societe=request.querystring("societe")
libelle1=request.querystring("libelle1")
void_rubrique=request.querystring("rubrique")
if void_rubrique<>"-1" and void_rubrique<>"" then ' rubrique demandée oui
	rub=split(void_rubrique,"|")
	rubrique=trim(rub(0))
	if not isnumeric(rubrique) then rubrique="0"
else ' rubrique demandée non
	rubrique="-1"
end if ' rubrique demandée ?

' Traitement du tiers
avec_tva=true
visubtnprev="none"
if code_tiers<>"-1" then  ' tiers connu oui
	' Recherche de la rubrique (et autres) du tiers
	txtsql="SELECT cle_rubrique_tresorerie, mode_paiement, avec_tva FROM fournisseurs WHERE code=" & code_tiers
	set rubtiers = Server.CreateObject("ADODB.Recordset")
	rubtiers.ActiveConnection = dsnpartenaires
	rubtiers.Source = txtsql
	rubtiers.Open()
	if not rubtiers.eof then 
		if rubrique="0" then rubrique=trim(rubtiers("cle_rubrique_tresorerie"))
		mode_paiement=ucase(trim(rubtiers("mode_paiement")))
		avec_tva=rubtiers("avec_tva")
	end if
	rubtiers.Close()
	' Y a t'il déjà une prévision ou plusieurs non soldée sur ce tiers
	txtsql="SELECT cle FROM previsions WHERE ref_source_tiers=" & code_tiers
	set prevtiers = Server.CreateObject("ADODB.Recordset")
	prevtiers.ActiveConnection = dsncompta
	prevtiers.Source = txtsql
	prevtiers.Open()
	if not prevtiers.eof then 
		visubtnprev="inline"
	else
		visubtnprev="none"
	end if
	prevtiers.Close()
end if  ' tiers connu ?
if avec_tva then coche_avec_tva="checked" else coche_avec_tva=""
tva_20_plus="" ' "checked"  if default is checked


' Liste des sociétés
txtsql="SELECT nomsociete,code_compta FROM societes WHERE active=1 ORDER BY nomsociete"
set listesoc = Server.CreateObject("ADODB.Recordset")
listesoc.ActiveConnection = dsnemployes
listesoc.Source = txtsql
listesoc.Open()

' Liste des tiers
txtsql="SELECT code, societe, rubrique_tresorerie, intitule_compte_tiers FROM fournisseurs WHERE (actif=1 AND societe<>'NC') "
if code_tiers<>"-1" then txtsql=txtsql & "OR code=" & code_tiers & " "
txtsql=txtsql & "ORDER BY societe"
set listetiers = Server.CreateObject("ADODB.Recordset")
listetiers.ActiveConnection = dsnpartenaires
listetiers.Source = txtsql
listetiers.Open()

' Liste des rubriques
if code_tiers<>"-1" then ' tiers connu oui
	txtsql="SELECT cle_rubrique AS cle, libelle "
	txtsql=txtsql & "FROM fournisseurs_rubriques AS f JOIN " & nom_base_compta & ".dbo.rubriques_previsions_tresorerie AS r ON f.cle_rubrique=r.cle "
	txtsql=txtsql & "WHERE code_fournisseur=" & code_tiers
else ' tiers connu non
	if rubrique<>"-1" then ' rubrique demandée oui
		txtsql="SELECT cle,libelle FROM " & nom_base_compta & ".dbo.rubriques_previsions_tresorerie WHERE cle=" & rubrique
	else ' rubrique demandée non
		txtsql="SELECT cle,libelle FROM " & nom_base_compta & ".dbo.rubriques_previsions_tresorerie WHERE active=1 ORDER BY libelle"
	end if ' rubrique demandée ?
end if ' tirs connu ?
set listerub = Server.CreateObject("ADODB.Recordset")
listerub.ActiveConnection = dsnpartenaires
listerub.Source = txtsql
listerub.Open()

' Lecture des préfixes de rubriques suivant rubrique demandée ou tiers demandé
if code_tiers<>"-1" then ' tiers connu oui
	txtsql="SELECT prefixe_libelle FROM prefixes_libelles_rubriques "
	txtsql=txtsql & "WHERE cle_rubrique IN (SELECT cle_rubrique FROM " & nom_base_partenaires & ".dbo.fournisseurs_rubriques WHERE code_fournisseur=" & code_tiers & ") "
	if cle_rubrique<>"" then txtsql=txtsql & "AND cle_rubrique=" & cle_rubrique & " "
	txtsql=txtsql & "ORDER BY prefixe_libelle"
else ' tiers connu non
	if rubrique<>"-1" then ' rubrique demandée oui
		txtsql="SELECT prefixe_libelle FROM prefixes_libelles_rubriques "
		txtsql=txtsql & "WHERE cle_rubrique=" & rubrique
	else ' rubrique demandée non
		txtsql="SELECT prefixe_libelle FROM prefixes_libelles_rubriques "
		txtsql=txtsql & "WHERE cle_rubrique IN (SELECT cle FROM rubriques_previsions_tresorerie WHERE active=1) "
		txtsql=txtsql & "ORDER BY prefixe_libelle"
	end if ' rubrique demandée ?
end if ' tiers connu ?
set listeprefix = Server.CreateObject("ADODB.Recordset")
listeprefix.ActiveConnection = dsncompta
listeprefix.Source = txtsql
listeprefix.Open()

' Années
a1=cint(right(year(date),2))
a0=a1-1
a2=a1+1
a3=a2+1


' Liste des budgets de la société évenutellement existants n'ayant pas généré de prévision (donc cle_prevision=0)
txtsql="SELECT cle,date_echeance,libelle_compte_tiers,libelle_ecriture,debit,credit FROM budget "
txtsql=txtsql & "WHERE societe='" & societe & "' "
txtsql=txtsql & "AND cle_prevision=0 "
if code_tiers<>"-1" then txtsql=txtsql & "AND ref_source_tiers=" & code_tiers & " "
if rubrique<>"-1" then txtsql=txtsql & "AND cle_rubrique_treso=" & rubrique & " "
if libelle1<>"-1" then txtsql=txtsql & "AND libelle_ecriture_prefixe='" & libelle1 & "' "
'txtsql=txtsql & "AND date_echeance>='" & date & "' "
txtsql=txtsql & "ORDER BY libelle_ecriture_annee desc, libelle_ecriture_mois desc"
set listebudget = Server.CreateObject("ADODB.Recordset")
listebudget.ActiveConnection = dsncompta
listebudget.Source = txtsql
listebudget.Open()

if cle_courrier<>"" then 
	display_courrier="inline" 
	' Lecture data courrier
	txtsql="SELECT nom_fichier FROM courrier WHERE cle=" & cle_courrier
	set data = Server.CreateObject("ADODB.Recordset")
	data.ActiveConnection = dsnivoo
	data.Source = txtsql
	data.Open()
	nom_fichier=data("nom_fichier") : if nom_fichier="" or isnull(nom_fichier) then nom_fichier="pdf_courrier_non_trouve.pdf"
	data.Close()
else 
	display_courrier="none"
end if ' courrier demandé ?
%>
<html>
<head>
<title>Nouvelle pr&eacute;vision</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="Styles/gboutons.css" type="text/css">
<link href="scripts/select2.min.css" rel="stylesheet">
<script src="scripts/pr_calendrier.js" language="javascript" type="text/javascript"></script>
<script src="scripts/fctgene.js" language="javascript" type="text/javascript"></script>
<script src="scripts/jquery.min.js" language="JavaScript" type="text/javascript"></script>
<script src="scripts/select2.min.js" language="JavaScript" type="text/javascript"></script>
<script language="JavaScript">
<!--

function verif(f){
	if(f.type_prevision.value=="-1"){
		alert("Veuillez indiquer le type de prévision à saisir SVP !");
		f.type_prevision.focus();
		return false;
	}
	if(f.date_piece.value==""){
		alert("Veuillez saisir la date de pièce SVP !");
		f.date_piece.focus();
		return false;
	}else{
		if(dateOk(f.date_piece.value,"date pièce")==0){
			f.date_piece.focus();
			return false;
		}
	}
	if(f.societe.value=="-1"){
		alert("Veuillez saisir la société concernée !");
		f.societe.focus();
		return false;
	}
	if(f.tiers.value=="-1"){
		alert("Veuillez saisir le tiers !");
		f.tiers.focus();
		return false;
	}
	if(f.rubrique.value=="-1"){
		alert("Veuillez saisir la rubrique SVP !");
		f.rubrique.focus();
		return false;
	}
	if(f.libelle1.value=="-1"){
		alert("Veuillez saisir le préfixe du libellé !");
		f.libelle1.focus();
		return false;
	}
	if(f.libelle2.value=="-1"){
		alert("Veuillez saisir le mois du libellé !");
		f.libelle2.focus();
		return false;
	}
	if(f.libelle3.value=="-1"){
		alert("Veuillez saisir l'année du libellé !");
		f.libelle3.focus();
		return false;
	}
	if(f.libelle4.value=="-1"){
		alert("Veuillez saisir le trimestre du libellé !");
		f.libelle4.focus();
		return false;
	}
	if(f.beneficiaire.value==""){
		alert("Veuillez saisir le libellé complet !");
		f.beneficiaire.focus();
		return false;
	}
	if(f.montant.value==""){
		alert("Veuillez saisir un montant !");
		f.montant.focus();
		return false;
	}else{
		if(isNaN(remplace_virgule_par_point(f.montant.value))){
			alert("Veuillez saisir un montant numérique (avec. comme séparateur décimal) !");
			f.montant.focus();
			return false;
		}
	}
	if(f.avectva.checked){
		if(f.montant_tva1.value+f.montant_tva2.value+f.montant_tva3.value+f.montant_tva4.value==""){
			alert("Veuillez saisir au moins un des montants de TVA\n(ou décochez la case \"avec TVA\" s'il n'y a pas de TVA)");
			f.montant_tva1.focus();
			return false;
		}else{
			if(f.montant_tva1.value!=""){
				if(isNaN(remplace_virgule_par_point(f.montant_tva1.value))){
					alert("Votre saisie du montant de la TVA <%=const_taux_tva1%> est incorrect !");
					f.montant_tva1.focus();
					return false;
				}
			}
			if(f.montant_tva2.value!=""){
				if(isNaN(remplace_virgule_par_point(f.montant_tva2.value))){
					alert("Votre saisie du montant de la TVA <%=const_taux_tva2%> est incorrecte !");
					f.montant_tva2.focus();
					return false;
				}
			}
			if(f.montant_tva3.value!=""){
				if(isNaN(remplace_virgule_par_point(f.montant_tva3.value))){
					alert("Votre saisie du montant de la TVA <%=const_taux_tva3%> est incorrecte !");
					f.montant_tva3.focus();
					return false;
				}
			}
			if(f.montant_tva4.value!=""){
				if(isNaN(remplace_virgule_par_point(f.montant_tva4.value))){
					alert("Votre saisie du montant de la TVA <%=const_taux_tva4%> est incorrect !");
					f.montant_tva4.focus();
					return false;
				}
			}
		}
	}
	if(f.date_echeance.value==""){
		alert("Veuillez saisir la date d'échéance !");
		f.date_echeance.focus();
		return false;
	}else{
		if(dateOk(f.date_echeance.value,"date échéance")==0){
			f.date_echeance.focus();
			return false;
		}else{
			de=dateJava(f.date_echeance.value);
			dj=dateJava("<%=date%>");
			if((de<dj)&&(f.type_prevision.value=="P")){
				alert("La date d'échéance est dépassée !");
				f.date_echeance.focus();
				return false;
			}
		}
	}
	if((f.mode_paiement.value=="")||(f.mode_paiement.value=="NC")){
		alert("Le mode de règlement du tiers n'est pas défini, merci de le définir pour le tiers avant de continuer.");
		txturl="og_gestion_tiers_modifier0.asp?code=<%=code_tiers%>&pageamodifier=1&champamodifier=mode_paiement";
		param="top=10,left=10,height=740,width=1100,scrollbar=no,toolbar=no,location=no,channelmode=no,status=no,menubar=no";
		window.open(txturl,"",param);
		return false;
	}	
	return true;
}

function voircourrier(){
	cc=document.getElementById("cle_courrier").value;
	if(cc!=""){
		if(!(isNaN(cc))){
			txturl="treso_creation_prevision_depense0.asp?code_tiers="+document.getElementById("tiers").value;
			txturl=txturl + "&type_prevision="+document.getElementById("type_prevision").value;
			txturl=txturl + "&date_piece="+document.getElementById("date_piece").value;
			txturl=txturl + "&societe="+document.getElementById("societe").value;
			txturl=txturl + "&rubrique="+document.getElementById("rubrique").value;
			txturl=txturl + "&libelle1="+document.getElementById("libelle1").value;
			txturl=txturl + "&cle_courrier="+document.getElementById("cle_courrier").value;
			location.href=txturl;
		}
	}else{
		alert("Veuillez saisir une clé courrier SVP !");
		document.getElementById("cle_courrier").focus();
	}
}

function chgtiers(){
	txturl="treso_creation_prevision_depense0.asp?code_tiers="+document.getElementById("tiers").value;
	txturl=txturl + "&type_prevision="+document.getElementById("type_prevision").value;
	txturl=txturl + "&date_piece="+document.getElementById("date_piece").value;
	txturl=txturl + "&societe="+document.getElementById("societe").value;
	txturl=txturl + "&rubrique="+document.getElementById("rubrique").value;
	txturl=txturl + "&libelle1="+document.getElementById("libelle1").value;
	txturl=txturl + "&cle_courrier=<%=cle_courrier%>";
	location.href=txturl;
}

function associer(c){
	if(confirm("Confirmez-vous la création d'une prévisions à partir de cette ligne de budget ?")){
		location.href="treso_creation_prevision_depenses_associer_budget0.asp?cle_budget="+c;
	}
}

function rechercher(){
	txturl="treso_recherche_compte_tiers.asp?champ=tiers";
	param="top=10,left=10,height=790,width=1080,scrollbar=no,toolbar=no,location=no,channelmode=no,status=no,menubar=no";
	window.open(txturl,"",param);
}

function visuprev(){
	url="treso_visu_prev_tiers.asp?code="+document.getElementById("tiers").value+"&cle_courrier=<%=cle_courrier%>";
	param="top=10,left=10,height=740,width=980,scrollbar=no,toolbar=no,location=no,channelmode=no,status=no,menubar=no";
	window.open(url,"",param);
}

function surligne(self) {
	self.oldbgcolor=self.style.backgroundColor;
	self.style.backgroundColor="#cccccc";
}

function desurligne(self) {
	self.style.backgroundColor=self.oldbgcolor;
}

function avecsanstva(obj){
	if((obj.checked)){
		document.getElementById("montant_tva1").value="";
		document.getElementById("montant_tva2").value="";
		document.getElementById("montant_tva3").value="";
		document.getElementById("montant_tva4").value="";
		document.getElementById("tva1").style.display = 'initial';
		document.getElementById("tva2").style.display = 'initial';
		document.getElementById("tva3").style.display = 'initial';
		document.getElementById("tva4").style.display = 'initial';
		document.getElementById("tva20cb").style.display = 'initial';
	}else{
		document.getElementById("montant_tva1").value=0;
		document.getElementById("montant_tva2").value=0;
		document.getElementById("montant_tva3").value=0;
		document.getElementById("montant_tva4").value=0;
		document.getElementById("tva1").style.display = 'none';
		document.getElementById("tva2").style.display = 'none';
		document.getElementById("tva3").style.display = 'none';
		document.getElementById("tva4").style.display = 'none';
		document.getElementById("tva20cb").style.display = 'none';
	}
	 tva20plus(document.getElementById("tva20"));
}


function tva20plus(obj){
	if((obj.checked)){
		document.getElementById("tva1").style.display = 'initial';
		document.getElementById("tva2").style.display = 'initial';
		document.getElementById("tva3").style.display = 'initial';
	}else{
		document.getElementById("montant_tva1").value=0;
		document.getElementById("montant_tva2").value=0;
		document.getElementById("montant_tva3").value=0;
		document.getElementById("tva1").style.display = 'none';
		document.getElementById("tva2").style.display = 'none';
		document.getElementById("tva3").style.display = 'none';
	}
}



function ouvreaide(){
	window.open("aide.asp?sujet=aide_gestionfacturation_role","","top=10,left=10,height=740,width=980,scrollbar=no,toolbar=no,location=no,channelmode=no,status=no,menubar=no,resizable");
}

$(document).ready(function() {
    $('#tiers').select2();
});
	


/*	
document.addEventListener("DOMContentLoaded",function(){
   if (document.getElementById("avectva").checked){
	tva20plus(document.getElementById("tva20"));
	avecsanstva(document.getElementById("avectva"));
	};
});*/



//-->
</script>
</head>

<body>
<script type="text/javascript" src="./scripts/toolstip.js"></script> 
<script type="text/javascript" src="./scripts/balloon.js"></script> 
<div id="ltitrepage" style="text-align:center; position:absolute; width:100%; height:28px; z-index:1; left:0px; top:0px"> 
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr> 
			<td width="10%" height="19" align="left"><img src="images/ivoo-logo.jpg" width="123" height="47" style="cursor:pointer;" onclick="location.href='menugeneral.asp'"></td>
			<td width="82%" height="19" bgcolor="<%=session("couleursite")%>" align="center"><span class="titrepage"><b><%=nomappli%></b>  | ... | NOUVELLE <b><%=type_prevision_affichee%></b> PREVISION DE DEPENSE</span></td>
			<td width="8%" height="19" align="right"><input type="button" name="baide" value="Aide" class="baide" onClick="ouvreaide()"></td>
		</tr>
	</table>
	<hr align="center">
</div>


<form id="saisie" name="saisie" method="post" action="treso_creation_prevision_depense1.asp" onsubmit="return(verif(this))">
<input type="hidden"  id="type_prevision"  name="type_prevision" value="<%=type_prevision%>">
<input type="hidden"  id="mode_paiement" name="mode_paiement" value="<%=mode_paiement%>">
<div id="lsaisie" style="position:absolute; width:700; height:400px; z-index:1; left:0px; top:80px;">
<div align="center">
	<table width="700" border="0" cellspacing="0" cellpadding="1">
    <!--<tr>
      <td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Type prévision :&nbsp;</font></b></td>
      <td width="80%" align="left" bgcolor="#FFFFCC">
				<select name="type_prevision">
					<option value="-1" selected>Choisir...</option>
					<option value="P" <%=valsel("P",type_prevision)%>>Pr&eacute;vision</option>
					<option value="R" <%=valsel("R",type_prevision)%>>R&eacute;tro pr&eacute;vision</option>
				</select>
			</td>
    </tr>-->
		<tr>
			<td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Clé courrier :&nbsp;</font></b></td>
			<td width="80%" align="left" bgcolor="#FFFFCC"><input name="cle_courrier" type="text" size="10" maxlength="10" value="<%=cle_courrier%>">&nbsp;&nbsp;<input type="button" id="btnvoircour" name="btnvoircour" value="Voir" onclick="voircourrier()"></td>
		</tr>
		<tr>
			<td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Date pièce :&nbsp;</font></b></td>
			<td width="80%" align="left" bgcolor="#FFFFCC">
				<input id="date_piece" name="date_piece" type="text" id="date_piece" value="<%=date_piece%>" size="10" maxlength="10" onfocus="javascript:view_microcal(true,date_piece,microcal1,-1,0);" onblur="javascript:view_microcal(false,date_piece,microcal1,-1,0);">
				<div id="microcal1" style="visibility:hidden; position:absolute; border:2px black outset; background:#ffffff;"></div>
				&nbsp;&nbsp;&nbsp;
			</td>
		</tr>
		<tr>
			<td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Soci&eacute;t&eacute; :&nbsp;</font></b></td>
			<td width="80%" align="left" bgcolor="#FFFFCC">
				<select  id="societe" name="societe" onchange="chgtiers()">
  	  		<option value="-1" <%=valsel("-1",societe)%>>Choisir</option>
					<%while not listesoc.eof%>
						<option value="<%=listesoc("code_compta")%>" <%=valsel(trim(listesoc("code_compta")),societe)%>><%=listesoc("nomsociete")%></option>
					<%listesoc.movenext:wend%>
	  		</select>
			</td>
		</tr>
		<tr>
			<td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Rubrique :&nbsp;</font></b></td>
			<td width="80%" align="left" bgcolor="#FFFFCC">
				<select  id="rubrique" name="rubrique" onchange="chgtiers()">
  	  		<option value="-1" selected>Choisir</option>
					<%while not listerub.eof%>
						<option value="<%=listerub("cle") & "|" & listerub("libelle")%>" <%=valsel(trim(listerub("cle")),rubrique)%>><%=listerub("libelle")%></option>
					<%listerub.movenext : wend%>
	  		</select>
			</td>
    </tr>
		<tr>
			<td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Tiers :&nbsp;</font></b></td>
			<td width="80%" align="left" bgcolor="#FFFFCC">
				<select name="tiers" id="tiers" onchange="chgtiers()">
  	  		<option value="-1" <%=valsel("-1",code_tiers)%>>Choisir</option>
					<%while not listetiers.eof%>
						<option value="<%=listetiers("code")%>" <%=valsel(trim(listetiers("code")),trim(code_tiers))%>><%=listetiers("intitule_compte_tiers")%></option>
					<%listetiers.movenext:wend%>
	  		</select>
				<input type="button" value="&nbsp;&nbsp;&nbsp;&#128269;&nbsp;&nbsp;&nbsp;" id="btnrech"  name="btnrech" onclick="rechercher()" onMouseOver="Tip('Rechercher un tiers', BALLOON, true, ABOVE, true)" onMouseOut="UnTip()" >
				&nbsp;
				<input type="button" value="Prév" id="btnvisuprev" name="btnvisuprev" onclick="visuprev()" style="display:<%=visubtnprev%>" onMouseOver="Tip('Visualiser les prévisions en cours sur le tiers sélectionné\r et, éventuellement, en choisir une plutôt que de créer une nouvelle prévison', BALLOON, true, ABOVE, true)" onMouseOut="UnTip()">
				&nbsp;
			</td>
    </tr>
		<tr>
			<td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Libellé :&nbsp;</font></b></td>
			<td width="80%" align="left" bgcolor="#FFFFCC">
				<table width="400" border="5" >
					<tr>
						<td width="150"><font face="Arial, Helvetica, sans-serif" size="1" color="#000000">&nbsp;Préfixe libellé</font></td>
						<td width="65"><font face="Arial, Helvetica, sans-serif" size="1" color="#000000">Mois</font></td>
						<td width="65"><font face="Arial, Helvetica, sans-serif" size="1" color="#000000">&nbsp;Année</font></td>
						<td width="60"><font face="Arial, Helvetica, sans-serif" size="1" color="#000000">&nbsp;Trim</font></td>
						<td width="60"><font face="Arial, Helvetica, sans-serif" size="1" color="#000000">&nbsp;</font></td>
					</tr>
					<tr>
						<td width="150">
							<select id="libelle1" name="libelle1" onchange="chgtiers()">
								<option value="-1" selected>Choisir</option>
								<%if listeprefix.eof then response.write("<option value=""" & trim(rubrique_tiers) & """>" & trim(rubrique_tiers) & "</option>")
								while not listeprefix.eof%>
									<option value="<%=listeprefix("prefixe_libelle")%>" <%=valsel(listeprefix("prefixe_libelle"),libelle1)%>><%=listeprefix("prefixe_libelle")%></option>
								<%listeprefix.movenext : wend%>
							</select>
						</td>
						<td width="65">
							<select id="libelle2" name="libelle2">
								<option value="-1" selected>Choisir</option>
								<%for m=1 to 12%>
									<option value="<%=sur2digits(m)%>"><%=sur2digits(m)%></option>
								<%next%>
							</select>
						</td>
						<td width="65">
							<select id="libelle3" name="libelle3">
								<option value="-1" selected>Choisir</option>
								<option value="<%=sur2digits(a0)%>">20<%=sur2digits(a0)%></option>
								<option value="<%=sur2digits(a1)%>">20<%=sur2digits(a1)%></option>
								<option value="<%=sur2digits(a2)%>">20<%=sur2digits(a2)%></option>
								<option value="<%=sur2digits(a3)%>">20<%=sur2digits(a3)%></option>
							</select>
						</td>
						<td width="60">
							<select id="libelle4" name="libelle4">
								<option value="-1" selected>Choisir</option>
								<option value="1">1er trimestre</option>
								<option value="2">2ème trimestre</option>
								<option value="3">3ème trimestre</option>
								<option value="4">4éme trimestre</option>
							</select>
						</td>
						<td width="60"><input id="beneficiaire" name="beneficiaire" type="text" size="15" maxlength="15"></td>
					</tr>
				</table>
				
			</td>
    </tr>
		<tr>
			<td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Montant :&nbsp;</font></b></td>
			<td width="80%" align="left" bgcolor="#FFFFCC"><input id="montant" name="montant" type="text" size="10" maxlength="10"></td>
    </tr>
		
		<tr>
			<td colspan="2" align="center" bgcolor="<%=couleurfondcase%>"><input type="checkbox" id="avectva"  name="avectva" value="1" onclick="avecsanstva(this)" <%=coche_avec_tva%>>
				<b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Avec TVA</font></b></td>
    </tr>
	</table>
	</div><div align="center">
	<table width="700" border="0" cellspacing="0" cellpadding="1">
		<tr id="tva20cb">
			<td colspan="2"  width="700" align="center" bgcolor="<%=couleurfondcase%>"><input type="checkbox" id="tva20"  name="tva20" value="1" onclick="tva20plus(this)" <%=tva_20_plus%>>
				<b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">moins de 20% de TVA </font></b></td>
    </tr>
		<tr id="tva1" style="display:none;">
			<td width="140" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">TVA <%=const_taux_tva1%>% :&nbsp;</font></b></td>
			<td width="560" align="left" bgcolor="#FFFFCC"><input id="montant_tva1" name="montant_tva1" type="text" size="10" maxlength="10"></td>
    </tr>
		<tr id="tva2" style="display:none;">
			<td width="140" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">TVA <%=const_taux_tva2%>% :&nbsp;</font></b></td>
			<td width="560" align="left" bgcolor="#FFFFCC"><input id="montant_tva2" name="montant_tva2" type="text" size="10" maxlength="10"></td>
    </tr>
		<tr id="tva3" style="display:none;">
			<td width="140" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">TVA <%=const_taux_tva3%> % :&nbsp;</font></b></td>
			<td width="560" align="left" bgcolor="#FFFFCC"><input id="montant_tva3" name="montant_tva3" type="text" size="10" maxlength="10"></td>
    </tr>
		<tr id="tva4">
			<td width="140" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">TVA <%=const_taux_tva4%> % :&nbsp;</font></b></td>
			<td width="560" align="left" bgcolor="#FFFFCC"><input id="montant_tva4" name="montant_tva4" type="text" size="10" maxlength="10"></td>
    </tr>
	</table>
	</div><div align="center">
		<table width="700" border="0" cellspacing="0" cellpadding="1">
		<tr>
			<td width="140" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Date échéance :&nbsp;</font></b></td>
			<td width="560" align="left" bgcolor="#FFFFCC">
				<input name="date_echeance" type="text" id="date_echeance" value="<%=date_echeance%>" size="10" maxlength="10" onfocus="javascript:view_microcal(true,date_echeance,microcal2,-1,0);" onblur="javascript:view_microcal(false,date_echeance,microcal2,-1,0);">
				<div id="microcal2" style="visibility:hidden; position:absolute; border:2px black outset; background:#ffffff;"></div>
			</td>
    </tr>
		<tr>
			<td width="140" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Date ordo :&nbsp;</font></b></td>
			<td width="560" align="left" bgcolor="#FFFFCC">
				<input name="date_ordo" type="text" id="date_ordo" value="<%=date_ordo%>" size="10" maxlength="10" onfocus="javascript:view_microcal(true,date_ordo,microcal3,-1,0);" onblur="javascript:view_microcal(false,date_ordo,microcal3,-1,0);">
				<div id="microcal3" style="visibility:hidden; position:absolute; border:2px black outset; background:#ffffff;"></div>
			</td>
    </tr>
    <tr>
      <td colspan="2" align="center"><input type="submit" id="btnok"  name="btnok" value="Ok" class="bok">&nbsp;&nbsp;&nbsp;<input type="button" id="btnretour" name="btnretour" value="Annuler" onClick="location.href='<%=pageretour%>'" class="bretour"></td>
    </tr>
	</table>
	</div>
</div>
</form>


<div id="lentetelistebudget" style="position:absolute; width:721; height:8px; z-index:1; left:701px; top:60px;">
<div align="center">
	<table width="700" border="0" cellspacing="0" cellpadding="1">
    <tr>
      <td colspan="4" align="center" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">LISTE BUDGET</font></b></td>
    </tr>
    <tr>
      <td width="12%" align="left" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">E</font><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">chéance</font></b></td>
      <td width="33%" align="left" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Tiers</font></b></td>
      <td width="45%" align="left" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Libellé</font></b></td>
      <td width="10%" align="left" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Montant</font></b></td>
		</tr>
	</table>
</div>
</div>
<div id="llistebudget" style="position:absolute; width:721; height:400px; z-index:1; left:712px; top:95px;overflow=auto">
	<table width="700" border="0" cellspacing="0" cellpadding="1">
		<%while not listebudget.eof
		montant=listebudget("debit")+listebudget("credit")%>
    <tr  bgcolor="#FFFFCC" onClick="associer(<%=listebudget("cle")%>)" style="cursor:pointer" onMouseOver="surligne(this)" onMouseOut="desurligne(this)">
      <td width="12%" align="left"><font face="Arial, Helvetica, sans-serif" size="2" color="#000000"><%=formatdatetime(listebudget("date_echeance"))%></font></td>
      <td width="33%" align="left"><font face="Arial, Helvetica, sans-serif" size="2" color="#000000"><%=listebudget("libelle_compte_tiers")%></font></td>
      <td width="45%" align="left"><font face="Arial, Helvetica, sans-serif" size="2" color="#000000"><%=listebudget("libelle_ecriture")%></font></td>
      <td width="10%" align="left"><font face="Arial, Helvetica, sans-serif" size="2" color="#000000"><%=formatnumber(montant)%></font></td>
		</tr>
		<%listebudget.movenext : wend%>
	</table>
	<!--<%response.write(txtsql)%>-->
</div>


<div id="laffichage" style="text-align:center; position:absolute; width:100%; height:500px; z-index:2; left:10px; top:485px; display:<%=display_courrier%>">
	<iframe src='courriers/<%=nom_fichier%>' width="100%" height="500"></iframe>
</div>


</body>
</html>
<%
listetiers.Close()
listesoc.Close()
listeprefix.Close()
listebudget.close()
listerub.close()

%>