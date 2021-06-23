const {Logger} = require('../util/Logger.js');
const {MongoDataSource} = require("./MongoDataSource.js");
const fs = require('fs');
const {ApolloServer} = require('apollo-server-express');


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
        Logger.log("Saving item via QL", 5);
        Logger.log(item);
        let result = delegate.saveScheduleItem(item);
        Logger.log(result);
        return result;
    }

    _getScheduleItemsQL() {
        Logger.log("Getting schedule items QL", 5);
        let result = delegate.loadScheduleItems();
        Logger.log(result, 90);
        return result;
    }

}

module.exports = {ServerDataModel};