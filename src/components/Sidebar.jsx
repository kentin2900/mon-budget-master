import React from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  Settings, 
  LogOut,
  User 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, user, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Vue Globale', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'analytics', label: 'Analyses', icon: PieChart },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <aside className="glass-panel animate-fade-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 4rem)', position: 'sticky', top: '2rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800' }} className="text-gradient">
          BudgetMaster
        </h1>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                border: 'none',
                borderRadius: '14px',
                background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                fontWeight: isActive ? '600' : '500',
                textAlign: 'left',
                border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                boxShadow: isActive ? '0 4px 20px rgba(59, 130, 246, 0.2)' : 'none',
                transform: isActive ? 'scale(1.02)' : 'scale(1)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: isActive ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                color: isActive ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.3s ease'
              }}>
                <Icon size={18} />
              </div>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 1rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
            <User size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>{user?.name || 'Utilisateur'}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Compte Local</span>
          </div>
        </div>
        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            border: 'none',
            background: 'rgba(239, 68, 68, 0.05)',
            borderRadius: '12px',
            color: 'var(--accent-danger)',
            cursor: 'pointer',
            fontWeight: '600',
            width: '100%',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'}
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
