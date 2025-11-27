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

export const GET_COURSE_ID = gql `
query GetCourse($id:ID!){
  course(id:$id) {
    id
    title
    description
    category
    thumbnail
    duration
    lessons {
      id
      title
      textContent
      videoUrl
    }
      scenarios{
        id
        title
        instructions
        rubric {
          id
          description
          weight
        }
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

export const COMPLETE_COURSE = gql `
mutation CompleteCourse($input:CompleteCourseInput!) {
  completeCourse(input:$input) {
    id
    status
    score
    startedAt
    percentage
    course{
      id
      title
    }
    user{
      id
      fname
      lname
    }
  }
}
`

export const COURSE_PROGRESS_STATUS = gql `
query CourseProgress( $courseId:ID!, $businessId:ID!) {
  userCourseProgressStatus(
  courseId:$courseId, businessId:$businessId) {
    status
    score
  }
}
`

export const COURSE_RESULTS = gql `
query UserCourseResults($businessId:ID!) {
  userCourseResults(
    businessId:$businessId) {
    id
    status
    score
    completedAt
    startedAt
    course {
      id 
      title
    }

  }
}
`