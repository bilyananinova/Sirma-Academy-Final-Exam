export function playersInfo(setPlayers) {
    let result;

    return fetch('/data/players.csv')
        .then(response => response.text())
        .then(data => {

            result = JSON.stringify(data).split('\\r\\n');
            result = result.slice(1, result.length - 1);

            result.forEach(p => {
                let [id, teamNumber, position, fullName, teamId] = p.split(',');

                setPlayers((prevData => {
                    let result = [...prevData,
                    {
                        id,
                        teamNumber,
                        position,
                        fullName,
                        teamId
                    }];
                    return result;
                }))
            });    
        })
}