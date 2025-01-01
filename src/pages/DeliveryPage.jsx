import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DeliveryCard from '../components/DeliveryCard';
import './DeliveryPage.css';

const DeliveryPage = () => {
  const location = useLocation();
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    if (location.state && location.state.subscriptionData) {
      const { startingDay, deliveryTime, selectedMeals, totalPrice } = location.state.subscriptionData;
      const newDelivery = {
        id: deliveries.length + 1,
        deliveryDate: startingDay,
        deliveryTime,
        status: 'Pending',
        meals: selectedMeals,
        totalPrice,
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
          />
        ))}
      </div>
    </div>
  );
};

export default DeliveryPage;
