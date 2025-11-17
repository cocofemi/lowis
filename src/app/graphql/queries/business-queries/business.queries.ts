import { gql } from "@apollo/client";

export const REGISTER_BUSINESS = gql `
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