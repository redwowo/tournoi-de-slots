const { handlePlayersJsonRequest, playersJsonStore, playersJsonPath } = require('./_players-json-api');

exports.handler = async (event) => {
  return handlePlayersJsonRequest(
    event,
    async (payload) => {
      return playersJsonStore.addPlayer(playersJsonPath, {
        category: payload?.category,
        playerName: payload?.playerName
      });
    },
    { successMessage: 'Joueur ajouté' }
  );
};
