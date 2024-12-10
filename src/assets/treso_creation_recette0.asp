<%@LANGUAGE="VBSCRIPT" %> 
<!--#include file="fctgene.asp" -->
<!--#include file="fctgene_courrier.asp" -->
<%
' vérification de la session
if trim(session("identifiant"))="" then
	txtpageerreur="erreur.asp?titre=FIN DE SESSION&pageretour=menu0.htm&message=Délai de connection expiré, merci de vous ré-identifier..." 
	response.redirect(txtpageerreur)
end if

' Données reçues
cle_courrier=trim(request.querystring("cle_courrier")) : if cle_courrier="" then cle_courrier="0"
societe=trim(request.querystring("societe")) : if emet="" then emet="-1"
code_tiers=trim(request.querystring("code_tiers")) : if code_tiers="" then code_tiers="-1"
date_piece=trim(request.querystring("date_piece"))
date_echeance=request.querystring("date_echeance")
date_ordo=trim(request.querystring("date_ordo"))
libelle1=trim(request.querystring("libelle1")) : if libelle1="" then libelle1="-1"
libelle2=trim(request.querystring("libelle2")) : if libelle2="" then libelle2="-1"
libelle3=trim(request.querystring("libelle3")) : if libelle3="" then libelle3="-1"
libelle4=trim(request.querystring("libelle4")) : if libelle4="" then libelle4="-1"
beneficiaire=trim(request.querystring("beneficiaire"))
montant=trim(request.querystring("montant")) : if montant="" then montant="0"
montant_tva1=trim(request.querystring("montant_tva1")) : if montant_tva1="" then montant_tva1="0"
montant_tva2=trim(request.querystring("montant_tva2")) : if montant_tva2="" then montant_tva2="0"
montant_tva3=trim(request.querystring("montant_tva3")) : if montant_tva3="" then montant_tva3="0"
montant_tva4=trim(request.querystring("montant_tva4")) : if montant_tva4="" then montant_tva4="0"

'eval sent date and recover according checkbox-settings RF 2022-10-31
hasTVA=0
hasTVA20Min=0
if (montant_tva4<>"0") then
	hasTVA=1 
end if
if ( (montant_tva1<>"0") Or ( montant_tva2<>"0") Or (montant_tva3<>"0") ) then
	hasTVA=1
	hasTVA20Min=1
end if

void_rub=trim(request.form("cle_rubrique"))
if void_rub<>"" then ' rubrique demandée oui
	rub=split(void_rub,"|")
	cle_rubrique=rub(0) : if cle_rubrique="" then cle_rubrique="-1" 
	libelle_rubrique=rub(1) ' inutilisé mais envoyé par le formulaire
else ' rubrique demandée non
	cle_rubrique="-1"
	libelle_rubrique="-1"
end if ' rubrique demandée ?

' Traitement données reçus
if cle_courrier<>"0" then ' courrier à afficher oui
	' Lecture data courrier
	txtsql="SELECT nom_fichier FROM courrier WHERE cle=" & cle_courrier
	set data = Server.CreateObject("ADODB.Recordset")
	data.ActiveConnection = dsnIVOO
	data.Source = txtsql
	data.Open()
	if not data.eof then ' courrier trouvé oui
		nom_fichier=data("nom_fichier")
	end if ' courrier trouvé ?
	data.Close()
	display_btn_assoc_cour="none"
	display_couche_courrier="inline"
else ' courrier à afficher non
	display_couche_courrier="none"
	if societe<>"-1" and code_tiers<>"-1" and societe<>"" and code_tiers<>"" then 
		display_btn_assoc_cour="inline"
	else
		display_btn_assoc_cour="none"
	end if
end if ' courrier à afficher ?

' Liste des sociétés emettrice
txtsql="SELECT nomsociete,code_compta FROM societes WHERE active=1 ORDER BY nomsociete"
set listesoc = Server.CreateObject("ADODB.Recordset")
listesoc.ActiveConnection = dsnemployes
listesoc.Source = txtsql
listesoc.Open()

