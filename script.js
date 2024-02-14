import { check, group } from "k6";
import http from "k6/http"
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
    stages : [
        //Load Test
        //Expected ada 5 user yang melakukan kunjungan atau Target 5 user selama 5 detik
        // {duration :"5s", target : 5},
        //Contoh kasus
        // {duration :"1s", target : 5},
        // {duration :"5s", target : 5},
        // {duration :"1s", target : 0},

        //Stress Test
        // {duration :"1s", target : 5},
        // {duration :"5s", target : 5},
        // {duration :"5s", target : 10},
        // {duration :"1s", target : 0},

        //Spike Test
        {duration :"1s", target : 5},
        {duration :"5s", target : 5},
        {duration :"3s", target : 25},
        {duration :"5s", target : 5},
        {duration :"1s", target : 0},
    ],
};

export default function(){
    group('K6 Get Test', () => {
        let response1 = http.get('https://test.k6.io');
        // console.log(JSON.stringify(response1.body))
        check( response1, {
            'is status 200': (r) => r.status == 200
        })
    })

    group('Reqres Create User', () => {
        let url = "https://reqres.in/api/users"
        let body = JSON.stringify(
            {
                "name": "morpheus",
                "job": "leader"
            }
        )
        let response2 = http.post(url, body)
        // http.post(url, body, params) //Penggunaan params biasanya utk authorization
        console.log(JSON.stringify(response2.body))
        check( response2, {
            'is status 201': (r) => r.status == 201
        })

        group('Get User Reqres', () => {
            let url = "https://reqres.in/api/users/2"
            let response3 = http.get(url)
            // console.log(JSON.stringify(response3.body))
            check( response3, {
                'is status 200': (r) => r.status == 200
            })
        })
    })
}

export function handleSummary(data) {
    return {
    //   "result.html": htmlReport(data), //bisa ganti nama
      "script-result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }