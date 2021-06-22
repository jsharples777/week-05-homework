/* base server for the application */
const express = require('express');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');

const items = [
   {
      id:1,
      details:"This is a test",
      status:"saved"
   }

]
function addScheduleItem(_,{item}) {
   console.log(item);
   items.push(item);


   return item;
}


const resolvers = {
   Query: {
      getScheduleItems:() => items,
   },
   Mutation: {
      addScheduleItem:addScheduleItem,
   },
};

const server = new ApolloServer({
   typeDefs: fs.readFileSync("./server/schema.graphql","utf-8"),
   resolvers
})

const app = express();




/* setup the public files to be available (e.g. content, css, client side js files) */
app.use(express.static("public"));

server.applyMiddleware({app, path: "/graphql"});

app.listen(3000,()=> {
   console.log("Server started on port 3000");
});
