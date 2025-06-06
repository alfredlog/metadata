require("dotenv").config()
const {option1, option2} = require("./options")
const stripe = require("stripe")(process.env.PRIVATE_KEY)
const express = require("express")
const mailer = require("nodemailer")

const transporter = mailer.createTransport({
    service : "gmail",
    user : "smtp.gmail.com",
    port : 587,
    secure : false,
    auth:
    {
        user: process.env.MAIL,
        pass: process.env.PASS
    }
})
module.exports = (app)=>{
  app.post("/webhook",express.raw({type: 'application/json'}),async (req, res)=>{
    const sig = req.headers['stripe-signature'];
    const body = req.body
    const e = "whsec_6tJGlxIeJwkw4ePI8CGxnQ9ozS3UGefh"
    let event 
    try {
        event = stripe.webhooks.constructEvent((body.toString()), sig, e)
    } catch (error) {
        res.status(400).send(error)
        return
    }
    if(event.type == "checkout.session.completed")
    {
        const kunde = event.data.object.customer_details
        const mail = kunde.email
        const Betrag = event.data.object.amount_total
        const adresse = `${kunde.address.country}, ${kunde.address.city}, ${kunde.address.line1}, Postleitzahl: ${kunde.address.postal_code || ""}`
        const artikel = event.data.metadata
        const livraison = event.shipping_options
        console.log(event.data)
        res.status(200).json(kunde)
    }

})
}