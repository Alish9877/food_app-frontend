import React, { useState, useEffect } from 'react'
import {
  fetchAllSubscriptions,
  createSubscription,
  updateSubscription,
  cancelSubscription // Updated function name
} from '../../services/subscriptionService'
import { fetchAllMealPlans } from '../../services/mealPlanService'


const SubscriptionCRUD = () => {
  const [subscriptions, setSubscriptions] = useState([])
  const [mealPlans, setMealPlans] = useState([])
  const [formData, setFormData] = useState({
    user: '',
    mealPlans: [],
    startDate: '',
    duration: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [subsData, mealPlansData] = await Promise.all([
          fetchAllSubscriptions(),
          fetchAllMealPlans()
        ])
        setSubscriptions(subsData)
        setMealPlans(mealPlansData)
      } catch (err) {
        console.error('Error loading data:', err)
        setError('Failed to load subscriptions or meal plans.')
      }
    }
    loadData()
  }, [])

  const resetForm = () => {
    setFormData({
      user: '',
      mealPlans: [],
      startDate: '',
      duration: ''
    })
    setIsEditing(false)
    setEditingId(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMealPlanChange = (e) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setFormData((prev) => ({ ...prev, mealPlans: options }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await updateSubscription(editingId, formData)
        setSubscriptions((prev) =>
          prev.map((sub) =>
            sub._id === editingId ? { ...sub, ...formData } : sub
          )
        )
      } else {
        const newSubscription = await createSubscription(formData)
        setSubscriptions((prev) => [...prev, newSubscription])
      }
      resetForm()
    } catch (err) {
      console.error('Error saving subscription:', err)
      setError('Failed to save subscription.')
    }
  }

  const handleEdit = (subscription) => {
    setFormData({
      user: subscription.user || '',
      mealPlans: subscription.mealPlans.map((plan) => plan._id) || [],
      startDate: subscription.startDate || '',
      duration: subscription.duration || ''
    })
    setIsEditing(true)
    setEditingId(subscription._id)
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this subscription?'))
      return
    try {
      await cancelSubscription(id)
      setSubscriptions((prev) => prev.filter((sub) => sub._id !== id))
    } catch (err) {
      console.error('Error canceling subscription:', err)
      setError('Failed to cancel subscription.')
    }
  }

  return (
    <div className="subscription-crud">
      <h2>Subscriptions</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user"
          placeholder="User ID"
          value={formData.user}
          onChange={handleInputChange}
          required
        />
        <select
          name="mealPlans"
          multiple
          value={formData.mealPlans}
          onChange={handleMealPlanChange}
          required
        >
          <option value="" disabled>
            Select Meal Plans
          </option>
          {mealPlans.map((mealPlan) => (
            <option key={mealPlan._id} value={mealPlan._id}>
              {mealPlan.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (months)"
          value={formData.duration}
          onChange={handleInputChange}
          required
        />
        <button type="submit">
          {isEditing ? 'Update' : 'Add'} Subscription
        </button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </form>

      <table className="subscription-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Meal Plans</th>
            <th>Start Date</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub._id}>
              <td>
                {sub.user?.username ||
                  sub.user?.email ||
                  sub.user?._id ||
                  'Unknown User'}
              </td>
              <td>{sub.mealPlans.map((plan) => plan.name).join(', ')}</td>
              <td>{new Date(sub.startDate).toLocaleDateString()}</td>
              <td>{sub.duration} months</td>
              <td>
                <button onClick={() => handleEdit(sub)}>Edit</button>
                <button onClick={() => handleCancel(sub._id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SubscriptionCRUD
