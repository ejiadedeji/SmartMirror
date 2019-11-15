let r;
const count = 0;
let access_token;
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var days_abbr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var steps_data = [];

function getToken(){
    var url = new URL(window.location.href);
    // var urlParams = new urlParams(url);

    var auth_code = url.searchParams.get("code");
    $.ajax({
        url: 'https://accounts.google.com/o/oauth2/token',
        type: 'POST',
        async: false,
        data: {
            code: auth_code,
            client_id: "428805490933-37lkb506bjqhpeculpuuv2atl2722046.apps.googleusercontent.com",
            client_secret: "oYdwEzUas2FShQK9FjiCYi9h",
            redirect_uri: "http://localhost/SmartMirror/index.html",
            grant_type: "authorization_code"
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function (response) {
            console.log("token: " + response.access_token);
            loadGoogleFit(response.access_token);
        },
        error: function () {
            alert("error");
        }
    });
}

function getAuthCode(){
    gapi.auth2.getAuthInstance().signIn().then(function(got)
    {
        var go = gapi.auth2.getAuthInstance();
        console.log(got.Zi.access_token);
        access_token = got.Zi.access_token;
        loadGoogleFit(access_token);

    });
}


function loadGoogleFit(accessToken){
    var end_time = new Date();
    var start_time = new Date();


    end_time.setHours(0,0,0);
    //console.log(end_time.getDay());

    start_time.setDate(end_time.getDate() - 7);
    start_time.setHours(0,0,0);
    //console.log(start_time.getDay());


    // console.log(start_time.getTime() + " " + end_time.getTime() + " " + accessToken)
    let body = {
        "aggregateBy": [{
            "dataTypeName": "com.google.step_count.delta",
            "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
        }],
        "bucketByTime": { "durationMillis": 86400000 },
        "startTimeMillis": start_time.getTime(),
        "endTimeMillis": end_time.getTime()
    };
    let headers = new Headers();
    headers.append('Content-type', 'application/json; charset=UTF-8');
    headers.append('Authorization', 'Bearer ' + accessToken);

    fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);

                    for (i = 0; i < 7; i++) {
                        steps_data[i] = [];
                        steps_data[i][0] = days_abbr[new Date(+data.bucket[i+1].startTimeMillis + 3600000).getDay()];
                        if (data.bucket[i+1].dataset[0].point.length != 0){
                            steps_data[i][1] = data.bucket[i+1].dataset[0].point[0].value[0].intVal;
                        }
                        else{
                            steps_data[i][1] = 0;
                        }

                    }
                    console.log(data);
                    console.log(steps_data);
                    // drawFitChart();



                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });

}




