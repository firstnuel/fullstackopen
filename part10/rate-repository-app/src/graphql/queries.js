import { gql } from '@apollo/client'

export const ALL_REPOS = gql`
query ($orderDirection: OrderDirection, 
$orderBy: AllRepositoriesOrderBy,
$searchKeyword: String )
  {
  repositories(orderDirection: 
  $orderDirection, orderBy: $orderBy,
  searchKeyword: $searchKeyword) {
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
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      username
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            rating
            id
            repository {
              id
              name
              ownerName
            }
            createdAt
            text
            user {
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_REPO = gql`
  query ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      description
      forksCount
      fullName
      language
      name
      ownerAvatarUrl
      ratingAverage
      reviewCount
      stargazersCount
      createdAt
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;