' Liste des tiers
txtsql="SELECT code, societe, rubrique_tresorerie, intitule_compte_tiers FROM fournisseurs WHERE actif=1 AND societe<>'NC' ORDER BY societe"
set listetiers = Server.CreateObject("ADODB.Recordset")
listetiers.ActiveConnection = dsnpartenaires
listetiers.Source = txtsql
listetiers.Open()

' Données du tiers
avec_tva=true
if code_tiers<>"-1" then ' tiers connu oui
	txtsql="SELECT avec_tva FROM fournisseurs WHERE code=" & code_tiers
	set datadest = Server.CreateObject("ADODB.Recordset")
	datadest.ActiveConnection = dsnpartenaires
	datadest.Source = txtsql
	datadest.Open()
	avec_tva=datadest("avec_tva") : if avec_tva then coche_avec_tva="checked" else coche_avec_tva=""
	datadest.Close()
end if ' tiers connu ?

'process explicitly tva0
if 	hasTVA<1 and not avec_tva then ' avec tva oui
	montant_tva1="0"
	montant_tva2="0"
	montant_tva3="0"
	montant_tva4="0"
else
	 coche_avec_tva="checked" 'don't touch the tva
end if ' avec tva ?

' Liste des rubriques
txtsql="SELECT cle, libelle FROM " & nom_base_compta & ".dbo.rubriques_previsions_tresorerie WHERE libelle='AUTRES RECETTES'"
set listerub = Server.CreateObject("ADODB.Recordset")
listerub.ActiveConnection = dsnpartenaires
listerub.Source = txtsql
listerub.Open()
cle_rubrique=listerub("cle")

' Lecture des préfixes de rubriques
txtsql="SELECT prefixe_libelle FROM prefixes_libelles_rubriques WHERE cle_rubrique=(SELECT cle FROM " & nom_base_compta & ".dbo.rubriques_previsions_tresorerie WHERE libelle='AUTRES RECETTES') GROUP BY prefixe_libelle ORDER BY prefixe_libelle"
set listeprefix = Server.CreateObject("ADODB.Recordset")
listeprefix.ActiveConnection = dsncompta
listeprefix.Source = txtsql
listeprefix.Open()

' Années
a3=cint(right(year(date),2))
a0=a3-3
a1=a3-2
a2=a3-1
'a3=a3
a4=a3+1
a5=a3+2

if cle_rubrique<>"-1" then displaybtnrech="inline" else displaybtnrech="none"

tva_20_plus=""
if(hasTVA20Min>0) then
	tva_20_plus="checked"
end if

%>
<html>
<head>
<title>Nouvelle pr&eacute;vision</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="Styles/gboutons.css" type="text/css">
<script src="scripts/pr_calendrier.js" language="javascript" type="text/javascript"></script>
<script src="scripts/fctgene.js" language="javascript" type="text/javascript"></script>
<script language="JavaScript">
<!--
function verif(f){
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
	if(f.code_tiers.value=="-1"){
		alert("Veuillez saisir le tiers !");
		f.code_tiers.focus();
		return false;
	}
	if(f.cle_rubrique.value=="-1"){
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
		total_tva=f.montant_tva1.value+f.montant_tva2.value+f.montant_tva3.value+f.montant_tva4.value;
		if((total_tva=="")||(total_tva=="0000")){
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
		}
	}
	return true;
}

