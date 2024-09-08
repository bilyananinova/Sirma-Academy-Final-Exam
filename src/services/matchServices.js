export function matchesInfo(setMatches) {
    let result;

    return fetch('/data/matches.csv')
        .then(response => response.text())
        .then(data => {

            result = JSON.stringify(data).split('\\r\\n');
            result = result.slice(1, -1);

            result.forEach(m => {
                let [id, aTeamId, bTeamId, date, score] = m.split(',');
                let formatedDate = new Date(date).toUTCString();

                setMatches((prevData => {
                    let result = [...prevData,
                    {
                        id: Number(id),
                        aTeamId: Number(aTeamId),
                        bTeamId: Number(bTeamId),
                        date: formatedDate.slice(0, formatedDate.length - 13),
                        score
                    }];
                    return result;
                }))
            });
        });
}