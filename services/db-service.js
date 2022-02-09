import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export const dbService = {
    client : new MongoClient(process.env.MONGO_URI),
    connect : async function()
    {
        await this.client.connect();
        const db = this.client.db("e-commerce_db");
        return db;
    },
    insert : async function(collection, insertData)
    {
        try
        {
            const db = await this.connect();
            const returnedData = await db.collection(collection)
            .insertOne(insertData);
            if(returnedData.acknowledged)
            {
                
                return true;
            }
            
            return false;
        }
        catch(err){
            console.log(err);
            
            return false;
        }
    },
    insertMany : async function(collection, arrayData)
    {
        try
        {
            const db = await this.connect();
            const returnedData = await db.collection(collection)
            .insertMany(arrayData);
            if(returnedData.acknowledged)
            {
                
                return true;
            }
            
            return false;
        }
        catch(err){
            console.log(err);
            
            return false;
        }
    },
    deleteMany : async function(collection, arrayData)
    {
        try
        {
            const db = await this.connect();
            const returnedData = await db.collection(collection)
            .deleteMany(arrayData);
            if(returnedData.acknowledged)
            {
                
                return true;
            }
            
            return false;
        }
        catch(err){
            console.log(err);
            
            return false;
        }
    },
    update: async function(collection, origin, newData)
    {
        try
        {
            const toUpdate = await this.find(collection, origin);
            if(toUpdate.length)
            {
                let db = await this.connect();
                const returnedData = await db.collection(collection)
                .updateOne(origin,
                { $set: newData });
                if(returnedData.acknowledged)
                {
                    
                    return true;
                }
                else
                {
                    
                    return false;
                }
            }
        }
        catch(err){
            console.log(err);
            
            return false;
        } 
    },
    find : async function(collection, filters)
    {
        try
        {
            const db = await this.connect();
            const returnedData = db.collection(collection)
            .find(filters);
            return returnedData.toArray();
        }
        catch(err){
            console.log(err);
            
            return false;
        }
    }
}