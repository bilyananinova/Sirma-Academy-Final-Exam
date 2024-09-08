import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './TeamDetails.css'
import { playersInfo } from '../../services/playersServices';
import { teamsInfo } from '../../services/teamsServices';
import { filterPlayersByTeamId, filterTeamById } from '../../services/filterData';

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

    let team = filterTeamById(teams, teamId)[0];
    let playersList = filterPlayersByTeamId(players, teamId);

    return (
        <>
            <h2>Team {team?.name} Details</h2>
            <div className="team-card">
                <div className='opacity'> </div>
                <img src={`/images/${team?.name}.png`} alt="" />
                <div>
                    <h3>{team?.name}</h3>
                    <h4>Manager: {team?.managerFullName}</h4>
                    <h3>Group: {team?.group}</h3>
                </div>
            </div>

            <ul>
                {
                    playersList.map(player =>
                        <li key={player.id}>
                            <Link to={`/${team?.name}/player/${player?.id}`}>
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