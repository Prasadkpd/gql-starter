const express = require('express');
const {buildSchema} = require('graphql');
const {graphqlHTTP} = require('express-graphql');
const axios = require("axios");

const app = express();

let message = "Hello World";

const schema = buildSchema(`
    
    type User {
    name: String
    age: Int
    college : String
    }
    
    type Post {
    userId : Int
    id: Int
    title: String
    body: String
    }
    
    type Query {
    hello: String!
    welcomeMsg(name: String, day: String!): String
    getUser: User
    getUsers: [User]
    getPostFromExtenalAPI: [Post]
    message: String
    }
    
    type Mutation {
        setMessage(newMessage: String): String
    }
`);
/*
 ID
 String
 Int
 Float
 Boolean
 List - []
 */

const root = {
    hello: () => {
        return "Hello World";
        // return null;
    },
    welcomeMsg: (args) => {
        console.log(args);
        return `Hey, ${args.name} hows life, today is ${args.day}`;
    },
    getUser: () => {
        return {
            name: "Prasad",
            age: 23,
            college: "UCSC",
        };
    },
    getUsers: () => {
        return [
            {
                name: "Prasad",
                age: 23,
                college: "UCSC",
            },
            {
                name: "Lakshan",
                age: 23,
                college: "UCSC",
            }
        ];
    },
    //Make this function async
    getPostFromExtenalAPI: async () => {
        const result = await axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        );
        return result.data;
        // return axios
        //     .get("https://jsonplaceholder.typicode.com/posts")
        //     .then(result => result.data);
    },
    setMessage: ({newMessage}) => {
        message = newMessage
        return message
    },
    message: () => message,
};

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
}))

app.listen(4000, () => console.log(`Server on port 8000`))