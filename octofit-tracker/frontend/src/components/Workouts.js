import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
    const apiUrl = codespace !== 'localhost' 
      ? `https://${codespace}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';
    
    console.log('Workouts API URL:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts data fetched:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts processed:', workoutsData);
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4"><div className="loading">Loading workouts...</div></div>;
  if (error) return <div className="container mt-4"><div className="error text-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <h2>💪 Workouts</h2>
      <p className="text-muted">Superhero-inspired workout routines</p>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">{workout.description}</p>
                <div className="d-flex justify-content-between">
                  <span className="badge bg-primary">{workout.category}</span>
                  <span className="badge bg-secondary">{workout.difficulty}</span>
                </div>
                <hr />
                <p><strong>Duration:</strong> {workout.duration} minutes</p>
                <p><strong>Calories:</strong> {workout.calories_per_session} per session</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
