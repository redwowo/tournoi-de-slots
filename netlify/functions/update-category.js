const { handlePlayersJsonRequest, playersJsonStore, playersJsonPath } = require('./_players-json-api');

exports.handler = async (event) => {
  return handlePlayersJsonRequest(
    event,
    async (payload) => {
      const { category, color, imagePath } = payload;
      
      if (!category) {
        const error = new Error('Le nom de la catégorie est requis');
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
      
      // Update properties
      if (color !== undefined) {
        categories[category].color = color;
      }
      if (imagePath !== undefined) {
        categories[category].imagePath = imagePath;
      }
      
      // Save changes
      return playersJsonStore.writePlayersJson(playersJsonPath, categories);
    },
    { successMessage: 'Catégorie mise à jour' }
  );
};