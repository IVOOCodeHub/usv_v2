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
dh_courante=date & " " & time
cle=trim(request.form("cle"))
societe=trim(request.form("societe"))
date_echeance=trim(request.form("date_echeance")) : no_semaine_echeance=datepart("ww",date_echeance)
date_ordo=trim(request.form("date_ordo")) : no_semaine_ordo=datepart("ww",date_ordo)
no_compte_banque=trim(request.form("no_compte_banque"))
montant=rvp(trim(request.form("montant")))
statut_saisi=trim(request.form("statut"))
mode_reglement=trim(request.form("mode_reglement"))
newprev=trim(request.form("newprev"))
montant2=rvp(trim(request.form("montant2")))
libelle1=trim(request.form("libelle1"))
libelle2=trim(request.form("libelle2"))
libelle3=trim(request.form("libelle3"))
libelle4=trim(request.form("libelle4"))
beneficiaire=trim(request.form("beneficiaire"))
libelle=libelle1 & " " & libelle2 & " " & libelle4 & "T" & libelle3 & " " & beneficiaire
action="MODIFIER"
reference_paiement=0 ' par défaut, sera changé en cas de prévision ordonnancée avec création de paiement
avec_tva=request.form("avec_tva")
taux_tva1=request.form("taux_tva1") : if trim(taux_tva1)="" or isnull(taux_tva1) or not isnumeric(taux_tva1) or taux_tva1="0" then taux_tva1=const_taux_tva1
taux_tva2=request.form("taux_tva2") : if trim(taux_tva2)="" or isnull(taux_tva2) or not isnumeric(taux_tva2) or taux_tva2="0" then taux_tva2=const_taux_tva2
taux_tva3=request.form("taux_tva3") : if trim(taux_tva3)="" or isnull(taux_tva3) or not isnumeric(taux_tva3) or taux_tva3="0" then taux_tva3=const_taux_tva3
taux_tva4=request.form("taux_tva4") : if trim(taux_tva4)="" or isnull(taux_tva4) or not isnumeric(taux_tva4) or taux_tva4="0" then taux_tva4=const_taux_tva4
montant_tva1=request.form("montant_tva1")
montant_tva2=request.form("montant_tva2")
montant_tva3=request.form("montant_tva3")
montant_tva4=request.form("montant_tva4")



' Prochain statut (en fonction du statut saisi par l'utilisateur et du mode de paiement "PRELEV","TRAITE","VIR","CHEQUE","CB","CPTE_COUR","NC","NET_ENTREPRISE")
select case statut_saisi
	case "VALIDE"
		statut_prevision="VALIDE"
		statut_paiement=""				' on reste au même stade à valider donc pas de paiement à créer
	case "ORDO"
		select case mode_reglement
			case "PRELEV","TRAITE","CB"	' normalement on a jamais de prévision à ordonnancer pour les CB puisque les prévisions CB sont directement au statut ENGAGE dès la création
				statut_prevision="ENGAGE"
				statut_paiement="ENGAGE"
			case "VIR","CHEQUE"
				statut_prevision="ORDO"
				statut_paiement="A EMETTRE"
			case else
				statut_prevision="ENGAGE"
				statut_paiement="ENGAGE"
		end select	
	case "REJETE"
		statut_prevision="REJETE"
		statut_paiement=""				' prévisions rejetée donc pas de paiement à créer
	case "LITIGE"
		statut_prevision="LITIGE"
		statut_paiement=""				' prévisions litigieuse donc pas de paiement à créer
end select

' TVA
montant_tva="0"  'RF faire paraitre tva 20-10-2022
if avec_tva then ' présence TVA oui
	if montant_tva1="" then montant_tva1="0"
	if montant_tva2="" then montant_tva2="0"
	if montant_tva3="" then montant_tva3="0"
	if montant_tva4="" then montant_tva4="0"
	montant_tva=FormatNumber(CDbl(Replace(montant_tva1,".",","))+CDbl(Replace(montant_tva2,".",","))+CDbl(Replace(montant_tva3,".",","))+CDbl(Replace(montant_tva4,".",",")), 2,-1,0,0)  'RF faire paraitre tva 20-10-2022, formule verifie
	montant_tva=Replace(montant_tva,",",".") 'RF 31/10 supprime espace sur 1 200.00 => 1200.00 FormatNumber completely used
	
else ' présence TVA non
	montant_tva1="0"
	montant_tva2="0"
	montant_tva3="0"
	montant_tva4="0"
end if ' présence TVA ?

