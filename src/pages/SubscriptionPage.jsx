import React, { useState } from "react";

const SubscriptionPage = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startingDay, setStartingDay] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const subscriptionData = {
      selectedDays,
      startingDay,
      deliveryTime,
    };

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriptionData),
      });

      if (response.ok) {
        // Handle success, like redirecting the user
        alert("Subscription successful!");
      } else {
        // Handle error
        alert("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
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
    </div>
  );
};

export default SubscriptionPage;
