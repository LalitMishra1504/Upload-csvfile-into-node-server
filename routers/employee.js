const express=require('express');
const mongodb=require('mongodb');
const app=express();
const router=new express.Router();
const Employee=require('../employeeSchema');
app.use(express.json());
//Adding the employee data in database
router.post('/employeeapi',(req,res)=>{
    var url = "mongodb://localhost:27017/TestDb";
    var dbConn;
    mongodb.MongoClient.connect(url, {
        useUnifiedTopology: true,
    }).then((client)=>{
        // console.log(client);
        dbConn = client.db();
        console.log("DB CONN....");
        // console.log(dbConn);
        var collectionName = 'employees';
        var collection = dbConn.collection(collectionName);
        collection.insertOne(req.body, (err, result) => {
            if (err) console.log(err);
            if (result) {
                res.status(200).send({
                    message:
                        "import the CSV data into database successfully: "
                });
                client.close();
            }
        });
        }).catch((error)=>{
            console.log(error);
        })
})
//reading the data from database
router.get('/employeeapi',async (req,res)=>{
     var url = "mongodb://localhost:27017/TestDb";
    var dbConn;
    mongodb.MongoClient.connect(url, {
        useUnifiedTopology: true,
    }).then((client)=>{
        // console.log(client);
        dbConn = client.db();
        // console.log("DB CONN....");
        // console.log(dbConn);
        var collectionName = 'employees';
        var collection = dbConn.collection(collectionName);
        collection.find().toArray().then((data)=>{
           res.json(data);
        }).catch((err)=>{
            console.log(err);
        });
        }).catch((error)=>{
            console.log(error);
        })
})
//updating the data in database
router.put('/employeeapi/:id',(req,res)=>{
    var url = "mongodb://localhost:27017/TestDb";
    var dbConn;
    mongodb.MongoClient.connect(url, {
        useUnifiedTopology: true,
    }).then((client)=>{
        dbConn = client.db();
        var collectionName = 'employees';
        var collection = dbConn.collection(collectionName);
        const _id=req.params.id;
        console.log(_id);
        collection.updateMany({_id},{$set:{
            Firstname:"Yuvraj"
        }},{upsert:true}).then((data)=>{
            res.json(data);
        }).catch((err)=>{
            console.log(err);
        });
        }).catch((error)=>{
            console.log(error);
        })
})
//delete api
router.delete('/employeeapi/:id',(req,res)=>{
    var url = "mongodb://localhost:27017/TestDb";
    var dbConn;
    mongodb.MongoClient.connect(url, {
        useUnifiedTopology: true,
    }).then((client)=>{
        dbConn = client.db();
        var collectionName = 'employees';
        var collection = dbConn.collection(collectionName);
        const _id=req.params.id;
        collection.deleteMany({_id:_id}).then((data)=>{
           res.json(data);
        }).catch((err)=>{
           console.log(err);
        });
        }).catch((err)=>{
            console.log(err);
        });
})
module.exports=router;