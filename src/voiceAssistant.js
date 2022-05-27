import * as SpeechCommands from "@tensorflow-models/speech-commands";
import VoiceModel from "./My_Model/model";
import VoiceModelMetadata from "./My_Model/metadata";


export default class VoiceAssistant {

    constructor(){
        this.options = {
            includeSpectogram: true,
            overlapFactor: 0.5,
            invokeCallbackOnNoiseAndUnkown: false,
            probabilityThershold: 0.75,
        };
    }

    async buildModel() {
        const recognizer = await SpeechCommands.create("BROWSER_FFT",undefined,VoiceModel,VoiceModelMetadata);
        await recognizer.ensureModelLoaded();
        console.log("Model Loaded");
        return recognizer;
    }

    async buildModel2() {
        const URL = "https://teachablemachine.withgoogle.com/models/jQCtiR-5Q/";
            //"https://teachablemachine.withgoogle.com/models/Q5la5iSw1/";

        const checkpointURL = URL + "model.json"; // model topology
        const metadataURL = URL + "metadata.json"; // model metadata

        const recognizer = SpeechCommands.create(
            "BROWSER_FFT", // fourier transform type, not useful to change
            undefined, // speech commands vocabulary feature, not useful for your models
            checkpointURL,
            metadataURL);

        // check that model and metadata are loaded via HTTPS requests.
        await recognizer.ensureModelLoaded();
        console.log("Model Loaded");

        return recognizer;
    }

    async start() {
        const recognizer = await this.buildModel2();
        const classLabels = recognizer.wordLabels(); // get class labels
        console.log('sssss ',classLabels);

        // listen() takes two arguments:
        // 1. A callback function that is invoked anytime a word is recognized.
        // 2. A configuration object with adjustable fields
        recognizer.listen(result => {
            const scores = result.scores; // probability of prediction for each class
            // render the probability scores per class
            const score = Array.from(scores).map((s, i) => ({score: s, word: i}));
            score.sort((s1, s2) => s2.score - s1.score);
            console.log(score[0].word);
            for (let i = 0; i < classLabels.length; i++) {
                //const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
                //labelContainer.childNodes[i].innerHTML = classPrediction;

            }
        }, {
            includeSpectrogram: true, // in case listen should return result.spectrogram
            probabilityThreshold: 0.75,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.75 // probably want between 0.5 and 0.75. More info in README
        });
    }

    async startAssistance () {
        const recognizer = await this.buildModel();
        console.log('word ',recognizer.wordLabels());
        recognizer.listen((result)=>{

            const score = result.scores ;
            //console.log(score);
            const wordScore = score.reduce((previousValue,value)=>{
                if(previousValue){
                    if(previousValue > value) return previousValue ;
                }
                return value ;
            });
            const wordIndx = score.findIndex((v) => v === wordScore);
            const word = recognizer.wordLabels()[wordIndx];
            //this.speech("Bonjour")
            console.log(word);
        },this.options);
    }

    async beginAssistance(onListen) {
        const recognizer = await this.buildModel2();
        const classLabels = recognizer.wordLabels(); // get class labels
        console.log('sssss ',classLabels);

        // listen() takes two arguments:
        // 1. A callback function that is invoked anytime a word is recognized.
        // 2. A configuration object with adjustable fields
        recognizer.listen(result => {
            const scores = result.scores; // probability of prediction for each class
            // render the probability scores per class
            const score = Array.from(scores).map((s, i) => ({score: s, word: i}));
            score.sort((s1, s2) => s2.score - s1.score);
            console.log(score[0].word);
            onListen(classLabels[score[0].word]);
            for (let i = 0; i < classLabels.length; i++) {
                //const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
                //labelContainer.childNodes[i].innerHTML = classPrediction;

            }
        }, {
            includeSpectrogram: true, // in case listen should return result.spectrogram
            probabilityThreshold: 0.75,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.75 // probably want between 0.5 and 0.75. More info in README
        });
    }

    async speech(text){
        const voices = window.speechSynthesis.getVoices() ;
        const speechToSay = new window.SpeechSynthesisUtterance(text);
        speechToSay.voice = voices[9];
        window.speechSynthesis.speak(speechToSay);
    }

}