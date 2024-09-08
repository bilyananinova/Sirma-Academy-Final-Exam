import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './TeamDetails.css'
import { playersInfo } from '../../services/playersServices';
import { teamsInfo } from '../../services/teamsServices';

export default function TeamDetails() {
    let { teamId } = useParams();
    let [players, setPlayers] = useState([]);
    let [teams, setTeams] = useState([]);

    useEffect(() => {
        (async () => {
            await playersInfo(setPlayers);
            await teamsInfo(setTeams);
        })();
    }, []);

    let filterTeamById = () => {
        return teams.filter(team => team.id == teamId);
    };

    let filterPlayersyId = () => {
        return players.filter(player => player.teamId == teamId);
    };


    let team = filterTeamById(teamId)[0];
    let playersList = filterPlayersyId();

    return (
        <>
            <h2>Team {team?.name} Details</h2>
            <div className="team-card">
                <div>
                    <img src={`/images/${team?.name}.png`} alt="" />
                </div>
                <div>
                    <h3>{team?.name}</h3>
                    <h4>Manager: {team?.managerFullName}</h4>
                    <h3>Group: {team?.group}</h3>
                </div>
            </div>

            <ul>
                {
                    playersList.map(player =>
                        <li>
                            <Link to={`/${team?.name}/player/${player?.id}`} >
                                <p className="player-number">{player.teamNumber}</p>
                                <p className="player-name">{player.fullName}</p>
                                <p className="player-position">{player.position}</p>
                            </Link>
                        </li>
                    )
                }
            </ul>

        </>
    )
}