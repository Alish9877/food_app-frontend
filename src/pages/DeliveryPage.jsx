import React, { useState } from 'react';
import DeliveryCard from '../components/DeliveryCard'; // Updated import statement
import './DeliveryPage.css';

const DeliveryPage = () => {
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
          <DeliveryCard key={delivery.id} delivery={delivery} handleSave={handleSave} />
        ))}
      </div>
    </div>
  );
};

export default DeliveryPage;
