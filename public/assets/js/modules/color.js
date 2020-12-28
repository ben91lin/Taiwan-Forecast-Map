function blueIndex(iterTimes) {
    const blueScale = {}
    for (let i = 0; i < iterTimes; i++) {
        let interpolate = Math.floor(100 / (iterTimes - 1)) * i / 100
        console.log(interpolate)
        blueScale[i * 10] = d3.interpolateBlues(interpolate)
    }
    return blueScale
}

function red2blueIndex(iterTimes) {
    const red2BlueScale = {}
    for (let i = 0; i < iterTimes; i++) {
        let interpolate = Math.floor(100 / (iterTimes - 1)) * i / 100
        red2BlueScale[`${i * 4}-${(i + 1) * 4}`] = d3.interpolateRdYlBu(interpolate)
    }
    return red2BlueScale
}

const color = {
    blueIndex: blueIndex(11),
    red2blueIndex: red2blueIndex(11)
}

export default color