import color from './color.js'
/**
 * 
 * The Forecast Object is Design to Control Forecast Rendering. This Object will Parse the 'Atlas.Rendering' or 'Atlas.Queuing' and Fetch the Forecast to Rendering Color.
 * 
 * The state
 * 
 */
class Forecast {
    constructor() {
        this.state = {}
        this.color = color

        this._init()
    }

    _init() {
        const controlPanel = document.querySelector('#control-panel')
        this.state.forecasttype = controlPanel.querySelector('[name="forecast-type"]:checked').value
        this.state.datetime = `${controlPanel.querySelector('[name="date"]:checked').value} ${controlPanel.querySelector('[name="time"]:checked').value}`
        return this
    }

    refresh() {
        this._init()
        return this
    }

    getState() {
        return this.state
    }

    fetch(table, geocodes, queryString = '*') {
        return fetch(`/query/${table}/`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    geocodes: geocodes,
                    datetime: this.state.datetime,
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