
var pageSize = 4;
var url = `http://localhost:3001/api/v1/foods`;

function loadPage(pageNumber) {
    url = `http://localhost:3001/api/v1/foods`;
    $.ajax({
        url: url,
    }).then(data => {
        $('.food_result-container').html('');
        var result = "";

        for (var i = (pageNumber - 1) * pageSize; i < (pageNumber - 1) * pageSize + pageSize; i++) {
            if (i < data.data.count) {
                result += `
            <div class="search_result food_result">
            <a href="" target="_blank">
                <p id ="foodID" hidden>${data.data.list[i].foodId}</p>
              <img class="search_img" src="${data.data.list[i].foodImage}" alt="">
              <p class="text-center">${data.data.list[i].foodName}</p>
            </a>
          </div>
            `;
            }
            else {
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
    }).catch(err => {
        console.log(err);
    })
}


$(document).ready(async function () {
    url = `http://localhost:3001/api/v1/foods`;

    var foodData = await $.ajax({
        dataType: 'json',
        url: url,
        success: function (datas) {
            return datas.data;
        }
    });

    console.log(foodData.data.list);

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
            loadPage(pageNumber);
        },
        beforeInit: function (event, pageNumber) {
            loadPage(1);
        }
    })

});

$(`.food_search-input`).change(async () => {
    url = "http://localhost:3001/api/v1/foods";
    var foodData = await $.ajax({
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
            loadPage(pageNumber);
        },
        beforeInit: function (event, pageNumber) {
            loadPage(1);
        }
    })
})

