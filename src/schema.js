const { gql } = require('apollo-server');

const typeDefs = gql`

    type Repository {
        name: String
        size: Int
        owner: String
        isPrivate: Boolean
        fileCount: Int
        ymlContent: String
        activeWebhooks: Int
    }

    type Repos {
        name: String
        size: Int
        owner: String
    }

  type Query {
    repos(token: String!): [Repos]
    repoDetails(token: String!, owner: String!, name: String!): Repository
  }
`;

module.exports = typeDefs;