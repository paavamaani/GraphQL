export const typeDefs = `#graphql
    type Game {
        id: ID!,
        title: String!,
        platform: [String!]!,
        reviews: [Review!]
    }

    type Review {
        id: ID!,
        rating: Int!,
        content: String!,
        author: Author!,
        game: Game!
    }

    type Author {
        id: ID!,
        name: String!,
        verified: Boolean!,
        review: [Review!]
    }

    type Query {
        reviews: [Review],
        review(id: ID!): Review,
        authors: [Author],
        author(id: ID!): Author,
        games: [Game],
        game(id: ID!): Game
    }

    type Mutation {
        deleteGame(id: ID!): [Game],
        addGame(game: AddGameInput!): Game,
        updateGame(id: ID!, edits: EditGameInput): Game
    }

    input AddGameInput {
        title: String!,
        platform: [String!]!
    }

    input EditGameInput {
        title: String,
        platform: [String!]
    }
`;
