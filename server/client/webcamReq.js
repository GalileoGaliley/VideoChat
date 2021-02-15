let startRec = document.querySelector('#startWebcam');
let stopRec = document.querySelector('#stopWebcam');

startRec.addEventListener('click', startWebcam);
stopRec.addEventListener('click', stopWebcam);
let ws = new WebSocket('ws://localhost:8080');

ws.onopen = function() {
		console.log('соединение установлено');
		
		};



ws.onmessage = function (event) {
	console.log(event.data);
	// body...
};
let webcamStream;
function startWebcam() {
	navigator.mediaDevices.getUserMedia({
		audio: true,
		video: true
	}).then((stream) =>{
		let video = document.querySelector('#video');
		let v = video.srcObject = stream;
		video.srcObject = stream;
		video.play();

		webcamStream = stream;

		let canvas = document.querySelector('#canvas');
		let ctx = canvas.getContext('2d');		
		

		let i;
		video.addEventListener('play',function () {
			let messageTime = setInterval(function () {
			ctx.drawImage(video,0,0);
			ws.send(ctx.getImageData(0,0,50,50));
			
		},40);
			i = window.messageTime;
			},false);    

	}).catch((error) => {
		console.log('navigator.getUserMedia err', error);
	});
};

function stopWebcam() {
	webcamStream.getTracks()[0].stop();
	webcamStream.getTracks()[1].stop();
	clearInterval(messageTime);
}