import { gql } from "@apollo/client";

export const CREATE_GROUP = gql `
mutation CreateGroup($input:CreateGroupInput!) {
  createGroup(input:$input) {
      id
    business{
      id
      name
    }
    name
    description
    members{
      id
      fname
      lname
    }
    retakeIntervalMonths
  }
}
`

export const GET_GROUPS = gql `
query AllGroups($businessId: ID!){
  groupsByBusiness(businessId:$businessId){
    id
    name
    description
    members{
      id
      fname
      lname
      email
    }
    courses{
      id
      title
    }
    createdAt
    retakeIntervalMonths
  }
}
`

export const EDIT_GROUP = gql `
mutation EditGroup($input:EditGroupInput!){
  editGroup(input:$input) {
    id
    name
  }
}
`

export const DELETE_GROUP = gql`
mutation RemoveGroup($groupId: ID!) {
   deleteGroup(groupId:$groupId)
}
`

export const ADD_MEMBER= gql `
mutation AddMember($input: AddGroupMemberInput!) {
   addMemberToGroup(input: $input){
      id
      members{
      id
      fname
      lname
    }
   }
}
`

export const REMOVE_GROUP_MEMBER = gql `
mutation RemoverMember($input:RemoveGroupMemberInput!){
  removeMemberFromGroup(input:$input) {
    members{
      id
      fname
      lname
    }
  }
}
`

export const ADD_COURSE_GROUP = gql `
mutation AddCourseToGroup($input:AddGroupCourseInput!){
  addCourseToGroup(input:$input){
    courses{
      id
      title
    }
  }
}
`

export const REMOVE_COURSE_GROUP = gql `
mutation RemoveCourses($input:RemoveGroupCourseInput!){
  removeCourseFromGroup(input:$input){
    courses{
      id
      title
    }
  }
}
`