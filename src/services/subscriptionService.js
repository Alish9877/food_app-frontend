import Client from "./api";


export const GitSubscription = async () => {
  try {
    const response = await Client.get('/Subscriptions')
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Subscriptions:', error)
    throw error;
  }
}

