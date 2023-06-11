var checkLike = false;
var checkInput = false;


function createFormComment(urlImg, name) {
    let newFormComment = document.createElement("div");
    newFormComment.classList.add("CommentViewResponse");
    newFormComment.innerHTML = ` 
        <a href="" class="Comment__avatarResponse">
            <div class="avatar-img">
                <img src="${urlImg}" alt="">
            </div>
        </a>
    <form action="">
        
        <input type="text" class = "textCommentResponse" id = "inputCommentResponse" placeholder="Viết Bình Luận ....">
        <a href="#" id = "commentMessageResponse">
            <i class="fa-solid fa-paper-plane CommentViewFooter__iconSendResponse" ></i>
        </a>
    </form>`;
    return newFormComment;
}
function createCommentResponse(urlImg, name, text) {
    let newCommentResponse = document.createElement("div");
    newCommentResponse.innerHTML = `
    
    <a href="" class="Comment__avatar">
    <div class="avatar-img">
        <img src="${urlImg}" alt="">
    </div>
</a>
<div class = "CommentByUser">
    <h4 class = "CommentByUser__name">${name}</h4>
    <span class = "CommentByUser__text">${text}
    </span>
</div>
    `;
    return newCommentResponse;
}
function createComment(urlImg, name, text) {
    let newComment = document.createElement("div");
    newComment.classList.add("divCommentCreated");
    newComment.innerHTML = `
    
    <a href="" class="Comment__avatar">
        <div class="avatar-img">
            <img src="${urlImg}" alt="">
        </div>
    </a>
    <div class = "CommentByUser">
        <h4 class = "CommentByUser__name">${name}</h4>
        <span class = "CommentByUser__text">${text}
        </span>
    </div>


    `;
    // divCommentElement.appendChild(newComment);

    $("#DivComment").append(newComment);
    $("#DivComment div").css("display", "flex");
    $("#DivComment div").css("margin-top", "5px");


}
$(document).ready(function () {
    var urlImg = $("#imageUserComment").val();
    var Name = $("#nameUserComment").val();
    $("#TheaLike").click(function (event) {
        event.preventDefault();
        if (checkLike == false) {
            $(".CommentViewBody__btnLike").css("color", "#139ff8");
            $(".CommentViewBody__btnLike").animate({ width: "+= 3px", height: "+= 3px" }, "slow");
            checkLike = true;
        }
        else {
            $(".CommentViewBody__btnLike").css("color", "grey");
            checkLike = false;
        }
    });
    $("#inputComment").change(function () {
        var str = $("#inputComment").val();
        if (str != "") {
            $(".CommentViewFooter__iconSend").css("color", "#139ff8");
        }
        else {
            $(".CommentViewFooter__iconSend").css("color", "grey");
        }
    })


    $(document).keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
            var text = $("#inputComment").val();
            if (text != "") {
                createComment(urlImg, Name, text);
                try {
                    let favorite = 0;
                    let comment = text;
                    let id = $('#commentMessage').attr('class');
                    $.ajax({
                        url: `/user/userComment${id}`,
                        type: 'POST',
                        data: {
                            favorite: favorite,
                            comment: comment,
                        },
                        success: function (response) {
                            console.log(response);
                        },
                        error: function (error) {
                            console.error(error);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
                $("#inputComment").val("");
            }

        }
    });
    $(document).on('click', "#commentMessage", function (event) {
        event.preventDefault();
        var text = $("#inputComment").val();
        if (text != "") {
            createComment(urlImg, Name, text);
            try {
                let favorite = 0;
                let comment = text;
                let id = $('#commentMessage').attr('class');
                $.ajax({
                    url: `/user/userComment${id}`,
                    type: 'POST',
                    data: {
                        favorite: favorite,
                        comment: comment,
                    },
                    success: function (response) {
                        console.log(response);
                    },
                    error: function (error) {
                        console.error(error);
                    }
                });
            } catch (error) {
                console.error(error);
            }
            $("#inputComment").val("");
        }

    })

    $(document).on("click", "#DivComment__response", function (event) {
        event.preventDefault(); // ngăn chặn trình duyệt chuyển hướng sang một trang khác
        // code xử lý sự kiện click

        var parentDiv = $(this).closest("div.divCommentCreated");
        var childDiv = createFormComment(urlImg, name);
        parentDiv.after(childDiv);

    });
    $("#inputCommentResponse").change(function () {
        var str = $("#inputCommentResponse").val();
        if (str != "") {
            $(".CommentViewFooter__iconSendResponse").css("color", "#139ff8");
        }
        else {
            $(".CommentViewFooter__iconSendResponse").css("color", "grey");
        }
    })
    $(document).on("click", "#commentMessageResponse", function (event) {
        event.preventDefault(); // ngăn chặn trình duyệt chuyển hướng sang một trang khác
        // code xử lý sự kiện click
        var text = $("#inputCommentResponse").val();
        var parentDiv = $(this).closest("div.CommentViewResponse");
        var childDiv = createCommentResponse(urlImg, Name, text);

        parentDiv.empty();
        console.log(parentDiv);
        parentDiv.append(childDiv);
        $("#inputCommentResponse").val("");

    });


    $(document).on('click', '.cmt', function (event) {
        $(".CommentView").fadeIn();
        $(".container.food_in4").css("opacity", "0.2");

    });
    $(document).on('click', '.CommentViewHeader__xmark', function (event) {
        event.preventDefault();
        $(".CommentView").fadeOut();
        $(".container.food_in4").css("opacity", "1");
    })
    $(document).on('click', '#btnSendMessage', function (event) {

    })



}
);






