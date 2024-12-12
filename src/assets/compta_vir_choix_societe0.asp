<%@LANGUAGE="VBSCRIPT" %> 
<!--#include file="fctgene.asp" -->
<%
' vérification de la session
if trim(session("identifiant"))="" then
	txtpageerreur="erreur.asp?titre=FIN DE SESSION&pageretour=menu0.htm&message=Délai de connection expiré, merci de vous ré-identifier..." 
	response.redirect(txtpageerreur)
end if

' Initialisation
session("compta_cle_courrier")=""
session("compta_coltri_mg")=""
session("comptaprev_filtre_date_echeance")=date
session("comptaprev_filtre_societe")=""

' Données reçues
if trim(session("compta_societe"))<>"" then societe=session("compta_societe") else societe="-1"
f_societe=trim(request.querystring("f_societe"))
if f_societe="" then ' filtre société demandé non
	if trim(session("compta_f_societe"))="" then ' filtre societe existant non
		f_societe="-1"
	else ' filtre societe existant oui
		f_societe=trim(session("compta_f_societe"))
	end if ' filtre societe existant ?
else ' filtre société demandé oui
	session("compta_f_societe")=f_societe
end if ' filtre société demandé ?

' démarquage des marquages éventuels
txtsql="UPDATE previsions SET marque=0, mat_mark=0 WHERE marque=1 AND mat_mark=" & session("matricule")
exec_cde_sql txtsql,dsncompta

%>
<html>
<head>
<title>Choix date</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<script src="scripts/pr_calendrier.js" language="JavaScript" type="text/javascript"></script>
<link rel="stylesheet" href="Styles/gboutons.css" type="text/css">
<script language="JavaScript">
<!--
function verif(f){
	if(f.date_maxi.value==""){
		alert("Veuillez saisir une date maxi SVP !");
		f.date_maxi.focus();
		return false;
	}
	return true;
}

function ouvreaide(){
	window.open("aide.asp?sujet=none","","top=10,left=10,height=740,width=980,scrollbar=no,toolbar=no,location=no,channelmode=no,status=no,menubar=no,resizable");
}

//-->
</script>
</head>


<body>
	<div id="ltitrepage" style="text-align:center; position:absolute; width:100%; height:28px; z-index:1; left:0px; top:0px"> 
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr> 
				<td width="10%" height="19" align="left"><img src="images/ivoo-logo.jpg" width="123" height="47" style="cursor: pointer;" onclick="location.href='menugeneral.asp'"></td>
				<td width="82%" height="19" bgcolor="<%=session("couleursite")%>" align="center"><span class="titrepage"><b><%=nomappli%></b>  | ... | TRESORERIE | PREVISIONS A ORDONNANCER</span></td>
				<td width="8%" height="19" align="right"><input type="button" name="baide" value="Aide" class="baide" onClick="ouvreaide()"></td>
			</tr>
		</table>
		<hr align="center">
	</div>

	<form name="saisie" method="post" action="compta_vir_choix_societe1.asp" onsubmit="return(verif(this))">
		<div id="lsaisie" style="text-align:<%=attr_text_align%>; position:absolute; width:100%; height:400px; z-index:1; left:0px; top:100px"> 
			<div align="center">
			<table width="40%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td width="50%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF">Date maxi :&nbsp;</font></b></td>
					<td width="50%" bgcolor="#FFFFCC">
						&nbsp;<input name="date_maxi" type="text" id="date_maxi" value="<%=session("comptaprev_filtre_date_echeance")%>" onFocus="javascript:view_microcal(true,date_maxi,microcal1,-1,0);" onBlur="javascript:view_microcal(false,date_maxi,microcal1,-1,0);" size="10" maxlength="10" readonly>
						<div id="microcal1" style="visibility:hidden; position:absolute; left:900px;top:0px;border:2px black solid;background:#ffffff;z-index:100"></div>
					</td>
				</tr>
				<tr>
					<td colspan="2%">&nbsp;</td>
				</tr>
				<tr>
					<td align="right" width="50%"><input type="submit" name="Submit" value="Ok" class="bok">&nbsp;</td>
					<td width="50%"><input type="button" name="btn_retour" value="Retour" onclick="location.href='tresor_menu.asp'" class="bretour"></td>
				</tr>
			</table>
		</div>
		</div>
	</form>
</body>
</html>
