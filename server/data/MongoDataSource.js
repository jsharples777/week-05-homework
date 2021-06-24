const {MongoClient} = require('mongodb');
const {Logger} = require("../util/Logger");

class MongoDataSource {

    async initialise() {
        let url = process.env.DB_URL;
        this.client = new MongoClient(url,{useUnifiedTopology:true});
        await this.client.connect();
        Logger.log("Mongo DB connected",6);
        this.db = this.client.db();
    }

    async getNextId(name) {
        Logger.log("Getting next id with name " + name);
        const result = await this.db.collection(process.env.DB_ITEM_IDS).findOneAndUpdate(
            {_id:name},
            { $inc: {current:1}},
            { returnOriginal: false},
        );
        Logger.log(result.value.current,7);
        return result.value.current;
    }

    /* return an array of question objects */
    async loadScheduleItems() {
        Logger.log("Getting schedule items from Mongo",6);

        let items = await this.db.collection(process.env.DB_SCHEDULE_ITEMS).find().sort({time:1}).toArray();

        Logger.log(items,100);
        return items;
    }
    /* return an array of question objects */
    async saveScheduleItem(scheduleItem) {
        Logger.log("Saving schedule item to Mongo with id " + scheduleItem._id,6);
        /* does the item have an _id? */
        if (!scheduleItem._id) {
            // this is a new item, generate the next id
            scheduleItem._id = await this.getNextId(process.env.DB_SCHEDULE_ITEMS);
            await this.db.collection(process.env.DB_SCHEDULE_ITEMS).insertOne(scheduleItem);
        }
        else {
            let result = await this.db.collection(process.env.DB_SCHEDULE_ITEMS).findOneAndUpdate(
                { _id: scheduleItem._id},
                { $set: {
                    details:scheduleItem.details,
                    time:scheduleItem.time
                    }
                }
            )
        }
        return scheduleItem;
    }

}

module.exports = {MongoDataSource};