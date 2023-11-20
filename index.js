import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';
import db from './db.js';

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    review(_, args) {
      return db.reviews.find((review) => args.id === review.id);
    },
    author(_, args) {
      return db.authors.find((author) => args.id === author.id);
    },
    game(_, args) {
      return db.games.find((game) => args.id === game.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    review(parent) {
      return db.reviews.filter((review) => parent.id === review.author_id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((author) => parent.author_id === author.id);
    },
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
  },
  Mutation: {
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 80).toString(),
      };

      db.games.push(game);
      return game;
    },
    deleteGame(_, args) {
      return db.games.filter((game) => args.id !== game.id);
    },
    updateGame(_, args) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return { ...game, ...args.edits };
        }

        return game;
      });

      return db.games.find((game) => game.id == args.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(url);
