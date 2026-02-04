import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
    const baseUrl = codespace !== 'localhost' 
      ? `https://${codespace}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';
    
    console.log('Activities API URL:', baseUrl);

    // Fetch all data in parallel
    Promise.all([
      fetch(`${baseUrl}/activities/`).then(res => res.json()),
      fetch(`${baseUrl}/users/`).then(res => res.json()),
      fetch(`${baseUrl}/teams/`).then(res => res.json())
    ])
      .then(([activitiesData, usersData, teamsData]) => {
        console.log('Activities data fetched:', activitiesData);
        const processedActivities = activitiesData.results || activitiesData;
        const processedUsers = usersData.results || usersData;
        const processedTeams = teamsData.results || teamsData;
        
        setActivities(Array.isArray(processedActivities) ? processedActivities : []);
        setUsers(Array.isArray(processedUsers) ? processedUsers : []);
        setTeams(Array.isArray(processedTeams) ? processedTeams : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getUserName = (userId) => {
    const user = users.find(u => u._id === userId);
    return user ? user.name : 'Unknown';
  };

  const getTeamName = (userId) => {
    const user = users.find(u => u._id === userId);
    if (!user) return 'N/A';
    const team = teams.find(t => t._id === user.team_id);
    return team ? team.name : 'N/A';
  };

  if (loading) return <div className="container mt-4"><div className="loading">Loading activities...</div></div>;
  if (error) return <div className="container mt-4"><div className="error text-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <h2>🏃‍♂️ Activities</h2>
      <p className="text-muted">Track all fitness activities from our superhero teams</p>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>User</th>
            <th>Team</th>
            <th>Activity Type</th>
            <th>Duration (min)</th>
            <th>Calories</th>
            <th>Distance (km)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => {
            const activityDate = activity.date ? new Date(activity.date) : null;
            const formattedDate = activityDate && !isNaN(activityDate.getTime()) 
              ? activityDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
              : 'N/A';
            const teamName = getTeamName(activity.user_id);
            
            return (
              <tr key={activity._id}>
                <td><strong>{getUserName(activity.user_id)}</strong></td>
                <td>
                  <span className={`badge ${
                    teamName.includes('Marvel') ? 'bg-danger' : 'bg-primary'
                  }`}>
                    {teamName}
                  </span>
                </td>
                <td>{activity.activity_type}</td>
                <td>{activity.duration}</td>
                <td>{activity.calories_burned}</td>
                <td>{activity.distance || 'N/A'}</td>
                <td>{formattedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
