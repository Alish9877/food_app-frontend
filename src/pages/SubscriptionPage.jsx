import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubscriptionCard from '../components/SubscriptionCard'; // Updated import statement
import './SubscriptionPage.css';

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s');
      setSubscriptions(response.data.meals);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  return (
    <div className="subscription-page">
      <h1>Subscriptions</h1>
      <div className="subscription-container">
        {subscriptions && subscriptions.map((subscription) => (
          <SubscriptionCard key={subscription.idMeal} subscription={subscription} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
