import { useState, useEffect } from 'react'
import {
  fetchAllMealPlans,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan
} from '../../services/mealPlanService'

const MealPlanCRUD = () => {
  const [mealPlans, setMealPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mealPlanForm, setMealPlanForm] = useState({
    name: '',
    description: '',
    price: 0,
    dishes: []
  })
  const [editingMealPlan, setEditingMealPlan] = useState(null)

  useEffect(() => {
    loadMealPlans()
  }, [])

  const loadMealPlans = async () => {
    setLoading(true)
    try {
      const data = await fetchAllMealPlans()
      setMealPlans(data)
      setError(null)
    } catch (err) {
      setError('Failed to load meal plans.')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveMealPlan = async () => {
    try {
      if (editingMealPlan) {
        const updated = await updateMealPlan(editingMealPlan._id, mealPlanForm)
        setMealPlans((prev) =>
          prev.map((mp) => (mp._id === updated._id ? updated : mp))
        )
      } else {
        const added = await createMealPlan(mealPlanForm)
        setMealPlans((prev) => [...prev, added])
      }
      resetForm()
    } catch (err) {
      console.error('Error saving meal plan:', err)
    }
  }

  const handleEditMealPlan = (mealPlan) => {
    setEditingMealPlan(mealPlan)
    setMealPlanForm({
      name: mealPlan.name,
      description: mealPlan.description,
      price: mealPlan.price,
      dishes: mealPlan.dishes.join(', ')
    })
  }

  const handleDeleteMealPlan = async (id) => {
    try {
      await deleteMealPlan(id)
      setMealPlans((prev) => prev.filter((mp) => mp._id !== id))
    } catch (err) {
      console.error('Error deleting meal plan:', err)
    }
  }

  const resetForm = () => {
    setMealPlanForm({ name: '', description: '', price: 0, dishes: [] })
    setEditingMealPlan(null)
  }

  if (loading) return <p>Loading meal plans...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="meal-plan-crud">
      <h2>{editingMealPlan ? 'Edit Meal Plan' : 'Add Meal Plan'}</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={mealPlanForm.name}
          onChange={(e) =>
            setMealPlanForm({ ...mealPlanForm, name: e.target.value })
          }
        />
        <textarea
          placeholder="Description"
          value={mealPlanForm.description}
          onChange={(e) =>
            setMealPlanForm({ ...mealPlanForm, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={mealPlanForm.price}
          onChange={(e) =>
            setMealPlanForm({ ...mealPlanForm, price: Number(e.target.value) })
          }
        />
        <textarea
          placeholder="Dishes (comma-separated)"
          value={mealPlanForm.dishes}
          onChange={(e) =>
            setMealPlanForm({ ...mealPlanForm, dishes: e.target.value })
          }
        />
        <button onClick={handleSaveMealPlan}>
          {editingMealPlan ? 'Update' : 'Add'}
        </button>
        {editingMealPlan && <button onClick={resetForm}>Cancel</button>}
      </div>

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
              <td>{mp.dishes.join(', ')}</td>
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

export default MealPlanCRUD
