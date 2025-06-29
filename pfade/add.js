const auth = require("../auth/auth")
const {Benutzer, Series} = require("../datenquelle/db/db")
const mailer = require("nodemailer")
const {option1, option2, optionA} = require("./options")

const transporter = mailer.createTransport({
    pool: true,
    service : "gmail",
    user : "smtp.gmail.com",
    port : 465,
    secure : true,
    auth:
    {
        user: process.env.MAIL,
        pass: process.env.PASS
    },
    maxConnections: 5,
    maxMessages : 100,
    socketTimeout : 60000
})
 
module.exports = (app)=>{
    app.post("/adden", auth, (req,res)=>{
        const Emails = req.body.Emails
        const codewahl = req.body.codewahl
        Series.findOne({where:{codewahl :codewahl}})
         .then(serie =>{
            if(serie)
                {
                    var b = true
                    var Mail = Emails.split(";")
                    console.log(Mail.length)
                    for(i=0; i < Mail.length; i++)
                        {
                            var Liste = serie.Teilnehmer.split(";")
                            console.log(Liste)
                            if(Liste.includes(Mail[i]))
                                {
                                    b = false
                                    console.log("ddd")
                                    const nachricht = `der Teilnehmer ${Mail[i]} existiert schon `
                                    res.status(400).json(nachricht)
                                }
                        }
                    if(b)
                        {
                            Series.update({Emails :(serie.Emails += `;${Emails}`), Teilnehmer : (serie.Teilnehmer += `;${Emails}`) }, {where:{codewahl:codewahl}})
                            .then(async()=>{
                               var Mails = Emails.split(";")
                               Mails = Mails.join(",")
                               const Teilnehmer = option1(codewahl, Mails, "https://lottobbc.vercel.app/wahl.html")
                               await transporter.sendMail(Teilnehmer, (err)=>{
                               if(err)
                                   {
                                       console.log(err)
                                       res.status(500).json(err)
                                   }
                               else{
                                   console.log("Teilnemer Ok")
                               }
                               })
                               const Hersteller = optionA(codewahl, "alfredmunganga@icloud.com", Emails)
                               transporter.sendMail(Hersteller, (err)=>{
                               if(err)
                                   {
                                       console.log(err)
                                       res.status(500).json(err)
                                   }
                               else
                               {
                                   console.log("Teilnehmer ok")
                                   const nachricht = "Der Lottospiel wurde erfolgreich aktualiesiert"
                                   res.status(200).json(nachricht)
                               }
                                })
                            })
                            .catch((error)=>{
                               console.log(error)
                               res.status(500).json(error)
                            })
                        }

                }
            else
            {
                res.status(404).json(`Es gibt kein Spiel ${codewahl}`)
            }
         })
         .catch((error)=>{
            console.log(error)
            res.status(500).json(error)
         })
    })
}

