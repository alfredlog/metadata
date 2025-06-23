require("dotenv").config()
const option1 = (codewahl, mail,url)=>{
    return {
        from : process.env.MAIL,
        to : mail,
        subject : "Einlandung zu einem Lottospiel",
        text : `wir freuen uns, Sie daruber zu Informieren, dass Sie dazu eingeladen wurden, an einem Lottospiel teilzunehmen \nDu musst jetz deine Sechs Zahlen zwischen 1 und 49 unter : ${url} eingeben", Dabei brauchst du eine Code, der lautet : ${codewahl}.  \nViel Glück`,
        
    }
}
const option2 = (codewahl, mail, Emails)=>{
    return {
        from : process.env.MAIL,
        to : mail,
        subject : `Herstellung eines Lottospiels \nCode des Spiel ${codewahl}`,
        text : ` :Du hast einen neuen Lottospiel hergestellt die Teilnehmer sind : \n${Emails}`,
        
    }
}
const optionA = (codewahl, mail, Emails)=>{
    return {
        from : process.env.MAIL,
        to : mail,
        subject : `Aktualisierung des Spiels ${codewahl}`,
        text : ` :Der Spiel  ${codewahl} hat neue Teilnehmer : \n${Emails}`,
        
    }
}
const option3 = (codewahl, mail,Emails, count)=>{
    return {
        from : process.env.MAIL,
        to : mail,
        subject : `Information über den Lottospiel \ncodewahl : ${codewahl}`,
        text : ` : Der Teilnemer oder Teilnehmerin : ${Emails} hat seine Sechs Zahlen eingegeben \n${count} Teilnehmer haben schon Ihre Zahlen eingegeben : \n ${Emails}`,
        
    }
}
const option4 = (codewahl, mail, Ziffer, num, teilnehmer)=>{
    return {
        from : process.env.MAIL,
        to : mail,
        subject : `Der Lottospiel ist abgeschlossen \n codewahl : ${codewahl}`,
        text : ` : 20 Teilnemer haben schon Ihre Zahlen eingegeben und den Betrag bezahlt, damit kommen wir zum Ende unseres Spiel die 12 am meisten gewählten Zahlen sind ${Ziffer} und die am meinsten gewählte Superzahl ist  ${num}\n die teilnehmer sind : ${teilnehmer} `,
        
    }
}
const option5 = (codewahl, mail, Ziffer, num, n)=>{
    return {
        from : process.env.MAIL,
        to : mail,
        subject : `Der Lottospiel ist abgeschlossen \n codewahl : ${codewahl}`,
        text : `${n} Teilnemer haben schon Ihre Zahlen eingegeben. Es wurde entschieden, jetzt den Spiel abzuschliessen, \nAm Ende unseres Spiel die 12 am meisten gewählten Zahlen sind ${Ziffer} und die am meinsten gewählte Superzahl ist ${num} `,
        
    }
}
const option6 = (mail, Ziffer, num, link, codewahl )=>{
    return {
        from : process.env.MAIL,
        to : mail,
        subject : `Eingang der Zahlen \n codewahl : ${codewahl}`,
        text : `Deine Zahlen sind erfolgreich eingegang. Deine Zahlen sind die Folgenden: \n6 Zahlen : ${num} \nEine Superzahl : ${Ziffer}\n Jetzt folgt die Bezahlung, die kannst du unter ${link} durchführen `,
        
    }
}

module.exports = {option1, option2, option3, option4, option5, option6, optionA}