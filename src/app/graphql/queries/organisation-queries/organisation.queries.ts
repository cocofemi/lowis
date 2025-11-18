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

export const INVITE_MEMBER = gql `
    mutation InviteBusinessMember($input: BusinessInviteInput!) {
        inviteBusinessMember(input: $input) {
                id
                email
                business{
                    id
                    name
                }
                role
                token
                status
                invitedBy{
                    id
                    fname
                    lname
                }
                expiresAt
        }
    }
`

export const GET_ORGANISATION_INVITES = gql `
query GetBusinessInvites($businessId:ID!){
    businessInvites(businessId:$businessId){
             id
                email
                business{
                    id
                    name
                }
                role
                token
                status
                invitedBy{
                    id
                    fname
                    lname
                }
                expiresAt
                createdAt
        }
    }
`

export const REVOKE_ORGANISATION_INVITE = gql`
    mutation RevokeInvite($token:String!) {
        revokeBusinessInvite(token: $token) {
            id
                email
                business{
                    id
                    name
                }
                role
                token
                status
                invitedBy{
                    id
                    fname
                    lname
                }
                expiresAt
        }
    }
`

export const VALIDATE_INVITE_TOKEN = gql `
query GetBusinessInvites($token:String!){
    validateInvite(token:$token){
    id
    email
    business{
        id
        name
    }
    role
    token
    status
    invitedBy{
        id
        fname
        lname
    }
    expiresAt
        }
    }
`
export const ACCEPT_INVITE = gql`
    mutation AcceptInvite($token:String!) {
    acceptBusinessInvite(token: $token) {
        id
        email
        business{
            id
                name
            }
        role
        token
        status
        invitedBy{
            id
            fname
            lname
            }
        expiresAt
    }
    }
`