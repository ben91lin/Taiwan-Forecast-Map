/**
 * TODO: 本來想入更多功能，所以用class,不確定是簡化為function
 * 
 */
class Forecast {
    constructor() {

    }

    fetch(table, geocodes, datetime, queryString = '*') {
        return fetch(`/query/${table}/`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    geocodes: geocodes,
                    datetime: datetime,
                    queryString: queryString
                }
            ),
            headers: new Headers({
                'Content-Type': 'application/json'
              })
        }).then(function(res) {
            return res.json()
        })
    }
}

export default Forecast