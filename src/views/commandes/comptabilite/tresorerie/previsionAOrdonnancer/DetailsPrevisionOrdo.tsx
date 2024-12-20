import { useLocation } from 'react-router-dom'
import { useEffect, useState, useContext, ReactElement } from 'react'

const DetailsPrevisionOrdo = (): ReactElement => {
	const location = useLocation()
	const { rowData } = location.state || {}
	return (
		<div>
			<h2>
				Prévision {rowData[0]} pour {rowData[1]}
			</h2>
			<p>Date échéance : {rowData[1]}</p>
			<p>Libellé : {rowData[4]}</p>
			<p>Montant : {rowData[6]}</p>
		</div>
	)
}
export default DetailsPrevisionOrdo
