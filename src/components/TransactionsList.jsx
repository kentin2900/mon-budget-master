import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Search,
  Filter,
  Calendar,
  Tag
} from 'lucide-react';

const TransactionsList = ({ transactions, categories }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

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

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th style={{ padding: '1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem' }}>DATE</th>
                <th style={{ padding: '1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem' }}>DÉSIGNATION</th>
                <th style={{ padding: '1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem' }}>CATÉGORIE</th>
                <th style={{ padding: '1.5rem', textAlign: 'right', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem' }}>MONTANT</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="transaction-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.3s ease' }}>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Calendar size={14} className="text-muted" />
                      <span style={{ fontSize: '0.9rem' }}>{new Date(tx.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{tx.title}</span>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
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
                  <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-end', 
                      gap: '0.5rem',
                      color: tx.amount > 0 ? '#10b981' : 'white',
                      fontWeight: 'bold',
                      fontSize: '1rem'
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
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Aucune transaction trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;
