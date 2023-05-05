var userData = [];
var pageSize = 4;

function loadPage(pageNumber) {
    var url = `https://reqres.in/api/users?page=2`;
    $.ajax({
        url: url,
    }).then(data => {
        $('.food_result-container').html('');
        var result = "";

        for (var i = (pageNumber - 1) * pageSize; i < (pageNumber - 1) * pageSize + pageSize; i++) {
            if (i < data.data.length) {
                result += `
            <div class="search_result food_result">
            <a href="">
              <img class="search_img" src="${data.data[i].avatar}" alt="">
              <p class="text-center">${data.data[i].first_name}</p>
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


$(document).ready(function () {
    var url = "https://reqres.in/api/users?page=2";

    $.ajax({
        dataType: 'json',
        url: url,
        success: function (datas) {
            userData = datas.data;
            // var result = "";
            // var res = "";
            // datas.data.forEach(item => {
            //     const { email, first_name, last_name, avatar } = item;
            //     result += `
            //         <tr>
            //             <td>${first_name}</td>
            //             <td>${last_name}</td>
            //             <td>${email}</td>
            //             <td><img src = "${avatar}" width="30" class = "rounded-circle"></td>
            //         </tr>
            //         `;

            //     res += `
            //         <div class="col-3">
            //             <h3>${first_name}</h3>
            //             <h3>${last_name}</h3>
            //             <img src = "${avatar}" width="40" class = "rounded-circle">
            //         </div>
            //     `;
            // });
            // $('table').append(result);
            // $('.info_person').append(res);
        }
    });


    $('.food_page-btn').pagination({
        dataSource: function (done) {
            $.ajax({
                success: function () {
                    done(userData);
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
        }/*,
        callback: function(data, pagination) {
            var html = `<p>Phan tu</p>`;
            $(`#content`).html(html);
        }*/
    })

});