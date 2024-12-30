import Client from './api'

// Fetch all subscriptions (Admin only)
export const fetchAllSubscriptions = async () => {
  try {
    const res = await Client.get('/subscriptions')
    return res.data
  } catch (error) {
    console.error('Error fetching all subscriptions:', error)
    throw error.response?.data || 'Error fetching all subscriptions'
  }
}

// Fetch subscriptions for a specific user
export const fetchUserSubscriptions = async (userId) => {
  try {
    const res = await Client.get(`/subscriptions/user/${userId}`)
    return res.data
  } catch (error) {
    console.error('Error fetching user subscriptions:', error)
    throw error.response?.data || 'Error fetching user subscriptions'
  }
}

// Create a new subscription
export const createSubscription = async (subscriptionData) => {
  try {
    const res = await Client.post('/subscriptions', subscriptionData)
    return res.data
  } catch (error) {
    console.error('Error creating subscription:', error)
    throw error.response?.data || 'Error creating subscription'
  }
}

// Update an existing subscription
export const updateSubscription = async (subscriptionId, subscriptionData) => {
  try {
    const res = await Client.put(
      `/subscriptions/${subscriptionId}`,
      subscriptionData
    )
    return res.data
  } catch (error) {
    console.error('Error updating subscription:', error)
    throw error.response?.data || 'Error updating subscription'
  }
}

// Cancel a subscription
export const cancelSubscription = async (subscriptionId) => {
  try {
    const res = await Client.delete(`/subscriptions/${subscriptionId}`)
    return res.data
  } catch (error) {
    console.error('Error canceling subscription:', error)
    throw error.response?.data || 'Error canceling subscription'
  }
}
