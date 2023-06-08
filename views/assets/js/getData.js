
var pageSize = 4;
var url = `/get/foods`;
let foodData;
var emptyImg = 'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg';


function loadPage(data, pageNumber) {

    if (data.length === 0) {
        $('.food_result-container').html('<p class="text-center">No results found for the search text.</p>');
    } else {
        $('.food_result-container').html('');
        let result = "";

        for (let i = (pageNumber - 1) * pageSize; i < (pageNumber - 1) * pageSize + pageSize; i++) {
            if (i < data.length) {
                var img = ((/(?:\.jpe?g|\.png)/i.test(data[i].foodimage)) || (/^https:\/\//i.test(data[i].foodimage))) ? data[i].foodimage : emptyImg;
                result += `
                    <div class="search_result food_result">
                        <a href="/foodDetail/${data[i].foodid}" target="_blank">
                            <p id="foodID" hidden>${data[i].foodid}</p>
                            <img class="search_img" src="${img} " alt="">
                            <p class="text-center ellipsis">${data[i].foodname}</p>
                        </a>
                    </div>
                `;
            } else {
                result += `
                    <div class="search_result food_result">
                        <a href="#">
                            <div class="" style="width: 200px;"></div> 
                            <p class="text-center "></p>
                        </a>
                    </div>
                `;
            }
        }

        $('.food_result-container').append(result);
    }

}



//Init data
$(document).ready(async function () {



    foodData = await $.ajax({
        dataType: 'json',
        url: url,
        success: function (datas) {
            return datas.data;
        }
    });


    $('.food_page-btn').pagination({
        dataSource: function (done) {
            $.ajax({
                success: function () {
                    done(foodData.data.list);
                }
            });
        },
        pageSize: pageSize,
        showPrevious: false,
        showNext: false,
        afterPageOnClick: function (event, pageNumber) {
            loadPage(foodData.data.list, pageNumber);
        },
        beforeInit: function (event, pageNumber) {
            loadPage(foodData.data.list, 1);
        }
    })


});

//Text change in search food input
$(`.food_search-input`).change(async () => {
    const searchText = $('.food_search-input').find('input').val();


    const filteredData = foodData.data.list.filter(food => food.foodname.toLowerCase().includes(searchText.toLowerCase()));


    $('.food_page-btn').pagination({
        dataSource: function (done) {
            $.ajax({
                success: function () {
                    done(filteredData);
                }
            });
        },
        pageSize: pageSize,
        showPrevious: false,
        showNext: false,
        afterPageOnClick: function (event, pageNumber) {
            loadPage(filteredData, pageNumber);
        },
        beforeInit: function (event, pageNumber) {
            loadPage(filteredData, 1);
        }
    })
});


//Random button
$('.random_js-btn').on("click", async function () {
    $('.random_result').html('');


    var selectedLabels = [];
    $('input[type="checkbox"]:checked').each(function () {
        selectedLabels.push($(this).val());
    });

    var filteredFoodData = foodData.data.list.filter(function (food) {
        var foodTags = food.foodTags;
        return selectedLabels.every(function (label) {
            return foodTags.includes(label);
        });
    });

    if (filteredFoodData.length > 0) {
        var randomIndex = Math.floor(Math.random() * filteredFoodData.length);
        var randomFood = filteredFoodData[randomIndex];
        var img = ((/(?:\.jpe?g|\.png)/i.test(randomFood.foodimage)) || (/^https:\/\//i.test(randomFood.foodimage))) ? randomFood.foodimage : emptyImg;
        var result = `
        <div class="ran_img_container">
          <img src="${randomFood.foodimage}" class="rand_img" alt="">
        </div>
        <h2 class="pt-4 pb-4">${randomFood.foodname}</h2>
      `;

        $('.random_result').html(result);
    } else {
        var result = '<p>No food matches.</p>';
        $('.random_result').html(result);
    }
});

