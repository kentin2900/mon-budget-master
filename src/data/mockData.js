export const categories = [
  { id: '1', name: 'Alimentation', icon: 'ShoppingCart', color: '#10b981', budget: 400, isFixed: false },
  { id: '2', name: 'Eau/Électricité/Gaz', icon: 'Zap', color: '#f59e0b', budget: 150, isFixed: true },
  { id: '3', name: 'Loyer', icon: 'Home', color: '#3b82f6', budget: 800, isFixed: true },
  { id: '4', name: 'Tabac', icon: 'Cigarette', color: '#ef4444', budget: 100, isFixed: false },
  { id: '5', name: 'Abonnements', icon: 'Wifi', color: '#8b5cf6', budget: 60, isFixed: true },
  { id: '6', name: 'Loisirs', icon: 'Gamepad2', color: '#ec4899', budget: 150, isFixed: false },
];

const now = new Date();
const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

export const initialTransactions = [
  { id: 1, title: 'Courses Carrefour', amount: -85.50, categoryId: '1', date: `${currentYearMonth}-10`, type: 'expense' },
  { id: 2, title: 'Facture EDF', amount: -65.00, categoryId: '2', date: `${currentYearMonth}-08`, type: 'expense' },
  { id: 3, title: 'Loyer Mai', amount: -800.00, categoryId: '3', date: `${currentYearMonth}-01`, type: 'expense' },
  { id: 4, title: 'Abonnement Internet', amount: -39.99, categoryId: '5', date: `${currentYearMonth}-05`, type: 'expense' },
  { id: 5, title: 'Bureau de Tabac', amount: -20.00, categoryId: '4', date: `${currentYearMonth}-11`, type: 'expense' },
  { id: 6, title: 'Salaire', amount: 2500.00, categoryId: null, date: `${currentYearMonth}-01`, type: 'income' },
];

