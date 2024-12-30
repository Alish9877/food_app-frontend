import Client from './api'

// Fetch all deliveries (Admin only)
export const fetchAllDeliveries = async () => {
  try {
    const res = await Client.get('/deliveries')
    return res.data
  } catch (error) {
    console.error('Error fetching all deliveries:', error)
    throw error.response?.data || 'Error fetching all deliveries'
  }
}

// Fetch deliveries for a specific user
export const fetchUserDeliveries = async (userId) => {
  try {
    const res = await Client.get(`/deliveries/user/${userId}`)
    return res.data
  } catch (error) {
    console.error('Error fetching user deliveries:', error)
    throw error.response?.data || 'Error fetching user deliveries'
  }
}

// Assign meals to a delivery (Admin only)
export const assignMealsToDelivery = async (deliveryId, meals) => {
  try {
    const res = await Client.post(`/deliveries/${deliveryId}/assign`, { meals })
    return res.data
  } catch (error) {
    console.error('Error assigning meals to delivery:', error)
    throw error.response?.data || 'Error assigning meals to delivery'
  }
}

// Update delivery status (Admin only)
export const updateDeliveryStatus = async (deliveryId, status) => {
  try {
    const res = await Client.put(`/deliveries/${deliveryId}/status`, { status })
    return res.data
  } catch (error) {
    console.error('Error updating delivery status:', error)
    throw error.response?.data || 'Error updating delivery status'
  }
}
