import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './PlayerDetails.css';
import { playersInfo } from "../../services/playersServices";
import { recordsInfo } from "../../services/recordsServices";
import { matchesInfo } from "../../services/matchServices";
import { teamsInfo } from "../../services/teamsServices";
import { filterPlayersByPlayerId, filterRecordsByPlayerId } from "../../services/filterData";


export default function PlayerDetails() {
    let { teamName, playerId } = useParams();
    let [players, setPlayers] = useState([]);
    let [records, setRecords] = useState([]);
    let [matches, setMatches] = useState([]);
    let [teams, setTeams] = useState([]);

    useEffect(() => {
        (async () => {
            await playersInfo(setPlayers);
            await recordsInfo(setRecords);
            await matchesInfo(setMatches);
            await teamsInfo(setTeams);
        })();
    }, []);

    let filterMatchesList = (matches, playerRecord) => {
        let result = [];
        playerRecord.forEach(record => {
            matches.forEach(match => {
                if (record.matchId == match.id) {
                    result.push(match);
                }
            });
        });
        return result;
    }

    let player = filterPlayersByPlayerId(players, playerId)[0];
    let playerRecord = filterRecordsByPlayerId(records, playerId);
    let playerMatchesList = filterMatchesList(matches, playerRecord);

    return (
        <>
            <div className="player-card">
                <div>
                    <img src={`/images/${teamName}.png`} alt="" />
                </div>
                <div>
                    <h3>{player?.fullName}</h3>
                    <h4>{player?.position}</h4>
                    <h3>{player?.teamId}</h3>
                </div>
            </div>

            <div className="player-list">
                {playerMatchesList.length > 0
                    ? (playerMatchesList.map((m, i) =>

                        <Link to={`/match-details/${m.id}`} className="match-card" key={m.id}>
                            <p className='match-date'>{m.date}</p>
                            <div className='match'>

                                <div className="team">
                                    <img src={`/images/${teams[m.aTeamId]?.name}.png`} />
                                    <p>{teams[m.aTeamId]?.name}</p>
                                </div>

                                <p className="time"><span>from: {playerRecord[i].fromMinutes}min, to: {playerRecord[i].toMinutes}min</span></p>

                                <div className="team">
                                    <img src={`/images/${teams[m.bTeamId]?.name}.png`} />
                                    <p>{teams[m.bTeamId]?.name}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                    : <h3>There is no records ...</h3>
                }
            </div>
        </>
    )
}

let positionType = {
    'GK': 'Goalkeeper',
    'CB': 'Centre-back',
    'RB': 'Right-back',
    'LB': 'Left-back',
    'RWB': 'Right Winger',
    'LWB': 'Left Winger',

    'CM': 'Central Midfielder',
    'CDM': 'Defensive Midfielder',
    'CAM': 'Attacking Midfielder',
    'RM': 'Right Midfielder',
    'LM': 'Left Midfielder',

    'ST': 'Striker',
    'CF': 'Central Forward',
    'RF': 'Right Forward',
    'LF': 'Left Forward',
    'RW': 'Right Winger',
    'LW': 'Left Winger',
}

