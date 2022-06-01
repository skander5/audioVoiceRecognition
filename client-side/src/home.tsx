import {useEffect, useState} from "react";
import * as tf from "@tensorflow/tfjs";
import * as SpeechCommands from "@tensorflow-models/speech-commands";

import VoiceModel from "./My_Model/model.json";
import VoiceModelMetadata from "./My_Model/metadata.json";
import VoiceAssistant from "./voiceAssistant";

export const HomePage = () => {

    const [model, setModel] = useState(null);
    let voiceAssistant;

    async function buildModel() {
        const recognizer = await SpeechCommands.create("BROWSER_FFT",undefined,VoiceModel,VoiceModelMetadata);
        await recognizer.ensureModelLoaded();
        console.log("Model Loaded");
        return recognizer;
    }

    const startAssistance = async () => {
        //const recognizer = await buildModel();
        voiceAssistant = new VoiceAssistant();
        voiceAssistant.start();
        //recognizer.listen((result)=>{},null);
    }

    useEffect(()=> {
        console.log('ooooo');
    },[]);

    return (
        <div>
            <h1>OK</h1>
            <button onClick={startAssistance} >Start</button>
        </div>
    );

};
export default HomePage ;