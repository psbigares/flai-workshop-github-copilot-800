import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                height="30" 
                className="d-inline-block align-top me-2"
              />
              OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="container mt-4">
              <div className="hero-section">
                <div className="hero-icon">💪🏋️‍♀️🦸</div>
                <h1>Welcome to OctoFit Tracker</h1>
                <p className="lead">Track your fitness journey with superhero style!</p>
                <div className="mt-4">
                  <Link to="/leaderboard" className="btn btn-primary btn-lg me-3">View Leaderboard</Link>
                  <Link to="/workouts" className="btn btn-outline-primary btn-lg">Browse Workouts</Link>
                </div>
              </div>
              
              <div className="row mt-5">
                <div className="col-md-4 mb-4">
                  <Link to="/users" className="text-decoration-none">
                    <div className="card h-100 hover-card">
                      <div className="card-body text-center">
                        <div className="display-3 mb-3">👥</div>
                        <h5 className="card-title">Users</h5>
                        <p className="card-text">View all registered superhero members and their profiles</p>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-md-4 mb-4">
                  <Link to="/activities" className="text-decoration-none">
                    <div className="card h-100 hover-card">
                      <div className="card-body text-center">
                        <div className="display-3 mb-3">🏃‍♂️</div>
                        <h5 className="card-title">Activities</h5>
                        <p className="card-text">Track all fitness activities and workout sessions</p>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-md-4 mb-4">
                  <Link to="/leaderboard" className="text-decoration-none">
                    <div className="card h-100 hover-card">
                      <div className="card-body text-center">
                        <div className="display-3 mb-3">🏆</div>
                        <h5 className="card-title">Leaderboard</h5>
                        <p className="card-text">See the top performers ranked by calories burned</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-4">
                  <Link to="/teams" className="text-decoration-none">
                    <div className="card h-100 hover-card">
                      <div className="card-body text-center">
                        <div className="display-3 mb-3">🦸‍♂️</div>
                        <h5 className="card-title">Teams</h5>
                        <p className="card-text">Join Team Marvel or Team DC and compete together</p>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-md-6 mb-4">
                  <Link to="/workouts" className="text-decoration-none">
                    <div className="card h-100 hover-card">
                      <div className="card-body text-center">
                        <div className="display-3 mb-3">💪</div>
                        <h5 className="card-title">Workouts</h5>
                        <p className="card-text">Browse superhero-inspired workout routines</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          } />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
