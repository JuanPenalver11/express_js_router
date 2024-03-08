export const createDisneyValidationSchema = {
    type:{
        isString:{
            errorMessage: 'Just string are allowed'
        }
    }, 
    name:{
        isString:{
            errorMessage:'Just string are allowed'
        }
    }
};