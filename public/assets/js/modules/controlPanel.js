class ControlPanel {
    constructor() {
        this.controlPanel = document.querySelector('#control-panel')
        this.hour = new Date().getHours()
        this._init()
    }

    _init() {
        const datetime = new Date()
        this.temperature = this.controlPanel.querySelector('[value="temperature"]')
        this.pop = this.controlPanel.querySelector('[value="pop"]')
        this.dates = this.controlPanel.querySelectorAll('[class^="date"]')
        this.times = this.controlPanel.querySelectorAll('[name="time"]')
        this.pop.checked = true
        this.dates[0].checked = true
        for (let i = 3; i < 7; i++) {
            this.dates[i].disabled = true
        }
        if (datetime.getHours() > 12) {
            this.times[1].checked = true
            this.times[0].disabled = true
        } else {
            this.times[0].disabled = false
            this.times[0].checked = true
        }
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