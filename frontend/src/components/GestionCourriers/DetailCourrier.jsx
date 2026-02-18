import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../Services/Api';
import "bootstrap-icons/font/bootstrap-icons.css";
const DetailCourrier = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [courrier, setCourrier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Suppression d'une affectation
    const supHandler = async (affectationId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette affectation ?")) {
            try {
                await api.delete(`/affectations/${affectationId}`);
                setCourrier(prev => ({
                    ...prev,
                    affectations: prev.affectations.filter(a => a.id !== affectationId)
                }));
            } catch (error) {
                setError('Erreur lors de la suppression');
            }
        }
    };

    // Téléchargement de fichier
    const handleDownload = async (fichierId) => {
        try {
            const response = await api.get(`/courriers/${fichierId}/fichier`, {
                responseType: 'blob'
            });
            
            const filename = response.headers['content-disposition']
                ?.split('filename=')[1]
                ?.replace(/"/g, '') || 'document.pdf';
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Erreur lors du téléchargement:", error);
            alert("Impossible de télécharger le fichier");
        }
    };

    // Chargement des données
    useEffect(() => {
        const fetchCourrier = async () => {
            try {
                const response = await api.get(`/courriers/${id}`, {
                    params: {
                        include: 'fichier,statuts,affectations.users'
                    }
                });
                
                if (response.data.success) {
                    setCourrier(response.data.data);
                } else {
                    setError(response.data.message || 'Erreur lors du chargement des données');
                }
            } catch (err) {
                console.error('Error:', err);
                setError(err.response?.data?.message || 'Erreur de connexion au serveur');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCourrier();
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
                <button 
                    className="btn btn-outline-secondary mt-3"
                    onClick={() => navigate('/')}
                >
                    <i className="bi bi-arrow-left me-1"></i> Retour à la liste
                </button>
            </div>
        );
    }

    if (!courrier) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning">
                    <i className="bi bi-exclamation-circle-fill me-2"></i>
                    Aucun courrier trouvé
                </div>
                <button 
                    className="btn btn-outline-secondary mt-3"
                    onClick={() => navigate('/')}
                >
                    <i className="bi bi-arrow-left me-1"></i> Retour à la liste
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-3" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            {/* En-tête avec titre rouge */}
            <div className="d-flex justify-content-between align-items-center mb-4 p-3" 
                style={{ 
                    backgroundColor: '#f8f9fa', 
                    borderRadius: '6px',
                    borderBottom: '3px solid #dc3545'
                }}>
                <h1 style={{ 
                    color: '#dc3545', 
                    margin: 0, 
                    fontSize: '1.8rem',
                    fontWeight: '600'
                }}>
                    <i className="bi bi-mailbox2 me-2"></i>Détails du courrier #{courrier.id}
                </h1>
                <div className="d-flex gap-2">
                    <button 
                        className="btn"
                        onClick={() => navigate('/')}
                        style={{ 
                            backgroundColor: '#6c757d', 
                            color: 'white',
                            border: 'none',
                            padding: '8px 15px'
                        }}
                    >
                        <i className="bi bi-arrow-left me-1"></i> Retour
                    </button>
                    <button 
                        className="btn"
                        onClick={() => navigate(`/courriers/${id}/edit`)}
                        style={{ 
                            backgroundColor: '#007bff', 
                            color: 'white',
                            border: 'none',
                            padding: '8px 15px'
                        }}
                    >
                        <i className="bi bi-pencil me-1"></i> Modifier
                    </button>
                    {courrier.type_courrier_id === 2 && courrier.idDepart === null && (
                        <button 
                            className="btn"
                            onClick={() => navigate(`/courriers/${id}/reponse`)}
                            style={{ 
                                backgroundColor: '#28a745', 
                                color: 'white',
                                border: 'none',
                                padding: '8px 15px'
                            }}
                        >
                            <i className="bi bi-reply me-1"></i> Réponse
                        </button>
                    )}
                </div>
            </div>

            {/* Informations Générales */}
            <div className="card mb-4 border-0 shadow-sm">
                <div className="card-header" style={{ 
                    backgroundColor: '#007bff', 
                    color: 'white'
                }}>
                    <h4 className="mb-0">
                        <i className="bi bi-info-circle me-2"></i>
                        Informations Générales
                    </h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="fw-bold">Numéro d'ordre:</label>
                                <p>{courrier.num_order_annuel}</p>
                            </div>
                            <div className="mb-3">
                                <label className="fw-bold">Date de lettre:</label>
                                <p>{new Date(courrier.date_lettre).toLocaleDateString()}</p>
                            </div>
                            <div className="mb-3">
                                <label className="fw-bold">Numéro de lettre:</label>
                                <p>{courrier.num_lettre}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="fw-bold">Type:</label>
                                <p>{courrier.type_courrier}</p>
                            </div>
                            <div className="mb-3">
                                <label className="fw-bold">Statut:</label>
                                <p>
                                    <span className={`badge ${courrier.statuts?.nom_statut === 'Terminé' ? 'bg-success' : 'bg-warning'}`}>
                                        {courrier.statuts?.nom_statut}
                                    </span>
                                </p>
                            </div>
                            <div className="mb-3">
                                <label className="fw-bold">Destinataire:</label>
                                <p>{courrier.designation_destinataire}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="fw-bold">Analyse de l'affaire:</label>
                        <div className="border p-3 bg-light">
                            {courrier.analyse_affaire}
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="border p-3 bg-light">
                        <Link  to={`/courriers/${courrier.id}/reponses`} className="btn btn-secondary btn-sm">
                                voir liste Reponse
                        </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Affectations */}
            <div className="card mb-4 border-0 shadow-sm">
                <div className="card-header" style={{ 
                    backgroundColor: '#007bff', 
                    color: 'white'
                }}>
                    <h4 className="mb-0">
                        <i className="bi bi-people me-2"></i>
                        Affectations
                    </h4>
                </div>
                <div className="card-body">
                    {!courrier.idDepart && courrier.affectations?.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Utilisateur</th>
                                        <th>Date affectation</th>
                                        <th>Durée réponse</th>
                                        <th>Répondu</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courrier.affectations.map((affectation) => (
                                        <tr key={affectation.id}>
                                            <td>{affectation.users?.name || 'Non assigné'}</td>
                                            <td>{new Date(affectation.created_at).toLocaleDateString()}</td>
                                            <td>{affectation.duree_reponse} jours</td>
                                            <td>
                                                <span className={`badge ${affectation.reponse ? 'bg-success' : 'bg-danger'}`}>
                                                    {affectation.reponse ? 'Oui' : 'Non'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    {affectation.fichier_id && (
                                                        <button 
                                                            className="btn btn-sm btn-info"
                                                            onClick={() => handleDownload(affectation.fichier_id)}
                                                        >
                                                            <i className="bi bi-download me-1"></i> Fichier
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => supHandler(affectation.id)}
                                                    >
                                                        <i className="bi bi-trash me-1"></i> Supprimer
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            Aucune affectation trouvée
                            <button 
                                className="btn btn-sm btn-primary ms-3"
                                onClick={() => navigate(`/affectation/${id}`)}
                            >
                                <i className="bi bi-plus-circle me-1"></i> Créer une affectation
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Fichier Joint */}
            {courrier.fichier && (
                <div className="card border-0 shadow-sm">
                    <div className="card-header" style={{ 
                        backgroundColor: '#007bff', 
                        color: 'white'
                    }}>
                        <h4 className="mb-0">
                            <i className="bi bi-file-earmark me-2"></i>
                            Fichier Joint
                        </h4>
                    </div>
                    <div className="card-body">
                        <button 
                            className="btn btn-primary"
                            onClick={() => handleDownload(courrier.fichier_id)}
                        >
                            <i className="bi bi-download me-2"></i> Télécharger le document
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailCourrier;