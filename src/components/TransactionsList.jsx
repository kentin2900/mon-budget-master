import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Search,
  Filter,
  Calendar,
  Tag,
  Edit2,
  Trash2,
  X,
  Save
} from 'lucide-react';

const TransactionsList = ({ transactions, categories, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [editingTx, setEditingTx] = React.useState(null);

  const filteredTransactions = transactions.filter(tx => 
    tx.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  const getCategoryName = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : 'Revenu';
  };

  const getCategoryColor = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.color : '#10b981';
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>Historique des Transactions</h2>
          <p className="text-muted">Consultez et gérez l'ensemble de vos opérations.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flex: '1', maxWidth: '400px', minWidth: '250px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Rechercher une transaction..." 
              className="glass-input"
              style={{ paddingLeft: '2.8rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="glass-panel" style={{ overflow: 'hidden', width: '100%' }}>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', minWidth: '650px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem' }}>DATE</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem' }}>DÉSIGNATION</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem' }}>CATÉGORIE</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'right', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem' }}>MONTANT</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="transaction-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.3s ease' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Calendar size={14} className="text-muted" />
                      <span style={{ fontSize: '0.85rem' }}>{new Date(tx.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{tx.title}</span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      padding: '0.4rem 0.8rem', 
                      borderRadius: '20px', 
                      background: `${getCategoryColor(tx.categoryId)}15`,
                      color: getCategoryColor(tx.categoryId),
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: getCategoryColor(tx.categoryId) }} />
                      {getCategoryName(tx.categoryId)}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-end', 
                      gap: '0.5rem',
                      color: tx.amount > 0 ? '#10b981' : 'white',
                      fontWeight: 'bold',
                      fontSize: '0.95rem'
                    }}>
                      {tx.amount > 0 ? (
                        <>
                          <ArrowUpRight size={16} />
                          +{tx.amount.toFixed(2)} €
                        </>
                      ) : (
                        <>
                          {tx.amount.toFixed(2)} €
                        </>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                      <button 
                        onClick={() => setEditingTx({...tx, amount: Math.abs(tx.amount)})} 
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem' }}
                        title="Modifier"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(tx.id)} 
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Aucune transaction trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingTx && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem'
        }}>
          <div className="glass-panel animate-fade-in" style={{ padding: '2rem', maxWidth: '400px', width: '100%' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Edit2 size={20} className="text-muted" />
              Modifier la transaction
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              onEdit({
                ...editingTx,
                amount: editingTx.type === 'expense' ? -Math.abs(parseFloat(editingTx.amount)) : Math.abs(parseFloat(editingTx.amount))
              });
              setEditingTx(null);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Désignation</label>
                <input 
                  type="text" className="glass-input" required
                  value={editingTx.title} onChange={e => setEditingTx({...editingTx, title: e.target.value})}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Montant</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="number" step="0.01" className="glass-input" required
                    style={{ paddingLeft: '2rem' }}
                    value={editingTx.amount} onChange={e => setEditingTx({...editingTx, amount: e.target.value})}
                  />
                  <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>€</span>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Date</label>
                <input 
                  type="date" className="glass-input" required
                  value={editingTx.date} onChange={e => setEditingTx({...editingTx, date: e.target.value})}
                />
              </div>
              {editingTx.categoryId && (
                <div>
                  <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Catégorie</label>
                  <select 
                    className="glass-input"
                    value={editingTx.categoryId}
                    onChange={e => setEditingTx({...editingTx, categoryId: e.target.value})}
                    style={{ appearance: 'none' }}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id} style={{ background: '#0f172a' }}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setEditingTx(null)} className="glass-button-outline" style={{ flex: 1 }}>Annuler</button>
                <button type="submit" className="glass-button" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                  <Save size={16} />
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default TransactionsList;
