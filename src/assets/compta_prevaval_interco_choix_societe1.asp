<%@LANGUAGE="VBSCRIPT" %> 
<!--#include file="fctgene.asp" -->
<%
' vérification de la session
if trim(session("identifiant"))="" then
	txtpageerreur="erreur.asp?titre=FIN DE SESSION&pageretour=menu0.htm&message=Délai de connection expiré, merci de vous ré-identifier..." 
	response.redirect(txtpageerreur)
end if

' Données reçues
session("comptaprev_filtre_date_min") = request.form("date_min")
session("comptaprev_filtre_date_max") = request.form("date_maxi")

' Validation des dates
if isDate(session("comptaprev_filtre_date_min")) = false or isDate(session("comptaprev_filtre_date_max")) = false then
    txtpageerreur = "erreur.asp?titre=ERREUR DE SAISIE&pageretour=compta_prevaval_interco_choix_societe.asp&message=Veuillez saisir des dates valides."
    response.redirect(txtpageerreur)
end if

if cDate(session("comptaprev_filtre_date_min")) > cDate(session("comptaprev_filtre_date_max")) then
    txtpageerreur = "erreur.asp?titre=ERREUR DE LOGIQUE&pageretour=compta_prevaval_interco_choix_societe.asp&message=La date minimale ne peut pas être supérieure à la date maximale."
    response.redirect(txtpageerreur)
end if

' Redirection 
response.redirect("comptaprev_interco_menugeneral.asp")
%>