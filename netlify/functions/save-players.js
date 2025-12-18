const { handlePlayersJsonRequest, playersJsonStore, playersJsonPath } = require('./_players-json-api');

exports.handler = async (event) => {
  return handlePlayersJsonRequest(
    event,
    async (payload) => {
      if (!payload?.players || typeof payload.players !== 'object') {
        const error = new Error('Body invalide: "players" est requis');
        error.statusCode = 400;
        throw error;
      }

      playersJsonStore.savePlayers(playersJsonPath, payload.players);
      return {};
    },
    { successMessage: 'Joueurs sauvegardés' }
  );
};
