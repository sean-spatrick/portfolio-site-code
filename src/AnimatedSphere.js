import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

var texture;





class Controller extends React.Component{
  constructor(props){
    super(props);
    this.state={
      audio:null,
      analysis:null,
      constraints:{ "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            }, }
    }
    this.createAudioMeter = this.createAudioMeter.bind(this);
    this.volumeAudioProcess = this.volumeAudioProcess.bind(this);
  }
;
  createAudioMeter( audioContext ){
  console.log('line35 called')
	var processor = audioContext.createScriptProcessor(512);
	processor.onaudioprocess = this.volumeAudioProcess;
	processor.clipping = false;
	processor.lastClip = 0;
	processor.volume = 0;
	processor.clipLevel =  0.98;
	processor.averaging = 0.95;
	processor.clipLag =  750;

	// this will have no effect, since we don't copy the input to the output,
	// but works around a current Chrome bug.
	processor.connect(audioContext.destination);

	processor.checkClipping =
		function(){
			if (!this.clipping)
				return false;
			if ((this.lastClip + this.clipLag) < window.performance.now())
				this.clipping = false;
			return this.clipping;
		};

	processor.shutdown =
		function(){
			this.disconnect();
			this.onaudioprocess = null;
		};

	return processor;
}

volumeAudioProcess( event ) {
	var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
	var sum = 0;
    var x;

	// Do a root-mean-square on the samples: sum up the squares...
    for (var i=0; i<bufLength; i++) {
    	x = buf[i];
    	if (Math.abs(x)>=this.clipLevel) {
    		this.clipping = true;
    		this.lastClip = window.performance.now();
    	}
    	sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms =  Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume*this.averaging);
}

  componentDidMount(){
    var streamSource = null ;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
     var audioContext = new AudioContext();
     var javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
    navigator.mediaDevices.getUserMedia(this.state.constraints)
     .then(function(stream) {
       console.log(stream);
      streamSource = audioContext.createMediaStreamSource(stream);
      console.log(streamSource);
       var meter = audioContext.createAnalyser(streamSource);
       meter.smoothingTimeConstant = 0.3;
       meter.fftSize = 1024;
       console.log(meter);
       streamSource.connect(meter);
       meter.connect(javascriptNode);
       javascriptNode.connect(audioContext.destination);
       javascriptNode.onaudioprocess = function() {
             var array =  new Uint8Array(meter.frequencyBinCount);
             meter.getByteFrequencyData(array);
             var values = 0;
             var length = array.length;
             for (var i = 0; i < length; i++) {
                 values += array[i];
             }
             var average = values / length;
            console.log(average);
         }


    })
     .catch(function(err) {
      console.log('media failed to load'+ err);
     });
  }



  render(){
    return(
      <div>
      phistart:{this.props.state.phiStart}
      <input type="range" min="1" max="100" value={this.props.state.phiStart} id="phiStart"/>

      <button onClick={this.props.onClick}>{this.props.state.buttonpress}</button>
      </div>);
}
}

class AnimatedSphere extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 10);
    this.imageLoader = new THREE.ImageLoader();
    this.state = {
      sphereRotation: new THREE.Euler(),
      phiStart: 1000,
      phiLength:1000,
      thetaStart: 1000,
      thetaLength: 1000,
      wireframe:true,
      color: 0x035096,
      radius: 1,
      rotate: 'play',
      ps:'play',
      ts:'play',
      buttonpress:'pause',
      counter:0,
    };
    this.state.geometry = new THREE.SphereGeometry(this.state.radius,19,13,this.state.phiStart,this.state.phiLength,this.state.thetaStart,this.state.thetaLength);
    this.edgesGeometry = new THREE.EdgesGeometry(this.state.geometry);
    this.LINE = new THREE.LineSegments(this.edgesGeometry, new THREE.LineBasicMaterial({color: 0xffffff}));


    this._onClick = ()=>{
      if(this.state.buttonpress === 'pause'){
        this.setState({buttonpress : 'play'});
      }else{
        this.setState({buttonpress : 'pause'});
      }
    }

    this._onChange = (id,value)=>{

    }

    this._onAnimate = () => {
      // we will get this callback every frame
      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.

      if(!this.state.p){
      this.setState({counter: this.state.counter+1});
      if(this.state.counter % 200 === 0 && this.state.counter!==0 && this.state.counter < 2){
        this._onClick();
      }

      if(this.state.buttonpress==='play'){
      this.setState({wireframe:false})
    }
    if(this.state.buttonpress==='pause'){
      this.setState({sphereRotation: new THREE.Euler(this.state.sphereRotation.x+.001,this.state.sphereRotation.y,this.state.sphereRotation.z+.01),
      thetaLength:this.state.thetaLength+.01,});
      this.setState({thetaStart:this.state.thetaStart + .01});

  }
    if(this.state.buttonpress==='play'){
      this.setState({
      //  radius: (Math.sin( this.state.radius+ 1 )*5),
        phiStart: this.state.phiStart+.01,
        phiLength: this.state.phiLength+.01,
        color: this.state.color+100+10+1,
    })}
  }  };
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (
      <div style={{xAxis:-1,}}>

      <React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}
      onAnimate={this._onAnimate}>
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}
          position={this.cameraPosition}
        />
        <mesh
          rotation={this.state.sphereRotation}
        >
          <sphereGeometry
            radius={this.state.radius}
            widthSegments={12}
            heightSegments={12}
            phiStart={this.state.phiStart}
            phiLength={this.state.phiLength}
            thetaStart={this.state.thetaStart}
            thetaLength={this.state.thetaLength}
          />
          <meshDepthMaterial
             wireframe = {this.state.wireframe}
          />
        </mesh>


      </scene>
    </React3>
  </div>);
  }
}


export default AnimatedSphere;
