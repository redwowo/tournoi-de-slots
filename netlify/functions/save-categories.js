const { handlePlayersJsonRequest, playersJsonStore, playersJsonPath } = require('./_players-json-api');

exports.handler = async (event) => {
  return handlePlayersJsonRequest(
    event,
    async (payload) => {
      if (!payload?.categories || typeof payload.categories !== 'object') {
        const error = new Error('Body invalide: "categories" est requis');
        error.statusCode = 400;
        throw error;
      }

      playersJsonStore.saveCategories(playersJsonPath, payload.categories);
      return {};
    },
    { successMessage: 'Catégories sauvegardées' }
  );
};
