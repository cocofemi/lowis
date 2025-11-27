import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation Login ($email: String!, $password: String!) {
    login(email:$email, password:$password) {
        token
        user{
        id
        fname
        lname
        email
        role
        bio
        businesses{
            business{
            id
            name
            }
            role
        }
        occupation
        serviceType
        emailVerified
        }
    }
    }
`

export const REGISTER_USER = gql `
    mutation RegisterUser($fname:String!, $lname:String!,
    $email:String!, $password:String!){
    register(fname: $fname, lname:$lname,
    email:$email, password:$password){
        token
        user{
        id
        fname
        lname
        email
        }
    }
    }
`
export const SEND_VERIFICATION_CODE = gql`
    mutation GenerateOtp($email:String!, $type:String!) {
    generateOtp(email:$email, type:$type) {
        email
        otp
        fname
    }
}
`

export const VERIFY_OTP = gql`
    mutation VerifyEmail($email:String!, $otp:String!){
    verifyEmail(email:$email, otp:$otp){
        success
    }
}
`

export const VERIFY_RESET_PASSWORD_OTP = gql `
    mutation VerifyOtp($email:String!, $otp:String!){
    verifyOtp(email:$email, otp:$otp){
        success
    }
}
`


export const FORGOT_PASSWORD = gql `
    mutation ForgotPassword ($email: String!) {
    forgotPassword(email:$email){
        email
        otp
        success
    }
}
`

export const RESET_PASSWORD = gql `
    mutation ResetPassword ($email: String!, $newPassword: String!) {
    resetPassword(email:$email, newPassword:$newPassword) {
        success
    }
}
`

export const GET_USER = gql `
    query GetUser{
    user {
        id
        fname
        lname
        email
        avatar
        occupation
        serviceType
        role
        bio
        businesses {
            business{
                id
                name
            }
            role
        }
        emailVerified
        createdAt
    }
    }
`

export const UPDATE_PROFILE = gql `
    mutation UpdateUser($fname: String, $lname:String,
    $occupation:String, $serviceType:String, 
    $bio: String, $avatar:String){
    updateUser(fname:$fname, lname:$lname, occupation:$occupation,
    serviceType:$serviceType, bio:$bio, avatar:$avatar) {
        fname
        lname
        occupation
        serviceType
        bio
        avatar
    }
}
`

export const CHANGE_PASSWORD = gql `
    mutation ChangePassword($oldPassword:String!, $newPassword:String!){
        changePassword(oldPassword:$oldPassword, newPassword:$newPassword) {
            success
        }
    }
`