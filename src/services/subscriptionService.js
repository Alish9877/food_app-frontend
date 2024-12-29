import Client from './api';

// Fetch all subscriptions (Admin only)
export const getAllSubscriptions = async () => {
  try {
    const response = await Client.get('/subscriptions');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch subscriptions:', error);
    throw error;
  }
};

// Fetch subscriptions for a specific user
export const getUserSubscriptions = async (userId) => {
  try {
    const response = await Client.get(`/subscriptions/user/${userId}`);
    return response.data; 
  } catch (error) {
    console.error('Failed to fetch user subscriptions:', error);
    throw error;
  }
};

// Create a new subscription
export const createSubscription = async (subscriptionData) => {
  try {
    const response = await Client.post('/subscriptions', subscriptionData);
    return response.data;
  } catch (error) {
    console.error('Failed to create subscription:', error);
    throw error;
  }
};

// Cancel an existing subscription
export const cancelSubscription = async (subscriptionId) => {
  try {
    const response = await Client.delete(`/subscriptions/${subscriptionId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to cancel subscription:', error);
    throw error;
  }
};