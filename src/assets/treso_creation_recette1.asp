<%@LANGUAGE="VBSCRIPT" %> 
<!--#include file="fctgene.asp" -->
<!--#include file="fctgene_compta.asp" -->
<%
' Données reçues
cle_courrier=request.form("cle_courrier") : if cle_courrier="" or isnull(cle_courrier) then cle_courrier="0"
date_piece=request.form("date_piece")
societe=request.form("societe")
tiers=request.form("code_tiers")
no_compte_tiers=donne_no_compte_tiers(tiers)
void_rub=trim(request.form("cle_rubrique"))
rub=split(void_rub,"|")
cle_rubrique=rub(0) 
libelle_rubrique=rub(1) ' inutilisé mais envoyé par le formulaire
libelle1=sap(request.form("libelle1"))
libelle2=sap(request.form("libelle2"))
libelle3=sap(request.form("libelle3"))
libelle4=sap(request.form("libelle4"))
beneficiaire=sap(request.form("beneficiaire"))
montant=request.form("montant")
date_echeance=request.form("date_echeance")
date_ordo=request.form("date_ordo") 
commentaire=sap(request.form("commentaire"))
avectva=request.form("avectva") : if avectva<>"1" then avectva="0"
montant_tva1=request.form("montant_tva1")
montant_tva2=request.form("montant_tva2")
montant_tva3=request.form("montant_tva3")
montant_tva4=request.form("montant_tva4")

' Dates et n° de semaine
if isnull(date_ordo) or date_ordo="" or not isdate(date_ordo) then date_ordo=date_echeance
if cdate(date_piece)<cdate("01/01/2018") then date_piece="01/01/2018" ' clôture 2017
libelle=sap(libelle1 & " " & libelle2 & " " & libelle4 & "T" & libelle3 & " " & beneficiaire)
dh_courante=date & " " & time
no_semaine_echeance=datepart("ww",date_echeance)
no_semaine_ordo=datepart("ww",date_ordo)

' Recherche libellé rubrique
txtsql="SELECT libelle FROM rubriques_previsions_tresorerie where cle=" & cle_rubrique
set librub = Server.CreateObject("ADODB.Recordset")
librub.activeconnection = dsncompta
librub.source = txtsql
librub.open()
libelle_rubrique=librub("libelle")
librub.close()

' Recherche data du tiers destinataire du courrier (donc destinataire de la facture, prévisions dépense)
txtsql="SELECT intitule_compte_tiers,no_compte_general,no_compte_tiers FROM fournisseurs WHERE code=" & tiers
set data = Server.CreateObject("ADODB.Recordset")
data.ActiveConnection = dsnpartenaires
data.Source = txtsql
data.Open()
intitule_compte_tiers=sap(data("intitule_compte_tiers"))
no_compte_tiers=sap(data("no_compte_tiers"))
data.Close()

' TVA
if avectva="1" then ' présence TVA oui
	if montant_tva1="" then montant_tva1="0"
	if montant_tva2="" then montant_tva2="0"
	if montant_tva3="" then montant_tva3="0"
	if montant_tva4="" then montant_tva4="0"
else ' présence TVA non
	montant_tva1="0"
	montant_tva2="0"
	montant_tva3="0"
	montant_tva4="0"
end if ' présence TVA ?

