import React, { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle, Clock, AlertCircle, Eye, X } from 'lucide-react';

const AdminRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        demande_recue: 0,
        paiement_envoye: 0,
        inscription_confirmee: 0,
        total: 0
    });
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedReg, setSelectedReg] = useState(null);

    useEffect(() => {
        fetchRegistrations();
    }, [filter]);

    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            const url = filter === 'all'
                ? '/api/get-registrations'
                : `/api/get-registrations?status=${filter}`;

            const response = await fetch(url);
            const result = await response.json();

            if (result.success) {
                setRegistrations(result.data);
                setStats(result.stats);
            }
        } catch (error) {
            console.error('Erreur chargement inscriptions:', error);
        } finally {
            setLoading(false);
        }
    };

    const confirmInscription = async (regId) => {
        if (!confirm('Confirmer cette inscription ?')) return;

        try {
            const response = await fetch('/api/update-registration-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    registration_id: regId,
                    new_status: 'inscription_confirmee'
                })
            });

            const result = await response.json();

            if (result.success) {
                alert('✅ Inscription confirmée ! Email envoyé au participant.');
                fetchRegistrations();
            } else {
                alert('❌ Erreur: ' + result.message);
            }
        } catch (error) {
            console.error('Erreur confirmation:', error);
            alert('❌ Erreur lors de la confirmation');
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            demande_recue: { bg: '#FEF3C7', color: '#92400E', icon: Clock, label: 'Demande reçue' },
            paiement_envoye: { bg: '#DBEAFE', color: '#1E40AF', icon: AlertCircle, label: 'Paiement envoyé' },
            inscription_confirmee: { bg: '#D1FAE5', color: '#065F46', icon: CheckCircle, label: 'Confirmé' }
        };

        const style = styles[status] || styles.demande_recue;
        const Icon = style.icon;

        return (
            <span style={{
                background: style.bg,
                color: style.color,
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
            }}>
                <Icon size={14} />
                {style.label}
            </span>
        );
    };

    const filteredRegistrations = registrations.filter(reg =>
        reg.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.whatsapp?.includes(searchTerm)
    );

    return (
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', color: '#0F172A', marginBottom: '1rem' }}>
                Gestion des Inscriptions
            </h1>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: '#FEF3C7', padding: '1.5rem', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#92400E', marginBottom: '0.5rem' }}>Demandes reçues</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#78350F' }}>{stats.demande_recue}</div>
                </div>
                <div style={{ background: '#DBEAFE', padding: '1.5rem', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#1E40AF', marginBottom: '0.5rem' }}>Paiements envoyés</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#1E3A8A' }}>{stats.paiement_envoye}</div>
                </div>
                <div style={{ background: '#D1FAE5', padding: '1.5rem', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#065F46', marginBottom: '0.5rem' }}>Confirmées</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#064E3B' }}>{stats.inscription_confirmee}</div>
                </div>
                <div style={{ background: '#F1F5F9', padding: '1.5rem', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.5rem' }}>Total</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A' }}>{stats.total}</div>
                </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                        type="text"
                        placeholder="Rechercher par nom, email, téléphone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 12px 12px 40px',
                            borderRadius: '8px',
                            border: '1px solid #CBD5E1',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '1rem',
                        background: 'white',
                        cursor: 'pointer'
                    }}
                >
                    <option value="all">Tous les statuts</option>
                    <option value="demande_recue">Demandes reçues</option>
                    <option value="paiement_envoye">Paiements envoyés</option>
                    <option value="inscription_confirmee">Confirmées</option>
                </select>
            </div>

            {/* Table */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                    Chargement...
                </div>
            ) : filteredRegistrations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                    Aucune inscription trouvée
                </div>
            ) : (
                <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Nom</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Contact</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Formation</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Statut</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Date</th>
                                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#475569' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRegistrations.map((reg) => (
                                <tr key={reg.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                                    <td style={{ padding: '1rem', color: '#0F172A', fontWeight: '500' }}>{reg.full_name}</td>
                                    <td style={{ padding: '1rem', color: '#475569', fontSize: '0.9rem' }}>
                                        <div>{reg.email || 'N/A'}</div>
                                        <div>{reg.whatsapp}</div>
                                    </td>
                                    <td style={{ padding: '1rem', color: '#475569', fontSize: '0.9rem' }}>
                                        <div>{reg.formation_type}</div>
                                        <div style={{ fontWeight: '600', color: '#0F172A' }}>{reg.price?.toLocaleString()} FCFA</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{getStatusBadge(reg.status)}</td>
                                    <td style={{ padding: '1rem', color: '#64748B', fontSize: '0.85rem' }}>
                                        {new Date(reg.created_at).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                            <button
                                                onClick={() => setSelectedReg(reg)}
                                                style={{
                                                    padding: '8px 12px',
                                                    background: '#F1F5F9',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    fontSize: '0.85rem',
                                                    color: '#475569'
                                                }}
                                            >
                                                <Eye size={14} /> Voir
                                            </button>
                                            {reg.status === 'paiement_envoye' && (
                                                <button
                                                    onClick={() => confirmInscription(reg.id)}
                                                    style={{
                                                        padding: '8px 12px',
                                                        background: '#10B981',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.85rem',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    ✓ Confirmer
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Detail Modal */}
            {selectedReg && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }} onClick={() => setSelectedReg(null)}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        maxWidth: '500px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, color: '#0F172A' }}>Détails de l'inscription</h3>
                            <button onClick={() => setSelectedReg(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} color="#64748B" />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '4px' }}>Nom complet</div>
                                <div style={{ fontSize: '1rem', color: '#0F172A', fontWeight: '600' }}>{selectedReg.full_name}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '4px' }}>Email</div>
                                <div style={{ fontSize: '1rem', color: '#0F172A' }}>{selectedReg.email || 'N/A'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '4px' }}>WhatsApp</div>
                                <div style={{ fontSize: '1rem', color: '#0F172A' }}>{selectedReg.whatsapp}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '4px' }}>Formation</div>
                                <div style={{ fontSize: '1rem', color: '#0F172A', fontWeight: '600' }}>{selectedReg.formation_type}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '4px' }}>Prix</div>
                                <div style={{ fontSize: '1.25rem', color: '#2563EB', fontWeight: '700' }}>{selectedReg.price?.toLocaleString()} FCFA</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '4px' }}>Statut</div>
                                <div>{getStatusBadge(selectedReg.status)}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '4px' }}>Date d'inscription</div>
                                <div style={{ fontSize: '1rem', color: '#0F172A' }}>
                                    {new Date(selectedReg.created_at).toLocaleString('fr-FR')}
                                </div>
                            </div>
                            {selectedReg.confirmed_at && (
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '4px' }}>Date de confirmation</div>
                                    <div style={{ fontSize: '1rem', color: '#0F172A' }}>
                                        {new Date(selectedReg.confirmed_at).toLocaleString('fr-FR')}
                                    </div>
                                </div>
                            )}
                        </div>

                        {selectedReg.status === 'paiement_envoye' && (
                            <button
                                onClick={() => {
                                    confirmInscription(selectedReg.id);
                                    setSelectedReg(null);
                                }}
                                style={{
                                    marginTop: '2rem',
                                    width: '100%',
                                    padding: '14px',
                                    background: '#10B981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                }}
                            >
                                ✓ Confirmer cette inscription
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRegistrations;
