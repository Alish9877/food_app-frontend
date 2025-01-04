import { useState, lazy, Suspense } from 'react'
import './AdminPage.css'

// Lazy loading components for better performance
const MealPlanCRUD = lazy(() => import('../components/admin/MealPlanCRUD'))
const SubscriptionCRUD = lazy(() =>
  import('../components/admin/SubscriptionCRUD')
)
const DeliveryCRUD = lazy(() => import('../components/admin/DeliveryCRUD'))

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('mealPlans') // Default tab

  const tabs = [
    { key: 'mealPlans', label: 'Meal Plans', component: <MealPlanCRUD /> },
    {
      key: 'subscriptions',
      label: 'Subscriptions',
      component: <SubscriptionCRUD />
    },
    { key: 'deliveries', label: 'Deliveries', component: <DeliveryCRUD /> }
  ]

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Access tools to manage meal plans, subscriptions, and deliveries.</p>

      {/* Tab navigation */}
      <div className="admin-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div className="admin-content">
        <Suspense fallback={<p>Loading...</p>}>
          {tabs.find((tab) => tab.key === activeTab)?.component}
        </Suspense>
      </div>
    </div>
  )
}

export default AdminPage
