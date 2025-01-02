import { useState, useEffect } from 'react'
import {
  fetchAllSubscriptions,
  createSubscription,
  updateSubscription,
  cancelSubscription
} from '../services/subscriptionService'

const SubscriptionsCRUD = () => {
  const [subscriptions, setSubscriptions] = useState([])
  const [formData, setFormData] = useState({
    userId: '',
    mealPlan: '',
    startDate: '',
    duration: '',
    mealsPerDay: ''
  })
  const [editingSubscriptionId, setEditingSubscriptionId] = useState(null)

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const data = await fetchAllSubscriptions()
        setSubscriptions(data)
      } catch (error) {
        console.error('Error fetching subscriptions:', error)
      }
    }
    loadSubscriptions()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingSubscriptionId) {
        await updateSubscription(editingSubscriptionId, formData)
      } else {
        await createSubscription(formData)
      }
      setFormData({
        userId: '',
        mealPlan: '',
        startDate: '',
        duration: '',
        mealsPerDay: ''
      })
      setEditingSubscriptionId(null)
      const updatedSubscriptions = await fetchAllSubscriptions()
      setSubscriptions(updatedSubscriptions)
    } catch (error) {
      console.error('Error saving subscription:', error)
    }
  }

  const handleEdit = (subscription) => {
    setEditingSubscriptionId(subscription._id)
    setFormData({
      userId: subscription.userId,
      mealPlan: subscription.mealPlan,
      startDate: subscription.startDate,
      duration: subscription.duration,
      mealsPerDay: subscription.mealsPerDay
    })
  }

  const handleDelete = async (id) => {
    try {
      await cancelSubscription(id)
      setSubscriptions(subscriptions.filter((sub) => sub._id !== id))
    } catch (error) {
      console.error('Error deleting subscription:', error)
    }
  }

  return (
    <div className="crud-section">
      <h2>Manage Subscriptions</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          placeholder="User ID"
          required
        />
        <input
          type="text"
          name="mealPlan"
          value={formData.mealPlan}
          onChange={handleChange}
          placeholder="Meal Plan"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (months)"
          required
        />
        <input
          type="text"
          name="mealsPerDay"
          value={formData.mealsPerDay}
          onChange={handleChange}
          placeholder="Meals per Day"
          required
        />
        <button type="submit">
          {editingSubscriptionId ? 'Update Subscription' : 'Add Subscription'}
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
                <button onClick={() => handleEdit(sub)}>Edit</button>
                <button onClick={() => handleDelete(sub._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SubscriptionsCRUD
