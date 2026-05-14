import { useState } from 'react';
import { ArrowRight, Wallet, ShieldCheck } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({ name: name.trim(), createdAt: new Date().toISOString() });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--bg-color)'
    }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <div style={{ 
          width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.2)', 
          borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 2rem', color: '#3b82f6'
        }}>
          <Wallet size={40} />
        </div>
        
        <h1 className="text-gradient" style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>BudgetMaster</h1>
        <p className="text-muted" style={{ marginBottom: '2.5rem' }}>
          Prenez le contrôle de vos finances avec une interface moderne et intuitive.
        </p>

        {step === 1 ? (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Comment devrions-nous vous appeler ?</h2>
            <div style={{ marginBottom: '2rem' }}>
              <input 
                type="text" 
                className="glass-input" 
                placeholder="Votre prénom" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ textAlign: 'center', fontSize: '1.2rem' }}
                autoFocus
              />
            </div>
            <button 
              className="glass-button" 
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              onClick={() => name && setStep(2)}
            >
              Suivant <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', display: 'flex', gap: '1rem', alignItems: 'center', textAlign: 'left' }}>
              <ShieldCheck size={32} color="#10b981" />
              <div>
                <div style={{ fontWeight: '600', color: '#10b981' }}>Confidentialité garantie</div>
                <div style={{ fontSize: '0.8rem' }} className="text-muted">Vos données sont stockées localement sur votre appareil.</div>
              </div>
            </div>
            <p style={{ marginBottom: '2rem' }}>Prêt à commencer votre gestion, <strong>{name}</strong> ?</p>
            <button 
              className="glass-button" 
              style={{ width: '100%' }}
              onClick={handleSubmit}
            >
              Créer mon compte local
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
