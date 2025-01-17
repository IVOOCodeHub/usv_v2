import React, { useEffect, useState } from 'react';
import Header from '../../../../../components/header/Header.tsx';
import Nrtl from '../../../../../components/NRTL/NRTL';
import { getCourrierDepensesService } from '../../../../../API/services/Courrier.service.ts';
import { IUserCredentials } from '../../../../../utils/types/user.interface.ts';

// Mocked data for courriers (based on the screenshot)
const mockedCourriers = [
    ['52871', '09/10/2023', 'IVOO', 'NOTE DE FRAIS', '148,20€ / note de frais / ANIQUANT N / CHQ...'],
    ['52869', '09/10/2023', 'ONE DIRECT SERVICES', 'FACTUREF', '1805.94 € / facture NF FP23040912'],
    ['52862', '09/10/2023', 'IVOO', 'FACTUREC', '33170.15 € / facture NF 1108'],
    ['52861', '09/10/2023', 'IVOO', 'FACTUREC', '54736.34 € / facture NF 1109'],
    ['52860', '09/10/2023', 'IVOO', 'FACTUREC', 'facture NF 1110'],
    ['52859', '09/10/2023', 'IVOS', 'CHEQUE EMIS', '94.84€ CHQ 0000100 / facture NF F2303082...'],
    ['52858', '09/10/2023', 'IVOO', 'FACTUREC', '39024.89 € / facture NF 1111'],
    ['52852', '09/10/2023', 'ENGIE', 'FACTUREF', '2027.82 € / facture NF 420065235194'],
    ['52850', '09/10/2023', 'SBL BNC', 'FACTUREF', '90 € / facture F23/34'],
    ['52848', '09/10/2023', 'SBL BNC', 'FACTUREF', '90 € / facture F23/33'],
];

interface ModalCourriersProps {
    isOpen: boolean;
    onClose: () => void;
    userCredentials: IUserCredentials | null; // Allow null for mocked data
    previsionCode: string; // Code de la prévision passé en paramètre
}

const ModalCourriers: React.FC<ModalCourriersProps> = ({ isOpen, onClose, userCredentials, previsionCode }) => {
    const [courriers, setCourriers] = useState<string[][]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
            const fetchCourriers = async () => {
                setIsLoading(true);

                try {
                    // Attempt to fetch data from the API
                    if (userCredentials) {
                        const response = await getCourrierDepensesService(userCredentials);
                        if (typeof response === 'string') {
                            console.error('Erreur lors de la récupération des courriers :', response);
                            // Fallback to mocked data if API fails
                            setCourriers(mockedCourriers);
                        } else {
                            setCourriers(
                                response.map((courrier) => [
                                    courrier.index,
                                    courrier.dhSaisie,
                                    courrier.societeEmettrice,
                                    courrier.nature,
                                    courrier.commentaire,
                                ])
                            );
                        }
                    } else {
                        // Use mocked data if userCredentials is null (offline mode)
                        setCourriers(mockedCourriers);
                    }
                } catch (error) {
                    console.error('Erreur lors de la récupération des courriers :', error);
                    // Fallback to mocked data if API call fails
                    setCourriers(mockedCourriers);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchCourriers();
        }

        return () => {
            document.body.classList.remove('no-scroll'); // Suppression de la classe au démontage
        };
    }, [isOpen, userCredentials]);

    if (!isOpen) return null;

    const tableData = {
        tableHead: ['Clé', 'Date réception', 'Émetteur', 'Nature', 'Commentaire'],
        tableBody: courriers,
    };

    const handleRowClick = (index: number, rowData: string[] | undefined) => {
        console.log('Row clicked:', rowData, 'Prevision Code:', previsionCode);
        // Logique future pour associer un courrier à la prévision
    };

    return (
        <div className='modal'>
            <div className='modalContent'>
                {isLoading ? (
                    <p>Chargement...</p>
                ) : (
                    <>
                        <div className='modal-header'>
                            <Header props={{ pageURL: 'GIVOO | TRÉSORERIE | LISTE DES COURRIERS' }} />
                            <button className='modalCloseButton' onClick={onClose}>
                                X
                            </button>
                        </div>
                        <Nrtl
                            datas={tableData}
                            headerBackgroundColor='linear-gradient(to left, #84CDE4FF, #1092B8)'
                            headerHoverBackgroundColor='#1092B8'
                            showItemsPerPageSelector={true}
                            showPreviousNextButtons={true}
                            showSearchBar={true}
                            filterableColumns={[false, false, true, true, true, true, false]}
                            showPagination={true}
                            enableColumnSorting={true}
                            itemsPerPageOptions={[10, 25, 50]}
                            onRowClick={handleRowClick}
                            language='fr'
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ModalCourriers;