export let filterTeamById = (teams, teamId) => {
    return teams.filter(team => team.id == teamId);
};

export let filterPlayersByTeamId = (players, teamId) => {
    return players.filter(player => player.teamId == teamId);
};

export let filterMatchById = (matches, matchId) => {
    return matches.filter(match => match.id == matchId);
};

export let filterPlayersByPlayerId = (players, playerId) => {
    return players.filter(player => player.id == playerId);
};

export let filterRecordsByPlayerId = (records, playerId) => {
    return records.filter(record => record.playerId == playerId);
};