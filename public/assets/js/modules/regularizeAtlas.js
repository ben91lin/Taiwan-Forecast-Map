async function regularizeAtlas() {
    return new Promise(async function(resolve) {
        const topoJson = await d3.json('./assets/atlas/towns-10t.json');
        // The Atlas We Return.
        var atlas = {
            counties: {},
            towns: {}
        }

        // ajust six municipality(六都) location code to fit SQL.
        for (let geometry of topoJson.objects.towns.geometries) {
            if (geometry.properties.COUNTYCODE.startsWith('6')) {
                geometry.properties.COUNTYCODE = geometry.properties.COUNTYCODE.match(/[1-9]+/)[0]
            }
    
            if (geometry.properties.TOWNCODE.startsWith('6')) {
                let towncode = geometry.properties.TOWNCODE.slice(5, 7)
                let countycode = geometry.properties.COUNTYCODE.match(/[1-9]+/)[0]

                geometry.properties.TOWNCODE = `${countycode}0${towncode}00`
            } else {
                let towncode = geometry.properties.TOWNCODE.slice(0, 7)
                geometry.properties.TOWNCODE = towncode
            }
        }

        for (let geometry of topoJson.objects.counties.geometries) {
            if (geometry.properties.COUNTYCODE.startsWith('6')) {
                geometry.properties.COUNTYCODE = geometry.properties.COUNTYCODE.match(/[1-9]+/)[0]
            }
        }

        //Topo json to geo json
        const counties = topojson.feature(topoJson, topoJson.objects.counties)
        const towns = topojson.feature(topoJson, topoJson.objects.towns)

        //hierarchize
        const countycode = counties.features.map(function (feature) {
            return feature.properties.COUNTYCODE
        })

        for (let feature of counties.features) {
            atlas.counties[feature.properties.COUNTYCODE] = feature
        }

        for (let c of countycode) {
            atlas.towns[c] = {}
        }
        for (let feature of towns.features) {
            atlas.towns[feature.properties.COUNTYCODE][feature.properties.TOWNCODE] = feature
        }

        resolve(atlas)
    })
}

export default regularizeAtlas;