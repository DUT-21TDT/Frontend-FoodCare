$(document).ready(function () {
    var likeBtn = $('#likeBtn');
    var isLiked = false;
    
    likeBtn.click(function () {
        if (isLiked) {
            // Revert to initial state
            likeBtn.css('color', 'initial');
            isLiked = false;
        } else {
            // Change color when liked
            likeBtn.css('color', 'red');
            isLiked = true;
        }
    });
});