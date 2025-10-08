export const status_code: { [key: number]: string } = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    405: "Method not allowed",
    409: "Conflict request",
    500: "Internal server error"
}

const error_code = {
    auth:'100',
    user:'101',
    designation:'102'
}

export const error_message = {
    user_not_found:{
        message:"user not found",
        code:`${error_code?.user}_404`
    },
    user_already_exist:{
        message:"user already exist",
        code:`${error_code?.user}_400`
    },
    designation_not_found:{
        message:"designation not found",
        code:`${error_code?.designation}_404`
    },
    password_strength:{
        message:"password is too weak",
        code:`${error_code?.auth}_400`
    },
    password_incorrect:{
        message:"wrong password",
        code:`${error_code?.auth}_400`
    },
    profile_disabled:{
        message:"Your profile has been disabled. Please contact the admin",
        code:`${error_code?.user}_403`
    }
}