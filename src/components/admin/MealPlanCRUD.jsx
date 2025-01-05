import { useState, useEffect } from 'react'
import {
  fetchAllMealPlans,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan
} from '../../services/mealPlanService'
import '../admin/MealPlanCRUD.css'

const MealPlanCRUD = () => {
  const [mealPlans, setMealPlans] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    dishes: []
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMealPlans = async () => {
      try {
        const data = await fetchAllMealPlans()
        setMealPlans(data)
      } catch (err) {
        console.error('Error fetching meal plans:', err)
        setError('Failed to load meal plans.')
      }
    }
    loadMealPlans()
  }, [])

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      dishes: []
    })
    setIsEditing(false)
    setEditingId(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDishChange = (e) => {
    const dishes = e.target.value.split(',').map((dish) => dish.trim())
    setFormData((prev) => ({ ...prev, dishes }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await updateMealPlan(editingId, formData)
        setMealPlans((prev) =>
          prev.map((plan) =>
            plan._id === editingId ? { ...plan, ...formData } : plan
          )
        )
      } else {
        const newMealPlan = await createMealPlan(formData)
        setMealPlans((prev) => [...prev, newMealPlan])
      }
      resetForm()
    } catch (err) {
      console.error('Error saving meal plan:', err)
      setError('Failed to save meal plan.')
    }
  }

  const handleEdit = (mealPlan) => {
    setFormData(mealPlan)
    setIsEditing(true)
    setEditingId(mealPlan._id)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this meal plan?'))
      return
    try {
      await deleteMealPlan(id)
      setMealPlans((prev) => prev.filter((plan) => plan._id !== id))
    } catch (err) {
      console.error('Error deleting meal plan:', err)
      setError('Failed to delete meal plan.')
    }
  }

  return (
    <div className="meal-plan-crud">
      <h2>Meal Plans</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Meal Plan Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="dishes"
          placeholder="Dishes (comma-separated)"
          value={formData.dishes.join(', ')}
          onChange={handleDishChange}
          required
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Meal Plan</button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </form>

      <table className="meal-plan-table">
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
          {mealPlans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.name}</td>
              <td>{plan.description}</td>
              <td>${plan.price}</td>
              <td>{plan.dishes.join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(plan)}>Edit</button>
                <button onClick={() => handleDelete(plan._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MealPlanCRUD
