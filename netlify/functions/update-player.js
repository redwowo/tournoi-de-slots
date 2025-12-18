const { handlePlayersJsonRequest, playersJsonStore, playersJsonPath } = require('./_players-json-api');

exports.handler = async (event) => {
  return handlePlayersJsonRequest(
    event,
    async (payload) => {
      const { category, oldName, newName } = payload;
      
      if (!category) {
        const error = new Error('Le nom de la catégorie est requis');
        error.statusCode = 400;
        throw error;
      }
      
      if (!oldName || !newName) {
        const error = new Error('Ancien et nouveau nom du joueur sont requis');
        error.statusCode = 400;
        throw error;
      }
      
      // Read current data
      const categories = playersJsonStore.readPlayersJson(playersJsonPath);
      
      if (!categories[category]) {
        const error = new Error('Catégorie non trouvée');
        error.statusCode = 404;
        throw error;
      }
      
      // Find the player to update
      const playerIndex = categories[category].players.findIndex(
        player => player.name === oldName
      );
      
      if (playerIndex === -1) {
        const error = new Error('Joueur non trouvé');
        error.statusCode = 404;
        throw error;
      }
      
      // Check if new name already exists in this category
      const nameExists = categories[category].players.some(
        player => player.name === newName
      );
      
      if (nameExists) {
        const error = new Error('Un joueur avec ce nom existe déjà');
        error.statusCode = 400;
        throw error;
      }
      
      // Update the player name
      categories[category].players[playerIndex].name = newName;
      
      // Save changes
      return playersJsonStore.writePlayersJson(playersJsonPath, categories);
    },
    { successMessage: 'Joueur mis à jour' }
  );
};