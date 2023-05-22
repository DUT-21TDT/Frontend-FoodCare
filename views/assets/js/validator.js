$(document).ready(function () {
    $("#login-form").validate({
        rules: {
            username: {
                required: true,
                minlength: 5,
                maxlength: 14,
            },
            password: {
                required: true,
                minlength: 5,
                containsSpecialCharacter: true,
            },
        },
        messages: {
            password: {
                containsSpecialCharacter: "Please enter a password containing at least one special character.",
            },
        },
    });

    $.validator.addMethod("containsSpecialCharacter", function (value, element) {
        return this.optional(element) || /[!@#$%^&*(),.?":{}|<>_]/.test(value);
    }, "Please enter a password containing at least one special character.");

    $('#signup-form').validate({
        rules: {
            password: {
                required: true
            },
            password_again: {
                equalTo: "#password",
            }
        }
    });
});


