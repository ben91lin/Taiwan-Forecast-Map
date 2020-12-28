import regularizeAtlas from './modules/regularizeAtlas.js'
import Atlas from './modules/atlas.js'
import Forecast from './modules/forecast.js'


/**
 * 
 * The Main-Object depend Atlas-Object and Forecast-Object.
 * Parsing 'Rendering-Object', and Add some eventListener on D3-Object, and some Promise Fade Out Animation
 * 
 */
class Main {
    constructor(atlas, forecast) {
        this.atlas = atlas
        this.forecast = forecast
        this._init()
    }
    
    _init() {
        // bind D3-callback
        this.atlas.Rendered.svg.on('click', this._reset.bind(this))
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
        const state = this.forecast.getState()
        const color = this.forecast.color
        const table = this._table(this._pluralGeotype(rendering[0].geotype), this._forecasttype(state.forecasttype))
        const geocodes = rendering.map((x) => x.geocode)
        console.log(rendering)
        console.log(Object.values(rendering[0]).join('-'))
        console.log(color.blueIndex['10'])
        this.forecast.fetch(table, geocodes, 'countyCode, PoP12h')
            .then(function (obj) {
                console.log(obj)
                const {pop12h} = obj
                const geocodes = pop12h.map((obj) => obj.countyCode)
                const pop = (function() {
                    const output = {}
                    for (let {countyCode, PoP12h} of pop12h) {
                        output[countyCode] = PoP12h
                    }
                    return output
                })()
                console.log(geocodes)
                console.log(pop)
                for (let r of rendering) {
                    let {geocode} = r
                    console.log(geocode)
                    console.log(this.atlas.getRendering())
                    console.log(Object.values(r).join('-'))
                    if (geocodes.includes(r.geocode)) {
                        this.atlas.getRendering()[Object.values(r).join('-')]
                        .style('fill', color.blueIndex[pop[geocode]])
                    }
                }
            }.bind(this))
        
        // Rendered
        // for (let query of Object.keys(this.atlas.Rendering)) {
        //     this.atlas.rendered(query)
        // }
    }

    refresh() {
        this.atlas.refresh()
        this.forecast.refresh()
        this._init()
    }

    /**
     * Specific D3 Callback
     */
    _reset() {
        const svg = this.atlas.Rendered.svg
        const state = this.atlas.state
        const active = Object.keys(this.atlas.rendered).filter((str) => str.includes('active'))

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
            this._fadeOut(this.atlas.rendered[k])
            this.atlas.remove(k)
        }
    }

    /**
     * Specific D3 Callback
     */
    _zoomed() {
        const { transform } = d3.event
        const g = this.atlas.Rendered.g
        const activeCounty = Object.keys(this.atlas.Rendered).filter((str) => str.includes('active') && str.includes('county'))[0]

        g.attr('transform', transform)
            .attr('stroke-width', 0.5 / transform.k)
        this.atlas.Rendered[activeCounty]
            .attr('stroke-width', 4 / transform.k)
    }

    _parseRendering() {
        return Object.keys(this.atlas.Rendering).map(function(x) {
            const arr = x.split('-')
            const output = {}

            output['geotype'] = arr[0]
            output['geocode'] = arr[1]
            if (arr[2]) {
                output['state'] = arr[1]
            }

            return output
        })
    }

    _pluralGeotype(geotype) {
        if (!['county', 'town'].includes(geotype)) {
            throw (`The geotype is wrong.`)
        } else if (geotype === 'county') {
            return 'counties'
        } else {
            return 'towns'
        }
    }

    _forecasttype(forecasttype) {
        if (forecasttype == 'pop') {
            return 'pop12h'
        } else {
            return ''
        }
    }

    _table(geotype, forecasttype) {
        return `${geotype}168${forecasttype}`
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

    _renderTowns(HTMLelement, atlas) {
        const that = this
        const state = this.atlas.state
        const svg = this.atlas.Rendered.svg
        const [[x0, y0], [x1, y1]] = state.geoPath.bounds(atlas)
        const scale = Math.min(8, 0.8 / Math.max((x1 - x0) / state.canvasWidth, (y1 - y0) / state.canvasHeight))
        const countycode = HTMLelement.getAttribute('countycode')
        const currentColor = HTMLelement.style.fill
        const countyAtlas = this.atlas.atlas.counties[countycode]
        const townsAtlas = Object.values(this.atlas.atlas.towns[countycode])
        const active = Object.keys(this.atlas.Rendered).filter((str) => str.includes('active'))
        console.log(active)
        //remove atlas
        for (let k of active) {
            this.atlas.fadeOut(k).remove(k)
        }
        //render atlas
        this.atlas.queuing(countyAtlas, 'active')
        for (let q of Object.keys(this.atlas.Queuing)) {
            this.atlas.rendering(q).fadeIn(q)
            this.atlas.Rendering[q]
                .style('fill', currentColor)
            this.atlas.rendered(q)
        }
        for (let q of townsAtlas) {
            this.atlas.queuing(q, 'active')
        }
        for (let q of Object.keys(this.atlas.Queuing)) {
            this.atlas.rendering(q).fadeIn(q)
            this.atlas.Rendering[q]
                .on('click', function() {
                    that._click(this)
                })
            this.atlas.rendered(q)
        }
        this.atlas

        
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

    _renderTown(HTMLelement) {
        const countycode = HTMLelement.getAttribute('countycode')
        const towncode = HTMLelement.getAttribute('towncode')
        const currentColor = HTMLelement.style.fill
        const townAtlas = this.atlas.atlas.towns[countycode][towncode]
        const brighterAtlas = this.atlas.Rendered[Object.keys(this.atlas.Rendered).filter((str) => str.includes(towncode))]
        const brighterAactive = Object.keys(this.atlas.Rendered).filter((str) => str.includes('active') && str.includes('brighter'))
        //remove atlas
        for (let k of brighterAactive) {
            this.atlas.fadeOut(k).remove(k)
        }
        //brighter atlas
        brighterAtlas.style('fill', d3.rgb(currentColor).brighter(2))
        //render new town atlas
        this.atlas.queuing(townAtlas, 'brighteractive')
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

    }
}

(async function() {
    const geoJson = await regularizeAtlas()
    console.log(geoJson)
    const atlas = new Atlas(geoJson, document.querySelector('#taiwan-atlas'))
    console.log(atlas)
    const forecast = new Forecast()
    const main = new Main(atlas, forecast)
    console.log(main)

    window.addEventListener('resize', function() {
        for (let k of Object.keys(main.atlas.Rendered)) {
            main.atlas.fadeOut(k, 0).remove(k)
        }
        main.refresh()
        // console.log(main.atlas)

    })
    

    // for (let alta of Object.values(main.atlas.counties)) {
    //     main.draw(alta, 'county')
    // }

    
    // const towns = Object.values(main.atlas.towns).flatMap(x => Object.values(x))
    // console.log(towns)
    // main.draw(towns, 'town')


})()