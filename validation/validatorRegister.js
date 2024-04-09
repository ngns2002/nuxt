import validator from 'validator';

const validatorRegister = (data) => {
    let errors = {};

    const { username, email, password, password2 } = data;
    if (validator.isEmpty(username)) {
        errors.username = "Username is required!";
    }
    if (validator.isEmpty(email)) {
        errors.email = "Email is required!";
    } else if (!validator.isEmail(email)) {
        errors.email = "Invalid email format!";
    } else {
        // Kiểm tra xem chuỗi email có chứa ký tự @ không
        if (!email.includes('@')) {
            errors.email = "Email must contain '@'!";
        }
    }
    if (validator.isEmpty(password)) {
        errors.password = "Password is required!";
    }
    if (validator.isEmpty(password2)) {
        errors.password2 = "Confirm password is required!";
    }
    if (!validator.equals(password, password2)) {
        errors.password2 = "Passwords do not match";
    }
    return {
        isInvalid: Object.keys(errors).length > 0,
        errors: errors,
    };
};
export default validatorRegister;