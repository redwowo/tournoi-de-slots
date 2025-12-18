const { handlePlayersJsonRequest, playersJsonStore, playersJsonPath } = require('./_players-json-api');

exports.handler = async (event) => {
  return handlePlayersJsonRequest(
    event,
    async (payload) => {
      return playersJsonStore.deleteCategory(playersJsonPath, {
        categoryName: payload?.categoryName
      });
    },
    { successMessage: 'Catégorie supprimée' }
  );
};
