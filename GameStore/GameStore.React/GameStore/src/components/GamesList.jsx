import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGames, deleteGame } from '../services/gameService';
import './GamesList.css';

export default function GamesList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchGames();
      setGames(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading games:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await deleteGame(id);
        setGames(games.filter(game => game.id !== id));
      } catch (err) {
        setError(err.message);
        console.error('Error deleting game:', err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleNewGame = () => {
    navigate('/new');
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Loading games...</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Game Store</h1>
        <button
          className="btn btn-primary"
          onClick={handleNewGame}
        >
          New Game
        </button>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
          ></button>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game.id}>
                <td>{game.name}</td>
                <td>{game.genre}</td>
                <td>${game.price.toFixed(2)}</td>
                <td>{new Date(game.releaseDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(game.id)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(game.id)}
                    title="Delete"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {games.length === 0 && !loading && (
        <div className="alert alert-info">
          No games found. <button className="btn btn-link" onClick={handleNewGame}>Create one</button>
        </div>
      )}
    </div>
  );
}
