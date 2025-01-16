//  types
import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// views
import NouveauxCourriersWithAuth from "./nouveauxCourriers/NouveauxCourriers.tsx";
import NouveauxCourriersTraitementWithAuth from "./nouveauxCourriersTraitement/NouveauxCourriersTraitement.tsx";
import CourrierADistribuerWithAuth from "./courrierADistribuer/CourrierADistribuer.tsx";
import CourrierDistributionWithAuth from "./courrierDistribution/CourrierDistribution.tsx";
import TraiterMesCourriersWithAuth from "./traiterMesCourriers/TraiterMesCourriers.tsx";
import GererMesCourriersWithAuth from "./gererMesCourriers/GererMesCourriers.tsx";
import CourrierUtilsWithAuth from "./courrierUtils/CourrierUtils.tsx";
import GererProfilDeDistributionWithAuth from "./gererProfilDeDistribution/GererProfilDeDistribution.tsx";
import ModifProfilDistributionWithAuth from "./modifProfilDistribution/ModifProfilDistribution.tsx";

export default function CourriersRouter(): ReactElement {
  return (
    <Routes>
        <Route path={"/nouveaux_courriers"} element={<NouveauxCourriersWithAuth />} />
        <Route path={"/nouveaux_courriers/nouveaux_courriers_traitement"} element={<NouveauxCourriersTraitementWithAuth />} />
        <Route path={"/courrier_a_distribuer"} element={<CourrierADistribuerWithAuth />} />
        <Route path={"/courrier_a_distribuer/:courrierID"} element={<CourrierDistributionWithAuth />} />
        <Route path={'/traiter_mes_courriers'} element={<TraiterMesCourriersWithAuth />} />
        <Route path={`/gerer_mes_courriers/:courrierID`} element={<GererMesCourriersWithAuth />} />
        <Route path={`/courrier_utils`} element={<CourrierUtilsWithAuth />} />
        <Route path={`/courrier_utils/gestion_des_profils_distribution`} element={<GererProfilDeDistributionWithAuth />} />
        <Route path={`/courrier_utils/modifier_profil_distribution/:profilID`} element={<ModifProfilDistributionWithAuth />} />
    </Routes>
  );
}
