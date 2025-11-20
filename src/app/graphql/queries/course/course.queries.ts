import { gql } from "@apollo/client";

export const CREATE_COURSE = gql `
mutation CreateCourse($title:String!, $description: String!,
$category:String!, $thumbnail:String, 
$duration:String!) {
  createCourse(title:$title, description:$description,
  category:$category, thumbnail:$thumbnail,
  duration:$duration) {
      id
      title
      description
      category
      thumbnail
      duration
      createdBy{
        id
        fname
        lname
      }
      updatedAt
    }
  }
`

export const GET_COURSES = gql `
query GetCourses{
  courses {
    id
    title
    description
    category
    thumbnail
    duration
    publish
    archive
    lessons {
        id
        title
        videoUrl
        duration
    }
    createdBy{
        id
        fname
        lname
        email
    }
    createdAt
    updatedAt
  }
}
`

export const UPDATE_COURSE = gql`
mutation UpdateCourse($input: UpdateCourseInput!) {
  updateCourse(input:$input) {
    id
    title
    description
    publish
    archive
  }
}
`

