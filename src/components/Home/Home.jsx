import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { matchesInfo } from '../../services/matchServices';
import { teamsInfo } from '../../services/teamsServices';

export default function Home() {
    let [matches, setMatches] = useState([]);
    let [teams, setTeams] = useState([]);

    useEffect(() => {
        (async () => {
            await matchesInfo(setMatches);
            await teamsInfo(setTeams);
        })();
    }, []);

    return (
        <>
            <div className="home-page">

                {matches.map(m =>

                    <Link to={`/match-details/${m.id}`} className="match-card" key={m.id}>
                        <p className='match-date'>{m.date}</p>
                        <div className='match'>
                            <div className="team">
                                <img src={`/images/${teams[m.aTeamId]?.name}.png`} />
                                <p>{teams[m.aTeamId]?.name}</p>
                                <p className="team-manager">Manager: {teams[m.aTeamId]?.managerFullName}</p>
                            </div>

                            <div className="score">{m.score}</div>

                            <div className="team">
                                <img src={`/images/${teams[m.bTeamId]?.name}.png`} />
                                <p>{teams[m.bTeamId]?.name}</p>

                                <p className="team-manager">Manager: {teams[m.bTeamId]?.managerFullName}</p>
                            </div>
                        </div>
                    </Link>

                )}
            </div >
        </>
    )
}