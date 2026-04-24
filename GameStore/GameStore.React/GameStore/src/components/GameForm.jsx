import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createGame, updateGame, fetchGameById, fetchGenres } from '../services/gameService';
import './GameForm.css';

export default function GameForm() {
  const [formData, setFormData] = useState({
    name: '',
    genreId: '',
    price: '',
    releaseDate: '',
  });
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadGenres();
    if (id) {
      loadGame();
    }
  }, [id]);

  const loadGenres = async () => {
    try {
      const data = await fetchGenres();
      setGenres(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading genres:', err);
    }
  };

  const loadGame = async () => {
    try {
      setLoading(true);
      setIsEditing(true);
      const data = await fetchGameById(id);
      setFormData({
        name: data.name,
        genreId: data.genreId,
        price: data.price,
        releaseDate: data.releaseDate,
      });
    } catch (err) {
      setError(err.message);
      console.error('Error loading game:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim()) {
      setError('Game name is required');
      return;
    }
    if (!formData.genreId) {
      setError('Genre is required');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Valid price is required');
      return;
    }
    if (!formData.releaseDate) {
      setError('Release date is required');
      return;
    }

    try {
      setLoading(true);
      const gameData = {
        name: formData.name,
        genreId: parseInt(formData.genreId),
        price: parseFloat(formData.price),
        releaseDate: formData.releaseDate,
      };

      if (isEditing) {
        await updateGame(id, gameData);
      } else {
        await createGame(gameData);
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
      console.error('Error saving game:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading && isEditing) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Loading game...</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h2 className="card-title mb-4">
                {isEditing ? 'Edit Game' : 'Create New Game'}
              </h2>

              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setError(null)}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Game Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter game name"
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="genreId" className="form-label">
                    Genre
                  </label>
                  <select
                    className="form-select"
                    id="genreId"
                    name="genreId"
                    value={formData.genreId}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Select a genre</option>
                    {genres.map(genre => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="releaseDate" className="form-label">
                    Release Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="releaseDate"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary flex-grow-1"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : isEditing ? 'Update Game' : 'Create Game'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
