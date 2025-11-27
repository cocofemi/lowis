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