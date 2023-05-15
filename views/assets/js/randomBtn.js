

$('.random_js-btn').on("click", function () {
    $('.random_result').html('');
    var url = `http://localhost:3001/api/v1/foods`;
    $.ajax({
        url: url,
    }).then(data => {
        $('.random_result').html('');
        var result = "";
        let x;
        $('.random_result').html('');
        x = Math.floor((Math.random() * (data.data.count - 1)));

        result += `
                <div class="ran_img_container">
                    <img src="${data.data.list[x].foodImage}" class="rand_img" alt="">
                </div>
                <h2 class="pt-4 pb-4">${data.data.list[x].foodName}</h2>
                `;
        $('.random_result').append(result);
        result = "";
    }).catch(err => {
        console.log(err);
    })
})
