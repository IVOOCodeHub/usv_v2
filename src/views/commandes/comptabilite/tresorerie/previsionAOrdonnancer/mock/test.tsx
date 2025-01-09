

///////////////////
<div className="coordonnees-container">
<section className='tab-panel'>
	<h2>Responsable</h2>
	<div className='form-container'>
		<label>
			Civilité :
			<select
				value={tiersData.civilite_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('civilite_responsable', e.target.value)}
			>
				<option value='M.'>M.</option>
				<option value='Mme'>Mme</option>
			</select>
		</label>
		<label>
			Nom :
			<input
				type='text'
				value={tiersData.nom_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('nom_responsable', e.target.value)}
			/>
		</label>
		<label>
			Téléphone :
			<input
				type='text'
				value={tiersData.telephone_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('telephone_responsable', e.target.value)}
			/>
		</label>
		<label>
			Mobile :
			<input
				type='text'
				value={tiersData.mobile_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('mobile_responsable', e.target.value)}
			/>
		</label>
		<label>
			Fax :
			<input
				type='text'
				value={tiersData.fax_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('fax_responsable', e.target.value)}
			/>
		</label>
		<label>
			Email :
			<input
				type='email'
				value={tiersData.email_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('email_responsable', e.target.value)}
			/>
		</label>
		<label>
			Site Web :
			<input
				type='text'
				value={tiersData.site_web ?? 'NC'}
				onChange={(e) => handleInputChange('site_web', e.target.value)}
			/>
		</label>
		<label>
			Identifiant Site :
			<input
				type='text'
				value={tiersData.identifiant_site ?? 'NC'}
				onChange={(e) => handleInputChange('identifiant_site', e.target.value)}
			/>
		</label>
		<label>
			MDP Site :
			<input
				type='text'
				value={tiersData.mdf_site ?? 'NC'}
				onChange={(e) => handleInputChange('mdf_site', e.target.value)}
			/>
		</label>
	</div>
</section>

<section className='tab-panel'>
	<h2>Contact I</h2>
	<div className='form-container'>
		<label>
			Civilité :
			<select
				value={tiersData.civilite_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('civilite_responsable', e.target.value)}
			>
				<option value='M.'>M.</option>
				<option value='Mme'>Mme</option>
			</select>
		</label>
		<label>
			Nom :
			<input
				type='text'
				value={tiersData.nom_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('nom_responsable', e.target.value)}
			/>
		</label>
		<label>
			Téléphone :
			<input
				type='text'
				value={tiersData.telephone_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('telephone_responsable', e.target.value)}
			/>
		</label>
		<label>
			Mobile :
			<input
				type='text'
				value={tiersData.mobile_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('mobile_responsable', e.target.value)}
			/>
		</label>
		<label>
			Fax :
			<input
				type='text'
				value={tiersData.fax_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('fax_responsable', e.target.value)}
			/>
		</label>
		<label>
			Email :
			<input
				type='email'
				value={tiersData.email_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('email_responsable', e.target.value)}
			/>
		</label>
	</div>
</section>

<section className='tab-panel'>
	<h2>Contact II</h2>
	<div className='form-container'>
		<label>
			Civilité :
			<select
				value={tiersData.civilite_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('civilite_responsable', e.target.value)}
			>
				<option value='M.'>M.</option>
				<option value='Mme'>Mme</option>
			</select>
		</label>
		<label>
			Nom :
			<input
				type='text'
				value={tiersData.nom_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('nom_responsable', e.target.value)}
			/>
		</label>
		<label>
			Téléphone :
			<input
				type='text'
				value={tiersData.telephone_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('telephone_responsable', e.target.value)}
			/>
		</label>
		<label>
			Mobile :
			<input
				type='text'
				value={tiersData.mobile_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('mobile_responsable', e.target.value)}
			/>
		</label>
		<label>
			Fax :
			<input
				type='text'
				value={tiersData.fax_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('fax_responsable', e.target.value)}
			/>
		</label>
		<label>
			Email :
			<input
				type='email'
				value={tiersData.email_responsable ?? 'NC'}
				onChange={(e) => handleInputChange('email_responsable', e.target.value)}
			/>
		</label>
	</div>
