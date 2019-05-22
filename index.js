var sha256 = require('js-sha256');

var Base64 = require('js-base64').Base64;

var base64 = require('base-64');

var utf8 = require('utf8');

const fetch = require("node-fetch");

const SecretKey = 'test';

const host = 'https://api.easypay.ua';


fetch('https://api.easypay.ua/api/system/createApp', {
    method: 'POST',
    headers: {
         'Content-Type': 'application/json',
         'PartnerKey': 'partnerName',
         'locale': 'ua'
    }
}) .then(res => res.json())
    .then(json => {
        const body = {
            "order": {
                "serviceKey": "string",
                "orderId": "string",
                "description": "string",
                "account": "string",
                "amount": 0
            }
        };

        const requestBody = JSON.stringify(body);

        console.log('requestBody',requestBody);

        const data = SecretKey+requestBody;

        console.log('data',data)

        var bytes = utf8.encode(data)

        const Sign = base64.encode(sha256(bytes));

        console.log(555, Sign);
        console.log(666, base64.decode(Sign))

        const byte = base64.decode(Sign);

        var text = utf8.decode(byte);

        console.log(text);

        const headers = {
            'PartnerKey': 'partnerName',
            'locale': 'ua',
            'AppId': json.appId,
            'RequestedSessionId': json.requestedSessionId,
            'PageId': json.pageId,
            'Sign': Sign
        }

        console.log('headers',headers)


        fetch('https://api.easypay.ua/api/merchant/createOrder', {
            method: 'POST',
            headers: headers,
            body:  body
        }).then(data => data.json()).then(result=>{

            console.log(456,result);


            // const body = {
            //     "userPaymentInstrument": {
            //     "instrumentId": 0,
            //     "instrumentType": "EMoney"
            //     },
            //     "resultUrl": "string"
            // };
            //
            // const requestBody = JSON.stringify(body);
            //
            // const data = SecretKey+requestBody;
            //
            // console.log('data',data)
            //
            // var bytes = utf8.encode(data)
            //
            // const Sign = base64.encode(sha256(bytes));
            //
            // console.log(555, Sign);
            // console.log(666, base64.decode(Sign))
            //
            // // const byte = base64.decode(Sign);
            // //
            // // var text = utf8.decode(byte);
            //
            // const headers = {
            //     'PartnerKey': 'partnerName',
            //     'locale': 'ua',
            //     'AppId': result.appId,
            //     'RequestedSessionId': result.requestedSessionId,
            //     'PageId': result.pageId,
            //     'Sign': Sign
            // }
            // console.log('headers',headers);
            //
            // fetch('https://api.easypay.ua/api/merchant/payment', {
            //     method: 'POST',
            //     headers: headers,
            //     body:  body
            // }).then(data => data.json()).then(resul=>{
            //     console.log(123,resul)
            // })

        })


    });





// const Sign= Base64(sha256(SecretKey+requestBody));