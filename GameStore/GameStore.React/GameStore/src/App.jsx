import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import GamesList from './components/GamesList';
import GameForm from './components/GameForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<GamesList />} />
          <Route path="/new" element={<GameForm />} />
          <Route path="/edit/:id" element={<GameForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

