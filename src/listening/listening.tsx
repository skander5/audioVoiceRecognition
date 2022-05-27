import {useEffect, useState} from "react";
import * as tf from "@tensorflow/tfjs";
import * as SpeechCommands from "@tensorflow-models/speech-commands";

import VoiceModel from "../My_Model/model.json";
import VoiceModelMetadata from "../My_Model/metadata.json";
import VoiceAssistant from "../voiceAssistant";

import './listening.css'
import voiceVisualizer from "../voiceVisualizer";
import SpeechComp from "../speechComp/speechComp";
import {sort} from "../Utils/methodUtils";
import voiceAssistant from "../voiceAssistant";

export const Listening = () => {

    let processingWord : any ;
    const [processWord, setProcessWord] = useState('null');

    function onListen(word:any) {
        console.log("Word: ", word);
        processingWord = word;
        setProcessWord(word);
    }

    const start = async () => {
        console.log('ddddddd');
        const visualizer = new voiceVisualizer();
        await visualizer.startVisualization();
        const assistant = new voiceAssistant();
        assistant.beginAssistance(onListen);
        console.log(sort().get('Un'));
    }


    return (
        <div className="waveWrapper waveAnimation">
            <button onClick={()=> start()}>OK</button>
            <div className="SpeechComp">
                <SpeechComp word={processWord}/>
            </div>
            <div className="">
                <div className="bgTop">
                    <div className="wave waveTop"></div>
                </div>
                <div className="bgMiddle">
                    <div className="wave waveMiddle"></div>
                </div>
                <div className="bgBottom">
                    <div className="wave waveBottom"></div>
                </div>
            </div>
        </div>
    );

};
export default Listening ;