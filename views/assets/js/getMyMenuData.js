
var size = 6;
var urlMenu = `/user/getMyMenu`;
let menu;

function loadMyMenu(data, pageNumber) {
    console.log(data);
    if (data.length === 0) {
        $('.menu_row-data').html('<p class="text-center">No results found for the search text.</p>');
    } else {
        $('.menu_row-data').html('');
        let result = "";

        for (let i = (pageNumber - 1) * size; i < (pageNumber - 1) *size + size; i++) {
            if (i < data.length) {
                result += `
                <div class="col">
                <div class="home-product-item">
                    <a href="#">
                        <div class="home-product-item__img"
                            style="background-image: url(${data[i].menuimage});">
                        </div>
                        <h5 class="home-product-item__name">${data[i].menuname}</h5>
                    </a>
                    <div class="home-product-item__reaction">
                        <span class="home-product-item__love">
                            ${data[i].favoriteCount}
                            <i class="fa-solid fa-heart"></i>
                        </span>
                        <span class="home-product-item__comment">
                            ${data[i].favoriteCount}
                            <i class="fa-solid fa-comment"></i>
                        </span>
                    </div>
                    <div class="home-product-item__action">
                        <button type="button"
                            class="home-product-item__action-btn btn btn-info">Sửa</button>
                        <button type="button"
                            class="home-product-item__action-btn btn btn-danger">Xóa</button>
                    </div>
                    <div class="home-product-item__status">
                        <span class="home-product-item__private hide">
                            <i class="fa-solid fa-lock"></i>
                        </span>
                        <span class="home-product-item__public">
                            <i class="fa-solid fa-unlock"></i>
                        </span>
                    </div>
                </div>
            </div>
                `;
            } else {

            }
        }

        $('.menu_row-data').append(result);
    }

}
//Init data
$(document).ready(async function () {
    menu = await $.ajax({
        dataType: 'json',
        url: urlMenu,
        success: function (datas) {
            return datas;
        }
    });


    $('.home-filter__page').pagination({
        dataSource: function (done) {
            $.ajax({
                success: function () {
                    done(menu.data.list);
                }
            });
        },
        pageSize: size,
        showPrevious: false,
        showNext: false,
        afterPageOnClick: function (event, pageNumber) {
            loadMyMenu(menu.data.list, pageNumber);
        },
        beforeInit: function (event, pageNumber) {
            loadMyMenu(menu.data.list, 1);
        }
    })

});
