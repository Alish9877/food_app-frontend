import React, { useState } from "react";

const SubscriptionPage = () => {
  // State to track the selected days
  const [selectedDays, setSelectedDays] = useState([]);
  
  // Function to handle day selection
  const handleDayChange = (day) => {
    setSelectedDays((prevSelectedDays) => {
      // If the day is already selected, unselect it
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      }

      // If there are already 5 selected days, don't allow more
      if (prevSelectedDays.length >= 5) {
        alert("You can only select up to 5 days.");
        return prevSelectedDays;
      }

      // Otherwise, add the day to the selected list
      return [...prevSelectedDays, day];
    });
  };

  return (
    <div className="subscription-page">
      <h1>Days & Time</h1>
      <h3>Subscription days</h3>
      <div>
        <button onClick={() => handleDayChange("Sunday")}>
          <input type="checkbox" checked={selectedDays.includes("Sunday")} readOnly /> Sunday
        </button>
        <button onClick={() => handleDayChange("Monday")}>
          <input type="checkbox" checked={selectedDays.includes("Monday")} readOnly /> Monday
        </button>
        <button onClick={() => handleDayChange("Tuesday")}>
          <input type="checkbox" checked={selectedDays.includes("Tuesday")} readOnly /> Tuesday
        </button>
        <button onClick={() => handleDayChange("Wednesday")}>
          <input type="checkbox" checked={selectedDays.includes("Wednesday")} readOnly /> Wednesday
        </button>
        <button onClick={() => handleDayChange("Thursday")}>
          <input type="checkbox" checked={selectedDays.includes("Thursday")} readOnly /> Thursday
        </button>
        <button onClick={() => handleDayChange("Friday")}>
          <input type="checkbox" checked={selectedDays.includes("Friday")} readOnly /> Friday
        </button>
        <button onClick={() => handleDayChange("Saturday")}>
          <input type="checkbox" checked={selectedDays.includes("Saturday")} readOnly /> Saturday
        </button>
      </div>

      <h3>Starting Day</h3>
      <input type="date" />

      <h3>Delivery Time</h3>
      <button>
        <input type="checkbox" /> 7AM to 11AM (Morning)
      </button>
      <button>
        <input type="checkbox" /> 6PM to 10PM (Night before)
      </button>

      <button type="submit">Continue</button>

      <p>You can always skip a day or make changes from your settings.</p>
    </div>
  );
};

export default SubscriptionPage;
