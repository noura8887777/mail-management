import { createBrowserRouter } from 'react-router-dom';
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
import ListeReponses from './components/gestion affectation/ListeReponses';
import UpdateReponse from './components/gestion affectation/UpdateReponse';
const router = createBrowserRouter([
    {
                element: <Layout />,
                children:[
                    {
                        path: '/',
                        element: <ListCourriers />,
                    },
                    {
                        path: '/ajouter',
                        element: <AjouterCourrier />,
                    },
                    {
                        path: '/courriers/:id/edit',
                        element: <UpdateCourrier />,
                    },
                    {
                        path: 'courriers/:id',
                        element: <DetailCourrier />,
                    },
                    {
                        path: '*',
                        element:<NotFound/>
                    },
                    {
                        path: '/statuts',
                        element:<ListStatuts/>
                    },
                    {
                        path:'/statut/:id',
                        element:<DetailStatut/>
                    },
                    {
                        path:'/AjouterStatuts',
                        element:<AjouterStatuts/>
                    },
                    {
                        path:'/statut/:id/edit',
                        element:<UpdateStatut/>
                    },
                    {
                        path:'/affectations/:id',
                        element:<AffectationCourriers/>
                    },
                    {
                        path:'/courriers/:id/reponse',
                        element:<ReponseCourriers/>
                    },
                    {
                        path:"/courriers/:id/reponses",
                        element:<ListeReponses/>
                    },
                    {
                        path:"/reponse/:id/edit",
                        element:<UpdateReponse/>
                    }

                    
                ]
            },
    
    
]);

export default router;