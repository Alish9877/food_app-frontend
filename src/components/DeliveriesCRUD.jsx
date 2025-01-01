import { useEffect, useState } from 'react'
import {
  fetchAllDeliveries,
  createDelivery,
  updateDeliveryStatus,
  deleteDelivery
} from '../services/deliveryService'

const DeliveriesCRUD = () => {
  const [deliveries, setDeliveries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newDelivery, setNewDelivery] = useState({
    deliveryDate: '',
    meals: [],
    status: 'Pending'
  })
  const [editDelivery, setEditDelivery] = useState(null)
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)

  // Fetch all deliveries on mount
  useEffect(() => {
    const getDeliveries = async () => {
      try {
        const data = await fetchAllDeliveries()
        setDeliveries(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load deliveries.')
        setLoading(false)
      }
    }
    getDeliveries()
  }, [])

  // Add Delivery Handler
  const handleAdd = async () => {
    try {
      const addedDelivery = await createDelivery(newDelivery)
      setDeliveries((prev) => [...prev, addedDelivery])
      setAddModalOpen(false)
      setNewDelivery({ deliveryDate: '', meals: [], status: 'Pending' })
    } catch (error) {
      console.error('Error adding delivery:', error)
    }
  }

  // Edit Delivery Handlers
  const handleEdit = (delivery) => {
    setEditDelivery(delivery)
    setEditModalOpen(true)
  }

  const handleSaveEdit = async () => {
    try {
      const updatedDelivery = await updateDeliveryStatus(editDelivery._id, {
        status: editDelivery.status,
        deliveryDate: editDelivery.deliveryDate,
        meals: editDelivery.meals
      })
      setDeliveries((prev) =>
        prev.map((d) => (d._id === updatedDelivery._id ? updatedDelivery : d))
      )
      setEditModalOpen(false)
      setEditDelivery(null)
    } catch (error) {
      console.error('Error updating delivery:', error)
    }
  }

  // Delete Delivery Handler
  const handleDelete = async (id) => {
    try {
      await deleteDelivery(id)
      setDeliveries((prev) => prev.filter((d) => d._id !== id))
    } catch (error) {
      console.error('Error deleting delivery:', error)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="crud-section">
      <h2>Manage Deliveries</h2>
      <button onClick={() => setAddModalOpen(true)}>Add New Delivery</button>

      {/* Add Delivery Modal */}
      {isAddModalOpen && (
        <div className="modal">
          <h3>Add Delivery</h3>
          <input
            type="date"
            value={newDelivery.deliveryDate}
            onChange={(e) =>
              setNewDelivery({ ...newDelivery, deliveryDate: e.target.value })
            }
          />
          <textarea
            placeholder="Enter meals, comma-separated"
            value={newDelivery.meals.join(', ')}
            onChange={(e) =>
              setNewDelivery({
                ...newDelivery,
                meals: e.target.value.split(',')
              })
            }
          />
          <button onClick={handleAdd}>Save</button>
          <button onClick={() => setAddModalOpen(false)}>Cancel</button>
        </div>
      )}

      {/* Edit Delivery Modal */}
      {isEditModalOpen && editDelivery && (
        <div className="modal">
          <h3>Edit Delivery</h3>
          <input
            type="date"
            value={new Date(editDelivery.deliveryDate)
              .toISOString()
              .substring(0, 10)}
            onChange={(e) =>
              setEditDelivery({ ...editDelivery, deliveryDate: e.target.value })
            }
          />
          <textarea
            placeholder="Enter meals, comma-separated"
            value={editDelivery.meals.join(', ')}
            onChange={(e) =>
              setEditDelivery({
                ...editDelivery,
                meals: e.target.value.split(',')
              })
            }
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditModalOpen(false)}>Cancel</button>
        </div>
      )}

      {/* Deliveries Table */}
      <table>
        <thead>
          <tr>
            <th>Delivery Date</th>
            <th>Items</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td>{new Date(delivery.deliveryDate).toLocaleDateString()}</td>
              <td>{delivery.meals?.join(', ') || 'No items'}</td>
              <td>{delivery.status}</td>
              <td>
                <button onClick={() => handleEdit(delivery)}>Edit</button>
                <button onClick={() => handleDelete(delivery._id)}>
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

export default DeliveriesCRUD
