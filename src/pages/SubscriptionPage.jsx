import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SubscriptionCard from '../components/SubscriptionCard';
import "./SubscriptionPage.css"
const SubscriptionPage = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startingDay, setStartingDay] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [selectedMeals, setSelectedMeals] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const meals = queryParams.getAll('meal');
    setSelectedMeals(meals);
  }, [location]);

  // handle day selection
  const handleDayChange = (day) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      }
      if (prevSelectedDays.length >= 5) {
        alert("You can only select up to 5 days.");
        return prevSelectedDays;
      }
      return [...prevSelectedDays, day];
    });
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const subscriptionData = {
      startingDay,
      deliveryTime,
      selectedMeals,
      totalPrice: selectedMeals.length * 10, // Example price calculation
    };

    navigate('/deliveries', { state: { subscriptionData } });
  };

  return (
    <div className="subscription-page">
      <h1>Days & Time</h1>
      <h3>Subscription days</h3>
      <div>
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
          <button key={day} onClick={() => handleDayChange(day)}>
            <input type="checkbox" checked={selectedDays.includes(day)} readOnly /> {day}
          </button>
        ))}
      </div>

      <h3>Starting Day</h3>
      <input
        type="date"
        value={startingDay}
        onChange={(e) => setStartingDay(e.target.value)}
      />

      <h3>Delivery Time</h3>
      <button onClick={() => setDeliveryTime("7AM to 11AM (Morning)")}>
        <input type="checkbox" /> 7AM to 11AM (Morning)
      </button>
      <button onClick={() => setDeliveryTime("6PM to 10PM (Night before)")}>
        <input type="checkbox" /> 6PM to 10PM (Night before)
      </button>

      <button type="submit" onClick={handleSubmit}>
        Continue
      </button>

      <p>You can always skip a day or make changes from your settings.</p>

      <SubscriptionCard
        subscription={{
          mealPlanName: "Your Selected Meal Plan",
          startDate: startingDay,
          duration: 1, // Example duration
          mealsPerDay: selectedMeals.length,
          price: selectedMeals.length * 10, // Example price calculation
        }}
        selectedMeals={selectedMeals}
      />
    </div>
  );
};

export default SubscriptionPage;
