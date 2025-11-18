import { gql } from "@apollo/client";

export const REGISTER_ORGANISATION = gql `
    mutation RegisterBusiness($name:String!, $phone:String!, $address:String!, $serviceType:String! $logo:String){
    registerBusiness(name:$name, phone:$phone, address:$address, serviceType:$serviceType,
    logo:$logo) {
        name
        phone
        address
        serviceType
        ownerId {
            id
            fname
            lname
        }
        logo
        subscriptionPlan
        subscriptionStatus
    }
}
`

export const GET_ORGANISATION = gql`
query GetBusiness($businessId: ID!) {
  business(businessId:$businessId) {
    id
    name
    address
    phone
    ownerId {
        id
        fname
        lname
    }
    logo
    serviceType
    subscriptionPlan
    subscriptionStatus
    createdAt
  }
}
`

export const UPDATE_ORGANISATION = gql `
    mutation UpdateBusiness($id:ID!, $name: String
    $phone: String
    $address: String
    $serviceType: String
    $logo: String) {
        updateBusiness(id:$id, name: $name
    phone: $phone
    address: $address
    serviceType: $serviceType
    logo: $logo){
            name
            phone
            address
            serviceType
            logo
        }
    }
`