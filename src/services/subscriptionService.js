
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
=======
import Client from "./api";


// fetch the subscribers
export const GetAllSubscribers = async () => {
  try {
    const response = await Client.get('/subscriptions')
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Subscribers:', error)
    throw error
  }
}

//fetch by id 
export const getUserSubscribers = async (userId) => {
  try {
    const response = await Client.get(`/subscriptions/user/${userId}`)
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user Subscribers:', error)
    throw error
  }
}


// add new subscriber
export const NewSubscribers = async (subscriptiondata) => {
  try {
    const response = await Client.post('/subscriptions/new', subscriptiondata)
    return response.data
  } catch (error) {
    console.error('Error Subscribtion user:', error)
    throw error
  }
}


// delete subscriber
export const CancelSubscription = async (subscriptionId) => {
  try {
    const response = await Client.delete(`/subscriptions/user/${subscriptionId}`)
    return response.data
  } catch (error) {
    console.log('error deleting subscriber' , error);
  throw error 
  }
}

