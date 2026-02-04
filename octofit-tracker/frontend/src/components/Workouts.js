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
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.name || 'Unnamed Workout'}</h5>
                <p className="card-text">{workout.description || 'No description available'}</p>
                <div className="d-flex gap-2 mb-3">
                  <span className="badge bg-primary">{workout.category || 'N/A'}</span>
                  <span className={`badge ${
                    workout.difficulty === 'Beginner' ? 'bg-success' :
                    workout.difficulty === 'Intermediate' ? 'bg-warning text-dark' :
                    workout.difficulty === 'Advanced' ? 'bg-danger' : 'bg-secondary'
                  }`}>{workout.difficulty || 'N/A'}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-1"><strong>⏱️ Duration:</strong> {workout.duration || 0} min</p>
                    <p className="mb-0"><strong>🔥 Calories:</strong> {workout.calories_per_session || 0} kcal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
