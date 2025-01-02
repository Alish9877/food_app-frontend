import { useState, lazy, Suspense } from 'react'

const MealPlansCRUD = lazy(() => import('../components/MealPlansCRUD'))
const SubscriptionsCRUD = lazy(() => import('../components/SubscriptionsCRUD'))
const DeliveriesCRUD = lazy(() => import('../components/DeliveriesCRUD'))

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('mealPlans')

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Access tools to manage meal plans, subscriptions, and deliveries.</p>

      <div className="admin-tabs">
        <button
          className={activeSection === 'mealPlans' ? 'active' : ''}
          onClick={() => setActiveSection('mealPlans')}
        >
          Meal Plans
        </button>
        <button
          className={activeSection === 'subscriptions' ? 'active' : ''}
          onClick={() => setActiveSection('subscriptions')}
        >
          Subscriptions
        </button>
        <button
          className={activeSection === 'deliveries' ? 'active' : ''}
          onClick={() => setActiveSection('deliveries')}
        >
          Deliveries
        </button>
      </div>

      <div className="admin-section">
        <Suspense fallback={<p>Loading...</p>}>
          {activeSection === 'mealPlans' && <MealPlansCRUD />}
          {activeSection === 'subscriptions' && <SubscriptionsCRUD />}
          {activeSection === 'deliveries' && <DeliveriesCRUD />}
        </Suspense>
      </div>
    </div>
  )
}

export default AdminPage
