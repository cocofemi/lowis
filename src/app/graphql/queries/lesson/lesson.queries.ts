import { gql } from "@apollo/client";

export const CREATE_LESSON = gql `
mutation CreateLesson($input:LessonInput!){
  createLesson(input:$input){
      id
      title
      courseId
      videoUrl,
      textContent
      createdBy {
        id
        fname
        lname
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_LESSON_ID = gql `
query GetLesson($id:ID!){
  lesson(id:$id) {
    id
    title
    courseId
    videoUrl
    textContent
    createdBy{
        id
        fname
    }
    createdAt
  }
}
`

export const UPDATE_LESSON = gql `
mutation UpdateLesson($input:UpdateLessonInput!){
  updateLesson(input:$input) {
    title
  }
}
`
export const DELETE_LESSON = gql `
mutation DeleteLesson($id:ID!){
  deleteLesson(id:$id)
}
`