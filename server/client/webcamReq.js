let startRec = document.querySelector('#startWebcam');
let stopRec = document.querySelector('#stopWebcam');
let videoIn = document.querySelector('#videoIn');
let videoOut = document.querySelector('#videoOut');
startRec.addEventListener('click', startWebcam);
stopRec.addEventListener('click', stopWebcam);
let ws = new WebSocket('ws://localhost:8080');

ws.onopen = function() {
		console.log('соединение установлено');
		};

let options = {
			mimeType: 'video/webm'
		};
let chunk;

ws.onmessage = function (message) {
	chunk = message.data;
	let url = URL.createObjectURL(chunk);
	videoIn.src = url;
	chunk = null;
};

let webcamStream;
function startWebcam() {
	navigator.mediaDevices.getUserMedia({
		audio: true,
		video: true
	}).then((stream) =>{
		let v = videoOut.srcObject = stream;
		videoOut.srcObject = stream;
		videoOut.play();

		webcamStream = stream;
		
		let chunk2 = [];
		videoOut.addEventListener('play',function () {
			let mediaRecorder = new MediaRecorder(stream,options);
			mediaRecorder.start(2000);				
			mediaRecorder.addEventListener('dataavailable',event =>{
				let chunk2;
				chunk2 = event.data;
				ws.send(chunk2);
			 });
			});    
	}).catch((error) => {
		console.log('navigator.getUserMedia', error);
	});
};

function stopWebcam() {
	webcamStream.getTracks()[0].stop();
	webcamStream.getTracks()[1].stop();
	clearInterval(messageTime);
}