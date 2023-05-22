
const pageSize = 4;
var url = `http://localhost:3001/api/v1/foods`;
let foodData;

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
                        <a href="" target="_blank">
                            <p id="foodID" hidden>${data[i].foodid}</p>
                            <img class="search_img" src="${data[i].foodimage}" alt="">
                            <p class="text-center">${data[i].foodname}</p>
                        </a>
                    </div>
                `;
            } else {
                result += `
                    <div class="search_result food_result">
                        <a href="">
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


$(document).ready(async function () {
    url = `http://localhost:3001/api/v1/foods`;

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

$(`.food_search-input`).change(async () => {
    const searchText = $('.food_search-input').find('input').val();

    // url = "http://localhost:3001/api/v1/foods";
    // var foodData = await $.ajax({
    //     dataType: 'json',
    //     url: url,
    //     success: function (datas) {
    //         return datas.data;
    //     }
    // });

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

