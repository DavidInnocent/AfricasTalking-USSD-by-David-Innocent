const functions = require('firebase-functions');
const superagent=require('superagent');

//handles ussd from AT ussd api
exports.helloATussd = functions.https.onRequest((request, response) => {
    response.set("Content-Type", "text/plain");
    let ussd_data=request.body;
    let response_text="";
    if(ussd_data.text.toString().trim()==="")
    {
        response_text="CON Welcome to David Innocent's AT USSD Trial\n"+
        "1. Continue\n2. Get paid?"
    }
    else if(ussd_data.text.toString().trim()==='1')
    {
        response_text+="CON Wamlambezz?\n"+
        "4. Wamnyonyez!\n5. Kaa na Mamayako!"
    }
    else if(ussd_data.text.toString().trim()==='2')
    {
        
        response_text+="END NOPE Am Not Paying You. Hahaha!\n"
    }
    else if(ussd_data.text.toString().trim()==='1*4')
    {
        response_text+="END My man!!! Hahaha\n"
    }
    else if(ussd_data.text.toString().trim()==='1*5')
    {
        
        response_text+="END PIA WEWE\n"
    }
    else if(ussd_data.text.toString().trim()==='1*innocent')
    {
        // response_text="END "+ussd_data.text.toString().trim().replace('1*','')
        response_text="END "+stringToBinary(ussd_data.text.toString().trim().replace('1*',''))
        
       
    }
    response.status(200).end(response_text);

});

function stringToBinary(input) {
    var characters = input.split('');
  
    return characters.map(char=> {
      const binary = char.charCodeAt(0).toString(2)
      const pad = Math.max(8 - binary.length, 0);
      return '0'.repeat(pad) + binary;
    }).join('');
  }