import { useState } from 'react';
import './DeliveryCard.css';

const DeliveryCard = ({ delivery, handleSave }) => {
  const { deliveryDate, deliveryTime, status, meals, totalPrice } = delivery;
  const [building, setBuilding] = useState('');
  const [block, setBlock] = useState('');
  const [street, setStreet] = useState('');
  const [flat, setFlat] = useState('');

  const handleSaveClick = () => {
    const updatedDelivery = {
      ...delivery,
      building,
      block,
      street,
      flat,
    };
    handleSave(updatedDelivery);
  };

  return (
    <div className="delivery-card">
      <h3>Delivery Date: {new Date(deliveryDate).toLocaleDateString()}</h3>
      <p>Delivery Time: {deliveryTime}</p>
      <p>Status: {status}</p>
      <ul>
        {meals && meals.map((meal, index) => <li key={index}>{meal}</li>)}
      </ul>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <div className="optional-fields">
        <input
          type="text"
          placeholder="Building"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
        />
        <input
          type="text"
          placeholder="Block"
          value={block}
          onChange={(e) => setBlock(e.target.value)}
        />
        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          type="text"
          placeholder="Flat"
          value={flat}
          onChange={(e) => setFlat(e.target.value)}
        />
      </div>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default DeliveryCard;
