// graphql/mutations.ts
import { gql } from "@apollo/client";

export const CREATE_SCENARIO = gql `
mutation NewScenario($input:CreateScenarioInput!) {
  createScenario(input:$input) {
    id
    courseId
    title
  instructions
  rubric{
    id
    description
    weight
  }
  createdAt
  updatedAt
  }
}
`

export const SUBMIT_SCENARIO_ANSWER = gql`
  mutation SubmitScenarioAnswer($input: SubmitScenarioAnswerInput!) {
    submitScenarioAnswer(input: $input) {
      id
      aiScore
      aiFeedback
      attemptNumber
      createdAt
      scenario {
        id
        title
        maxScore
        maxAttempts
      }
    }
  }
`;


export const GET_COURSE_SCENARIOS = gql `
query CourseScenarios($id:ID!) {
  scenarioByCourse(courseId:$id) {
        id
    courseId
    title
  instructions
  rubric{
    id
    description
    weight
  }  
    maxScore
  createdAt
  updatedAt
  }
}
`

export const UPDATE_SCENARIO = gql `
mutation UpdateScenario($input:UpdateScenarioInput!) {
  updateScenario(input:$input) {
    id
    courseId
    title
  instructions
  rubric{
    id
    description
    weight
  }
  maxScore
  createdAt
  updatedAt
  }
}
`

export const DELETE_SCENARIO = gql `
mutation DeleteSecenario($id:ID!) {
deleteScenario(id:$id) 
}
`