
const pageSize = 4;
var url = `http://localhost:3001/api/v1/foods`;
let foodData;
let menuData;

function loadPage(data, pageNumber) {

    if (data.length === 0) {
        $('.food_result-container').html('<p class="text-center">No results found for the search text.</p>');
    } else {
        $('.food_result-container').html('');
        let result = "";

        for (let i = (pageNumber - 1) * pageSize; i < (pageNumber - 1) * pageSize + pageSize; i++) {
            if (i < data.length) {
                result += `
                    <div class="search_result food_result">
                        <a href="/foodDetail/${data[i].foodid}" target="_blank">
                            <p id="foodID" hidden>${data[i].foodid}</p>
                            <img class="search_img" src="${data[i].foodimage}" alt="">
                            <p class="text-center">${data[i].foodname}</p>
                        </a>
                    </div>
                `;
            } else {
                result += `
                    <div class="search_result food_result">
                        <a href="#">
                            <div class="search_img" style="width: 200px;"></div> 
                            <p class="text-center"></p>
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

//Text change in search input
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
})

//Random button
$('.random_js-btn').on("click", async function () {

    $('.random_result').html('');
    var result = "";
    let x;
    $('.random_result').html('');
    x = Math.floor((Math.random() * (foodData.data.count - 1)));

    result += `
            <div class="ran_img_container">
                <img src="${foodData.data.list[x].foodimage}" class="rand_img" alt="">
            </div>
            <h2 class="pt-4 pb-4">${foodData.data.list[x].foodname}</h2>
            `;
    $('.random_result').append(result);
    result = "";

})


