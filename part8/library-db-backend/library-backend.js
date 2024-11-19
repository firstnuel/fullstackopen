const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const mongoose = require('mongoose')
const author = require('./models/author')
const user = require('./models/user')
mongoose.set('strictQuery', false)

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: String!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook (
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {};
      if (args.author){ 
        const authr = await Author.findOne({ name: args.author })
        query.author = authr.id
      }
      if (args.genre) query.genres = args.genre
      return Book.find(query).populate('author')
    },
    
    allAuthors: async () => {
      const authorBc = async (authorId) => await Book.countDocuments({ author: authorId })
      const authors = await Author.find({})
     
      const authorsWithBookCount = await Promise.all(
        authors.map(async (author) => {
          const bookCount = await authorBc(author._id);  
          return { ...author.toObject(), bookCount };  
        })
      )
      return authorsWithBookCount
    }
  }, 

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      if (args.title.length < 5 || args.author.length < 4) {
        throw new GraphQLError('Author name or book title too short', {
        })
      }
      const book = await Book.findOne({ title: args.title})
      if (book) {
        throw new GraphQLError('Title must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title
          }
      })
      }
      let bkAuthor = await Author.findOne({ name: args.author })
      if (!bkAuthor) {
        bkAuthor = new Author({ name: args.author, born: null })
        await bkAuthor.save()
      }
      newBook = new Book({ ...args, author: bkAuthor.id })
      await newBook.save()
      return Book.findOne({ title: newBook.title }).populate('author')
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({ name: args.name})
      if (!author) {
        // throw new GraphQLError("Author not found")
        return null
      }
      author.born = args.setBornTo
      author.save()
      return author
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username }) 

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })        
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

    createUser: async (root, args) => {
      let user  = await User.findOne({ username: args.username }) 
      if (user) {
        throw new GraphQLError('Username already exists', {
          extensions: { code: 'BAD_USER_INPUT' }
        })        
      }
      user = new User({...args})
      await user.save()
      return user
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})