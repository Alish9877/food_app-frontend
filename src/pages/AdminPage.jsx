import { useState } from 'react'
import MealPlanCRUD from '../components/admin/MealPlanCRUD'
import SubscriptionCRUD from '../components/admin/SubscriptionCRUD'
import DeliveryCRUD from '../components/admin/DeliveryCRUD'
import './AdminPage.css'

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
        {activeSection === 'mealPlans' && <MealPlanCRUD />}
        {activeSection === 'subscriptions' && <SubscriptionCRUD />}
        {activeSection === 'deliveries' && <DeliveryCRUD />}
      </div>
    </div>
  )
}

export default AdminPage
