import { useState, useEffect } from 'react'
import {
  fetchAllDeliveries,
  updateDeliveryStatus,
  deleteDelivery
} from '../../services/deliveryService'

const DeliveryCRUD = () => {
  const [deliveries, setDeliveries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadDeliveries()
  }, [])

  const loadDeliveries = async () => {
    setLoading(true)
    try {
      const data = await fetchAllDeliveries()
      setDeliveries(data)
      setError(null)
    } catch (err) {
      setError('Failed to load deliveries.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateDeliveryStatus = async (deliveryId, status) => {
    try {
      await updateDeliveryStatus(deliveryId, status)
      setDeliveries((prev) =>
        prev.map((del) => (del._id === deliveryId ? { ...del, status } : del))
      )
    } catch (err) {
      console.error('Error updating delivery status:', err)
    }
  }

  const handleDeleteDelivery = async (deliveryId) => {
    try {
      await deleteDelivery(deliveryId)
      setDeliveries((prev) => prev.filter((del) => del._id !== deliveryId))
    } catch (err) {
      console.error('Error deleting delivery:', err)
    }
  }

  if (loading) return <p>Loading deliveries...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="delivery-crud">
      <h2>Manage Deliveries</h2>
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
                  onClick={() => handleUpdateDeliveryStatus(del._id, 'Pending')}
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

export default DeliveryCRUD
