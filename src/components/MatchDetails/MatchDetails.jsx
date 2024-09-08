import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './MatchDetails.css';
import { matchesInfo } from "../../services/matchServices";
import { teamsInfo } from "../../services/teamsServices";
import { playersInfo } from "../../services/playersServices";


export default function MatchDetails() {
    let { matchId } = useParams();
    let [matches, setMatches] = useState([]);
    let [teams, setTeams] = useState([]);
    let [players, setPlayers] = useState([]);

    useEffect(() => {
        (async () => {
            await matchesInfo(setMatches);
            await teamsInfo(setTeams);
            await playersInfo(setPlayers);
        })();
    }, []);

    let filterMatchById = (matchId) => {
        return matches.filter(match => match.id == matchId);
    };

    let filterTeamById = (teamId) => {
        return teams.filter(team => team.id == teamId);
    };

    let filterPlayersById = (teamId) => {
        return players.filter(player => player.teamId == teamId);
    };

    let match = filterMatchById(matchId)[0];

    let aTeam = filterTeamById(match?.aTeamId)[0];
    let bTeam = filterTeamById(match?.bTeamId)[0];
    
    let playersATeam = filterPlayersById(aTeam?.id);
    let index = playersATeam.findIndex((p, i) => {
        return i > 0 && p.position == 'GK'
    });
    playersATeam = playersATeam.slice(0, index);

    let playersBTeam = filterPlayersById(bTeam?.id);
    index = playersBTeam.findIndex((p, i) => {
        return i > 0 && p.position == 'GK'
    });
    playersBTeam = playersBTeam.slice(0, index);

    return (
        <>
            <section className="match-info">
                <div className='match-details'>
                    <Link to={`/team/${match?.aTeamId}`}>
                        <div className="team-details">
                            <img src={`/images/${aTeam?.name}.png`} />
                            <p>{aTeam?.name}</p>
                        </div>
                    </Link>

                    <div className="score">{match?.score}</div>

                    <div className="team-details">
                        <Link to={`/team/${match?.bTeamId}`}>
                            <p>{bTeam?.name}</p>
                            <img src={`/images/${bTeam?.name}.png`} />
                        </Link>
                    </div>
                </div>

                <div className="teams">

                    <ul className="teamA">
                        {playersATeam?.map(player =>
                            <li key={player.id}>
                                <Link to={`/${aTeam?.name}/player/${player.id}`} >
                                    <p className="player-number">{player.teamNumber}</p>
                                    <p className="player-name">{player.fullName}</p>
                                    <p className="player-position">{player.position}</p>
                                </Link>
                            </li>
                        )}
                    </ul>

                    <ul className="teamB">
                        {playersBTeam?.map(player =>
                            <li key={player.id}>
                                <Link to={`/${bTeam?.name}/player/${player.id}`} >
                                    <p className="player-number">{player.teamNumber}</p>
                                    <p className="player-name">{player.fullName}</p>
                                    <p className="player-position">{player.position}</p>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </section >
        </>
    )

}


