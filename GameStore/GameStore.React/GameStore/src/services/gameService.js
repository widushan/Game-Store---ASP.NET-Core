const API_BASE_URL = 'http://localhost:5294/games';

// Get all games
export const fetchGames = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }
  return response.json();
};

// Get a single game by ID
export const fetchGameById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch game');
  }
  return response.json();
};

// Create a new game
export const createGame = async (gameData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameData),
  });
  if (!response.ok) {
    throw new Error('Failed to create game');
  }
  return response.json();
};

// Update an existing game
export const updateGame = async (id, gameData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameData),
  });
  if (!response.ok) {
    throw new Error('Failed to update game');
  }
  return response.text();
};

// Delete a game
export const deleteGame = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete game');
  }
  return response.text();
};

// Fetch all genres
export const fetchGenres = async () => {
  const response = await fetch('http://localhost:5294/genres');
  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }
  return response.json();
};
