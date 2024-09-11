import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { matchesInfo, dates } from '../../services/matchServices';
import { teamsInfo } from '../../services/teamsServices';
import { filterByDate, filterByTeamsGroup } from '../../services/filterData';

export default function Home() {
    let [matches, setMatches] = useState([]);
    let [teams, setTeams] = useState([]);
    let [matchesByDate, setMatchesByDate] = useState([]);
    let [teamsByGroup, setTeamsByGroup] = useState([]);

    useEffect(() => {
        (async () => {
            await matchesInfo(setMatches);
            await matchesInfo(setMatchesByDate);
            await teamsInfo(setTeams);
        })();

    }, []);

    function dateFilterHandler(e) {
        if (e.target.value !== 'all') {
            filterByDate(matches, e.target.value, setMatchesByDate);
        } else {
            setMatchesByDate(matches);
        }
    }

    function groupFilterHandler(e) {
        setMatchesByDate([]);

        if (e.target.value !== 'all') {
            filterByTeamsGroup(teams, e.target.value, setTeamsByGroup);
        } else {
            setTeamsByGroup(teams);
        }

    }


    return (
        <>
            <div className='filter'>
                <label htmlFor="filter">Filter By Date: </label>
                <select
                    name="filter"
                    onChange={dateFilterHandler}
                >
                    <option value="all">-- Please Select --</option>
                    {[...dates]?.map((date, i) =>
                        <option value={date} key={i}>{date}</option>
                    )}
                    <option value='all' key={'all'}>All</option>
                </select>

                <label htmlFor="filter">Filter By Group: </label>
                <select
                    name="filter"
                    onChange={groupFilterHandler}
                >
                    <option value="all">-- Please Select --</option>
                    <option value='A' key={'A'}>Group: A</option>
                    <option value='B' key={'B'}>Group: B</option>
                    <option value='C' key={'C'}>Group: C</option>
                    <option value='D' key={'D'}>Group: D</option>
                    <option value='E' key={'E'}>Group: E</option>
                    <option value='F' key={'F'}>Group: F</option>
                    <option value='all' key={'all'}>All</option>
                </select>
            </div>

            <div className="home-page">

                {matchesByDate.length > 0
                    ?
                    matchesByDate?.map(m =>

                        <Link to={`/match-details/${m.id}`} className="match-card" key={m.id}>
                            <p className='match-date'>{m.date}</p>

                            <div className='match'>

                                <div className="team">
                                    <img src={`/images/${teams[m.aTeamId - 1]?.name}.png`} />
                                    <p>{teams[m.aTeamId - 1]?.name}</p>
                                    <p className="team-manager">Manager: {teams[m.aTeamId - 1]?.managerFullName}</p>
                                </div>

                                <div className="score">{m.score}</div>

                                <div className="team">
                                    <img src={`/images/${teams[m.bTeamId - 1]?.name}.png`} />
                                    <p>{teams[m.bTeamId - 1]?.name}</p>
                                    <p className="team-manager">Manager: {teams[m.bTeamId - 1]?.managerFullName}</p>
                                </div>
                            </div>
                        </Link>
                    )
                    : teamsByGroup.map(team =>

                        <Link to={`/team/${team.id}`} key={team.id}>
                            <div className="team-card-home">

                                <img src={`/images/${team?.name}.png`} alt="" />
                                <p>{team?.name}</p>
                                <p className="team-manager">Manager: {team?.managerFullName}</p>
                                <p>Group: {team?.group}</p>

                            </div>
                        </Link>
                    )
                }
            </div >
        </>
    )
}