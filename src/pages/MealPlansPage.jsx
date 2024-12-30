import MealPlanCard from "../components/MealPlanCard";
// import { useState , useEffect } from "react";
// import axios from "axios";

const MealPlansPage = () => {
// const [mealPlans , setMealPlans] = useState([])
// const [loading , setLoading] = useState(true)
// const [error , setError] = useState(null)

// useEffect(() => {
//   const fetchMealPlans = async ()  => {
//     try {
//       const response = await fetchMealPlans()
//       setMealPlans(response.data)
//     } catch (error) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }
//   })

const MealPlans = [{}]

return (
    <div>
      <h2>Meal Plans:</h2>
      <div>
        {MealPlans.map((plan, index) => {
          return <MealPlanCard key={index} mealPlan={plan} />;
        })}
      </div>
    </div>
  )
}
export default MealPlansPage;
