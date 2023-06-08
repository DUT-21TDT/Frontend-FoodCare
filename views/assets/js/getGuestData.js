var pageSize = 4;
var urlMenu = `/get/menus`;
let menuData;
var emptyImg = 'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg';

function loadMenu(data, pageNumber) {
    if (data.length === 0) {
        $('.menu_result-container').html('<p class="text-center">No results found for the search text.</p>');
    } else {
        $('.menu_result-container').html('');
        let result = "";

        for (let i = (pageNumber - 1) * pageSize; i < (pageNumber - 1) * pageSize + pageSize; i++) {
            if (i < data.length) {
                var emptyImg = 'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg';
                var img = (/(?:\.jpe?g|\.png)/i.test(data[i].menuimage)) ? data[i].menuimage : emptyImg;
                result += `
                    <div class="search_result menu_result">
                        <a href="/foodDetail/menuid=${data[i].menuid}" target="_blank">
                            <p id="menuID" hidden>${data[i].menuid}</p>
                            <img class="search_img" src="${img}" alt="">
                            <p class="text-center ellipsis">${data[i].menuname}</p>
                        </a>
                    </div>
                `;
            } else {
                result += `
                    <div class="search_result menu_result">
                        <a href="#">
                            <div class="" style="width: 200px;"></div> 
                            <p class="text-center"></p>
                        </a>
                    </div>
                `;
            }
        }

        $('.menu_result-container').append(result);
    }

}

$(document).ready(async function () {

    menuData = await $.ajax({
        dataType: 'json',
        url: urlMenu,
        success: function (datas) {
            return datas.data;
        }
    });

    $('.menu_page-btn').pagination({
        dataSource: function (done) {
            $.ajax({
                success: function () {
                    done(menuData.data.list);
                }
            });
        },
        pageSize: pageSize,
        showPrevious: false,
        showNext: false,
        afterPageOnClick: function (event, pageNumber) {
            loadMenu(menuData.data.list, pageNumber);
        },
        beforeInit: function (event, pageNumber) {
            loadMenu(menuData.data.list, 1);
        }
    })

});

$(`.menu_search-input`).change(async () => {
    const searchText = $('.menu_search-input').find('input').val();


    const filteredData = menuData.data.list.filter(food => food.menuname.toLowerCase().includes(searchText.toLowerCase()) || food.creator.toLowerCase().includes(searchText.toLowerCase()));


    $('.menu_page-btn').pagination({
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
            loadMenu(filteredData, pageNumber);
        },
        beforeInit: function (event, pageNumber) {
            loadMenu(filteredData, 1);
        }
    })
})