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

export let filterByDate = (matches, date, setMatchesByDate) => {
    let result = [];

    result = matches.filter(match => {
        if (match.date == date) {
            return match;
        }
    });

    setMatchesByDate(result);
}

export let filterByTeamsGroup = (teams, group, setTeamsByGroup) => {
    let result = [];

    result = teams.filter(team => {
        if (team.group == group) {
            return team;
        }
    });

    setTeamsByGroup(result);
}