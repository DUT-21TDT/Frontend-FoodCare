
var size = 6;
var urlOwnMenu = `/user/getMyMenu`;
let ownMenuData;

function loadMyMenu(data, pageNumber) {
    if (ownMenuData.length === 0) {
        $('.menu_row-data').html('<p class="text-center">No results found for the search text.</p>');
    } else {
        $('.menu_row-data').html('');
        let result = "";

        for (let i = (pageNumber - 1) * size; i < (pageNumber - 1) * size + size; i++) {
            if (i < data.length) {
                result += `
                <div class="col">
                <div class="home-product-item">
                    <a href="/foodDetail/menuid=${data[i].menuid}" target="_blank">
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
                            class="home-product-item__action-btn btn btn-info"  id = "/user/getViewEditMenu${data[i].menuid}">Sửa</button>
                        
                            <button type="button" class="home-product-item__action-btn btn btn-danger" id = "/user/deleteMenu${data[i].menuid}">Xóa</button>
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
            console.log('Delete request successful');
        },
        error: function (xhr, textStatus, errorThrown) {
            // Handle the error response
            console.error('Delete request error');
            console.error(errorThrown);
        }
    });

    if (res != null) {
        alert("The menu was deleted!")
        window.location.href = "/user/myMenu"; // Replace "/success-page" with the actual URL of the success page
    } else {
        alert("Delete unsuccessfully")
    }
});


$(document).on('click', '.home-product-item__action-btn.btn-info',function(event)
{
    var clickedButton = $(event.target);
    var urlGetEditMenu = clickedButton.attr('id');
    window.location.href = urlGetEditMenu;
});
