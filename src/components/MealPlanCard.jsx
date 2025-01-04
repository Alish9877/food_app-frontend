import './MealPlanCard.css'

const MealPlanCard = ({ mealPlan, onAdd, onRemove, selected }) => {
  const getImageSrc = () => {
    if (mealPlan.image?.url) return mealPlan.image.url
    if (mealPlan.image?.data) {
      return `data:${mealPlan.image.contentType};base64,${Buffer.from(
        mealPlan.image.data
      ).toString('base64')}`
    }
    return ''
  }

  const imageSrc = getImageSrc()

  return (
    <div className={`meal-plan-card ${selected ? 'selected' : ''}`}>
      {imageSrc && <img src={imageSrc} alt={mealPlan.name} />}
      <h3>{mealPlan.name}</h3>
      <p>Price: ${mealPlan.price}</p>
      <div className="button-group">
        {!selected ? (
          <button className="add-button" onClick={() => onAdd(mealPlan)}>
            Add
          </button>
        ) : (
          <button className="remove-button" onClick={() => onRemove(mealPlan)}>
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default MealPlanCard
