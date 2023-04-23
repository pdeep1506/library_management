import Joi from "joi";

const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
// const stringPassswordError = new Error("Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length")
export const userSchemaValidator = Joi.object({
    fName: Joi.string().min(3).required(),
    lName: Joi.string().min(3).required(),
    cNumber: Joi.string().min(9).required(),


    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().regex(strongPasswordRegex).required()

})

export const adminSchemaValidator = Joi.object({
    fName: Joi.string().min(3).required(),
    lName: Joi.string().min(3).required(),
    cNumber: Joi.string().min(9).required(),


    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().regex(strongPasswordRegex).required(),
    admin: Joi.boolean().required().equal(true)

})