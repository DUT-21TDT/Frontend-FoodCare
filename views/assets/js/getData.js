
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


    var getAllTags = await $.ajax({
        dataType: 'json',
        url: `/get/tags`,
        success: function (datas) {
            return datas.data;
        }
    })


    var res = ``;

    getAllTags.data.forEach(element => {
        res += `<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="fatCheckbox" value="${element.tagid}">
        <label class="form-check-label" for="fatCheckbox" style="font-size: 20px;">${element.tagname}</label>
      </div>`;
    });

    $('.tags_data').append(res);


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



    //var filteredFoodData = foodData.data.list;

    var foodsIdByTags = foodData.data.list;


    if (selectedLabels.length != 0) {
        await $.ajax({
            contentType: "application/json",
            url: "/get/foods/tags",
            method: "GET",
            data: {
                tagids: selectedLabels
            },
            success: function (datas) {
                foodsIdByTags = (datas.data !== null) ? datas.data : null;
            },
            error: function (error) {
                console.log("An error occurred:", error);
            }
        });
    }




    if (foodsIdByTags !== null) {
        var randomIndex = Math.floor(Math.random() * foodsIdByTags.length);
        var randomFoodiD = foodsIdByTags[randomIndex].foodid;
        var randomFood = await $.ajax({
            contentType: "application/json",
            url: "/foodDetail",
            method: "GET",
            data: {
                id: randomFoodiD
            },
            success: function (datas) {
                return datas.data;
            },
            error: function (error) {
                console.log("An error occurred:", error);
            }
        });

        console.log(randomFood);
        var img = ((/(?:\.jpe?g|\.png)/i.test(randomFood.data.foodimage)) || (/^https:\/\//i.test(randomFood.data.foodimage))) ? randomFood.data.foodimage : emptyImg;
        var result = `
        <div class="ran_img_container">
          <img src="${img}" class="rand_img" alt="">
        </div>
        <h2 class="pt-4 pb-4">${randomFood.data.foodname}</h2>
      `;

        $('.random_result').html(result);
    } else {
        var result = '<p>No food matches.</p>';
        $('.random_result').html(result);
    }
});

