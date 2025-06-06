
const option1 = (sold, mail, adresse, artikel, livraison)=>{
    return {
        from : process.env.MAIL,
        to : mail,
        subject : "der erhalt der Bezahlung eines Kundens",
        text : `wir freuen uns, Sie daruber zu Informieren, dass wir Ihre bezahlung von ${sold} fur den Kauf von ${artikel} erfolgreich erhalten haben \nso warten Sie auf die lieferung an Ihre adresse(${adresse}), bediegung der lieferung : \n${livraison || "Kostetlos, zwischen 5 tagen und einer woche"}`,
        
    }
}
const option2 = (sold, mail, adresse, artikel, mail2, livraison)=>{
    return {
        from : process.env.MAIL,
        to : mail,
        subject : "eine neue Bestellung",
        text : `Sie haben eine neue Bestellung von ${mail2} erhalten \nAlle Informationen :
        \nArtikel : ${artikel}
        \nBetrag : ${sold}
        \nAdresse : ${adresse}
        \nBedingung der lieferung : ${livraison || "Kostetlos, zwischen 5 tagen und einer woche"}`,
        
    }
}

module.exports = {option1, option2}