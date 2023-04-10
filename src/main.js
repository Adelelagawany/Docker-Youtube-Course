const webserver = require("express");
const mongoose = require('mongoose');
const redis = require('redis');
const { Client } = require('pg')

//Initialize Nodejs app
adelappserver=webserver();
const PORT = process.env.PORT || 4000;
adelappserver.listen(PORT,()=>(console.log("Node Application is running on port: "+PORT)))

//Mongo database connect 
mongoose.connect("mongodb://root:example@mongo:27017")
        .then(()=> console.log("Connection to mongo database succeeded ya 3m Adel"))
        .catch((err)=> console.log("Connection to mongo database failed ya 3m Adel with error: ",err))

//Redis database connect 
const redis_client = redis.createClient({url: "redis://redis:6379"});
redis_client.on('error', err => console.log('Failed to connect to Redis Server with error: ', err));
redis_client.on('connect', () => console.log('Connection to redis succeeded ya 3m Adel: '))
redis_client.connect();

//Postgres database connect
const postgres_client = new Client({connectionString: "postgresql://root:example@postgres:5432",});
postgres_client.connect()
        .then(()=> console.log("Connection to postgres database succeeded ya 3m Adel"))
        .catch((err)=> console.log("Connection to postgres database failed ya 3m Adel with error: ",err))

//Nodejs Application Logic
adelappserver.get("/", (req,res)=>{
        redis_client.set("Products", "product 1")
        res.send("<h1>Hello World !</h1>")    
});

adelappserver.get("/productsdata", async(req,res)=>{  
        const prods = await redis_client.get("Products"); 
        res.send(`<h1>Hello World !</h1> <h2>${prods}</h2>`); 
});