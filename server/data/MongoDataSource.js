const {MongoClient} = require('mongodb');
const {ServerDataSource} = require("./ServerDataSource");
const {logger} = require("../util/SimpleDebug");

class MongoDataSource extends ServerDataSource {

    constructor(props) {
        super(props);
    }

    async initialise() {
        let url = "mongodb+srv://week05:week05@cluster0.xase1.mongodb.net/scheduleitems?retryWrites=true&w=majority";
        this.client = new MongoClient(url,{useUnifiedTopology:true});
        await this.client.connect();
        logger.log("Mongo DB connected",6);
        this.db = this.client.db();
    }

    async getNextId(name) {
        logger.log("Getting next id with name " + name);
        const result = await this.db.collection('counters').findOneAndUpdate(
            {_id:name},
            { $inc: {current:1}},
            { returnOriginal: false},
        );
        logger.log(result,7);
        return result.value.current;
    }

    /* return an array of question objects */
    async loadScheduleItems() {
        logger.log("Getting schedule items from Mongo",6);

        let items = await this.db.collection('scheduleitems').find().sort({time:1}).toArray();

        logger.log(items);
        return items;
    }
    /* return an array of question objects */
    async saveScheduleItem(scheduleItem) {
        logger.log("Saving schedule item to Mongo with id " + scheduleItem._id,6);
        let insertedItem;
        /* does the item have an _id? */
        if (!scheduleItem._id) {
            // this is a new item, generate the next id
            scheduleItem._id = await this.getNextId('scheduleitems');
            let result  = await this.db.collection('scheduleitems').insertOne(scheduleItem);
            insertedItem = await this.db.collection('scheduleitems').findOne({_id: result.insertedId});
        }
        else {
            let result = await this.db.collection('scheduleitems').findOneAndUpdate(
                { _id: scheduleItem._id},
                { $set: scheduleItem}
            )
            insertedItem = await this.db.collection('scheduleitems').findOne({_id: result.insertedId});
        }
        logger.log(insertedItem);
        return insertedItem;
    }

}

module.exports = {MongoDataSource};