function change_dest_emet(){
	emet=document.getElementById("societe").value;
	dest=document.getElementById("code_tiers").value;
	if((dest!="-1")&&(emet!="-1")&&(dest!=emet)){
		document.getElementById("btnassoc").style.display="inline";
	}else{
		document.getElementById("btnassoc").style.display="none";
	}
	txturl="treso_creation_recette0.asp";
	txturl=txturl + "?societe="+document.getElementById("societe").value;
	txturl=txturl + "&code_tiers="+document.getElementById("code_tiers").value;
	txturl=txturl + "&date_piece="+document.getElementById("date_piece").value;
	txturl=txturl + "&date_echeance="+document.getElementById("date_echeance").value;
	txturl=txturl + "&date_ordo="+document.getElementById("date_ordo").value;
	txturl=txturl + "&libelle1="+document.getElementById("libelle1").value;
	txturl=txturl + "&libelle2="+document.getElementById("libelle2").value;
	txturl=txturl + "&libelle3="+document.getElementById("libelle3").value;
	txturl=txturl + "&libelle4="+document.getElementById("libelle4").value;
	txturl=txturl + "&beneficiaire="+document.getElementById("beneficiaire").value;
	txturl=txturl + "&montant="+document.getElementById("montant").value;
	txturl=txturl + "&montant_tva1="+document.getElementById("montant_tva1").value;
	txturl=txturl + "&montant_tva2="+document.getElementById("montant_tva2").value;
	txturl=txturl + "&montant_tva3="+document.getElementById("montant_tva3").value;
	txturl=txturl + "&montant_tva4="+document.getElementById("montant_tva4").value;
	txturl=txturl + "&cle_rubrique="+document.getElementById("cle_rubrique").value;
	txturl=txturl + "&cle_courrier=<%=cle_courrier%>";
	location.href=txturl;
}

function rechercher(){
	txturl="treso_recherche_compte_tiers_clerub.asp?champ=code_tiers";
	param="top=10,left=10,height=740,width=980,scrollbar=no,toolbar=no,location=no,channelmode=no,status=no,menubar=no";
	window.open(txturl,"",param);
}

function visuprev(){
	url="treso_visu_prev_tiers.asp?code="+document.getElementById("code_tiers").value;
	param="top=10,left=10,height=740,width=980,scrollbar=no,toolbar=no,location=no,channelmode=no,status=no,menubar=no";
	window.open(url,"",param);
}

function assoccour(){
	param="top=20,left=20,height=768,width=1024,scrollbar=no,toolbar=no,location=no,channelmode=no,status=no,menubar=no,resizable";
	url="treso_assoc_externe_cour0.asp?emet="+document.getElementById("societe").value+"&dest="+document.getElementById("code_tiers").value;
	window.open(url,"",param);
}

