import logo from './logo.svg';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands"
import {useEffect, useState} from "react";

function App() {

  const [model, setModel] = useState(null);
  const [action, setAction] = useState(null);
  const [labels, setLabels] = useState(null);
  const [modelTobuilded,setModelTobuilded] = useState(null);

  const NUM_FRAMES = 3;
  const INPUT_SHAPE = [NUM_FRAMES, 232, 1];
  let examples = [];
  let modelTobuild ;

  const loadModel = async () => {
    const recognizer = await speech.create('BROWSER_FFT');
    console.log("Model Loaded");
    await recognizer.ensureModelLoaded();
    setModel(recognizer);
    setLabels(recognizer.words);
    console.log("fffffd ",recognizer);
  }

  const recognizeCommands = async () =>{
    console.log('Listening for commands')
    model.listen(result=>{
      console.log(Object.values(result.scores));
      let scores = Array.from(result.scores).map((s, i) => ({score: s, word: model.words[i]}));
      scores.sort((s1, s2) => s2.score - s1.score);
      console.log('scores ',scores[0]);
    }, {includeSpectrogram:true, probabilityThreshold:0.9});
  };

  const train = async () => {
    console.log(examples);
    const ys = tf.oneHot(examples.map(e => e.label), 3);
    const xsShape = [examples.length, ...INPUT_SHAPE];
    const xs = tf.tensor(flatten(examples.map(e => e.vals)), xsShape);
    await modelTobuilded.fit(xs, ys, {
      batchSize: 16,
      epochs: 100,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(
              `Accuracy: ${(logs.acc * 100).toFixed(1)}% Epoch: ${epoch + 1}`);
        }
      }
    });
    tf.dispose([xs, ys]);
  };

  async function buildModel() {
    modelTobuild = tf.sequential();
    modelTobuild.add(tf.layers.depthwiseConv2d({
      depthMultiplier: 8,
      kernelSize: [NUM_FRAMES, 3],
      activation: 'relu',
      inputShape: INPUT_SHAPE
    }));
    modelTobuild.add(tf.layers.maxPooling2d({poolSize: [1, 2], strides: [2, 2]}));
    modelTobuild.add(tf.layers.flatten());
    modelTobuild.add(tf.layers.dense({units: 3, activation: 'softmax'}));
    const optimizer = tf.train.adam(0.01);
    modelTobuild.compile({
      optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
    setModelTobuilded(modelTobuild);
  }

  const setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  function flatten(tensors) {
    const size = tensors[0].length;
    const result = new Float32Array(tensors.length * size);
    tensors.forEach((arr, i) => result.set(arr, i * size));
    return result;
  }

  const collectVoice = (label) => {
    if(model != null) {
      if (model.isListening()) {
        return model.stopListening();
      }
      if (label == null) {
        console.log(label);
        return;
      }
      model.listen(async ({spectrogram: {frameSize, data}}) => {
        console.log('fr : ', frameSize," da : ",data.subarray()[0], " r : ",Math.round(data.subarray()[0] * 100) / 100);
        if (data.subarray()[0] !== 0) {
          //let result = [] ;
          //for(var i in JSON.stringify(data))
          //console.log("i : ",JSON.stringify(data) [i]);
          //result.push([i, JSON.stringify(data) [i]]);

          let vals = normalize(data.subarray(-frameSize * NUM_FRAMES));
          //console.log(data.subarray());
          //for(var i in vals)
            //console.log(vals[i]);
          examples.push({vals, label});
          console.log(`${examples.length}`, " examples for ", label);
        }
      }, {
        overlapFactor: 0.5,
        includeSpectrogram: true,
        invokeCallbackOnNoiseAndUnknown: true
      });
      console.log(examples);
    }
  }

  function normalize(x) {
    const mean = -100;
    const std = 10;
    return x.map(x => (x - mean) / std);
  }

  function predict(){
    let scores = Array.from(examples).map((s, i) => ({val: s, label: i}));
    scores.sort((s1, s2) => s2.val - s1.val);
    console.log(scores[0]);
  }

  function saveExemple(){
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(examples)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  }

  async function moveSlider(labelTensor) {
    const label = (await labelTensor.data())[0];
    console.log(label);
    if (label == 2) {
      return;
    }
    let delta = 0.1;
    const prevValue = +document.getElementById('output').value;
    document.getElementById('output').value =
        prevValue + (label === 0 ? -delta : delta);
  }

  const listen = () => {
    if (model.isListening()) {
      model.stopListening();
      console.log('Listen');
      return;
    }
    console.log('Stop');

    model.listen(async ({spectrogram: {frameSize, data}}) => {

      const vals = normalize(data.subarray(-frameSize * NUM_FRAMES));
      const input = tf.tensor(vals, [1, ...INPUT_SHAPE]);
      const probs = modelTobuilded.predict(input);
      const predLabel = probs.argMax(1);
      const scores = probs.arraySync()[0];

      console.log(scores);
      const score = Array.from(scores).map((s, i) => ({score: s, word: i}));
      score.sort((s1, s2) => s2.score - s1.score);
      console.log(score[0].word);

      //console.log('prelabel ',predLabel);
      const labela = (await predLabel.data())[0];
      console.log(labela);
      //await moveSlider(predLabel);

      tf.dispose([input, probs, predLabel]);
    }, {
      overlapFactor: 0.5,
      includeSpectrogram: true,
      invokeCallbackOnNoiseAndUnknown: true,
      probabilityThershold: 0.8,
    });
  };

  const testListen = async () => {
    const baseRecognizer = await speech.create('BROWSER_FFT');
    await baseRecognizer.ensureModelLoaded();
    const transferRecognizer = baseRecognizer.createTransfer('colors');

    await transferRecognizer.collectExample('red');
    await transferRecognizer.collectExample('green');
    await transferRecognizer.collectExample('blue');
    await transferRecognizer.collectExample('red');

    await transferRecognizer.collectExample('_background_noise_');
    await transferRecognizer.collectExample('green');
    await transferRecognizer.collectExample('blue');
    await transferRecognizer.collectExample('_background_noise_');

    console.log(transferRecognizer.countExamples());

    await transferRecognizer.train({
      epochs: 25,
      callback: {
        onEpochEnd: async (epoch, logs) => {
          console.log(`Epoch ${epoch}: loss=${logs.loss}, accuracy=${logs.acc}`);
        }
      }
    });

    await transferRecognizer.listen(result => {

      const words = transferRecognizer.wordLabels();

      for (let i = 0; i < words; ++i) {
        console.log(`score for word '${words[i]}' = ${result.scores[i]}`);
      }
    }, {probabilityThreshold: 0.75});

    setTimeout(() => transferRecognizer.stopListening(), 10e3);
  }

  const exportFile = () => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", `${window.location.origin}`+'\\myFile.txt', false);
    rawFile.onreadystatechange = function ()
    {
      if(rawFile.readyState === 4)
      {
        if(rawFile.status === 200 || rawFile.status == 0)
        {
          var allText = rawFile.responseText;
          examples = allText ;
          console.log(allText);
        }
      }
    }
    rawFile.send(null);
  }

  const cleanData = () => {
    let voir = examples.filter(e => e.label === 1);
    console.log(voir.length);
    let noise = examples.filter(e => e.label === 0);
    console.log(voir[0].vals.json);
    for(var i in voir)
      for(var j of voir[i].vals){

        console.log(j);
      }
    voir.forEach(e => {
      //let index = noise.val.indexOf(e.val) ;
      //console.log(e.vals);
      noise.forEach(r => {
        if(e.val === r.val){
          //voir.splice(voir.indexOf(e),1);
        }
      });
      //if(index !== -1) {
        //voir.splice(voir.indexOf(e),1);
      //}
    });
    console.log(voir.length);
    console.log(noise.length);

  };

  useEffect(() => {
    loadModel();
    buildModel();
    console.log(modelTobuild);
  },[]);


  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={recognizeCommands}>Listening</button>
          <button onMouseDown={() => collectVoice(0)} onMouseUp={() => collectVoice(0)}>SILENCE</button>
          <button onMouseDown={() => collectVoice(1)} onMouseUp={() => collectVoice(1)}>ZERO</button>
          <button onMouseDown={() => collectVoice(2)} onMouseUp={() => collectVoice(2)}>ONE</button>
          <button onMouseDown={() => collectVoice(4)} onMouseUp={() => collectVoice(4)}>TWO</button>
          <button onMouseDown={() => collectVoice(5)} onMouseUp={() => collectVoice(5)}>THREE</button>
          <button onMouseDown={() => collectVoice(6)} onMouseUp={() => collectVoice(6)}>FOUR</button>
          <button onMouseDown={() => collectVoice(7)} onMouseUp={() => collectVoice(7)}>FIVE</button>
          <button onMouseDown={() => collectVoice(8)} onMouseUp={() => collectVoice(8)}>SIX</button>
          <button onMouseDown={() => collectVoice(9)} onMouseUp={() => collectVoice(9)}>SEVEN</button>
          <button onMouseDown={() => collectVoice(10)} onMouseUp={() => collectVoice(10)}>EIGHT</button>
          <button onMouseDown={() => collectVoice(11)} onMouseUp={() => collectVoice(11)}>NINE</button>
          <button onMouseDown={() => collectVoice(1)} onMouseUp={() => collectVoice(1)}>NOISE</button>


          <button onClick={train}>Train</button>
          <input type="range" id="output" min="0" max="10" step="0.1"/>
          <button onClick={listen}>Listen</button>
          <button onClick={saveExemple}>save</button>
          <button onClick={()=>model.stopListening()}>Stop</button>
          <button onClick={saveExemple}>save</button>
          <button onClick={exportFile}>export</button>
          <button onClick={cleanData}>showList</button>

        </header>

      </div>
  );
}

export default App;
