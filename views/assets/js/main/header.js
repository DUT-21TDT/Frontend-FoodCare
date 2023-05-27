$(document).ready(async ()=>{
    const userInfo = await $.get("/user/getUserInfo", (response)=>{
        return response;
    }).fail((err) =>{
        console.log(err);
    });

    console.log(userInfo);

    $("#fullName").text(userInfo.userInfo.name);
    document.getElementById("avatar").src = userInfo.userInfo.avatarImage;
    document.getElementById("avatar-holder").src = userInfo.userInfo.avatarImage;
});