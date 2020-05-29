const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';
MongoClient.connect(url, (err, client)=>{
    assert.equal(err, null);
    console.log("connected to the server");
    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({ "name": "missal pav", "description": "another famous dish"}, (err, result)=>{
        assert.equal(err, null);
        console.log('after insert');
        console.log(result.ops);
        
        collection.find({}).toArray((err, docs)=>{
            assert.equal(err, null);
            
            console.log('Found: ');
            console.log(docs);

            db.dropCollection('dishes', (err, result)=>{
                assert.equal(err, null);
                client.close();
            })

        });
    });
});