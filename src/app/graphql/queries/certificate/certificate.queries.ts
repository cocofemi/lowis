import { gql } from "@apollo/client";

export const ISSUE_CERTIFICATE = gql `
mutation IssueCertificates($input:IssueCertificateInput!){
  issueCertificate(input:$input) {
    id
    issueDate
    course{
      id
      title
    }
    business{
      id
      name
    }
    status
    score
  }
}
`

export const GET_USER_CERTIFICATES = gql `
query UserCertificates($businessId: ID!){
  certificatesByUser(businessId: $businessId){
    id
    certificateId
    user{
      fname
      lname
      email
    }
    business{
      id
      name
    }
    course{
      id
      title
    }
    issueDate
    score
    status
  }
}
`