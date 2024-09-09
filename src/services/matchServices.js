export function matchesInfo(setMatches) {
    let result;

    return fetch('/data/matches.csv')
        .then(response => response.text())
        .then(data => {

            result = JSON.stringify(data).split('\\r\\n');
            result = result.slice(1, -1);

            result.forEach(m => {
                let [id, aTeamId, bTeamId, date, score] = m.split(',');
                let formatedDate = new Date(date + 'Z').toUTCString();
                // console.log(new Date(date).toDateString()); //Fri Jun 14 2024
                // console.log(new Date(date));  //Fri Jun 14 2024 00:00:00 GMT+0300 (Eastern European Summer Time)
                // console.log(new Date(date).toUTCString()); //Thu, 13 Jun 2024 21:00:00 GMT


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