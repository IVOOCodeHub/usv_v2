<%@LANGUAGE="VBSCRIPT" %> 
<!--#include file="fctgene.asp" -->
<%
' v�rification de la session
if trim(session("identifiant"))="" then
	txtpageerreur="erreur.asp?titre=FIN DE SESSION&pageretour=menu0.htm&message=D�lai de connection expir�, merci de vous r�-identifier..." 
	response.redirect(txtpageerreur)
end if

' Donn�es re�ues
session("comptaprev_filtre_date_echeance")=trim(request.form("date_maxi"))

' Redirection
response.redirect("compta_vir_menu.asp")
%>
