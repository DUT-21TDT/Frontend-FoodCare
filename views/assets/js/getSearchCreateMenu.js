const pageSize = 4;
var url = `http://localhost:3001/api/v1/public/foods`;
let foodData;

function loadPage(data, pageNumber) {

    if (data.length === 0) {
        $('.create_result-container').html('<p class="text-center">No results found for the search text.</p>');
    } else {
        $('.create_result-container').html('');
        let result = "";

        for (let i = (pageNumber - 1) * pageSize; i < (pageNumber - 1) * pageSize + pageSize; i++) {
            if (i < data.length) {
                console.log(data[i].energy);
                result += `
                <li data-foodid="${data[i].foodid}"
                    data-energy="${data[i].energy}"
                    data-water="${data[i].water}"
                    data-carbohydrate="${data[i].carbohydrate}"
                    data-protein="${data[i].protein}"
                    data-lipid="${data[i].lipid}"
                    data-vitamins="${data[i].vitamins}"
                    data-minerals="${data[i].minerals}">
                    <p id="foodID" hidden>${data[i].foodid}</p>
                  <div class="CYM_body__right-bottom--img">
                    <img src="${data[i].foodimage}" alt="" id="foodImageId${data[i].foodid}">
                    <i class="fa-solid fa-circle-plus CYM_body__right-bottom--icon Add"></i>
                  </div>
                  <a href="/foodDetail/${data[i].foodid}" class="NameOfFood" data-foodname="${data[i].foodname}">${data[i].foodname}</a>
                </li>
              `;
            }
            //else {
            //     result += `
            //         // <div class="search_result food_result">
            //         //     <a href="#">
            //         //         <div class="search_img" style="width: 200px;"></div> 
            //         //         <p class="text-center"></p>
            //         //     </a>
            //         // </div>
            //     `;
            // }
        }

        $('.create_result-container').append(result);
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

    $('.create_page-btn').pagination({
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

    $('.create_result-container').on('click', '.CYM_body__right-bottom--img img', function () {
        var foodName = $(this).closest('li').find('.NameOfFood').data('foodname');
        var foodId = $(this).closest('li').find('#foodID').text();
        var tableBody = $('#Breakfast');

        // Check if the food is already in the table
        var existingRow = tableBody.find('td[data-foodid="' + foodId + '"]').closest('tr');
        if (existingRow.length) {
            // Increment the count if the food is already present
            var countElement = existingRow.find('.count');
            var count = parseInt(countElement.text(), 10);
            countElement.text(count + 1);
        } else {
            // Add a new row if the food is not already present
            var newRow = $('<tr></tr>');
            newRow.append('<td>' + foodName + '</td>');
            newRow.append('<td class="count">1</td>');
            newRow.append('<td><button class="minusButton"><i class="fas fa-minus"></i></button><button class="plusButton"><i class="fas fa-plus"></i></button></td>');
            newRow.find('.count').attr('data-foodid', foodId);
            tableBody.append(newRow);
        }
    });

    $('#Breakfast').on('click', '.minusButton', function () {
        var row = $(this).closest('tr');
        var countElement = row.find('.count');
        var count = parseInt(countElement.text(), 10);
        count--;
        if (count === 0) {
            row.remove();
        } else {
            countElement.text(count);
        }

        updateNutritionInfo();
    });

    $('#Breakfast').on('click', '.plusButton', function () {
        var row = $(this).closest('tr');
        var countElement = row.find('.count');
        var count = parseInt(countElement.text(), 10);
        count++;
        countElement.text(count);

        updateNutritionInfo();
    });

    function updateNutritionInfo() {
        var energy = 0;
        var water = 0;
        var carbohydrate = 0;
        var protein = 0;
        var lipid = 0;
        var minerals = [];
        var vitamins = [];

        // Calculate the total nutrition values based on the table rows
        $('#Breakfast tr').each(function () {
            var count = parseInt($(this).find('.count').text(), 10);
            var foodId = $(this).find('.count').data('foodid');
            var foodRow = foodData.data.list.find(function (item) {
                return item.foodid === foodId;
            });

            if (foodRow) {
                var energyValue = parseFloat(foodRow.energy) || 0;
                var waterValue = parseFloat(foodRow.water) || 0;
                var carbohydrateValue = parseFloat(foodRow.carbohydrate) || 0;
                var proteinValue = parseFloat(foodRow.protein) || 0;
                var lipidValue = parseFloat(foodRow.lipid) || 0;

                energy += count * energyValue;
                water += count * waterValue;
                carbohydrate += count * carbohydrateValue;
                protein += count * proteinValue;
                lipid += count * lipidValue;

                if (foodRow.minerals && typeof foodRow.minerals === 'string') {
                    var foodMinerals = foodRow.minerals.trim().split(' ');
                    minerals = mergeArrays(minerals, foodMinerals);
                }

                if (foodRow.vitamins && typeof foodRow.vitamins === 'string') {
                    var foodVitamins = foodRow.vitamins.trim().split(' ');
                    vitamins = mergeArrays(vitamins, foodVitamins);
                }
            }
        });

        // Update the nutriinfor--item__text elements with the calculated values
        $('.nutriinfor--item__text-energy').text(energy.toFixed(1) + ' calories');
        $('.nutriinfor--item__text-water').text(water.toFixed(1) + ' ml');
        $('.nutriinfor--item__text-carbohydrate').text(carbohydrate.toFixed(1) + ' gram');
        $('.nutriinfor--item__text-protein').text(protein.toFixed(1) + ' gram');
        $('.nutriinfor--item__text-lipid').text(lipid.toFixed(1) + ' gram');
        $('.nutriinfor--item__text-vitamins').text(vitamins.join(' '));
        $('.nutriinfor--item__text-minerals').text(minerals.join(' '));
    }

    function mergeArrays(arr1, arr2) {
        var merged = arr1.slice();
        arr2.forEach(function (item) {
            if (merged.indexOf(item) === -1) {
                merged.push(item);
            }
        });
        return merged;
    }

});

$(`.create_search-input`).change(async () => {
    const searchText = $('.create_search-input').find('input').val();


    const filteredData = foodData.data.list.filter(food => food.foodname.toLowerCase().includes(searchText.toLowerCase()));


    $('.create_page-btn').pagination({
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

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

var createElementFood = function (text) {

    var ElementFood = document.createElement("tr");
    ElementFood.innerHTML = `
          <td>${text}</td>
          <td><a href=""><i class="fa-solid fa-circle-minus table-icon"></i></a></td>`;


    return ElementFood;

}

