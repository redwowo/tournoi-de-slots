const { handlePlayersJsonRequest, playersJsonStore, playersJsonPath } = require('./_players-json-api');

exports.handler = async (event) => {
  return handlePlayersJsonRequest(
    event,
    async (payload) => {
      return playersJsonStore.addCategory(playersJsonPath, {
        categoryName: payload?.categoryName,
        color: payload?.color,
        imagePath: payload?.imagePath
      });
    },
    { successMessage: 'Catégorie ajoutée' }
  );
};
