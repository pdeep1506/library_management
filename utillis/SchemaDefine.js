import Joi from "joi";

const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
// const stringPassswordError = new Error("Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length")
export const userSchemaValidator = Joi.object({
    fName: Joi.string().min(3).required(),
    lName: Joi.string().min(3).required(),
    cNumber: Joi.string().min(10).max(10).required(),
    role: Joi.string(),

    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().regex(strongPasswordRegex).required()

})

export const adminSchemaValidator = Joi.object({
    fName: Joi.string().min(3).required(),
    lName: Joi.string().min(3).required(),
    cNumber: Joi.string().min(9).required(),


    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().regex(strongPasswordRegex).required(),
    

})


export const authorSchemaValidator = Joi.object({
    fName: Joi.string().min(3).required(),
    lName: Joi.string().min(3).required(),
    cNumber: Joi.string().min(9).required(),


    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    nationality: Joi.string()

})


export const publicationSchemaValidator = Joi.object({
    name: Joi.string().min(3).required(),
    
    cNumber: Joi.string().min(10).max(10).required(),


    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    nationality: Joi.string().required()
})



export const bookSchemaValidator = Joi.object({
    title: Joi.string().min(3).required(),
    subtitle: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    authorId: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/, 'object Id'),
    publicationDate: Joi.date().required(),
    publisherId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/, 'object Id'),
    language: Joi.string().min(1).required(),
    pageCount: Joi.number().integer().min(1).required(),
    hardCopy: Joi.boolean().required(),
    ISBN: Joi.string().required()


})

export const checkEmail = Joi.object({
   


    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  
})



export const checkRole = Joi.object({
    role: Joi.string().required()
}) 