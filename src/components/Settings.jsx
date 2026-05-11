import React from 'react';
import { Save, AlertCircle, Plus } from 'lucide-react';

const Settings = ({ categories, setCategories, salary, setSalary }) => {
  const [newCatName, setNewCatName] = React.useState('');
  const [newCatBudget, setNewCatBudget] = React.useState('');
  const [newCatColor, setNewCatColor] = React.useState('#3b82f6');
  const [newCatType, setNewCatType] = React.useState('expense');
  const [newCatFixed, setNewCatFixed] = React.useState(false);
  
  const handleFocus = (e) => e.target.select();

  const handleBudgetChange = (id, newBudget) => {
    const value = parseFloat(newBudget) || 0;
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, budget: value } : cat
    ));
  };

  const handleSalaryChange = (val) => {
    setSalary(parseFloat(val) || 0);
  };

  const addCategory = () => {
    if (!newCatName) return;
    const newCategory = {
      id: Date.now().toString(),
      name: newCatName,
      icon: newCatType === 'income' ? 'ArrowUpRight' : 'ShoppingCart',
      color: newCatColor,
      budget: parseFloat(newCatBudget) || 0,
      type: newCatType,
      isFixed: newCatFixed
    };
    setCategories(prev => [...prev, newCategory]);
    setNewCatName('');
    setNewCatBudget('');
    setNewCatFixed(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h2>Paramètres</h2>
        <p className="text-muted">Gérez vos budgets par catégorie et vos revenus récurrents.</p>
      </header>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Configuration des Budgets Mensuels
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {categories.map(cat => (
            <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '500', color: cat.color }}>
                {cat.name}
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="number" 
                  className="glass-input"
                  value={cat.budget}
                  onFocus={handleFocus}
                  onChange={(e) => handleBudgetChange(cat.id, e.target.value)}
                  style={{ paddingLeft: '2rem' }}
                />
                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                  €
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <AlertCircle size={20} color="#3b82f6" />
          <p style={{ fontSize: '0.9rem' }}>
            Ces montants définissent vos objectifs mensuels. Les barres de progression du tableau de bord se mettront à jour automatiquement.
          </p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} color="#3b82f6" />
          Ajouter une nouvelle catégorie
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Type</label>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '0.3rem' }}>
              <button 
                onClick={() => setNewCatType('expense')}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: 'none',
                  borderRadius: '10px',
                  background: newCatType === 'expense' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                  color: newCatType === 'expense' ? '#ef4444' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                Dépense
              </button>
              <button 
                onClick={() => setNewCatType('income')}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: 'none',
                  borderRadius: '10px',
                  background: newCatType === 'income' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                  color: newCatType === 'income' ? '#10b981' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                Revenu
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input 
              type="checkbox" 
              id="isFixed" 
              checked={newCatFixed}
              onChange={(e) => setNewCatFixed(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#3b82f6' }}
            />
            <label htmlFor="isFixed" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>Charge Fixe ?</label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Nom de la catégorie</label>
            <input 
              type="text" 
              className="glass-input" 
              placeholder="Ex: Sport, Netflix..." 
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Budget mensuel</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="number" 
                className="glass-input" 
                placeholder="0" 
                style={{ paddingLeft: '2rem' }}
                value={newCatBudget}
                onFocus={handleFocus}
                onChange={(e) => setNewCatBudget(e.target.value)}
              />
              <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>€</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Couleur</label>
            <input 
              type="color" 
              className="glass-input" 
              style={{ padding: '0.2rem', height: '45px', cursor: 'pointer' }}
              value={newCatColor}
              onChange={(e) => setNewCatColor(e.target.value)}
            />
          </div>
          <button onClick={addCategory} className="glass-button" style={{ height: '45px' }}>
            Ajouter
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Revenus & Autres</h3>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Configurez ici vos revenus principaux pour calculer votre solde disponible.
        </p>
        
        <div style={{ maxWidth: '400px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Salaire / Revenu Principal (Mensuel)</label>
          <div style={{ position: 'relative', marginTop: '0.5rem' }}>
            <input 
              type="number" 
              className="glass-input"
              value={salary}
              onFocus={handleFocus}
              onChange={(e) => handleSalaryChange(e.target.value)}
              style={{ paddingLeft: '2rem' }}
            />
            <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
              €
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="glass-button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Save size={20} />
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
};

export default Settings;