</section>
</div>
///////////////////
<div className='tab-panel'>
							<h2>Coordonnées</h2>
							<div className='form-container'>
								<label>
									Société :
									<input
										type='text'
										value={tiersData.societe ?? 'NC'}
										onChange={(e) => handleInputChange('societe', e.target.value)}
									/>
								</label>
								<label>
									Activité :
									<input
										type='text'
										value={tiersData.activite ?? 'NC'}
										onChange={(e) => handleInputChange('activite', e.target.value)}
									/>
								</label>
								<label>
									Rubrique :
									<input
										type='text'
										value={tiersData.rubrique_tresorerie ?? 'NC'}
										onChange={(e) => handleInputChange('rubrique_tresorerie', e.target.value)}
									/>
								</label>
								<label>
									APE :
									<input
										type='text'
										value={tiersData.ape ?? 'NC'}
										onChange={(e) => handleInputChange('ape', e.target.value)}
									/>
								</label>
								<label>
									SIRET :
									<input
										type='text'
										value={tiersData.siret ?? 'NC'}
										onChange={(e) => handleInputChange('siret', e.target.value)}
									/>
								</label>
								<label>
									Forme juridique :
									<select
										value={tiersData.forme_juridique ?? 'NC'}
										onChange={(e) => handleInputChange('forme_juridique', e.target.value)}
									>
										<option value='SARL'>SARL</option>
										<option value='SAS'>SAS</option>
										<option value='SA'>SA</option>
									</select>
								</label>
								<label>
									Rue :
									<input
										type='text'
										value={tiersData.rue ?? 'NC'}
										onChange={(e) => handleInputChange('rue', e.target.value)}
									/>
								</label>
								<label>
									Complément :
									<input
										type='text'
										value={tiersData.complement ?? 'NC'}
										onChange={(e) => handleInputChange('complement', e.target.value)}
									/>
								</label>
								<label>
									CP & Ville :
									<input type='text' value={`${tiersData.code_postal ?? 'NC'} ${tiersData.ville ?? 'NC'}`} readOnly />
								</label>
								<label>
									Pays :
									<input
										type='text'
										value={tiersData.pays ?? 'NC'}
										onChange={(e) => handleInputChange('pays', e.target.value)}
									/>
								</label>
                </div>
                </div>
								<label>
									Civilité Responsable :
									<select
										value={tiersData.civilite_responsable ?? 'NC'}
										onChange={(e) => handleInputChange('civilite_responsable', e.target.value)}
									>
										<option value='M.'>M.</option>
										<option value='Mme'>Mme</option>
									</select>
								</label>
								<label>
									Nom Responsable :
									<input
										type='text'
										value={tiersData.nom_responsable ?? 'NC'}
										onChange={(e) => handleInputChange('nom_responsable', e.target.value)}
									/>
								</label>
								<label>
									Téléphone Responsable :
									<input
										type='text'
										value={tiersData.telephone_responsable ?? 'NC'}
										onChange={(e) => handleInputChange('telephone_responsable', e.target.value)}
									/>
								</label>
								<label>
									Mobile Responsable :
									<input
										type='text'
										value={tiersData.mobile_responsable ?? 'NC'}
										onChange={(e) => handleInputChange('mobile_responsable', e.target.value)}
									/>
								</label>
								<label>
									Fax Responsable :
									<input
										type='text'
										value={tiersData.fax_responsable ?? 'NC'}
										onChange={(e) => handleInputChange('fax_responsable', e.target.value)}
									/>
								</label>
								<label>
									Email Responsable :
									<input
										type='email'
										value={tiersData.email_responsable ?? 'NC'}
										onChange={(e) => handleInputChange('email_responsable', e.target.value)}
									/>
								</label>
								<label>
									Site Web :
									<input
										type='text'
										value={tiersData.site_web ?? 'NC'}
										onChange={(e) => handleInputChange('site_web', e.target.value)}
									/>
								</label>
								<label>
									Identifiant Site :
									<input
										type='text'
										value={tiersData.identifiant_site ?? 'NC'}
										onChange={(e) => handleInputChange('identifiant_site', e.target.value)}
									/>
								</label>
								<label>
									MDP Site :
									<input
										type='text'
										value={tiersData.mdf_site ?? 'NC'}
										onChange={(e) => handleInputChange('mdf_site', e.target.value)}
									/>
								</label>
								<label>
									Civilité Contact I :
									<select
										value={tiersData.civilite_contact1 ?? 'NC'}
										onChange={(e) => handleInputChange('civilite_contact1', e.target.value)}
									>
										<option value='M.'>M.</option>
										<option value='Mme'>Mme</option>
									</select>
								</label>
								<label>
									Nom Contact I :
									<input
										type='text'
										value={tiersData.nom_contact1 ?? 'NC'}
										onChange={(e) => handleInputChange('nom_contact1', e.target.value)}
									/>
								</label>
								<label>
									Téléphone Contact I :
									<input
										type='text'
										value={tiersData.telephone_contact1 ?? 'NC'}
										onChange={(e) => handleInputChange('telephone_contact1', e.target.value)}
									/>
								</label>
								<label>
									Mobile Contact I :
									<input
										type='text'
										value={tiersData.mobile_contact1 ?? 'NC'}
										onChange={(e) => handleInputChange('mobile_contact1', e.target.value)}
									/>
								</label>
								<label>
									Fax Contact I :
									<input
										type='text'
										value={tiersData.fax_contact1 ?? 'NC'}
										onChange={(e) => handleInputChange('fax_contact1', e.target.value)}
									/>
								</label>
								<label>
									Email Contact I :
									<input
										type='email'
										value={tiersData.email_contact1 ?? 'NC'}
										onChange={(e) => handleInputChange('email_contact1', e.target.value)}
									/>
								</label>
								<label>
									Civilité Contact II :
									<select
										value={tiersData.civilite_contact2 ?? 'NC'}
										onChange={(e) => handleInputChange('civilite_contact2', e.target.value)}
									>
										<option value='M.'>M.</option>
										<option value='Mme'>Mme</option>
									</select>
								</label>
								<label>
									Nom Contact II :
									<input
										type='text'
										value={tiersData.nom_contact2 ?? 'NC'}
										onChange={(e) => handleInputChange('nom_contact2', e.target.value)}
									/>
								</label>
								<label>
									Téléphone Contact II :
									<input
										type='text'
										value={tiersData.telephone_contact2 ?? 'NC'}
										onChange={(e) => handleInputChange('telephone_contact2', e.target.value)}
									/>
								</label>
								<label>
									Mobile Contact II :
									<input
										type='text'
										value={tiersData.mobile_contact2 ?? 'NC'}
										onChange={(e) => handleInputChange('mobile_contact2', e.target.value)}
									/>
								</label>
								<label>
									Fax Contact II :
									<input
										type='text'
										value={tiersData.fax_contact2 ?? 'NC'}
										onChange={(e) => handleInputChange('fax_contact2', e.target.value)}
									/>
								</label>
								<label>
									Email Contact II :
									<input
										type='email'
										value={tiersData.email_contact2 ?? 'NC'}
										onChange={(e) => handleInputChange('email_contact2', e.target.value)}
									/>
								</label>
							</div>
						</div>