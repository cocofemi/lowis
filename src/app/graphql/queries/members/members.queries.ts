import { gql } from "@apollo/client";

export const GET_MEMBER_COURSE_PROGRESS = gql `
query UserCourseProgress( $businessId:ID!) {
  userCoursesWithProgress(businessId:$businessId) {
    course{
      id
      title
      description
      thumbnail
      duration
      category
      lessons{
        id
        title
        textContent
        assessments {
            question
            options
            correctAnswer
            explanation
        }
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
    }
    progress{
      id
      business{
        id
        name
      }
      lastLessonId
      score
      status
      percentage
      completedLessons
    }
  }
}
`

export const RESUME_COURSE = gql `
mutation ResumeCourse($courseId:ID!, $businessId:ID!) {
  resumeCourse(courseId:$courseId, businessId:$businessId) {
    lastLessonId
    percentage
    completedLessons
    status
  }
}
`

export const RETAKE_COURSE = gql `
mutation RetakeCourse($courseId:ID!, $businessId:ID!) {
  retakeCourse(courseId:$courseId, businessId:$businessId) {
    lastLessonId
    percentage
    completedLessons
    status
  }
}
`

export const UPDATE_COURSE_PROGRESS = gql `
mutation UpdateUserCourseProgress($input:UpdateCourseProgressInput!){
  updateCourseProgress(input:$input) {
      id
      business{
        id
        name
      }
    	course{
        id
        title
      }
    	user{
        id
        fname
        lname
      }
      lastLessonId
      score
      status
      percentage
      completedLessons
  }
}
`