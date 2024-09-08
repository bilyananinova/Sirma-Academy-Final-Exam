export function recordsInfo(setRecords) {
    let result;

    return fetch('/data/records.csv')
        .then(response => response.text())
        .then(data => {

            result = JSON.stringify(data).split('\\r\\n');
            result = result.slice(1, result.length - 1);

            result.forEach(p => {
                let [id, playerId, matchId, fromMinutes, toMinutes] = p.split(',');

                if(toMinutes === 'NULL') {
                    toMinutes = '90'
                }

                setRecords((prevData => {
                    let result = [...prevData,
                    {
                        id,
                        playerId,
                        matchId,
                        fromMinutes,
                        toMinutes
                    }];
                    return result;
                }))
            });
        })
}