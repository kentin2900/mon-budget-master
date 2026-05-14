import React, { useState, useEffect } from 'react';
import './index.css';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import Onboarding from './components/Onboarding';
import TransactionsList from './components/TransactionsList';
import { initialTransactions, categories as initialCategories } from './data/mockData';

function App() {
  // Load data from localStorage or use defaults
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('bm_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('bm_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });
  const [salary, setSalary] = useState(() => {
    const saved = localStorage.getItem('bm_salary');
    return saved ? parseFloat(saved) : 2500;
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bm_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  // Persistence hooks
  useEffect(() => {
    localStorage.setItem('bm_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('bm_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('bm_salary', salary.toString());
  }, [salary]);

  useEffect(() => {
    if (user) localStorage.setItem('bm_user', JSON.stringify(user));
  }, [user]);

  const handleAddTransaction = (newTx) => {
    if (newTx.type === 'delete_fixed') {
      setTransactions(prev => prev.filter(t => t.categoryId !== newTx.categoryId || t.type !== 'expense'));
      return;
    }
    if (newTx.type === 'reset_category') {
      setTransactions(prev => prev.filter(t => t.categoryId !== newTx.categoryId));
      return;
    }
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette transaction ?")) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleEditTransaction = (updatedTx) => {
    setTransactions(prev => prev.map(t => t.id === updatedTx.id ? updatedTx : t));
  };

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ? Cela réinitialisera votre profil local.')) {
      localStorage.removeItem('bm_user');
      setUser(null);
    }
  };

  if (!user) {
    return <Onboarding onComplete={setUser} />;
  }

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard 
            transactions={transactions} 
            categories={categories} 
            salary={salary}
            onAddTransaction={handleAddTransaction}
            user={user}
          />
        )}
        {activeTab === 'transactions' && (
          <TransactionsList 
            transactions={transactions} 
            categories={categories} 
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
          />
        )}
        {activeTab === 'settings' && (
          <Settings 
            categories={categories} 
            setCategories={setCategories}
            salary={salary}
            setSalary={setSalary}
            onLogout={handleLogout}
          />
        )}
        {activeTab === 'analytics' && (
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2>Analyses & Tendances</h2>
            <p className="text-muted">Visualisez vos habitudes de dépense sur le long terme.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
