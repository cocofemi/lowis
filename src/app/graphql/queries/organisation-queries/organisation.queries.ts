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

export const GET_ORGANISATION_MEMBERS = gql `
query GetBusinessMembers($businessId:ID!) {
  business(businessId:$businessId) {
    members{
        user{
            id
            fname
            lname
            avatar
            email
        }
        role
        joined
    }
  }
}
`

export const CHANGE_MEMBER_ROLE = gql `
mutation ChangeRole($input:AddMemberInput!) {
  changeMemberRole(input:$input){
    members {
      user{
        id
        fname
        lname
      }
      role
    }
  }
}
`

export const REMOVE_MEMBER = gql `
mutation RemoveMember($input:AddMemberInput!) {
  removeMemberFromBusiness(input:$input){
    members {
      user{
        id
        fname
        lname
      }
    }
  }
}
`

export const DELETE_GROUP = gql `
mutation RemoveGroup($groupId: ID!) {
   deleteGroup(groupId:$groupId)
}
`

export const ADD_COURSES = gql `
mutation AddCourseToBusiness($input:AddCourseInput!){
  addCourseToBusiness(input:$input){
    assignedCourses{
      id
      title
      thumbnail
      description
      lessons {
        id
      }
      duration
      category
    }
  }
}
`

export const GET_ORGANISATION_COURSES = gql `
query BusinessCourses($id: ID!) {
  businessCourses(businessId: $id){
    id
    title
    thumbnail
    description
    category
    lessons {
        id
        title
    }
  }
}
`