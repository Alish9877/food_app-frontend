import React from "react";
import { Link } from "react-router-dom";
import '../index.css'

const HomePage = () => {

  return (
    <div className="home-page">
      <p>Subscribe to Delicious Meals Today!</p>
      <div className="home-buttons">
        <button>
          <Link to='/subscriptions'>
          Subscription
          </Link>
        </button>
        <button>
          <Link to='/meal-plans'>
          Meal Plans
          </Link>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
