export function teamsInfo(setTeams) {
    let result;

    return fetch('/data/teams.csv')
        .then(response => response.text())
        .then(data => {

            result = JSON.stringify(data).split('\\r\\n');
            result = result.slice(1, result.length);

            result.forEach(m => {
                let [id, name, managerFullName, group] = m.split(',');

                setTeams((prevData => {
                    let result = [...prevData,
                    {
                        id: Number(id),
                        name,
                        managerFullName,
                        group
                    }];
                    return result;
                }))
            })
        });

}