' insertion prévisions (ou budget)
txtsql="INSERT INTO previsions "
txtsql=txtsql & "(societe,code_journal,date_saisie,auteur_saisie,cle_rubrique_treso,rubrique_treso,ref_source_tiers,libelle_compte_tiers,no_compte_tiers,"
txtsql=txtsql & "libelle_ecriture,libelle_ecriture_prefixe,libelle_ecriture_mois,libelle_ecriture_annee,libelle_ecriture_trimestre,libelle_ecriture_beneficiaire,"
txtsql=txtsql & "date_echeance,no_semaine_echeance,date_ordo,no_semaine_ordo,date_piece,debit,credit,statut,auteur_statut,dh_statut,manu,commentaire,cle_courrier,"
txtsql=txtsql & "avec_tva,taux_tva1,montant_tva1,taux_tva2,montant_tva2,taux_tva3,montant_tva3,taux_tva4,montant_tva4) VALUES ("
txtsql=txtsql & "'" & societe & "',"
txtsql=txtsql & "'VENTES',"
txtsql=txtsql & "'" & dh_courante & "',"
txtsql=txtsql & " " & session("matricule") & ","
txtsql=txtsql & " " & cle_rubrique & ","
txtsql=txtsql & "'" & libelle_rubrique & "',"
txtsql=txtsql & "'" & tiers & "',"
txtsql=txtsql & "'" & intitule_compte_tiers & "',"
txtsql=txtsql & "'" & no_compte_tiers & "',"
txtsql=txtsql & "'" & libelle & "',"
txtsql=txtsql & "'" & libelle1 & "',"
txtsql=txtsql & "'" & libelle2 & "',"
txtsql=txtsql & "'" & libelle3 & "',"
txtsql=txtsql & "'" & libelle4 & "',"
txtsql=txtsql & "'" & beneficiaire & "',"
txtsql=txtsql & "'" & date_echeance & "',"
txtsql=txtsql & " " & no_semaine_echeance & ","
txtsql=txtsql & "'" & date_ordo & "',"
txtsql=txtsql & " " & no_semaine_ordo & ","
txtsql=txtsql & "'" & date_piece & "',"
txtsql=txtsql & " " & rvp(montant) & ","
txtsql=txtsql & " 0,"
txtsql=txtsql & "'VALIDE',"
txtsql=txtsql & "'" & trim(session("matricule")) & "',"
txtsql=txtsql & "'" & dh_courante & "',"
if cle_courrier<>"0" then txtsql=txtsql & " 0," else txtsql=txtsql & " 1,"' manu=1 si pas de courrier, sinon 0
txtsql=txtsql & "'" & commentaire & "',"
txtsql=txtsql & " " & cle_courrier & ","
txtsql=txtsql & " " & avectva & ","
txtsql=txtsql & " " & rvp(const_taux_tva1) & ","
txtsql=txtsql & " " & rvp(montant_tva1) & ","
txtsql=txtsql & " " & rvp(const_taux_tva2) & ","
txtsql=txtsql & " " & rvp(montant_tva2) & ","
txtsql=txtsql & " " & rvp(const_taux_tva3) & ","
txtsql=txtsql & " " & rvp(montant_tva3) & ","
txtsql=txtsql & " " & rvp(const_taux_tva4) & ","
txtsql=txtsql & " " & rvp(montant_tva4) & ")"
cle_prevision=exec_cde_sql_id(txtsql,dsncompta)

' Traçage
txtsql="INSERT INTO histo_actions_prev "
txtsql=txtsql & "(dh_action,action,auteur,societe,cle_prevision,new_statut,new_montant,new_date_echeance,new_rubrique_treso) VALUES (" 
txtsql=txtsql & "'" & dh_courante & "','CREA PREV RECETTTE EXTERNE'," & session("matricule") & ",'" & societe & "'," & cle_prevision & ",'VALIDE'," & rvp(montant) & ",'" & date_echeance & "','" & libelle_rubrique & "')"
exec_cde_sql txtsql,dsncompta

' MAJ du courrier (si clé courrier existe)
if cle_courrier<>"0" then
	txtsql="UPDATE courrier SET cle_prevision=" & cle_prevision & ", "
	txtsql=txtsql & "statut='TRAITE', "
	txtsql=txtsql & "dh_statut=getdate(), "
	txtsql=txtsql & "auteur_statut=" & session("matricule") & ", "
	txtsql=txtsql & "action='AUCUNE' "
	txtsql=txtsql & "WHERE cle=" & cle_courrier
	exec_cde_sql txtsql,dsnivoo
end if

' Redirection
response.redirect("tresor_menu.asp")
%>
