import * as tmImage from "@teachablemachine/image";


export default class FacialRecognition {


    constructor(){
        this.URL = "https://teachablemachine.withgoogle.com/models/Kwrh8mS-y/";
        this.model = null ;
        this.webcam = null ;
        this.labelContainer = null;
        this.maxPredictions = null;
    }

    async init(setShowAvatar) {
        const modelURL = this.URL + "model.json";
        const metadataURL = this.URL + "metadata.json";
        this.model = await tmImage.load(modelURL, metadataURL);
        this.maxPredictions = this.model.getTotalClasses();

        const flip = true; // whether to flip the webcam
        this.webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        console.log(this.webcam);
        try {
            await this.webcam.setup(); // request access to the webcam
        }
        catch (e) {
            console.log("NO CAMERA",e)
            setShowAvatar(true);
            return;
        }
        await this.webcam.play();
        window.requestAnimationFrame(()=>this.loop());

        document.getElementById("camera").appendChild(this.webcam.canvas);
    //    this.labelContainer = document.getElementById("label-container");
    //    for (let i = 0; i < this.maxPredictions; i++) { // and class labels
    //        this.labelContainer.appendChild(document.createElement("div"));
    //    }
    }

    async loop() {
        console.log(this.webcam);
        this.webcam.update(); // update the webcam frame
        await this.predict();
        window.requestAnimationFrame(()=>this.loop());
    }

    async predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await this.model.predict(this.webcam.canvas);
        prediction.sort((s1, s2) => s2.probability - s1.probability);
        console.log(prediction[0].probability.toFixed(2));
        if(prediction[0].probability.toFixed(2) > 0.99)
           console.log('eeee');// window.location.href = '/listening';
    //    for (let i = 0; i < this.maxPredictions; i++) {
    //        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //        this.labelContainer.childNodes[i].innerHTML = classPrediction;
    //    }
    }




}