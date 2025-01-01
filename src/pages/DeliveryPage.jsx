import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DeliveryCard from '../components/DeliveryCard';
import './DeliveryPage.css';

const DeliveryPage = () => {
  const location = useLocation();
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      deliveryDate: '2023-12-31',
      status: 'Pending',
      meals: ['Meal 1', 'Meal 2', 'Meal 3'],
    },
    {
      id: 2,
      deliveryDate: '2024-01-01',
      status: 'Delivered',
      meals: ['Meal A', 'Meal B', 'Meal C'],
    },
  ]);
  const [selectedMeals, setSelectedMeals] = useState([]);

  useEffect(() => {
    if (location.state && location.state.subscriptionData) {
      const { selectedDays, startingDay, deliveryTime, selectedMeals } = location.state.subscriptionData;
      setSelectedMeals(selectedMeals);
      const newDelivery = {
        id: deliveries.length + 1,
        deliveryDate: startingDay,
        status: 'Pending',
        meals: selectedMeals,
      };
      setDeliveries([...deliveries, newDelivery]);
    }
  }, [location.state]);

  const handleSave = (updatedDelivery) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === updatedDelivery.id ? updatedDelivery : delivery
      )
    );
    console.log('Saved delivery:', updatedDelivery);
  };

  return (
    <div className="delivery-page">
      <h1>Deliveries</h1>
      <p>Track your meal deliveries here.</p>
      <div className="delivery-container">
        {deliveries && deliveries.map((delivery) => (
          <DeliveryCard
            key={delivery.id}
            delivery={delivery}
            handleSave={handleSave}
            selectedMeals={selectedMeals}
          />
        ))}
      </div>
    </div>
  );
};

export default DeliveryPage;
