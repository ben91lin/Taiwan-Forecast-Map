function blueIndex(iterTimes) {
    const blueScale = {}
    for (let i = 0; i < iterTimes; i++) {
        let interpolate = Math.floor(100 / (iterTimes - 1)) * i / 100
        blueScale[i * 10] = d3.interpolateBlues(interpolate)
    }
    return blueScale
}

function red2blueIndex(iterTimes) {
    const red2BlueScale = {}
    for (let i = 0; i < iterTimes * 4; i++) {
        let interpolate = 1 - (Math.floor(100 / (iterTimes - 1)) * i / 4 / 100)
        red2BlueScale[i] = d3.interpolateRdYlBu(interpolate)
    }
    return red2BlueScale
}

const color = {
    blueIndex: blueIndex(11),
    red2blueIndex: red2blueIndex(11)
}

export default color