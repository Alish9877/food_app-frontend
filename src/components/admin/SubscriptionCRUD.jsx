import { useState, useEffect } from 'react'
import {
  fetchAllSubscriptions,
  createSubscription,
  updateSubscription,
  cancelSubscription
} from '../../services/subscriptionService'

const SubscriptionCRUD = () => {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    userId: '',
    mealPlan: '',
    startDate: '',
    duration: '',
    mealsPerDay: ''
  })
  const [editingSubscription, setEditingSubscription] = useState(null)

  useEffect(() => {
    loadSubscriptions()
  }, [])

  const loadSubscriptions = async () => {
    setLoading(true)
    try {
      const data = await fetchAllSubscriptions()
      setSubscriptions(data)
      setError(null)
    } catch (err) {
      setError('Failed to load subscriptions.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddOrUpdateSubscription = async (e) => {
    e.preventDefault()
    try {
      if (editingSubscription) {
        await updateSubscription(editingSubscription._id, formData)
        setSubscriptions((prev) =>
          prev.map((sub) =>
            sub._id === editingSubscription._id ? { ...sub, ...formData } : sub
          )
        )
      } else {
        const newSub = await createSubscription(formData)
        setSubscriptions((prev) => [...prev, newSub])
      }
      setFormData({
        userId: '',
        mealPlan: '',
        startDate: '',
        duration: '',
        mealsPerDay: ''
      })
      setEditingSubscription(null)
    } catch (err) {
      console.error('Error saving subscription:', err)
    }
  }

  const handleEditSubscription = (sub) => {
    setEditingSubscription(sub)
    setFormData({
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

  if (loading) return <p>Loading subscriptions...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="subscription-crud">
      <h2>Manage Subscriptions</h2>
      <form onSubmit={handleAddOrUpdateSubscription}>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
          placeholder="User ID"
          required
        />
        <input
          type="text"
          name="mealPlan"
          value={formData.mealPlan}
          onChange={(e) =>
            setFormData({ ...formData, mealPlan: e.target.value })
          }
          placeholder="Meal Plan ID or Name"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
          required
        />
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
          placeholder="Duration (months)"
          required
        />
        <input
          type="number"
          name="mealsPerDay"
          value={formData.mealsPerDay}
          onChange={(e) =>
            setFormData({ ...formData, mealsPerDay: e.target.value })
          }
          placeholder="Meals Per Day"
          required
        />
        <button type="submit">
          {editingSubscription ? 'Update Subscription' : 'Add Subscription'}
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

export default SubscriptionCRUD
