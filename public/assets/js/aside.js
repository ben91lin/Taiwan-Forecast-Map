class Aside {
    /**
     * The Atlas Sould be Synchronize with Main.
     * @param {main.this.atlas} atlas 
     * @param {main.this.forecast } forecast 
     */
    constructor(atlas, controlPanel, color) {
        this.atlas = atlas
        this.controlPanel = controlPanel
        this.color = color
        this._init()
    }

    _init() {
        const that = this
        this._renderRuler() 
        this.controlPanel.temperature.addEventListener('change', function(event) {
            event.stopPropagation()
            that._switchForecasttype()
            that._switchRuler()
            that._rendered()
        })
        this.controlPanel.pop.addEventListener('change', function(event) {
            event.stopPropagation()
            that._switchForecasttype()
            that._switchRuler()
            that._rendered()
        })
        this.controlPanel.dates.forEach(function(date) {
            date.addEventListener('change', function(event) {
                event.stopPropagation()
                that._switchDate(this)
                that._rendered()
            })
        })
        this.controlPanel.times.forEach(function(time) {
            time.addEventListener('change', function(event) {
                event.stopPropagation()
                that._rendered()
            })
        })
    }

    /**
     * Forecast Type Radio Callback
     */
    _switchForecasttype() {
        if (this.controlPanel.pop.checked) {
            for (let i = 0; i < this.controlPanel.dates.length; i++) {
                if (i < 3) {
                    this.controlPanel.dates[i].disabled = false
                } else {
                    this.controlPanel.dates[i].disabled = true
                    if (this.controlPanel.dates[i].checked) {
                        this.controlPanel.dates[i].checked = false
                        this.controlPanel.dates[0].checked = true
                    }
                }
            }
        } else {
            for (let date of this.controlPanel.dates) {
                date.disabled = false
            }
        }
    }

    /**
     * Date Radio Change Callback
     * @param {HTMLelement} HTMLelement 
     */
    _switchDate(HTMLelement) {
        if (!HTMLelement.disabled) {
            this.controlPanel.controlPanel.querySelector('[class^="date"]:checked').checked = false
            HTMLelement.checked = true

            if (HTMLelement === this.controlPanel.dates[0]) {
                if (this.controlPanel.hour > 12) {
                    this.controlPanel.times[0].checked = false
                    this.controlPanel.times[0].disabled = true
                    this.controlPanel.times[1].checked = true
                }
            } else {
                this.controlPanel.times[0].disabled = false
            }
        }
    }

    _renderRuler() {
        const blueScale = Object.values(this.color.blueIndex)

        d3.select('#ruler .ruler__color-scale')
            .selectAll('div')
            .data(blueScale)
            .enter()
            .append('div')
            .style('opacity', 0)
            .transition()
            .duration(750)
            .style('background-color', (data) => data)
            .style('opacity', 1)

        d3.select('#ruler .ruler__scale-name')
            .selectAll('p')
            .data(['0%', '20%', '40%', '60%', '80%', '100%'])
            .enter()
            .append('p')
            .text((data) => data)
            .style('opacity', 0)
            .transition()
            .duration(750)
            .style('opacity', 1)
    }

    _switchRuler() {
        const forecasttype = this.controlPanel.forecasttype
        const blueScale = Object.values(this.color.blueIndex)
        const red2blueScale = this.color.red2blueScale

        if (forecasttype === 'pop') {
            console.log('pop')
            d3.select('#ruler .ruler__color-scale')
                .selectAll('div')
                .data(blueScale)
                .transition()
                .duration(750)
                .style('background-color', (data) => data)

            d3.select('#ruler .ruler__scale-name')
                .selectAll('p')
                .transition()
                .duration(100)
                .style('opacity', 0)

            d3.select('#ruler .ruler__scale-name')
                .selectAll('p')
                .data(['0%', '20%', '40%', '60%', '80%', '100%'])
                .transition()
                .delay(100)
                .duration(500)
                .style('opacity', 1)
                .text((data) => data)
        } else {
            d3.select('#ruler .ruler__color-scale')
                .selectAll('div')
                .data(red2blueScale)
                .transition()
                .duration(750)
                .style('opacity', 1)
                .style('background-color', (data) => data)

            d3.select('#ruler .ruler__scale-name')
                .selectAll('p')
                .transition()
                .duration(100)
                .style('opacity', 0)

            d3.select('#ruler .ruler__scale-name')
                .selectAll('p')
                .data(['<= 0', '8-12', '16-20', '24-28', '32-36', '> 40'])
                .transition()
                .delay(100)
                .duration(500)
                .style('opacity', 1)
                .text((data) => data)
        }
    }

    _rendered() {
        const rendered = this._parseRenderedPath(Object.keys(this.atlas.RenderedPath))
        const forecasttype = this.controlPanel.forecasttype
        const datetime = this.controlPanel.datetime
        console.log(forecasttype)

        // fetch county
        if (forecasttype === 'pop') {
            let table = 'counties168pop12h'
            let queryString = 'countyCode, PoP12h'

            fetch(`/query/${table}/`, {
                method: 'POST',
                body: JSON.stringify(
                    {
                        geocodes: rendered.county,
                        datetime: datetime,
                        queryString: queryString
                    }
                ),
                headers: new Headers({
                    'Content-Type': 'application/json'
                  })
            }).then(function(res) {
                return res.json()
            }).then(function(arr) {
                this._fillColor(arr, rendered.county, this.color.blueIndex)
            }.bind(this))

            // if active town
            if (rendered.town.length) {
                let table = 'towns168pop12h'
                let queryString = 'townCode, PoP12h'

                fetch(`/query/${table}/`, {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            geocodes: rendered.town,
                            datetime: datetime,
                            queryString: queryString
                        }
                    ),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                      })
                }).then(function(res) {
                    return res.json()
                }).then(function(arr) {
                    this._fillColor(arr, rendered.town, this.color.blueIndex)
                }.bind(this))
            }
        } else {
            let table = 'counties168'
            let queryString = 'countyCode, T'

            fetch(`/query/${table}/`, {
                method: 'POST',
                body: JSON.stringify(
                    {
                        geocodes: rendered.county,
                        datetime: datetime,
                        queryString: queryString
                    }
                ),
                headers: new Headers({
                    'Content-Type': 'application/json'
                  })
            }).then(function(res) {
                return res.json()
            }).then(function(arr) {
                this._fillColor(arr, rendered.county, this.color.red2blueIndex)
            }.bind(this))

            // if active town
            console.log(rendered)
            if (rendered.town.length) {
                let table = 'towns168'
                let queryString = 'townCode, T'

                fetch(`/query/${table}/`, {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            geocodes: rendered.town,
                            datetime: datetime,
                            queryString: queryString
                        }
                    ),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                      })
                }).then(function(res) {
                    return res.json()
                }).then(function(arr) {
                    this._fillColor(arr, rendered.town, this.color.red2blueIndex)
                }.bind(this))
            }
        }
    }

    /**
     * Parse County and TownActive
     * @param {keys of atlas.RenderedPath} RenderedPath 
     */
    _parseRenderedPath(RenderedPath) {
        const output = {
            county: [],
            town: []
        }

        for (let r of RenderedPath) {
            let arr = r.split('-')
            if (arr[0] === 'county') {
                output.county.push(arr[1]) 
            } else if (arr[0] === 'town') {
                output.town.push(arr[1]) 
            }
        }

        return output
    }

    _fillColor(arr, geocodes, color) {
        const forecasts = {}

        for (let forecast of arr) {
            let values = Object.values(forecast)
            forecasts[values[0]] = values[1]
        }
        
        for (let geocode of geocodes) {
            try {
                if (geocode.length <= 5) {
                    this.atlas.RenderedPath[`county-${geocode}`]
                        .transition()
                        .duration(400)
                        .style('fill', color[forecasts[geocode]])
                } else {
                    this.atlas.RenderedPath[`town-${geocode}-active`]
                        .transition()
                        .duration(400)
                        .style('fill', color[forecasts[geocode]])
                }  
            } catch (err) {
                throw err
            }
        }
    }

    // _renderedPop(arr, geocodes) {
    //     const color = this.color.blueIndex
    //     const pop = {}

    //     for (let p of arr) {
    //         let values = Object.values(p)
    //         pop[values[0]] = values[1]
    //     }

    //     for (let geocode of geocodes) {
    //         try {
    //             if (geocode.length <= 5) {
    //                 this.atlas.RenderedPath[`county-${geocode}`]
    //                     .transition()
    //                     .duration(400)
    //                     .style('fill', color[pop[geocode]])
    //             } else {
    //                 this.atlas.RenderedPath[`town-${geocode}-active`]
    //                 .transition()
    //                 .duration(400)
    //                 .style('fill', color[pop[geocode]])
    //             }  
    //         } catch (err) {
    //             throw err
    //         }
    //     }
    // }
}

export default Aside