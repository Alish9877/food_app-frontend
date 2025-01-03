import { useState, useEffect } from 'react'
import './AdminPage.css'
import {
  fetchAllMealPlans,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan
} from '../services/mealPlanService'
import {
  fetchAllSubscriptions,
  createSubscription,
  updateSubscription,
  cancelSubscription
} from '../services/subscriptionService'
import {
  fetchAllDeliveries,
  // createDelivery, // if needed
  updateDeliveryStatus,
  deleteDelivery
} from '../services/deliveryService'

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('mealPlans')

  // States for Meal Plans CRUD
  const [mealPlans, setMealPlans] = useState([])
  const [mpLoading, setMpLoading] = useState(true)
  const [mpError, setMpError] = useState(null)
  const [newMealPlan, setNewMealPlan] = useState({
    name: '',
    description: '',
    price: 0,
    dishes: []
  })
  const [editMealPlan, setEditMealPlan] = useState(null)
  const [isAddMpOpen, setAddMpOpen] = useState(false)
  const [isEditMpOpen, setEditMpOpen] = useState(false)

  // States for Subscriptions CRUD
  const [subscriptions, setSubscriptions] = useState([])
  const [subLoading, setSubLoading] = useState(true)
  const [subError, setSubError] = useState(null)
  const [subFormData, setSubFormData] = useState({
    userId: '',
    mealPlan: '',
    startDate: '',
    duration: '',
    mealsPerDay: ''
  })
  const [editingSubId, setEditingSubId] = useState(null)

  // States for Deliveries CRUD
  const [deliveries, setDeliveries] = useState([])
  const [delLoading, setDelLoading] = useState(true)
  const [delError, setDelError] = useState(null)

  // -----------------------------
  // Effect: fetch data based on activeSection
  // Or fetch all once if you prefer
  // -----------------------------
  useEffect(() => {
    if (activeSection === 'mealPlans') loadMealPlans()
    if (activeSection === 'subscriptions') loadSubscriptions()
    if (activeSection === 'deliveries') loadDeliveries()
    // eslint-disable-next-line
  }, [activeSection])

  // Meal Plans CRUD logic
  const loadMealPlans = async () => {
    setMpLoading(true)
    try {
      const data = await fetchAllMealPlans()
      setMealPlans(data)
      setMpError(null)
    } catch (err) {
      setMpError('Failed to load meal plans.')
    } finally {
      setMpLoading(false)
    }
  }
  const handleAddMealPlan = async () => {
    try {
      const added = await createMealPlan(newMealPlan)
      setMealPlans((prev) => [...prev, added])
      setAddMpOpen(false)
      setNewMealPlan({ name: '', description: '', price: 0, dishes: [] })
    } catch (err) {
      console.error('Error adding meal plan:', err)
    }
  }
  const handleEditMealPlan = (mp) => {
    setEditMealPlan(mp)
    setEditMpOpen(true)
  }
  const handleSaveEditMealPlan = async () => {
    try {
      const updated = await updateMealPlan(editMealPlan._id, {
        name: editMealPlan.name,
        description: editMealPlan.description,
        price: editMealPlan.price,
        dishes: editMealPlan.dishes
      })
      setMealPlans((prev) =>
        prev.map((m) => (m._id === updated._id ? updated : m))
      )
      setEditMpOpen(false)
      setEditMealPlan(null)
    } catch (err) {
      console.error('Error updating meal plan:', err)
    }
  }
  const handleDeleteMealPlan = async (id) => {
    try {
      await deleteMealPlan(id)
      setMealPlans((prev) => prev.filter((m) => m._id !== id))
    } catch (err) {
      console.error('Error deleting meal plan:', err)
    }
  }

  // Subscriptions CRUD logic
  const loadSubscriptions = async () => {
    setSubLoading(true)
    try {
      const data = await fetchAllSubscriptions()
      setSubscriptions(data)
      setSubError(null)
    } catch (err) {
      setSubError('Failed to load subscriptions.')
    } finally {
      setSubLoading(false)
    }
  }
  const handleChangeSubscriptionForm = (e) => {
    setSubFormData({ ...subFormData, [e.target.name]: e.target.value })
  }
  const handleSubmitSubscription = async (e) => {
    e.preventDefault()
    try {
      if (editingSubId) {
        await updateSubscription(editingSubId, subFormData)
      } else {
        await createSubscription(subFormData)
      }
      setSubFormData({
        userId: '',
        mealPlan: '',
        startDate: '',
        duration: '',
        mealsPerDay: ''
      })
      setEditingSubId(null)
      loadSubscriptions()
    } catch (err) {
      console.error('Error saving subscription:', err)
    }
  }
  const handleEditSubscription = (sub) => {
    setEditingSubId(sub._id)
    setSubFormData({
      userId: sub.userId || '',
      mealPlan: sub.mealPlan || '',
      startDate: sub.startDate?.slice(0, 10) || '',
      duration: sub.duration || '',
      mealsPerDay: sub.mealsPerDay || ''
    })
  }
  const handleDeleteSubscription = async (id) => {
    try {
      await cancelSubscription(id)
      setSubscriptions((prev) => prev.filter((s) => s._id !== id))
    } catch (err) {
      console.error('Error deleting subscription:', err)
    }
  }

  // Deliveries CRUD logic
  const loadDeliveries = async () => {
    setDelLoading(true)
    try {
      const data = await fetchAllDeliveries()
      setDeliveries(data)
      setDelError(null)
    } catch (err) {
      setDelError('Failed to load deliveries.')
    } finally {
      setDelLoading(false)
    }
  }
  const handleUpdateDeliveryStatus = async (deliveryId, newStatus) => {
    try {
      await updateDeliveryStatus(deliveryId, newStatus)
      setDeliveries((prev) =>
        prev.map((d) =>
          d._id === deliveryId ? { ...d, status: newStatus } : d
        )
      )
    } catch (err) {
      console.error('Error updating delivery status:', err)
    }
  }
  const handleDeleteDelivery = async (deliveryId) => {
    try {
      await deleteDelivery(deliveryId)
      setDeliveries((prev) => prev.filter((d) => d._id !== deliveryId))
    } catch (err) {
      console.error('Error deleting delivery:', err)
    }
  }

  // UI for Meal Plans tab
  const renderMealPlans = () => {
    if (mpLoading) return <p>Loading meal plans...</p>
    if (mpError) return <p>{mpError}</p>
    return (
      <div className="crud-section">
        <h2>Manage Meal Plans</h2>
        <button onClick={() => setAddMpOpen(true)}>Add New Meal Plan</button>

        {isAddMpOpen && (
          <div className="modal">
            <h3>Add Meal Plan</h3>
            <input
              type="text"
              placeholder="Name"
              value={newMealPlan.name}
              onChange={(e) =>
                setNewMealPlan({ ...newMealPlan, name: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={newMealPlan.description}
              onChange={(e) =>
                setNewMealPlan({ ...newMealPlan, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Price"
              value={newMealPlan.price}
              onChange={(e) =>
                setNewMealPlan({
                  ...newMealPlan,
                  price: Number(e.target.value)
                })
              }
            />
            <textarea
              placeholder="Enter dishes, comma-separated"
              value={newMealPlan.dishes.join(', ')}
              onChange={(e) =>
                setNewMealPlan({
                  ...newMealPlan,
                  dishes: e.target.value.split(',')
                })
              }
            />
            <button onClick={handleAddMealPlan}>Save</button>
            <button onClick={() => setAddMpOpen(false)}>Cancel</button>
          </div>
        )}

        {isEditMpOpen && editMealPlan && (
          <div className="modal">
            <h3>Edit Meal Plan</h3>
            <input
              type="text"
              placeholder="Name"
              value={editMealPlan.name}
              onChange={(e) =>
                setEditMealPlan({ ...editMealPlan, name: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={editMealPlan.description}
              onChange={(e) =>
                setEditMealPlan({
                  ...editMealPlan,
                  description: e.target.value
                })
              }
            />
            <input
              type="number"
              placeholder="Price"
              value={editMealPlan.price}
              onChange={(e) =>
                setEditMealPlan({
                  ...editMealPlan,
                  price: Number(e.target.value)
                })
              }
            />
            <textarea
              placeholder="Enter dishes, comma-separated"
              value={editMealPlan.dishes.join(', ')}
              onChange={(e) =>
                setEditMealPlan({
                  ...editMealPlan,
                  dishes: e.target.value.split(',')
                })
              }
            />
            <button onClick={handleSaveEditMealPlan}>Save</button>
            <button onClick={() => setEditMpOpen(false)}>Cancel</button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Dishes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mealPlans.map((mp) => (
              <tr key={mp._id}>
                <td>{mp.name}</td>
                <td>{mp.description}</td>
                <td>{mp.price}</td>
                <td>{mp.dishes?.join(', ')}</td>
                <td>
                  <button onClick={() => handleEditMealPlan(mp)}>Edit</button>
                  <button onClick={() => handleDeleteMealPlan(mp._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // UI for Subscriptions tab
  const renderSubscriptions = () => {
    if (subLoading) return <p>Loading subscriptions...</p>
    if (subError) return <p>{subError}</p>
    return (
      <div className="crud-section">
        <h2>Manage Subscriptions</h2>
        <form onSubmit={handleSubmitSubscription}>
          <input
            type="text"
            name="userId"
            value={subFormData.userId}
            onChange={handleChangeSubscriptionForm}
            placeholder="User ID"
            required
          />
          <input
            type="text"
            name="mealPlan"
            value={subFormData.mealPlan}
            onChange={handleChangeSubscriptionForm}
            placeholder="Meal Plan ID or name"
            required
          />
          <input
            type="date"
            name="startDate"
            value={subFormData.startDate}
            onChange={handleChangeSubscriptionForm}
            required
          />
          <input
            type="number"
            name="duration"
            value={subFormData.duration}
            onChange={handleChangeSubscriptionForm}
            placeholder="Duration (months)"
            required
          />
          <input
            type="number"
            name="mealsPerDay"
            value={subFormData.mealsPerDay}
            onChange={handleChangeSubscriptionForm}
            placeholder="Meals Per Day"
            required
          />
          <button type="submit">
            {editingSubId ? 'Update Subscription' : 'Add Subscription'}
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Meal Plan</th>
              <th>Start Date</th>
              <th>Duration</th>
              <th>Meals Per Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub._id}>
                <td>{sub.userId}</td>
                <td>{sub.mealPlan}</td>
                <td>{new Date(sub.startDate).toLocaleDateString()}</td>
                <td>{sub.duration} months</td>
                <td>{sub.mealsPerDay}</td>
                <td>
                  <button onClick={() => handleEditSubscription(sub)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteSubscription(sub._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // UI for Deliveries tab
  const renderDeliveries = () => {
    if (delLoading) return <p>Loading deliveries...</p>
    if (delError) return <p>{delError}</p>
    return (
      <div className="crud-section">
        <h2>Manage Deliveries</h2>
        {/* If you want to create a new delivery from here, you'd do that. 
            For now we just let admin update status or delete. */}
        <table>
          <thead>
            <tr>
              <th>Subscription</th>
              <th>Delivery Date</th>
              <th>Meals</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((del) => (
              <tr key={del._id}>
                <td>{del.subscription}</td>
                <td>{new Date(del.deliveryDate).toLocaleDateString()}</td>
                <td>{del.meals?.join(', ')}</td>
                <td>{del.location}</td>
                <td>{del.status}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdateDeliveryStatus(del._id, 'Pending')
                    }
                  >
                    Set Pending
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateDeliveryStatus(del._id, 'Delivered')
                    }
                  >
                    Set Delivered
                  </button>
                  <button onClick={() => handleDeleteDelivery(del._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

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
        {activeSection === 'mealPlans' && renderMealPlans()}
        {activeSection === 'subscriptions' && renderSubscriptions()}
        {activeSection === 'deliveries' && renderDeliveries()}
      </div>
    </div>
  )
}

export default AdminPage
