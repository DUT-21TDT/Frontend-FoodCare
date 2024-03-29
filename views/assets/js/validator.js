$(document).ready(function () {
    $("#login-form").validate({
        rules: {
            username: {
                required: true,
                //minlength: 3,
                //maxlength: 14,
            },
            password: {
                required: true,
                //minlength: 3,
                //containsSpecialCharacter: true,
            },
        },
        messages: {
            password: {
                containsSpecialCharacter: "Please enter a password containing at least one special character.",
            },
        },
    });

    $.validator.addMethod(
        "validUsername",
        function (value, element) {
            var usernamePattern = /^[A-Za-z0-9_]+$/;
            return this.optional(element) || usernamePattern.test(value);
        },
        "Username must only contain letters, numbers, and underscores."
    );

    $.validator.addMethod("containsSpecialCharacter", function (value, element) {
        return this.optional(element) || /[!@#$%^&*(),.?":{}|<>_]/.test(value);
    }, "Please enter a password containing at least one special character.");

    $('#signup-form').validate({
        rules: {
            username: {
                required: true,
                minlength: 3,
                validUsername: true,
            },
            password: {
                required: true,
                minlength: 8,
            },
            password_again: {
                required: true,
                equalTo: "#register_password",
            },
            fullname: {
                required: true,
            },
            email: {
                required: true,
                customEmail: true,
            },
            birth: {
                required: true,
            },
        }
    });
    $.validator.addMethod(
        "customEmail",
        function (value, element) {
            // Regular expression pattern for valid email formats
            var emailPattern = /^[\w-]+(\.[\w-]+)*@(gmail\.com|yahoo\.com)$/i;
            return this.optional(element) || emailPattern.test(value);
        },
        "Please enter a valid email address."
    );


    $('#change-password-form').validate({
        rules: {
            oldPassword: {
                required: true,
            },
            newPassword: {
                required: true,
                minlength: 8,
            },
            confirmPassword: {
                required: true,
                equalTo: "#newPassword",
            },
        },
        messages: {
            oldPassword: {
                required: "Please enter your current password.",
            },
            newPassword: {
                required: "Please enter your new password..",
                minlength: "New password must be at least 8 characters.",
            },
            confirmPassword: {
                required: "Please re-enter the new password.",
                equalTo: "Confirmation password does not match.",
            },
        },

    });





});


