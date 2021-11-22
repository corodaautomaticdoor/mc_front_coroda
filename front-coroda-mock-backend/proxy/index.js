const request = require('request-promise');
const requestToken = require('request-promise');
const router = require('./endpoints.json');
const dataSession = require('../db/users');

let xAuthToken = undefined;
let gateway = undefined;
let callToken = true;

const endpointInitSession = [
    '',
    '',
    '',
    ''
];

module.exports.request = async(req,res,endpoint,callback) => {
    if(callback && (!process.env.proxy || process.env.proxy === 'false')){
        return res.jsonp(callback(req,res));
    }
    const uri = router[endpoint];
    const _token = '1236123e7-1234-1234-1234-231231231';
    if (req.method == 'POST'){
        const options = {
            method: 'POST',
            uri: uri,
            headers: {
                'Content-type': 'application/json',
                'Request-ID': 'a123q123d-1232-1233-1233-w1232132',
                'Authorization': 'Bearer 12312322-32132123-123213-123123-2323',
                'caller-name': 'xxx',
                'app-code': 'OB',
                'x-auth-token': _token
            },
            json: true
        };
        try {
            console.log('\n+++++++++++++++++++++++++++++++++++');
            console.log('Proxy Request');
            console.log(`Options: ${JSON.stringify(options)}`);
            console.log('+++++++++++++++++++++++++++++++++++\n');
            const re = await request.post(options);
            res.jsonp(re);
        } catch (e){
            res.status(500).jsonp(e.response.body);
            console.log('\n+++++++++++++++++++++++++++++++++++');
            console.log('Proxy Request Error');
            console.log(`Options: ${JSON.stringify(e.response.body)}`);
            console.log('+++++++++++++++++++++++++++++++++++\n');
        }
    }
}