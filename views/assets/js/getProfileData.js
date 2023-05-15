$(document).ready(() => {
    var url = `http://localhost:3001/api/v1/profile/bmi-records/current`;
    $.ajax({
        url: url
    }).then(data => {
        console.log(data.data);
    }).catch(err => {
        console.log(err);
    })
})