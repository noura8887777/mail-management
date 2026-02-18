import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ListCourriers from './components/GestionCourriers/ListeCourriers';
import AjouterCourrier from './components/GestionCourriers/AjouterCourrier';
import NotFound from './components/notFound';
import DetailCourrier from './components/GestionCourriers/DetailCourrier';
import UpdateCourrier from './components/GestionCourriers/UpdateCourrier';
import ListStatuts from './components/statuts/ListStatuts';
import DetailStatut from './components/statuts/DetailStatut';
import AjouterStatuts from './components/statuts/AjouterStatuts';
import UpdateStatut from './components/statuts/UpdateStatut';
import AffectationCourriers from './components/gestion affectation/AffectationCourriers';
import ReponseCourriers from './components/gestion affectation/ReponseCourriers';
import UpdateReponse from './components/gestion affectation/UpdateReponse';
function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ListCourriers />} />
                <Route path="/ajouter" element={<AjouterCourrier />} />
                <Route path="*" element={<NotFound />} />
                <Route path="courriers/:id" element={<DetailCourrier />} />
                <Route path="/courriers/:id/edit" element={<UpdateCourrier />} />
                <Route path="/statuts" element={<ListStatuts/>} />
                <Route path='/statuts/:id' element={<DetailStatut/>}/>
                <Route path="/ajouterStatut" element={<AjouterStatuts />} />
                <Route path='/statut/:id/edit' element={<UpdateStatut />} />
                <Route path='/affectation/:id' element={<AffectationCourriers/>}/>
                <Route path='/courriers/:id/reponse' element={<ReponseCourriers/>}/>
                <Route path="/courriers/:id/reponses" element={<ListeReponses />} />
                <Route path="/reponse/:id/edit" element={<UpdateReponse/>} />
            </Route>
        </Routes>
    );
}

export default App;