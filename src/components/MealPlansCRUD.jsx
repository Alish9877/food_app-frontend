const MealPlansCRUD = () => {
  return (
    <div className="crud-section">
      <h2>Manage Meal Plans</h2>
      <button>Add New Meal Plan</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data to be replaced with dynamic content */}
          <tr>
            <td>Plan A</td>
            <td>A healthy meal plan.</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MealPlansCRUD
