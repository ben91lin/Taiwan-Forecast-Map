/**
 * 
 * The Atlas-Object is Design to Control the Taiwan Atlas Render to Fornt-End.
 * 
 * The atlas is a Object to store geo-json.
 * The state store map setting, like target div, size, projection...etc
 * The Rendered is a Object to store D3-Object be Rendered.
 * The Queuing is atlas-geo-json will be Rendered.
 * 
 * The 'Atlas' Rendering Step by Step.
 * 1. First, the 'Atlas-geo-json' will add to 'Queuing-Object'.
 * 2. Second, When 'Atlas' Rendering, the 'D3-Object' will add to 'Rendered-Object', the 'Atlas-geo-json' will be removed from 'Queuing-Object'.
 * 3. Third, When 'Atlas' Unrendering, the 'D3-Object' will be removed from 'Rendered-Object'.
 * 
 */
class Atlas {
    constructor(atlas, HTMLelement) {
        this.atlas = atlas
        this.state = {
            canvas: HTMLelement
        }
        this.Rendered = {}
        this.Rendering = {}
        this.Queuing = {}

        this._init()
    }

    /**
     * Initialize the Property 'state'.
     * Stored Some D3-Object like projection, geoPath by 'state',
     * and Stored Base <svg>, <g> by 'Rendered'.
     * [Warning] canvas is not HTML tag, is <div> to rendering Atlas svg.
     */
    _init() {
        const canvas = this.state.canvas
        this.state['canvasWidth'] = canvas.clientWidth
        this.state['canvasHeight'] = canvas.clientHeight
        this.state['projection'] = this._projection(this.state['canvasWidth'], this.state['canvasHeight'])
        this.state['geoPath'] = d3.geoPath().projection(this.state['projection'])
        this.state['zoom'] = d3.zoom().scaleExtent([1, 8])
        this.Rendered['svg'] = d3.select(canvas)
            .append('svg')
            .attr('width', this.state['canvasWidth'])
            .attr('height', this.state['canvasHeight'])
            .attr('viewBox', [0, 0, this.state['canvasWidth'], this.state['canvasHeight']])
        this.Rendered['g'] = this.Rendered['svg'].append('g')
            .attr('stroke-width', .5)
            .attr('cursor', 'pointer')
    }

    _projection(canvasWidth, canvasHeight) {
        const lonLeft = 119.4
        const lonRight = 122.1
        const latTop = 25.4
        const latBot = 21.7
        if (canvasWidth / canvasHeight > (lonRight - lonLeft) / (latTop - latBot)) {
            var scale = 54 * canvasHeight / (latTop - latBot);
        } else {
            var scale = 54 * canvasWidth / (lonRight - lonLeft);
        }
        const projection = d3.geoMercator()
            .scale(scale)
            .center([120.9, 23.6])
            .translate([canvasWidth / 2, canvasHeight / 2])
        return projection
    }
    
    refresh() {
        this._init()
    }

    getQueuing() {
        return this.Queuing
    }

    getRendering() {
        return this.Rendering
    }

    getRendered() {
        return this.Rendered
    }

    getState() {
        return this.state
    }

    /**
     * @param {Object of Geojson} atlas 
     * @param {string} suffix 
     */
    queuing(atlas, suffix = '') {
        if (Array.isArray(atlas)) {
            return console.log('The atlas should be Object.')
        }
        if (!Object.keys(atlas).includes('geometry')) {
            return console.log('The atlas should be Geojson, that contain "geometry" key.')
        }
        if (typeof(suffix) != 'string') {
            return console.log('The suffix should be string.')
        }
        suffix = suffix == '' || suffix.startsWith('-') ? suffix : `-${suffix}`;

        // Prevent Wrong Atlas Structure.
        try {
            if (Object.keys(atlas.properties).includes('TOWNCODE')) {
                this.Queuing[`town-${atlas.properties.TOWNCODE}${suffix}`] = atlas
            } else {
                this.Queuing[`county-${atlas.properties.COUNTYCODE}${suffix}`] = atlas
            }
        } catch(err) {
            throw err
        }
        
        return this
    }

    /**
     * Rendering Atlas to Fornt-End.
     * @param {String} query 
     * @param {String} className 
     */
    rendering(query) {
        if (!this.Queuing[query]) {
            return console.log(`[WARNING]${query} is not exist in Queuing.`)
        }
        if (this.Rendered[query]) {
            return console.log(`[WARNING]${query} is Rendered, please set other query-name.`)
        }
        const atlas = Array.isArray(this.Queuing[query]) ? this.Queuing[query] : Array.of(this.Queuing[query])
        const g = this.Rendered.g
        const geoPath = this.state.geoPath

        // Prevent Wrong Atlas Structure.
        try {
            this.Rendering[query] = g
                .append('g')
                .attr('class', query)
                .selectAll('path')
                .data(atlas)
                .enter()
                .append('path')
                .attr('d', geoPath)
                .attr('geotype', 'county')
                .attr('countycode', (atla) => atla.properties.COUNTYCODE)
                .attr('countyname', (atla) => atla.properties.COUNTYNAME)
                .attr('countyeng', (atla) => atla.properties.COUNTYENG)

            if (Object.keys(atlas[0].properties).includes('TOWNCODE')) {
                this.Rendering[query].attr('geotype', 'town')
                    .attr('towncode', (atla) => atla.properties.TOWNCODE)
                    .attr('townname', (atla) => atla.properties.TOWNNAME)
                    .attr('towneng', (atla) => atla.properties.TOWNENG)
                }
            delete this.Queuing[query]
        } catch(err) {
            throw err
        }

        return this
    }

    /**
     * Remove Atlas form Rendering, Add query to Rendered.
     * [Warning!!] the Rendered-Object is different between Rendering, the Rendering-Object is D3-path, the Rendered is d3-g.
     * @param {String} query 
     */
    rendered(query) {
        if (!this.Rendering[query]) {
            return console.log(`[WARNING]${query} is not exist in Rendering.`)
        }
        try {
            this.Rendered[query] = d3.select(`.${query}`)
            delete this.Rendering[query]
        } catch(err) {
            throw err
        }
    }

    /**
     * Remove D3-Object from Rendered.
     * @param {String} query 
     */
    remove(query) {
        if (!this.Rendered[query]) {
            return console.log(`[WARNING]${query} is not exist in Rendered.`)
        }
        try {
            delete this.Rendered[query]
        } catch(err) {
            throw err
        }
    }

    /**
     * Some Animation Effect
     * @param {String} query 
     * @param {Number} duration 
     */
    fadeIn(query, duration = 750) {
        if (!this.Rendering[query]) {
            return console.log(`[WARNING]${query} is not exist in Rendering.`)
        }
        this.Rendering[query]
            .style('opacity', 0)
            .transition()
            .duration(duration)
            .style('opacity', 1)

        return this
    }

    /**
     * Some Animation Effect
     * @param {String} query 
     * @param {Number} duration 
     */
    fadeOut(query, duration = 700) {
        if (!this.Rendered[query]) {
            return console.log(`[WARNING]${query} is not exist in Rendering.`)
        }
        this.Rendered[query]
            .data([])
            .exit()
            .style('opacity', 1)
            .transition()
            .duration(duration)
            .style('opacity', 0)
            .remove()

        return this
    }
}

export default Atlas;