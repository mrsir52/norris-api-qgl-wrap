const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')
const { Prisma } = require('prisma-binding')

const URL = `https://api.chucknorris.io/jokes/random`

const resolvers = {
  Query: {
      getJoke: (parent) => {
          return fetch(`${URL}`).then(res => res.json())
      },
  },

}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
      endpoint: 'https://us1.prisma.sh/public-voidtrack-505/cn-api/dev', // the endpoint of the Prisma API
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
