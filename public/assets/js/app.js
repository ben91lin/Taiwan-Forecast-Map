import regularizeAtlas from './modules/regularizeAtlas.js'
import Atlas from './modules/atlas.js'
import ControlPanel from './modules/controlPanel.js'
import color from './modules/color.js'
import Main from './main.js'
import Aside from './aside.js'


(async function() {
    const geoJson = await regularizeAtlas()
    const atlas = new Atlas(geoJson, document.querySelector('#taiwan-atlas'))
    console.log(atlas)
    const controlPanel = new ControlPanel()
    const main = new Main(atlas, controlPanel, color)
    console.log(main)
    const aside = new Aside(atlas, controlPanel, color)

    window.addEventListener('resize', function() {
        for (let k of Object.keys(main.atlas.RenderedGroup)) {
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