const _ = require('lodash');
//const Users = require('./data/users'); // This is to make available authors.json file
//const Privates = require('./data/privates'); // This is to make available post.json file


/* Here a simple schema is constructed without using the GraphQL query language. 
  e.g. using 'new GraphQLObjectType' to create an object type 
*/
const db = require('./Data/db_connect');
let {
  // These are the basic GraphQL types need in this tutorial
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  // This is used to create required fileds and arguments
  GraphQLNonNull,
  // This is the class we need to create the schema
  GraphQLSchema,
} = require('graphql');
/*   const PostType = new GraphQLObjectType({
    name: "Post",
    description: "This represent a Post",
    fields: () => ({
      id: {type: new GraphQLNonNull(GraphQLString)},
      title: {type: new GraphQLNonNull(GraphQLString)},
      body: {type: GraphQLString},
      author: {
        type: AuthorType,
        resolve: function(post) {
          return _.find(Authors, a => a.id == post.author_id);
        }
      }
    })
  }); */
/* const UserType = new GraphQLObjectType({
    name: "User",
    description: "This represents the user",
    fields: () => ({
      id: {type: new GraphQLNonNull(GraphQLString)},
      name: {type: new GraphQLNonNull(GraphQLString)},
      twitterHandle: {type: GraphQLString}
    })
  });

  const PrivateType = new GraphQLObjectType({
    name: "Private",
    description: "This represent a Private conversation",
    fields: () => ({
      id: {type: new GraphQLNonNull(GraphQLString)},
      body: {type: GraphQLString},
      user: {
        type: UserType,
        resolve: function(private) {
          return _.find(Users, a => a.id == private.user_id);
        }
      }
    })
  }); */

  const pmModels = new GraphQLObjectType({
    name: "pmTab",
    description: "This represent a list of Private messages",
    fields: () => ({
      id: {
        type: GraphQLInt,
        resolve(pmTab){
          return pmTab.id;
        }
      },
      idUser: {
        type: GraphQLInt,
        resolve(pmTab){
          return pmTab.idUser;
        }
      },
      idDestUser: {
        type: GraphQLInt,
        resolve(pmTab){
          return pmTab.idDestUser;
        }
      },
      createdAt: {
        type: GraphQLString,
        resolve(pmTab){
          return pmTab.createdAt;
        }
      },
      msgContent: {
        type: GraphQLString,
        resolve(pmTab){
          return pmTab.msgContent;
        }
      }
    })
  });

  // This is the Root Query
const QueryRootType = new GraphQLObjectType({
    name: 'QueryRoot',
    description: "Twitter-like Application Schema Query Root",
    fields: () => ({
      pms: {
        type: new GraphQLList(pmModels),
        args:{
          id:{
            type:GraphQLInt
          },
          idUser:{
            type:GraphQLInt
          },
          idDestUser:{
            type:GraphQLInt
          },
          createdAt:{
            type:GraphQLString
          },
          msgContent:{
            type:GraphQLString
          }
        },
        resolve (root, args) {
          return db.models.pmTab.findAll({ where: args });
        }
      }
    })
  });

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Set the routes',
  fields(){
    return{
    addPM: {
      type: pmModels,
      args: {
          idUser:{
            type: new GraphQLNonNull(GraphQLInt)
          },
          msgContent:{
            type: new GraphQLNonNull(GraphQLString)
          }
      },
      resolve (source, args) {
        return Db.models.tablePosts.create({
            post: args.post,
            idUser: args.idUser
        });
    }
    }
  }
  }
});

  // This is the schema declaration
const TweetAppSchema = new GraphQLSchema({
    query: QueryRootType, 
    mutation: Mutation
    // If you need to create or updata a datasource, 
    // you use mutations. Note:
    // mutations will not be explored in this post.
    // mutation: BlogMutationRootType 
  });
  
  module.exports = TweetAppSchema;