function avecsanstva(obj){
	if((obj.checked)){
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
	window.open("aide.asp?sujet=none","","top=10,left=10,height=740,width=980,scrollbar=no,toolbar=no,location=no,channelmode=no,status=no,menubar=no,resizable");
}





document.addEventListener("DOMContentLoaded",function(){
	if("<%=coche_avec_tva%>"=="checked"){
		document.getElementById("avectva").checked=true;
		avecsanstva(document.getElementById("avectva"));	
	} 

})



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
			<td width="82%" height="19" bgcolor="#FFFFFF" align="center"><span class="titrepage"><b><%=nomappli%></b>  | ... | NOUVELLE PREVISION DE RECETTE EXTERNE</span></td>
			<td width="8%" height="19" align="right"><input type="button" name="baide" value="Aide" class="baide" onClick="ouvreaide()"></td>
		</tr>
	</table>
	<hr align="center">
</div>


	

<form name="saisie" method="post" action="treso_creation_recette1.asp" onsubmit="return(verif(this))">
	<input type="hidden" name="cle_courrier" value="<%=cle_courrier%>">
	<div id="lsaisie" style="text-align:center; position:absolute; width:900; height:400px; z-index:1; left:0px; top:80px;">
		<div align="center">
		<table width="900" border="0" cellspacing="0" cellpadding="1">
		<tr><td width="20%" align="center" bgcolor="#FFFFCC">
			<input type="button" name="btnassoc" value="Associer courrier" onclick="assoccour()" style="display:<%=display_btn_assoc_cour%>">&nbsp;</td>
			<td width="80%" align="center" bgcolor="#FFFFCC"></td>
		
			</tr>
			<tr>
				<td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="3" color="#FFFFFF">Date pièce :&nbsp;</font></b></td>
				<td width="80%" align="left" bgcolor="#FFFFCC">
					<input name="date_piece" type="text" id="date_piece" value="<%=date_piece%>" size="10" maxlength="10" onfocus="javascript:view_microcal(true,date_piece,microcal1,-1,0);" onblur="javascript:view_microcal(false,date_piece,microcal1,-1,0);">
					<div id="microcal1" style="visibility:hidden; position:absolute; border:2px black outset; background:#ffffff;"></div>
				</td>
			</tr>
			<tr>
				<td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="3" color="#FFFFFF">Soci&eacute;t&eacute; &eacute;mettrice facture :&nbsp;</font></b></td>
				<td width="80%" align="left" bgcolor="#FFFFCC">
					<select name="societe" onChange="change_dest_emet()">
						<option value="-1" <%=valsel("-1",soccour)%>>Choisir</option>
						<%while not listesoc.eof%>
							<option value="<%=listesoc("code_compta")%>" <%=valsel(trim(listesoc("code_compta")),societe)%>><%=listesoc("nomsociete")%></option>
						<%listesoc.movenext:wend%>
					</select>
    		</td>
			</tr>
			<tr>
				<td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="3" color="#FFFFFF">Tiers facturé :&nbsp;</font></b></td>
				<td width="80%" align="left" bgcolor="#FFFFCC">
					<select name="code_tiers" id="code_tiers" onChange="change_dest_emet()">
						<option value="-1" selected>Choisir</option>
						<%while not listetiers.eof%>
							<option value="<%=listetiers("code")%>" <%=valsel(trim(listetiers("code")),trim(code_tiers))%>><%=listetiers("intitule_compte_tiers")%></option>
						<%listetiers.movenext:wend%>
					</select>
					<input type="button" value="&nbsp;&nbsp;&nbsp;?&nbsp;&nbsp;&nbsp;" name="btnrech" onclick="rechercher()" onMouseOver="Tip('Rechercher un tiers par rubrique', BALLOON, true, ABOVE, true)" onMouseOut="UnTip()">
					&nbsp;
					<input type="button" value="Prév" id="btnvisuprev" onclick="visuprev()" style="display:<%=visubtnprev%>" onMouseOver="Tip('Visualiser les prévisions en cours sur le tiers sélectionné\r et, éventuellement, en choisir une plutôt que de créer une nouvelle prévison', BALLOON, true, ABOVE, true)" onMouseOut="UnTip()">
				</td>
			</tr>
			<tr>
				<td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="3" color="#FFFFFF">Rubrique :&nbsp;</font></b></td>
				<td width="80%" align="left" bgcolor="#FFFFCC">
					<select name="cle_rubrique">
						<option value="-1" selected>Choisir</option>
						<%while not listerub.eof%>
							<option value="<%=listerub("cle") & "|" & listerub("libelle")%>" <%=valsel(trim(listerub("cle")),trim(cle_rubrique))%>><%=listerub("libelle")%></option>
						<%listerub.movenext : wend%>
					</select>
				</td>
			</tr>
			<tr>
				<td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="3" color="#FFFFFF">Libellé :&nbsp;</font></b></td>
				<td width="80%" align="left" bgcolor="#FFFFCC">
					<table width="600" border="5" >
						<tr>
							<td width="65"><font face="Arial, Helvetica, sans-serif" size="1" color="#000000">&nbsp;Préfixe libellé</font></td>
							<td width="65"><font face="Arial, Helvetica, sans-serif" size="1" color="#000000">Mois</font></td>
							<td width="65"><font face="Arial, Helvetica, sans-serif" size="1" color="#000000">&nbsp;Année</font></td>
							<td width="60"><font face="Arial, Helvetica, sans-serif" size="1" color="#000000">&nbsp;Trim</font></td>
							<td width="160"><font face="Arial, Helvetica, sans-serif" size="1" color="#000000">&nbsp;</font></td>
						</tr>
						<tr>
							<td width="65">
								<select name="libelle1">
									<option value="-1" selected>Choisir</option>
									<%if listeprefix.eof then response.write("<option value=""" & trim(rubrique_tiers) & """>" & trim(rubrique_tiers) & "</option>")
									while not listeprefix.eof%>
										<option value="<%=listeprefix("prefixe_libelle")%>" <%=valsel(trim(listeprefix("prefixe_libelle")),libelle1)%>><%=listeprefix("prefixe_libelle")%></option>
									<%listeprefix.movenext : wend%>
								</select>
							</td>
							<td width="65">
								<select name="libelle2">
									<option value="-1" selected>Choisir</option>
									<%for m=1 to 12%>
										<option value="<%=sur2digits(m)%>" <%=valsel(sur2digits(m),libelle2)%>><%=sur2digits(m)%></option>
									<%next%>
								</select>
							</td>
							<td width="65">
								<select name="libelle3">
									<option value="-1" selected>Choisir</option>
									<option value="<%=sur2digits(a0)%>" <%=valsel(sur2digits(a0),libelle3)%>>20<%=sur2digits(a0)%></option>
									<option value="<%=sur2digits(a1)%>" <%=valsel(sur2digits(a1),libelle3)%>>20<%=sur2digits(a1)%></option>
									<option value="<%=sur2digits(a2)%>" <%=valsel(sur2digits(a2),libelle3)%>>20<%=sur2digits(a2)%></option>
									<option value="<%=sur2digits(a3)%>" <%=valsel(sur2digits(a3),libelle3)%>>20<%=sur2digits(a3)%></option>
									<option value="<%=sur2digits(a4)%>" <%=valsel(sur2digits(a4),libelle3)%>>20<%=sur2digits(a4)%></option>
									<option value="<%=sur2digits(a5)%>" <%=valsel(sur2digits(a5),libelle3)%>>20<%=sur2digits(a5)%></option>
								</select>
							</td>
							<td width="60">
								<select name="libelle4">
									<option value="-1" selected>Choisir</option>
									<option value="1" <%=valsel("1",libelle4)%>>1er trimestre</option>
									<option value="2" <%=valsel("2",libelle4)%>>2ème trimestre</option>
									<option value="3" <%=valsel("3",libelle4)%>>3ème trimestre</option>
									<option value="4" <%=valsel("4",libelle4)%>>4éme trimestre</option>
								</select>
							</td>
							<td width="160"><input name="beneficiaire" type="text" size="15" maxlength="15" value="<%=beneficiaire%>"></td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td width="20%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="3" color="#FFFFFF">Montant :&nbsp;</font></b></td>
				<td width="80%" align="left" bgcolor="#FFFFCC"><input name="montant" type="text" size="10" maxlength="10" value="<%=montant%>"></td>
			</tr>
			<tr>
				<td colspan="2" align="center" bgcolor="<%=couleurfondcase%>"><input type="checkbox" id="avectva" name="avectva" value="1" onclick="avecsanstva(this)" <%=coche_avec_tva%>>
					<b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">Avec TVA</font></b></td>
			</tr>
			
			
			
			</table>
		</div>
	 <div align="center">
	<table width="900" border="0" cellspacing="0" cellpadding="1">
		<tr id="tva20cb" style="display:none;">
			<td width="900" colspan="2"  align="center" bgcolor="<%=couleurfondcase%>"><input type="checkbox" id="tva20"  name="tva20" value="1" onclick="tva20plus(this)" <%=tva_20_plus%>>
				<b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">moins de 20% de TVA </font></b></td>
    </tr>
		<tr id="tva1" style="display:none;">
			<td width="180" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">TVA <%=const_taux_tva1%>% :&nbsp;</font></b></td>
			<td width="720" align="left" bgcolor="#FFFFCC"><input id="montant_tva1" name="montant_tva1" type="text" size="10" value="<%=montant_tva1%>" maxlength="10"></td>
    </tr>
		<tr id="tva2" style="display:none;">
			<td width="180" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">TVA <%=const_taux_tva2%>% :&nbsp;</font></b></td>
			<td width="720" align="left" bgcolor="#FFFFCC"><input id="montant_tva2" name="montant_tva2" type="text" size="10" value="<%=montant_tva2%>" maxlength="10"></td>
    </tr>
		<tr id="tva3" style="display:none;">
			<td width="180" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">TVA <%=const_taux_tva3%> % :&nbsp;</font></b></td>
			<td width="720" align="left" bgcolor="#FFFFCC"><input id="montant_tva3" name="montant_tva3" type="text" size="10" value="<%=montant_tva3%>" maxlength="10"></td>
    </tr>
		<tr id="tva4" style="display:none;">
			<td width="180" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">TVA <%=const_taux_tva4%> % :&nbsp;</font></b></td>
			<td width="720" align="left" bgcolor="#FFFFCC"><input id="montant_tva4" name="montant_tva4" type="text" size="10" value="<%=montant_tva4%>" maxlength="10"></td>
    </tr>
	</table>
		</div>
	 <div align="center">
	<table width="900" border="0" cellspacing="0" cellpadding="1">
			<tr>
				<td width="180" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="3" color="#FFFFFF">Date échéance :&nbsp;</font></b></td>
				<td width="720" align="left" bgcolor="#FFFFCC">
					<input name="date_echeance" type="text" id="date_echeance" value="<%=date_echeance%>" size="10" maxlength="10" onfocus="javascript:view_microcal(true,date_echeance,microcal2,-1,0);" onblur="javascript:view_microcal(false,date_echeance,microcal2,-1,0);">
					<div id="microcal2" style="visibility:hidden; position:absolute; border:2px black outset; background:#ffffff;"></div>
				</td>
			</tr>
			<tr>
				<td width="180" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="3" color="#FFFFFF">Date ordo :&nbsp;</font></b></td>
				<td width="720" align="left" bgcolor="#FFFFCC">
					<input name="date_ordo" type="text" id="date_ordo" value="<%=date_ordo%>" size="10" maxlength="10" onfocus="javascript:view_microcal(true,date_ordo,microcal3,-1,0);" onblur="javascript:view_microcal(false,date_ordo,microcal3,-1,0);">
					<div id="microcal3" style="visibility:hidden; position:absolute; border:2px black outset; background:#ffffff;"></div>
				</td>
			</tr>
			<tr>
				<td width="180" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" size="3" color="#FFFFFF">Commentaire :&nbsp;</font></b></td>
				<td width="720" align="left" bgcolor="#FFFFCC"><input type="text" name="commentaire" size="50" maxlength="100"></td>
			</tr>
			<tr>
				<td colspan="3" align="center"><input type="submit" name="btnok" value="Ok" class="bok">&nbsp;&nbsp;&nbsp;<input type="button" name="btnretour" value="Annuler" onClick="location.href='tresor_menu.asp'" class="bretour"></td>
			</tr>
		</table>
	</div>
</form>

<div id="laffichage" style="text-align:center; position:absolute; width:100%; height:1000px; z-index:1; left:0px; top:560px; display:<%=display_couche_courrier%>">
	<iframe id="frame_courrier" src='courriers/<%=nom_fichier%>' width="1000" height="1430"></iframe>
</div>

</body>
</html>
<%
listetiers.Close()
listesoc.Close()
listerub.Close()
listeprefix.Close()
%>