/**
 * 
 * this API function to get data from open weather data amd insert to SQL Database. 
 * The goal of request url like this.
 * baseUrl + dataName + auth + format
 * 
 */
const request = require('request');
const promisePool = require(`${__dirname}/connect`)

class StringCheck {
    static isSpace(str) {
        if (/^\s*$/.test(str)) {
            return true
        } else {
            return false
        }
    }
}

class WeatherAPI {
    constructor(baseUrl, auth) {
        this.baseUrl = baseUrl;
        this.auth = auth;
        this.urls = [];
        this.originalForecasts = [];
        this.parsingForecasts = null;
    }

    _request(url) {
        return new Promise(function(resolve) {
            request(url, function(err, res, body) {
                if (err) {
                    return console.log(err)
                }

                if (!err && res.statusCode === 200) {
                    const {records: {locations: [{location}]}} = JSON.parse(body);

                    for (let loc of location) {
                        this.originalForecasts.push(loc)
                    }
                }

                resolve(this)
            }.bind(this))
        }.bind(this))
    }

    _geocodeType() {
        return this.originalForecasts[0].geocode.length === 7 ? 'townCode' : 'countyCode'
    }

    _weatherElementName() {
        var elementNames = []
        for (var {elementName} of this.originalForecasts[0].weatherElement) {
            elementNames.push(elementName)
        }
        return elementNames
    }

    _weatherElementLength() {
        return this.originalForecasts[0].weatherElement.length
    }

    _timeLength() {
        return this.originalForecasts[0].weatherElement[0].time.length
    }

    createUrls(dataNames, format) {
        if (!typeof(dataNames) === 'string' && !Array.isArray(dataNames)) {
            return 'dataNames should be String or Array.'
        }
        if (!typeof(format) === 'string') {
            return 'format should be String.'
        }
        dataNames = Array.isArray(dataNames) ? dataNames : Array.of(dataNames);
        format = format || '';

        for (let name of dataNames) {
            this.urls.push(this.baseUrl + name + this.auth + format)
        }

        console.log(`已產生${dataNames.length}筆url。`)
        return this
    }

    getForecasts() {
        return new Promise(async function(resolve) {
            for ( let url of this.urls ) {
                await this._request(url)
            }

            console.log(`已找到${this.originalForecasts.length}筆地點。`)
            resolve(this)
        }.bind(this))
    }

    parsing() {
        const geocodeType = this._geocodeType()
        const weatherElementName = this._weatherElementName()
        const weatherElementLength = this._weatherElementLength()
        const timeLength = this._timeLength()
        var forecasts = {
            columns: [],
            forecasts: []
        }

        forecasts.columns = forecasts.columns.concat(geocodeType, 'startTime', 'endTime', weatherElementName)

        for (let { geocode, weatherElement } of this.originalForecasts) {
            for (let i = 0; i < timeLength; i++) {
                let forecast = [];
                let startTime = weatherElement[0].time[i].startTime;
                let endTime = weatherElement[0].time[i].endTime;
                let value;
            
                forecast.push(geocode)
                forecast.push(startTime)
                forecast.push(endTime)
                for (let j = 0; j < weatherElementLength; j++) {
                    value = weatherElement[j].elementName === 'CI' ? weatherElement[j].time[i].elementValue[1].value : weatherElement[j].time[i].elementValue[0].value;
                    if ( StringCheck.isSpace(value) ) {
                        forecast.push(null)
                    } else {
                        forecast.push(value)
                    }
                }
                forecasts.forecasts.push(forecast)
            }
        }

        this.parsingForecasts = forecasts
        console.log(`已解析${this.parsingForecasts.forecasts.length}筆天氣預報。`)
        return this
    }

    insert(tableName) {
        return new Promise(async function(resolve) {
            const query = `INSERT INTO ${tableName}(${this.parsingForecasts.columns.join()}) Values(${Array.from('?'.repeat(this.parsingForecasts.columns.length)).join(',')})`
            var connection;

            try {
                connection = await promisePool.getConnection();
                await connection.beginTransaction();
                console.log('START TRANSACTION');
                await connection.query(`TRUNCATE \`${tableName}\``)
                console.log(`TRUNCATE ${tableName}`)
                for ( let forecast of this.parsingForecasts.forecasts) {
                    connection.query(query, forecast)
                }
                console.log(query)
                console.log(`已存入${this.parsingForecasts.forecasts.length}筆天氣預報。`)
                await connection.commit();
                console.log('COMMIT!');
            } catch (err) {
                if (connection) await connection.rollback();
                throw error;
            } finally {
                if (connection) await connection.release();
                resolve(this)
            }

        }.bind(this)) 
    }

    reset () {
        this.urls = [];
        this.originalForecasts = [];
        this.parsingForecasts = null;
        return this;
    }
}

module.exports = WeatherAPI