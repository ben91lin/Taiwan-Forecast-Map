const WeatherAPI = require(__dirname + '/weatherAPI');
const auth = `?Authorization=${require(__dirname + '/auth')}`;

const baseUrl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/'
const counties48 = 'F-D0047-089'
const counties168 = 'F-D0047-091'
const towns48 = ["F-D0047-001", "F-D0047-005", "F-D0047-009", "F-D0047-013", "F-D0047-017", "F-D0047-021", "F-D0047-025", "F-D0047-029", "F-D0047-033", "F-D0047-037", "F-D0047-041", "F-D0047-045", "F-D0047-049", "F-D0047-053", "F-D0047-057", "F-D0047-061", "F-D0047-065", "F-D0047-069", "F-D0047-073", "F-D0047-077", "F-D0047-081", "F-D0047-085"]
const towns168 = ["F-D0047-003", "F-D0047-007", "F-D0047-011", "F-D0047-015", "F-D0047-019", "F-D0047-023", "F-D0047-027", "F-D0047-031", "F-D0047-035", "F-D0047-039", "F-D0047-043", "F-D0047-047", "F-D0047-051", "F-D0047-055", "F-D0047-059", "F-D0047-063", "F-D0047-067", "F-D0047-071", "F-D0047-075", "F-D0047-079", "F-D0047-083", "F-D0047-087"];
const format48 = '&format=JSON&elementName=Wx,AT,T,RH,CI,WeatherDescription';
const format168 = '&format=JSON&elementName=MinCI,MaxAT,MaxCI,MinT,MinAT,MaxT,T,RH,Wx,WeatherDescription';
const formatPoP6h = '&format=JSON&elementName=PoP6h';
const formatPoP12h = '&format=JSON&elementName=PoP12h';

(async function() {
    const weatherAPI = new WeatherAPI(baseUrl, auth);

    console.log('更新開始。')

    await weatherAPI.createUrls(counties48, format48).getForcasts();
    await weatherAPI.parsing().insert('counties48');
    await weatherAPI.reset().createUrls(counties48, formatPoP6h).getForcasts()
    await weatherAPI.parsing().insert('counties48pop6h');
    await weatherAPI.reset().createUrls(counties168, format168).getForcasts();
    await weatherAPI.parsing().insert('counties168');
    await weatherAPI.reset().createUrls(counties168, formatPoP12h).getForcasts()
    await weatherAPI.parsing().insert('counties168pop12h');
    await weatherAPI.reset().createUrls(towns48, format48).getForcasts();
    await weatherAPI.parsing().insert('towns48');
    await weatherAPI.reset().createUrls(towns48, formatPoP6h).getForcasts();
    await weatherAPI.parsing().insert('towns48pop6h');
    await weatherAPI.reset().createUrls(towns168, format168).getForcasts();
    await weatherAPI.parsing().insert('towns168');
    await weatherAPI.reset().createUrls(towns168, formatPoP12h).getForcasts();
    await weatherAPI.parsing().insert('towns168pop12h');

    console.log('更新完成。')
    process.exit()
})()