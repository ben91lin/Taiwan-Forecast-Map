class ControlPanel {
    constructor() {
        this.controlPanel = document.querySelector('#control-panel')
        this.hour = new Date().getHours()
        this._init()
    }

    _init() {
        this.temperature = this.controlPanel.querySelector('[value="temperature"]')
        this.pop = this.controlPanel.querySelector('[value="pop"]')
        this.dates = this.controlPanel.querySelectorAll('[class^="date"]')
        this.times = this.controlPanel.querySelectorAll('[name="time"]')
    }

    refresh() {
        this._init()
        return this
    }

    get forecasttype() {
        return this.controlPanel.querySelector('.forecast-type').querySelector(':checked').value
    }

    get datetime() {
        const date = this.controlPanel.querySelector('.date').querySelector(':checked').value
        const time = this.controlPanel.querySelector('.time').querySelector(':checked').value
        
        return `${date} ${time}`
    }
}

export default ControlPanel