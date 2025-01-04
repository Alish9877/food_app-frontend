import { useEffect, useState } from 'react'
import { fetchUserDeliveries } from '../services/deliveryService'
import { fetchUserSubscriptions } from '../services/subscriptionService'
import './DashboardPage.css'

const DashboardPage = ({ user }) => {
  const [subscriptions, setSubscriptions] = useState([])
  const [deliveries, setDeliveries] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const subscriptionsData = await fetchUserSubscriptions(user.id)
          const deliveriesData = await fetchUserDeliveries(user.id)
          setSubscriptions(subscriptionsData)
          setDeliveries(deliveriesData)
        } catch (err) {
          console.error('Error fetching data:', err)
          setError('Failed to fetch subscriptions or deliveries.')
        }
      }
    }
    fetchData()
  }, [user])

  if (!user) {
    return <p>Please log in to access your dashboard.</p>
  }

  const getDeliveriesForSubscription = (subscriptionId) => {
    return deliveries.filter(
      (delivery) => delivery.subscription._id === subscriptionId
    )
  }

  return (
    <div className="dashboard-page">
      <h1>Welcome to the Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <div className="dashboard-info">
        <p>
          <strong>User:</strong> {user.username}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
      <div className="dashboard-data">
        <h3>Your Subscriptions and Deliveries</h3>
        {subscriptions.length === 0 ? (
          <p>No subscriptions found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Cost</th>
                <th>Meal Plans</th>
                <th>Deliveries</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, index) => (
                <tr key={sub._id}>
                  <td>Subscription {index + 1}</td>
                  <td>{new Date(sub.startDate).toLocaleDateString()}</td>
                  <td>
                    {new Date(
                      new Date(sub.startDate).setMonth(
                        new Date(sub.startDate).getMonth() + sub.duration
                      )
                    ).toLocaleDateString()}
                  </td>
                  <td>${sub.price * sub.duration}</td>
                  <td>
                    <ul>
                      {sub.mealPlans.map((meal) => (
                        <li key={meal._id}>{meal.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {getDeliveriesForSubscription(sub._id).map((delivery) => (
                        <li key={delivery._id}>
                          <strong>Date:</strong>{' '}
                          {new Date(delivery.deliveryDate).toLocaleDateString()}{' '}
                          <br />
                          <strong>Status:</strong> {delivery.status} <br />
                          <strong>Address:</strong> {delivery.location}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
