import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
    const apiUrl = codespace !== 'localhost' 
      ? `https://${codespace}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';
    
    console.log('Activities API URL:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities data fetched:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Activities processed:', activitiesData);
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4"><div className="loading">Loading activities...</div></div>;
  if (error) return <div className="container mt-4"><div className="error text-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <h2>🏃‍♂️ Activities</h2>
      <p className="text-muted">Track all fitness activities from our superhero teams</p>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Activity Type</th>
            <th>Duration (min)</th>
            <th>Calories Burned</th>
            <th>Distance (km)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.activity_type}</td>
              <td>{activity.duration}</td>
              <td>{activity.calories_burned}</td>
              <td>{activity.distance || 'N/A'}</td>
              <td>{new Date(activity.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
