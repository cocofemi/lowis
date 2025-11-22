import { gql } from "@apollo/client";

export const CREATE_ASSESSMENT = gql `
mutation CreateAssessment($input:AssessmentInput!) {
  createAssessment(input:$input) {
    id
    question
    options
    correctAnswer
    explanation
    lessonId
    createdBy{
      id
      fname
      lname
    }
    createdAt
    updatedAt
  }
}
`

export const UPDATE_ASSESSMENT = gql `
mutation UpdateAssessment($input:UpdateAssessmentInput!) {
  updateAssessment(input:$input) {
    id
    question
    options
    correctAnswer
    explanation
    lessonId
    createdBy{
      id
      fname
      lname
    }
    createdAt
    updatedAt
  }
}
`

export const DELETE_ASSESSMENT = gql `
mutation DeleteAssessment($id:ID!) {
  deleteAssessment(id:$id) 
}
`