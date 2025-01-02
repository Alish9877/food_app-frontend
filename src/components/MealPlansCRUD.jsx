import { useEffect, useState } from 'react'
import {
  fetchAllMealPlans,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan
} from '../services/mealPlanService'

const MealPlansCRUD = () => {
  const [mealPlans, setMealPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newMealPlan, setNewMealPlan] = useState({
    name: '',
    description: '',
    price: 0,
    dishes: []
  })
  const [editMealPlan, setEditMealPlan] = useState(null)
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)

  // Fetch all meal plans on mount
  useEffect(() => {
    const getMealPlans = async () => {
      try {
        const data = await fetchAllMealPlans()
        setMealPlans(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load meal plans.')
        setLoading(false)
      }
    }
    getMealPlans()
  }, [])

  // Add Meal Plan Handler
  const handleAdd = async () => {
    try {
      const addedMealPlan = await createMealPlan(newMealPlan)
      setMealPlans((prev) => [...prev, addedMealPlan])
      setAddModalOpen(false)
      setNewMealPlan({ name: '', description: '', price: 0, dishes: [] })
    } catch (error) {
      console.error('Error adding meal plan:', error)
    }
  }

  // Edit Meal Plan Handlers
  const handleEdit = (mealPlan) => {
    setEditMealPlan(mealPlan)
    setEditModalOpen(true)
  }

  const handleSaveEdit = async () => {
    try {
      const updatedMealPlan = await updateMealPlan(editMealPlan._id, {
        name: editMealPlan.name,
        description: editMealPlan.description,
        price: editMealPlan.price,
        dishes: editMealPlan.dishes
      })
      setMealPlans((prev) =>
        prev.map((mp) =>
          mp._id === updatedMealPlan._id ? updatedMealPlan : mp
        )
      )
      setEditModalOpen(false)
      setEditMealPlan(null)
    } catch (error) {
      console.error('Error updating meal plan:', error)
    }
  }

  // Delete Meal Plan Handler
  const handleDelete = async (id) => {
    try {
      await deleteMealPlan(id)
      setMealPlans((prev) => prev.filter((mp) => mp._id !== id))
    } catch (error) {
      console.error('Error deleting meal plan:', error)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="crud-section">
      <h2>Manage Meal Plans</h2>
      <button onClick={() => setAddModalOpen(true)}>Add New Meal Plan</button>

      {/* Add Meal Plan Modal */}
      {isAddModalOpen && (
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
              setNewMealPlan({ ...newMealPlan, price: Number(e.target.value) })
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
          <button onClick={handleAdd}>Save</button>
          <button onClick={() => setAddModalOpen(false)}>Cancel</button>
        </div>
      )}

      {/* Edit Meal Plan Modal */}
      {isEditModalOpen && editMealPlan && (
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
              setEditMealPlan({ ...editMealPlan, description: e.target.value })
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
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditModalOpen(false)}>Cancel</button>
        </div>
      )}

      {/* Meal Plans Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mealPlans.map((mealPlan) => (
            <tr key={mealPlan._id}>
              <td>{mealPlan.name}</td>
              <td>{mealPlan.description}</td>
              <td>
                <button onClick={() => handleEdit(mealPlan)}>Edit</button>
                <button onClick={() => handleDelete(mealPlan._id)}>
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

export default MealPlansCRUD
