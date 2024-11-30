import { gql } from '@apollo/client'

export const ALL_REPOS = gql`
query  {
  repositories {
    edges {
      node {
        description
        forksCount
        fullName
        id
        language
        name
        ownerAvatarUrl
        ratingAverage
        reviewCount
        stargazersCount
        createdAt
      }
    }
  }
}
`

export const GET_USER = gql`
query {
  me {
    id
    username
  }
}
`