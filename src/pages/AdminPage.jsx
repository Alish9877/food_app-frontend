import React from 'react'
import { Link } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Access tools to manage meal plans, subscriptions, and deliveries.</p>
      <div className="admin-tools">
        <Link to="/admin/meal-plans" className="admin-link">
          Manage Meal Plans
        </Link>
        <Link to="/admin/subscriptions" className="admin-link">
          Manage Subscriptions
        </Link>
        <Link to="/admin/deliveries" className="admin-link">
          Manage Deliveries
        </Link>
      </div>
    </div>
  )
}

export default AdminPage