' Lecture old data
txtsql="SELECT societe,statut,credit,date_echeance,cle_rubrique_treso,rubrique_treso,ref_source_tiers,libelle_compte_tiers,no_compte_tiers,libelle_ecriture,cle_courrier FROM previsions WHERE cle=" & cle
set dataprev = server.createobject("adodb.recordset")
dataprev.activeconnection = dsncompta
dataprev.source = txtsql
dataprev.Open()
old_societe=trim(dataprev("societe"))
old_statut=trim(dataprev("statut"))
old_montant=rvp(trim(dataprev("credit")))
old_date_echeance=trim(dataprev("date_echeance"))
old_cle_rubrique_treso=trim(dataprev("cle_rubrique_treso"))
old_rubrique_treso=trim(dataprev("rubrique_treso"))
old_ref_source_tiers=trim(dataprev("ref_source_tiers"))
old_libelle_compte_tiers=trim(" " & dataprev("libelle_compte_tiers"))
old_no_compte_tiers=trim(dataprev("no_compte_tiers"))
old_libelle_ecriture=trim("" & dataprev("libelle_ecriture"))
old_cle_courrier=trim(dataprev("cle_courrier")) : if old_cle_courrier="" then old_cle_courrier="0"
dataprev.Close()

' Lecture bic et iban source (banque payant)
txtsql="SELECT iban, bic, nom_banque FROM banques_comptes_societes WHERE no_compte='" & no_compte_banque & "'"
set dataibansrc = server.createobject("adodb.recordset")
dataibansrc.activeconnection = dsnpartenaires
dataibansrc.source = txtsql
dataibansrc.open()
if dataibansrc.eof then 
	iban_source="NC" 
	bic_source="NC"
	nom_banque_source="NC"
else 
	iban_source=dataibansrc("iban")
	bic_source=dataibansrc("bic")
	nom_banque_source=dataibansrc("nom_banque")
end if
dataibansrc.close()

' Lecture bic et iban cible (destinataire du virement)
txtsql="SELECT iban,bic FROM fournisseurs WHERE code=" & old_ref_source_tiers
set dataibancibl = server.createobject("adodb.recordset")
dataibancibl.activeconnection = dsnpartenaires
dataibancibl.source = txtsql
dataibancibl.open()
if dataibancibl.eof then 
	iban_cible="NC" 
	bic_cible="NC"
else 
	iban_cible=dataibancibl("iban")
	bic_cible=dataibancibl("bic")
end if
dataibancibl.close()

reference_paiement="0"
if statut_saisi="ORDO" and old_statut="VALIDE" then ' création ordre de paiement oui
	action="ORDONNANCER"
	no_compte_general=donne_no_compte_generalrs(old_ref_source_tiers)
	txtsql="INSERT INTO paiements (dh_creation,societe,cle_prevision,ref_source_tiers,no_compte_general,libelle_tiers,cle_rubrique,rubrique,libelle,cle_courrier,date_echeance,"
	'txtsql=txtsql & "mode_paiement,montant,no_compte_banque,iban_source,bic_source,nom_banque_source,statut,dh_statut,auteur_statut,iban_cible,bic_cible,code_journal) VALUES ("
	txtsql=txtsql & "mode_paiement,montant,montant_tva,no_compte_banque,iban_source,bic_source,nom_banque_source,statut,dh_statut,auteur_statut,iban_cible,bic_cible,code_journal) VALUES ("  'RF faire paraitre tva 20-10-2022
	txtsql=txtsql & "'" & dh_courante & "',"
	txtsql=txtsql & "'" & old_societe & "',"
	txtsql=txtsql & " " & cle & ","
	txtsql=txtsql & " " & old_ref_source_tiers & ","
	txtsql=txtsql & "'" & no_compte_general & "',"
	txtsql=txtsql & "'" & old_libelle_compte_tiers & "',"
	txtsql=txtsql & " " & old_cle_rubrique_treso & ","
	txtsql=txtsql & "'" & old_rubrique_treso & "',"
	txtsql=txtsql & "'" & old_libelle_ecriture & "',"
	txtsql=txtsql & " " & old_cle_courrier & ","
	txtsql=txtsql & "'" & date_ordo & "',"
	txtsql=txtsql & "'" & mode_reglement & "',"
	txtsql=txtsql & " " & montant & ","
	txtsql=txtsql & " " & montant_tva & ","   'RF faire paraitre tva 20-10-2022
	txtsql=txtsql & "'" & no_compte_banque & "',"
	txtsql=txtsql & "'" & iban_source & "',"
	txtsql=txtsql & "'" & bic_source & "',"
	txtsql=txtsql & "'" & nom_banque_source & "',"
	txtsql=txtsql & "'" & statut_paiement & "',"
	txtsql=txtsql & "'" & dh_courante & "',"
	txtsql=txtsql & " " & session("matricule") & ","
	txtsql=txtsql & "'" & iban_cible & "',"
	txtsql=txtsql & "'" & bic_cible & "',"
	txtsql=txtsql & "'PREV')"
	reference_paiement=exec_cde_sql_id(txtsql,dsncompta)
	' MAJ du courrier
	txtsql="UPDATE courrier SET cle_paiement=" & reference_paiement & " WHERE cle=" & old_cle_courrier
	exec_cde_sql txtsql,dsnivoo
	maj_cles_courrier old_cle_courrier
