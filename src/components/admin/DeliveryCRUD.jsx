import { useState, useEffect } from 'react'
import {
  fetchAllDeliveries,
  createDelivery,
  updateDelivery,
  deleteDelivery
} from '../../services/deliveryService'
import { fetchAllSubscriptions } from '../../services/subscriptionService'


const DeliveryCRUD = () => {
  const [deliveries, setDeliveries] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [formData, setFormData] = useState({
    subscription: '',
    deliveryDate: '',
    status: '',
    location: '',
    meals: []
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [delData, subData] = await Promise.all([
          fetchAllDeliveries(),
          fetchAllSubscriptions()
        ])
        setDeliveries(delData)
        setSubscriptions(subData)
      } catch (err) {
        console.error('Error loading data:', err)
        setError('Failed to load deliveries or subscriptions.')
      }
    }
    loadData()
  }, [])

  const resetForm = () => {
    setFormData({
      subscription: '',
      deliveryDate: '',
      status: '',
      location: '',
      meals: []
    })
    setIsEditing(false)
    setEditingId(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMealsChange = (e) => {
    const meals = e.target.value.split(',').map((meal) => meal.trim())
    setFormData((prev) => ({ ...prev, meals }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await updateDelivery(editingId, formData)
        setDeliveries((prev) =>
          prev.map((del) =>
            del._id === editingId ? { ...del, ...formData } : del
          )
        )
      } else {
        const newDelivery = await createDelivery(formData)
        setDeliveries((prev) => [...prev, newDelivery])
      }
      resetForm()
    } catch (err) {
      console.error('Error saving delivery:', err)
      setError('Failed to save delivery.')
    }
  }

  const handleEdit = (delivery) => {
    setFormData({
      subscription: delivery.subscription?._id || '',
      deliveryDate: delivery.deliveryDate || '',
      status: delivery.status || '',
      location: delivery.location || '',
      meals: delivery.meals || []
    })
    setIsEditing(true)
    setEditingId(delivery._id)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this delivery?'))
      return
    try {
      await deleteDelivery(id)
      setDeliveries((prev) => prev.filter((del) => del._id !== id))
    } catch (err) {
      console.error('Error deleting delivery:', err)
      setError('Failed to delete delivery.')
    }
  }

  return (
    <div className="delivery-crud">
      <h2>Deliveries</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <select
          name="subscription"
          value={formData.subscription}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select Subscription
          </option>
          {subscriptions.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.user?.username || sub.user?.email || sub.user?._id} -{' '}
              {sub.startDate}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="deliveryDate"
          placeholder="Delivery Date"
          value={formData.deliveryDate}
          onChange={handleInputChange}
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="meals"
          placeholder="Meals (comma-separated)"
          value={formData.meals.join(', ')}
          onChange={handleMealsChange}
          required
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Delivery</button>
        {isEditing && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <table className="delivery-table">
        <thead>
          <tr>
            <th>Subscription</th>
            <th>Delivery Date</th>
            <th>Status</th>
            <th>Location</th>
            <th>Meals</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((del) => (
            <tr key={del._id}>
              <td>
                {del.subscription?.user?.username ||
                  del.subscription?.user?.email ||
                  'Unknown User'}
              </td>
              <td>{new Date(del.deliveryDate).toLocaleDateString()}</td>
              <td>{del.status}</td>
              <td>{del.location}</td>
              <td>{del.meals.join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(del)}>Edit</button>
                <button onClick={() => handleDelete(del._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DeliveryCRUD
