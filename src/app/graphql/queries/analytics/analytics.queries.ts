import { gql } from "@apollo/client"

export const COURSE_FUNNEL_ANALYTICS = gql `
query CourseFunnel($courseId: ID!, $businessId: ID!) {
  courseFunnel(courseId: $courseId, businessId: $businessId) {
    started
    quarter
    half
    threeQuarter
    completedLessons
    scenarioSubmitted
    passed
    certificatesIssued
  }
}
`

export const COURSE_ENGAGEMENT_OVERTIME = gql `
query EngagementOverTime($businessId: ID!, $days: Int!) {
  engagementOverTime(businessId: $businessId, days: $days) {
    date
    Course_Starts
    Lesson_Completions
    Scenario_Submissions
  }
}
`

export const RECENT_ACTIVITY = gql `
query RecentActivity($businessId:ID!) {
  recentActivities (businessId:$businessId) {
    id
    userName
    action
    target
    type
    timestamp
  }
}
`