import Client from './api';

// Fetch all deliveries (Admin only)
export const getAllDeliveries = async () => {
  try {
    const response = await Client.get('/deliveries');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch deliveries:', error);
    throw error;
  }
};

// Fetch deliveries for a specific user
export const getUserDeliveries = async (userId) => {
  try {
    const response = await Client.get(`/deliveries/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user deliveries:', error);
    throw error;
  }
};

// Update delivery status (Admin only)
export const updateDeliveryStatus = async (deliveryId, status) => {
  try {
    const response = await Client.put(`/deliveries/${deliveryId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Failed to update delivery status:', error);
    throw error;
  }
};
