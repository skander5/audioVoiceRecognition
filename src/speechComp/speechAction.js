import {numberTab, sort, wait} from "../Utils/methodUtils";


async function saySpeech (text){
    const voices = window.speechSynthesis.getVoices() ;
    const speechToSay = new window.SpeechSynthesisUtterance(text);
    speechToSay.voice = voices[9];
    window.speechSynthesis.speak(speechToSay);
}

export async function wordAction(word) {

    switch (word.currentWord) {
        case "Bonjour": {
            saySpeech("Bonjour, comment je peux vous aidez ?");
            await wait(10000);
            break;
        }
        case "Consulter" : {
            saySpeech("Merci de me donner le numéros du dossier");
            await wait(10000);
            break;
        }
        case "Valider" : {
            saySpeech("Le dossier numéros" +word.number+ "est en attente");
            break;
        }

            break;
        default : return ;
    }
}
