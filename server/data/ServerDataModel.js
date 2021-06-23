const {logger} = require('../util/SimpleDebug.js');
const {MongoDataSource} = require("./MongoDataSource.js");
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');


let delegate = null;

class ServerDataModel {

    constructor(serverApp) {

        let resolvers = {
            Query: {
                getScheduleItems: this._getScheduleItemsQL,
            },
            Mutation: {
                saveScheduleItem: this._saveScheduleItemQL,
            },
        };

        this.apolloServer = new ApolloServer({
            typeDefs: fs.readFileSync("./server/data/schema.graphql", "utf-8"),
            resolvers
        });

        this.apolloServer.applyMiddleware({app: serverApp, path: "/graphql"});

        delegate = new MongoDataSource();
        delegate.initialise();

    }



    _saveScheduleItemQL(_, {item}) {
        logger.log("Saving item via QL",5);
        logger.log(item);
        return delegate.saveScheduleItem(item);
    }

    _getScheduleItemsQL() {
        logger.log("Getting schedule items QL",5);
        return delegate.loadScheduleItems();
    }

}

module.exports = {ServerDataModel};