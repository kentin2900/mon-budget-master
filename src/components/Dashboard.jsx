import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet,
  ShoppingCart,
  Zap,
  Home,
  Cigarette,
  Wifi,
  Gamepad2,
  Plus,
  RotateCcw,
  TrendingUp
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const iconMap = {
  ShoppingCart, Zap, Home, Cigarette, Wifi, Gamepad2
};

const Dashboard = ({ transactions, categories, salary, onAddTransaction, user }) => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [newAmount, setNewAmount] = React.useState('');
  const [newTitle, setNewTitle] = React.useState('');

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0) + (salary - 2500); 
  const actualIncome = salary; 
  const totalExpense = Math.abs(transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0));
  const balance = actualIncome - totalExpense;

  const expensesByCategory = categories.map(cat => {
    const spent = Math.abs(transactions
      .filter(t => t.categoryId === cat.id && t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0));
    return { ...cat, spent, percentage: cat.budget > 0 ? (spent / cat.budget) * 100 : 0 };
  }).sort((a, b) => b.spent - a.spent);

  const pieData = expensesByCategory.filter(c => c.spent > 0).map(c => ({
    name: c.name,
    value: c.spent,
    color: c.color
  }));

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const currentDay = today.getDate();
  const remainingDays = daysInMonth - currentDay;

  const unpaidFixed = expensesByCategory
    .filter(c => c.isFixed && c.spent < c.budget)
    .reduce((acc, c) => acc + c.budget, 0);

  const variableSpent = expensesByCategory
    .filter(c => !c.isFixed)
    .reduce((acc, c) => acc + c.spent, 0);
  
  const dailyAverage = currentDay > 0 ? variableSpent / currentDay : 0;
  const projectedVariable = dailyAverage * remainingDays;

  const projectedBalance = balance - unpaidFixed - projectedVariable;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newAmount || !selectedCategory) return;
    
    onAddTransaction({
      id: Date.now(),
      title: newTitle || (selectedCategory.isFixed ? `Paiement ${selectedCategory.name}` : `Dépense ${selectedCategory.name}`),
      amount: -parseFloat(newAmount),
      categoryId: selectedCategory.id,
      date: new Date().toISOString().split('T')[0],
      type: 'expense'
    });
    
    setSelectedCategory(null);
    setNewAmount('');
    setNewTitle('');
  };

  const handleReset = () => {
    if (window.confirm(`Voulez-vous vraiment effacer toutes les dépenses pour la catégorie ${selectedCategory.name} ?`)) {
      onAddTransaction({ type: 'reset_category', categoryId: selectedCategory.id });
      setSelectedCategory(null);
    }
  };

  const toggleFixedPaid = (cat) => {
    const isPaid = cat.spent >= cat.budget;
    if (isPaid) {
      // Find the transaction and delete it (passing a filter function to App)
      onAddTransaction({ type: 'delete_fixed', categoryId: cat.id });
    } else {
      // Create a transaction with the exact budget amount
      onAddTransaction({
        id: Date.now(),
        title: `Paiement ${cat.name}`,
        amount: -cat.budget,
        categoryId: cat.id,
        date: new Date().toISOString().split('T')[0],
        type: 'expense'
      });
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Modal Quick Add */}
      {selectedCategory && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem'
        }}>
          <div className="glass-panel animate-fade-in" style={{ padding: '2rem', maxWidth: '400px', width: '100%' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ padding: '0.5rem', background: `${selectedCategory.color}20`, borderRadius: '10px', color: selectedCategory.color }}>
                <Plus size={20} />
              </div>
              Ajouter : {selectedCategory.name}
            </h3>
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Désignation (facultatif)</label>
                <input 
                  type="text" className="glass-input" placeholder="ex: Courses Leclerc" 
                  value={newTitle} onChange={e => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Montant</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="number" className="glass-input" placeholder="0.00" autoFocus
                    style={{ paddingLeft: '2rem' }}
                    value={newAmount} onFocus={e => e.target.select()} onChange={e => setNewAmount(e.target.value)}
                  />
                  <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>€</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" onClick={() => setSelectedCategory(null)} className="glass-button-outline" style={{ flex: 1 }}>Annuler</button>
                  <button type="submit" className="glass-button" style={{ flex: 1 }}>Ajouter</button>
                </div>
                <button 
                  type="button" 
                  onClick={handleReset}
                  style={{ 
                    background: 'transparent', 
                    border: '1px solid rgba(239, 68, 68, 0.2)', 
                    color: '#ef4444',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >
                  <RotateCcw size={14} />
                  Réinitialiser cette catégorie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Bonjour, {user?.name || 'Utilisateur'} 👋</h2>
          <p className="text-muted">Voici l'état de vos finances ce mois-ci.</p>
        </div>
        <button className="glass-button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} />
          Nouvelle Dépense
        </button>
      </header>

      {/* Prédiction Banner */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))', borderLeft: '4px solid var(--accent-primary)' }}>
        <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '12px', color: '#3b82f6' }}>
          <TrendingUp size={28} />
        </div>
        <div>
          <h4 style={{ marginBottom: '0.25rem', fontSize: '1.1rem' }}>Prédiction de fin de mois</h4>
          <p className="text-muted" style={{ fontSize: '0.95rem' }}>
            En fonction de vos charges fixes restantes ({unpaidFixed.toFixed(2)} €) et de votre rythme actuel, votre solde estimé au {daysInMonth} du mois est de <strong style={{ color: projectedBalance >= 0 ? '#10b981' : '#ef4444', fontSize: '1.1rem' }}>{projectedBalance.toFixed(2)} €</strong>.
          </p>
        </div>
      </div>

      {/* Top Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className={`glass-panel ${balance < 0 ? 'balance-danger' : ''}`} style={{ padding: '1.5rem', transition: 'all 0.5s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="text-muted">Solde Actuel</span>
            <div style={{ padding: '0.5rem', background: balance < 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)', borderRadius: '10px', color: balance < 0 ? '#ef4444' : '#3b82f6', transition: 'all 0.3s ease' }}>
              <Wallet size={20} />
            </div>
          </div>
          <div className="amount-text" style={{ fontSize: '2rem', fontWeight: 'bold', transition: 'color 0.3s ease' }}>{balance.toFixed(2)} €</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="text-muted">Revenus</span>
            <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '10px', color: '#10b981' }}>
              <ArrowUpRight size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>+{totalIncome.toFixed(2)} €</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="text-muted">Dépenses</span>
            <div style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '10px', color: '#ef4444' }}>
              <ArrowDownRight size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>-{totalExpense.toFixed(2)} €</div>
        </div>
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Categories Progress */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Dépenses & Budgets</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Charges Fixes Section */}
            <div>
              <h4 className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Charges Fixes</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {expensesByCategory.filter(c => c.isFixed).map(cat => {
                  const Icon = iconMap[cat.icon] || ShoppingCart;
                  const isPaid = cat.spent >= cat.budget;
                  return (
                    <div 
                      key={cat.id} 
                      onClick={() => toggleFixedPaid(cat)}
                      style={{ 
                        padding: '1rem', 
                        background: isPaid ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255,255,255,0.03)', 
                        borderRadius: '16px',
                        border: isPaid ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      className="category-hover"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ padding: '0.5rem', background: isPaid ? 'rgba(16, 185, 129, 0.2)' : `${cat.color}20`, borderRadius: '10px', color: isPaid ? '#10b981' : cat.color }}>
                          <Icon size={18} />
                        </div>
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{cat.name}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{cat.budget} €</div>
                        <div style={{ fontSize: '0.7rem', color: isPaid ? 'var(--accent-success)' : 'var(--accent-warning)', fontWeight: isPaid ? '700' : '400' }}>
                          {isPaid ? '✓ PAYÉ' : 'À RÉGLER'}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Budgets Variables Section */}
            <div>
              <h4 className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Budgets Variables</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {expensesByCategory.filter(c => !c.isFixed).map(cat => {
                  const Icon = iconMap[cat.icon] || ShoppingCart;
                  const remaining = cat.budget - cat.spent;
                  const isOver = remaining < 0;
                  return (
                    <div 
                      key={cat.id} 
                      onClick={() => setSelectedCategory(cat)}
                      style={{ cursor: 'pointer' }}
                      className="category-hover"
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ padding: '0.5rem', background: `${cat.color}20`, borderRadius: '10px', color: cat.color }}>
                            <Icon size={18} />
                          </div>
                          <span style={{ fontWeight: '500' }}>{cat.name}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.9rem' }}>
                            <span style={{ fontWeight: 'bold', color: isOver ? 'var(--accent-danger)' : 'white' }}>
                              {isOver ? `Dépassement de ${Math.abs(remaining).toFixed(2)}` : `Reste ${remaining.toFixed(2)}`} €
                            </span>
                          </div>
                          <div style={{ fontSize: '0.7rem' }} className="text-muted">sur {cat.budget} €</div>
                        </div>
                      </div>
                      {/* Progress Bar */}
                      <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                        <div 
                          style={{ 
                            height: '100%', 
                            background: isOver ? 'var(--accent-danger)' : cat.color, 
                            width: `${Math.min(cat.percentage, 100)}%`,
                            borderRadius: '6px',
                            transition: 'width 1s ease-in-out',
                            boxShadow: isOver ? '0 0 10px rgba(239, 68, 68, 0.4)' : 'none'
                          }} 
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Chart & Recent */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Pie Chart */}
          <div className="glass-panel" style={{ padding: '1.5rem', height: '400px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '1rem' }}>Répartition</h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    cx="50%"
                    cy="50%"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(15, 23, 42, 0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '12px', 
                      color: '#fff',
                      backdropFilter: 'blur(10px)'
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Simple Legend */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
              {pieData.map((entry, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: entry.color }} />
                  <span className="text-muted">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
