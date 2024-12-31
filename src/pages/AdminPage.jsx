import React, { useState } from 'react'
import MealPlansCRUD from '../components/MealPlansCRUD'
import SubscriptionsCRUD from '../components/SubscriptionsCRUD'
import DeliveriesCRUD from '../components/DeliveriesCRUD'

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('mealPlans')

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Access tools to manage meal plans, subscriptions, and deliveries.</p>

      <div className="admin-tabs">
        <button onClick={() => setActiveSection('mealPlans')}>
          Meal Plans
        </button>
        <button onClick={() => setActiveSection('subscriptions')}>
          Subscriptions
        </button>
        <button onClick={() => setActiveSection('deliveries')}>
          Deliveries
        </button>
      </div>

      <div className="admin-section">
        {activeSection === 'mealPlans' && <MealPlansCRUD />}
        {activeSection === 'subscriptions' && <SubscriptionsCRUD />}
        {activeSection === 'deliveries' && <DeliveriesCRUD />}
      </div>
    </div>
  )
}

export default AdminPage
