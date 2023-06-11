
var size = 12;
var urlOwnMenu = `/user/getMyMenu`;
var ownMenuData;
var sortOrder = 0;
var sortedData;
var isNewestActive = false;
var isFamousActive = false;

function loadMyMenu(data, pageNumber) {
    if (ownMenuData.length === 0) {
        $('.menu_row-data').html('<p class="text-center">No results found for the search text.</p>');
    } else {
        $('.menu_row-data').html('');
        let result = "";

        for (let i = (pageNumber - 1) * size; i < (pageNumber - 1) * size + size; i++) {
            if (i < data.length) {
                var emptyImg = 'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg';
                var img = (/(?:\.jpe?g|\.png)/i.test(data[i].menuimage)) ? data[i].menuimage : emptyImg;
                var style = 'background-image: url(\'' + img + '\');';
                result += `
                <div class="col">
                <div class="home-product-item">
                    <a href="/user/menuid=${data[i].menuid}" target="_blank">
                        <div class="home-product-item__img"
                            style="${style}">
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
                            class="home-product-item__action-btn btn btn-info"  id = "/user/getViewEditMenu${data[i].menuid}">Sửa</button>
                        
                            <button type="button" class="home-product-item__action-btn btn btn-danger" id = "/user/deleteMenu${data[i].menuid}">Xóa</button>
                    </div>
                    <div class="home-product-item__status"> `

                if (data[i].privacy == 2) result +=
                    ` <span class="home-product-item__public">
                            <i class="fa-solid fa-unlock"></i>
                        </span> `;
                else result += ` <span class="home-product-item__private" id="/user/proposeMenu=${data[i].menuid}">
                    <i class="fa-solid fa-lock"></i>
                </span> `

                result +=
                    ` </div>
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

    ownMenuData = await $.ajax({
        dataType: 'json',
        url: urlOwnMenu,
        success: function (datas) {
            return datas.data;
        }
    });



    if (ownMenuData.data != null) {
        $('.home-filter__page').pagination({
            dataSource: function (done) {
                $.ajax({
                    success: function () {
                        done(ownMenuData.data.list);
                    }
                });
            },
            pageSize: size,
            showPrevious: false,
            showNext: false,
            afterPageOnClick: function (event, pageNumber) {
                loadMyMenu(ownMenuData.data.list, pageNumber);
            },
            beforeInit: function (event, pageNumber) {
                loadMyMenu(ownMenuData.data.list, 1);
            }
        })
    } else {
        $('.menu_row-data').html('<p class="text-center">No menu was created.</p>');
    }




});

$(document).on('change', '.select-input__combo-box', function () {
    var selectedOption = $(this).val();
    if (selectedOption === 'az') sortOrder = 1;
    else if (selectedOption === 'za') sortOrder = -1;
    else sortOrder = 0;
    console.log(sortOrder)

    loadSort();
});

$(document).on('click', '.home-filter__btn', function () {
    $(this).toggleClass('active');

    isFamousActive = $('.home-filter__btn:eq(0)').hasClass('active');
    console.log(isFamousActive + " " + isNewestActive);

    loadSort();
});

function loadSort() {

    sortedData = ownMenuData.data.list.sort(function (a, b) {


        if (isFamousActive) {
            if (a.favoriteCount !== b.favoriteCount) {
                return b.favoriteCount - a.favoriteCount;
            }
        }


        if (a.menuname.localeCompare(b.menuname) !== 0) {
            if (sortOrder !== 0)
                return a.menuname.localeCompare(b.menuname) * sortOrder;
        }

        return a.menuid - b.menuid;
    });

    loadMyMenu(sortedData, 1);
}


$(document).on('click', '.home-product-item__action-btn.btn-danger', async function (event) {
    var clickedButton = $(event.target);
    var urldelete = clickedButton.attr('id');
    console.log(urldelete);

    var confirmed = confirm("Are you sure you want to delete?");
    if (!confirmed) {
        return; // Cancel the delete operation
    }

    const res = await $.ajax({
        dataType: 'json',
        url: urldelete,
        type: 'DELETE',
        success: function (data) {
            alert("Đã xóa thành công");
            window.location.href = '/user/mymenu';
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error('Delete request error');
            console.error(errorThrown);
        }
    });
});


$(document).on('click', '.home-product-item__action-btn.btn-info', function (event) {
    var clickedButton = $(event.target);
    var urlGetEditMenu = clickedButton.attr('id');
    window.location.href = urlGetEditMenu;
});

$(document).on('click', '.home-product-item__private', async function (event) {
    var clickedButton = $(this);
    var urlPublish = clickedButton.attr('id');

    console.log(urlPublish);

    var confirmed = confirm("Are you sure you want to public this menu?");
    if (!confirmed) {
        return; // Cancel the delete operation
    }

    const res = await $.ajax({
        dataType: 'json',
        url: urlPublish,
        type: 'PUT',
        success: function (data) {
            alert('Wating for the administrator release your menu');
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Your menu stills in queue');
        }
    });
});
