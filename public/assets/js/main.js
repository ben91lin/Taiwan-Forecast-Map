/**
 * 
 * The Main-Object depend Atlas-Object and Forecast-Object.
 * Parsing 'Rendering-Object', and Add some eventListener on D3-Object, and some Promise Fade Out Animation
 * 
 */
class Main {
    constructor(atlas, controlPanel, color) {
        this.atlas = atlas
        this.controlPanel = controlPanel
        this.color = color
        this._init()
    }
    
    _init() {
        // bind D3-callback
        this.atlas.RenderedGroup.svg.on('click', this._reset.bind(this))
            .on('dbclick', this._reset.bind(this))
        this.atlas.state.zoom.on('zoom', this._zoomed.bind(this))

        // Render Counties
        const that = this
        const counties = Object.values(this.atlas.atlas.counties)
        // Queuing
        for (let c of counties) {
            this.atlas.queuing(c)
        }
        // Rendering
        for (let query of Object.keys(this.atlas.Queuing)) {
            this.atlas.rendering(query).fadeIn(query)
            this.atlas.Rendering[query]
                .on('click', function(atlas) {
                    that._click(this, atlas)
                })
        }
        // Fetch
        const rendering = this._parseRendering()
        const forecasttype = this.controlPanel.forecasttype
        const datetime = this.controlPanel.datetime
        if (forecasttype === 'pop') {
            let table = 'counties168pop12h'
            let queryString = 'countyCode, PoP12h'

            fetch(`/query/${table}/`, 
                {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            geocodes: rendering.county,
                            datetime: datetime,
                            queryString: queryString
                        }
                    ),
                    headers: new Headers(
                            {
                            'Content-Type': 'application/json'
                            }
                        )
                }
            ).then(
                function(res) {
                    return res.json()
                }
            ).then(
                function(arr) {
                    return new Promise(
                        function (resolve) {
                            this._fillColor(arr, rendering.county, this.color.blueIndex)
                            // resolve()
                        }.bind(this)
                    )
                }.bind(this)
            ).then(
                function() {
                    for (let query of Object.keys(this.atlas.Rendering)) {
                        this.atlas.rendered(query)
                    }
                }.bind(this)
            )
        }

        // Remove ControlPanel text
        d3.select('#forecast')
            .selectAll('p')
            .data([])
            .exit()
            .remove()
    }

    refresh() {
        this.atlas.refresh()
        this.controlPanel.refresh()
        this._init()
    }

    /**
     * Parse County and TownActive 
     */
    _parseRendering() {
        const keys = Object.keys(this.atlas.Rendering)
        const output = {
            county: [],
            town: []
        }

        for (let k of keys) {
            let arr = k.split('-')
            if (arr[0] === 'county') {
                output.county.push(arr[1]) 
            } else if (arr[0] === 'town') {
                output.town.push(arr[1]) 
            }
        }

        return output
    }

    /**
     * click Callback
     * @param {HTMLelement} HTMLelement 
     * @param {this.atlas.atlas} atlas 
     */
    _click(HTMLelement, atlas) {
        const geotype = HTMLelement.getAttribute('geotype')

        d3.event.stopPropagation()

        if (geotype === 'county') {
            return this._renderTowns(HTMLelement, atlas)
        } else if(geotype === 'town') {
            return this._renderTown(HTMLelement)
        }
    }

    /**
     * click Callback
     * @param {HTMLelement} HTMLelement 
     * @param {this.atlas.atlas} atlas 
     */
    _renderTowns(HTMLelement, atlas) {
        const that = this
        const state = this.atlas.state
        const svg = this.atlas.RenderedGroup.svg
        const [[x0, y0], [x1, y1]] = state.geoPath.bounds(atlas)
        const scale = Math.min(8, 0.8 / Math.max((x1 - x0) / state.canvasWidth, (y1 - y0) / state.canvasHeight))
        const countycode = HTMLelement.getAttribute('countycode')
        const countyname = HTMLelement.getAttribute('countyname')
        const currentColor = HTMLelement.style.fill
        const countyAtlas = this.atlas.atlas.counties[countycode]
        const townsAtlas = Object.values(this.atlas.atlas.towns[countycode])
        const active = Object.keys(this.atlas.RenderedGroup).filter((str) => str.includes('active'))

        //remove atlas
        for (let k of active) {
            this.atlas.fadeOut(k).remove(k)
        }

        // Render county
        this.atlas.queuing(countyAtlas, 'active')
        for (let q of Object.keys(this.atlas.Queuing)) {
            this.atlas.rendering(q).fadeIn(q)
            this.atlas.Rendering[q]
                .style('fill', currentColor)
            this.atlas.rendered(q)
        }
        // Render towns
        // Queuing
        for (let q of townsAtlas) {
            this.atlas.queuing(q, 'active')
        }
        // Rendering
        for (let query of Object.keys(this.atlas.Queuing)) {
            this.atlas.rendering(query).fadeIn(query)
            this.atlas.Rendering[query]
                .on('click', function(atlas) {
                    that._click(this, atlas)
                })
        }
        // Fetch
        const rendering = this._parseRendering()
        const forecasttype = this.controlPanel.forecasttype
        const datetime = this.controlPanel.datetime
        if (forecasttype === 'pop') {
            let table = 'towns168pop12h'
            let queryString = 'townCode, PoP12h'

            fetch(`/query/${table}/`, 
                {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            geocodes: rendering.town,
                            datetime: datetime,
                            queryString: queryString
                        }
                    ),
                    headers: new Headers(
                            {
                            'Content-Type': 'application/json'
                            }
                        )
                }
            ).then(
                function(res) {
                    return res.json()
                }
            ).then(
                function(arr) {
                    return new Promise(
                        function (resolve) {
                            this._fillColor(arr, rendering.town, this.color.blueIndex)
                            resolve()
                        }.bind(this)
                    )
                }.bind(this)
            ).then(
                function() {
                    for (let query of Object.keys(this.atlas.Rendering)) {
                        this.atlas.rendered(query)
                    }
                }.bind(this)
            )
        } else {
            let table = 'towns168'
            let queryString = 'townCode, T'

            fetch(`/query/${table}/`, 
                {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            geocodes: rendering.town,
                            datetime: datetime,
                            queryString: queryString
                        }
                    ),
                    headers: new Headers(
                            {
                            'Content-Type': 'application/json'
                            }
                        )
                }
            ).then(
                function(res) {
                    return res.json()
                }
            ).then(
                function(arr) {
                    return new Promise(
                        function (resolve) {
                            this._fillColor(arr, rendering.town, this.color.red2blueIndex)
                            resolve()
                        }.bind(this)
                    )
                }.bind(this)
            ).then(
                function() {
                    for (let query of Object.keys(this.atlas.Rendering)) {
                        this.atlas.rendered(query)
                    }
                }.bind(this)
            )
        }

        // Render Control Panel
        Promise.all(
            [
                fetch(`/query/counties168pop12h/`, 
                    {
                        method: 'POST',
                        body: JSON.stringify(
                            {
                                geocodes: countycode,
                                datetime: datetime,
                                queryString: 'PoP12h'
                            }
                        ),
                        headers: new Headers(
                                {
                                'Content-Type': 'application/json'
                                }
                            )
                    }
                ).then(
                    function(res) {
                        return res.json()
                    }
                ),
                fetch(`/query/counties168/`, 
                    {
                        method: 'POST',
                        body: JSON.stringify(
                            {
                                geocodes: countycode,
                                datetime: datetime,
                                queryString: 'Wx, MinT, MaxT, MinAT, MaxAT, RH'
                            }
                        ),
                        headers: new Headers(
                                {
                                'Content-Type': 'application/json'
                                }
                            )
                    }
                ).then(
                    function(res) {
                        return res.json()
                    }
                )
            ]
        ).then(
            // [[{}], [{}]]
            function(arrayOfArray) {
                const forecast = {}
                var keys = []
                var values = []
                for (let arr of arrayOfArray) {
                    keys = keys.concat(Object.keys(arr[0]))
                    values = values.concat(Object.values(arr[0]))
                }
                for (let i = 0; i < keys.length; i++) {
                    forecast[keys[i]] = values[i]
                }
                
                this._renderForecast(forecast, countyname)
            }.bind(this)
        )
        
        svg.transition()
            .duration(750)
            .call(
                state.zoom.transform,
                d3.zoomIdentity
                    .translate(state.canvasWidth / 2, state.canvasHeight / 2)
                    .scale(scale)
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
                d3.mouse(svg.node())
            )
    }

    /**
     * click Callback
     * @param {HTMLelement} HTMLelement 
     * @param {this.atlas.atlas} atlas 
     */
    _renderTown(HTMLelement) {
        const countycode = HTMLelement.getAttribute('countycode')
        const towncode = HTMLelement.getAttribute('towncode')
        const countyname = HTMLelement.getAttribute('countyname')
        const townname = HTMLelement.getAttribute('townname')
        const datetime = this.controlPanel.datetime
        const currentColor = HTMLelement.style.fill
        const townAtlas = this.atlas.atlas.towns[countycode][towncode]
        const brighterActive = Object.keys(this.atlas.RenderedPath).filter((str) => str.includes('active') && str.includes('brighter'))
        //remove atlas
        for (let k of brighterActive) {
            this.atlas.fadeOut(k).remove(k)
        }
        // render new brighter town atlas
        this.atlas.queuing(townAtlas, 'brighteractivedown')
        for (let q of Object.keys(this.atlas.Queuing)) {
            this.atlas.rendering(q)
            this.atlas.Rendering[q]
                .style('fill', d3.rgb(currentColor).brighter(2))
                .style('opacity', 0)
                .transition()
                .duration(750)
                .style('opacity', 1)
            this.atlas.rendered(q)
        }
        // render new upper town atlas
        this.atlas.queuing(townAtlas, 'brighteractiveupper')
        for (let q of Object.keys(this.atlas.Queuing)) {
            this.atlas.rendering(q)
            this.atlas.Rendering[q]
                .style('fill', currentColor)
                .style('opacity', 0)
                .style('transform', 'translateY(0px)')
                .transition()
                .duration(750)
                .style('opacity', 1)
                .style('transform', 'translateY(-1px)')
            this.atlas.rendered(q)
        }

        // Render Control Panel
        Promise.all(
            [
                fetch(`/query/towns168pop12h/`, 
                    {
                        method: 'POST',
                        body: JSON.stringify(
                            {
                                geocodes: towncode,
                                datetime: datetime,
                                queryString: 'PoP12h'
                            }
                        ),
                        headers: new Headers(
                                {
                                'Content-Type': 'application/json'
                                }
                            )
                    }
                ).then(
                    function(res) {
                        return res.json()
                    }
                ),
                fetch(`/query/towns168/`, 
                    {
                        method: 'POST',
                        body: JSON.stringify(
                            {
                                geocodes: towncode,
                                datetime: datetime,
                                queryString: 'Wx, MinT, MaxT, MinAT, MaxAT, RH'
                            }
                        ),
                        headers: new Headers(
                                {
                                'Content-Type': 'application/json'
                                }
                            )
                    }
                ).then(
                    function(res) {
                        return res.json()
                    }
                )
            ]
        ).then(
            // [[{}], [{}]]
            function(arrayOfArray) {
                const forecast = {}
                var keys = []
                var values = []
                for (let arr of arrayOfArray) {
                    keys = keys.concat(Object.keys(arr[0]))
                    values = values.concat(Object.values(arr[0]))
                }
                for (let i = 0; i < keys.length; i++) {
                    forecast[keys[i]] = values[i]
                }
                
                this._renderForecast(forecast, `${countyname} ${townname}`)
            }.bind(this)
        )
    }

    /**
     * Fill Forecast Color
     * @param {AJAX return} arr 
     * @param {['number', 'number'...]} geocodes (Geocode wanted Rendered)
     * @param {this.color .. index} color (color scale)
     */
    _fillColor(arr, geocodes, color) {
        const forecasts = {}
        
        for (let forecast of arr) {
            let values = Object.values(forecast)
            forecasts[values[0]] = values[1]
        }
        
        for (let geocode of geocodes) {
            try {
                if (geocode.length <= 5) {
                    if (this.atlas.Rendering[`county-${geocode}`]) {
                        this.atlas.Rendering[`county-${geocode}`]
                            .style('fill', color[forecasts[geocode]])
                    }
                } else {
                    this.atlas.Rendering[`town-${geocode}-active`]
                        .style('fill', color[forecasts[geocode]])
                }  
            } catch (err) {
                throw err
            }
        }

        return Promise.resolve()
    }

    /**
     * Render Forecast to ControlPanel
     */
    _renderForecast(forecast, geoName) {
        const datas = [
            geoName,
            `溫度: ${forecast.MinT} ~ ${forecast.MaxT} °C`,
            `體感溫度: ${forecast.MinAT} ~ ${forecast.MaxAT} °C`,
            `相對溼度: ${forecast.RH}`,
            `降雨率: ${forecast.PoP12h} %`
        ]

        // If Forecast not yet Rendered.
        if( ! document.querySelector('#forecast p') ) {
            d3.select('#forecast')
                .selectAll('p')
                .data(datas)
                .enter()
                .append('p')
                .text((data) => data)
                .style('opacity', 0)
                .transition()
                .duration(500)
                .style('opacity', 1)
        } else {
            d3.select('#forecast')
                .selectAll('p')
                .data([])
                .exit()
                .remove()
    
            d3.select('#forecast')
                .selectAll('p')
                .data(datas)
                .enter()
                .append('p')
                .text((data) => data)
        }
    }

    /**
     * Specific D3 Callback
     */
    _reset() {
        const svg = this.atlas.RenderedGroup.svg
        const state = this.atlas.state
        const active = Object.keys(this.atlas.RenderedGroup).filter((str) => str.includes('active'))

        svg.transition()
            .duration(700)
            .call(
                state.zoom.transform,
                d3.zoomIdentity,
                d3.zoomTransform(svg.node())
                    .invert([state.canvasWidth / 2, state.canvasHeight / 2 ])
            )
        //remove active atlas
        for (let k of active) {
            this.atlas.fadeOut(k).remove(k)
        }
    }

    /**
     * Specific D3 Callback
     */
    _zoomed() {
        const { transform } = d3.event
        const g = this.atlas.RenderedGroup.g
        const activeCounty = d3.select('[class*="county"][class*="active"]')

        g.attr('transform', transform)
            .attr('stroke-width', 0.5 / transform.k)
        // zoom will catch D3-Object in animation, but the Atlas.remove first, so we use new D3.Select
        // TODO: Or we can add Promise in fadeIn/fadeOut
        activeCounty.attr('stroke-width', 4 / transform.k)
    }
}

export default Main