end if ' création ordre de paiement ?

' MAJ de la prévison
txtsql="UPDATE previsions SET "
txtsql=txtsql & "mode_reglement='" & mode_reglement & "',"
txtsql=txtsql & "statut='" & statut_prevision & "',"
txtsql=txtsql & "auteur_statut=" & trim(session("matricule")) & ","
txtsql=txtsql & "dh_statut='" & date & " " & time & "',"
txtsql=txtsql & "date_echeance='" & date_echeance & "',"
txtsql=txtsql & "no_semaine_echeance=" & no_semaine_echeance & ","
txtsql=txtsql & "date_ordo='" & date_ordo & "',"
txtsql=txtsql & "no_semaine_ordo=" & no_semaine_ordo & ","
txtsql=txtsql & "reference_paiement=" & reference_paiement & ", "
txtsql=txtsql & "no_compte_banque='" & no_compte_banque & "',"
txtsql=txtsql & "credit=" & montant & ", "							' credit prev
txtsql=txtsql & "taux_tva1=" & rvp(taux_tva1) & ", "
txtsql=txtsql & "montant_tva1=" & rvp(montant_tva1) & ", "
txtsql=txtsql & "taux_tva2=" & rvp(taux_tva2) & ", "
txtsql=txtsql & "montant_tva2=" & rvp(montant_tva2) & ", "
txtsql=txtsql & "taux_tva3=" & rvp(taux_tva3) & ", "
txtsql=txtsql & "montant_tva3=" & rvp(montant_tva3) & ", "
txtsql=txtsql & "taux_tva4=" & rvp(taux_tva4) & ", "
txtsql=txtsql & "montant_tva4=" & rvp(montant_tva4) & ", "
txtsql=txtsql & "marque=0, "
txtsql=txtsql & "mat_mark=0 "
txtsql=txtsql & "WHERE cle=" & cle
exec_cde_sql txtsql,dsncompta

' Traçage
txtsql="INSERT INTO histo_actions_prev "
txtsql=txtsql & "(dh_action,action,auteur,societe,cle_prevision,reference_paiement,old_statut,new_statut,old_montant,new_montant,old_date_echeance,new_date_echeance,old_rubrique_treso,new_rubrique_treso) VALUES (" 
txtsql=txtsql & "'" & dh_courante & "','" & action & "'," & session("matricule") & ",'" & societe & "'," & cle & "," & reference_paiement & ",'" & old_statut & "','" & statut_prevision & "'," & old_montant & "," & montant & ",'" & old_date_echeance & "','" & date_echeance & "','" & old_rubrique_treso & "','" & rubrique & "')"
exec_cde_sql txtsql,dsncompta

' redirection vers prévisions à valider ou vers duplication de prévision
' y a t'il encore des prévisions à traiter dans le lot
txtsql="SELECT TOP 1 cle,cle_courrier FROM previsions WHERE marque=1 AND mat_mark=" & session("matricule") & " ORDER BY cle"
set traitelot = Server.CreateObject("ADODB.Recordset")
traitelot.ActiveConnection = dsncompta
traitelot.Source = txtsql
traitelot.Open()
if traitelot.eof then 
	cle_suivante=0 
else 
	cle_suivante=traitelot("cle")
	cle_courrier=traitelot("cle_courrier")
end if
traitelot.Close()

' redirection
if cle_suivante<>0 then ' une autre prévision en traitement par lot oui
	url_retour_lot="compta_modif_ordopaimanu0.asp?cle=" & cle_suivante & "&cle_courrier=" & cle_courrier
	response.redirect(url_retour_lot)
else ' une autre prévision en traitement par lot non
	response.redirect("compta_vir_menu.asp")
end if ' une autre prévision en traitement par lot  

%>