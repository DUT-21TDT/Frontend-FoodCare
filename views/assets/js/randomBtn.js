

$('.random_js-btn').on("click", function () {
    $('.random_result').html('');
    var url = `https://reqres.in/api/users?page=2`;
    $.ajax({
        url: url,
    }).then(data => {
        $('.food_result-container').html('');
        var result = "";
        let x;
        $('.random_result').html('');
        x = Math.floor((Math.random() * (data.data.length - 1)));

        result += `
                <div class="ran_img_container">
                    <img src="${data.data[x].avatar}" class="rand_img" alt="">
                </div>
                <h2 class="pt-4 pb-4">${data.data[x].first_name}</h2>
                `;
        $('.random_result').append(result);
        result = "";
    }).catch(err => {
        console.log(err);
    })
})
