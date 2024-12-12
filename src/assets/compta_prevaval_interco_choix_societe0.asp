<%@LANGUAGE="VBSCRIPT" %> 
<!--#include file="fctgene.asp" -->
<%
' vérification de la session
if trim(session("identifiant"))="" then
	txtpageerreur="erreur.asp?titre=FIN DE SESSION&pageretour=menu0.htm&message=Délai de connection expiré, merci de vous ré-identifier..." 
	response.redirect(txtpageerreur)
end if

' Get the oldest records
Dim connection, recordset, query, defaultDate, formMaxDate
Set connection = CreateObject("ADODB.Connection")
connection.Open "Provider=SQLOLEDB; Data Source=serveursql;Database=compta;UID=sa;"

formMaxDate = Request.Form("date_maxi")

If IsDate(formMaxDate) Then
    formMaxDate = Replace(formMaxDate, "'", "''") 
Else
    formMaxDate = Date() 
End If

query = "SELECT TOP 1 date_echeance FROM compta..previsions " & _
        "WHERE date_echeance <= '" & formMaxDate & "' " & _
        "AND (statut = 'A REGULARISER' OR statut = 'REGUL +' OR statut = 'REGUL -') " & _
        "AND rubrique_treso = 'INTERCO' " & _
        "AND reference_paiement = 0 " & _
        "ORDER BY date_echeance ASC"

Set recordset = connection.Execute(query)

If Not recordset.EOF Then
    defaultDate = recordset.Fields("date_echeance").Value
    Dim yearPart, monthPart, dayPart
    yearPart = Left(defaultDate, 4)
    monthPart = Mid(defaultDate, 6, 2)
    dayPart = Right(defaultDate, 2)
    session("comptaprev_filtre_date_min") = dayPart & "/" & monthPart & "/" & yearPart
	defaultDate = dayPart & "/" & monthPart & "/" & yearPart
Else
    session("comptaprev_filtre_date_min") = ""
End If

' Initialisation
session("compta_cle_courrier") = ""
if session("compta_coltri_mg") = "" then
	session("compta_coltri_mg") = "date_saisie"
	session("compta_ordrtri_mg") = "DESC"
end if
session("comptaprev_filtre_date_min") = defaultDate
session("comptaprev_filtre_date_max") = Date()

' démarquage des marquages éventuels
txtsql="UPDATE previsions SET marque=0, mat_mark=0 WHERE marque=1 AND mat_mark=" & session("matricule")
exec_cde_sql txtsql,dsncompta

%>
<html>
<head>
<title>Choix soci&eacute;t&eacute;</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<script src="scripts/pr_calendrier.js" language="JavaScript" type="text/javascript"></script>
<link rel="stylesheet" href="Styles/gboutons.css" type="text/css">
<script language="JavaScript">
<!--
function verif(f){
	if(f.date_min.value=="" || f.date_maxi.value==""){
		alert("Veuillez saisir une plage de dates SVP !");
		if(f.date_min.value=="") f.date_min.focus();
		else f.date_maxi.focus();
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
				<td width="82%" height="19" bgcolor="<%=session("couleursite")%>" align="center"><span class="titrepage"><b><%=nomappli%></b>  | COMPTA | TRESORERIE | INTERCO A REGULARISER </span></td>
				<td width="8%" height="19" align="right"><input type="button" name="baide" value="Aide" class="baide" onClick="ouvreaide()"></td>
			</tr>
		</table>
		<hr align="center">
	</div>

	<form name="saisie" method="post" action="compta_prevaval_interco_choix_societe1.asp" onsubmit="return(verif(this))">
		<input type="hidden" name="typeop" value="P">
		<div id="lsaisie" style="text-align:<%=attr_text_align%>; position:absolute; width:100%; height:400px; z-index:1; left:0px; top:100px"> 
			<table width="40%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td width="50%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF">Date minimale :&nbsp;</font></b></td>
					<td width="50%" bgcolor="#FFFFCC">
						&nbsp;<input name="date_min" type="text" id="date_min" value="<%=session("comptaprev_filtre_date_min")%>" onFocus="javascript:view_microcal(true,date_min,microcal1);" onBlur="javascript:view_microcal(false,date_min,microcal1,-1,0);" size="10" maxlength="10" readonly>
						<div id="microcal1" style="visibility:hidden; position:absolute; left:490px;top:0px;border:2px black solid;background:#ffffff;z-index:100"></div>
					</td>
				</tr>
				<tr>
					<td width="50%" align="right" bgcolor="<%=couleurfondcase%>"><b><font face="Arial, Helvetica, sans-serif" color="#FFFFFF">Date maximale :&nbsp;</font></b></td>
					<td width="50%" bgcolor="#FFFFCC">
						&nbsp;<input name="date_maxi" type="text" id="date_maxi" value="<%=session("comptaprev_filtre_date_max")%>" onFocus="javascript:view_microcal(true,date_maxi,microcal2);" onBlur="javascript:view_microcal(false,date_maxi,microcal2,-1,0);" size="10" maxlength="10" readonly>
						<div id="microcal2" style="visibility:hidden; position:absolute; left:490px;top:0px;border:2px black solid;background:#ffffff;z-index:100"></div>
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
	</form>

</body>
</html>