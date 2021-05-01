import passwordValidator from 'password-validator';
import validator from 'validator';

var schema = new passwordValidator();
schema
  .is().min(6)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(2)                                // Must have at least 2 digits
  .has().not().spaces()                           // Should not have spaces

const validation = (inputs) => {
  console.log("VVV", inputs)
  return new Promise((resolve, reject) => {
    
    if (inputs.email && !validator.isEmail(inputs.email)) {
      reject({ email: "Email address is not valid" })
    }
    if (inputs.phone && !inputs.phone.match(/^\d{10}$/)) {
      reject({ phone: "10 digits number only. No symbols or letters" })
    }

    if (inputs.password && !schema.validate(inputs.password)) {
      reject({ password: "Must be at least 6 characters with 1 uppercase letter and 2 digits" })
    }

    if (inputs.confirmPassword && inputs.password !== inputs.confirmPassword) {
      reject({ confirmPassword: "Passwords are not matching." })
    }
    resolve("success")
  })
}

export default validation;