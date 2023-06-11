$(document).on('click', '#likeBtn', async function () {
    var likeBtn = $('#likeBtn');
    var menuId = likeBtn.siblings('p').attr('id');
    var likeUrl = `/user/like` + menuId;
    var unlikeUrl = `/user/unLike` + menuId;

    if (likeBtn.css('color') === 'rgb(255, 0, 0)') {
        likeBtn.css('color', 'initial');
        await $.ajax({
            dataType: 'json',
            url: unlikeUrl,
            type: "POST",
            success: function () {

            }
        });

    } else {
        likeBtn.css('color', 'red');
        await $.ajax({
            dataType: 'json',
            url: likeUrl,
            type: "POST",
            success: function () {

            }
        });
    }
});