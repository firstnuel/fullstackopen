const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
      },
      me: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'UNAUTHENTICATED',
            }
          })
        }
        return currentUser
      }
    }, 
  
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'UNAUTHENTICATED',
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

        const bkToreturn = await Book.findOne({ title: newBook.title }).populate('author')
        pubsub.publish('BOOK_ADDED', { bookAdded: bkToreturn })

        return bkToreturn
      },
  
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'UNAUTHENTICATED',
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
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
  }
  
module.exports = resolvers