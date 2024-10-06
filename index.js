const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Item = require("./model/item");
const { Body } = require("twilio/lib/twiml/MessagingResponse");
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true }));
/*
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Conectado a MongoDB")
}).catch(()=> {
    console.error("Erro al conectar con MongoDB"+error)
}) */

app.get("/api/sendwapp/:number/:message", (req,res) => {
    const twilio = require('twilio');

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const accountToken = process.env.TWILIO_ACCOUNT_TOKEN;
    const client = new twilio(accountSid,accountToken)
    const number = req.params.number;
    const messagePhoneNumber = req.params.message;

    async function createMessage() {
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+51' + number,
            body: messagePhoneNumber
            

        });
        console.log(messagePhoneNumber);
        
    }
    try{
        createMessage();
        res.json("OK")
    }catch(err){
        res.status(500).json({err: "Error al enviar wsp"})
    }
});
app.post("/api/webhook",express.json(),(req,res) => {
    console.log("Recibiendo la informacion: " + req.body.Body);
    res.send("sebd via callback")
})
/*
app.get("/api/items",async (req,res) => {
    try{
        const items = await Item.find();
        res.json(items)
    }catch(err){
        res.status(500).json({err: "Error al consultar la coleccion"})
    }
});
*/
app.get("/api/esan",(req,res) => {
    res.sendStatus(200);
    //res.json();
})


app.listen(port, () => {
    console.log("Servidor en en http://localhost:"+port)
})