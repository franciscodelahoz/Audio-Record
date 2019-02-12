const buttonRecord = document.getElementById('recordAudio');
const buttonStop = document.getElementById('stopRecord');

function handleAudioRecord(stream) {
	const audioChuncks = [];
	window.mediaRecorder = new MediaRecorder(stream);

	window.mediaRecorder.start();

	window.mediaRecorder.addEventListener('dataavailable', (event) => {
		if (event.data.size) {
			audioChuncks.push(event.data);
		}
	});

	window.mediaRecorder.addEventListener('stop', () => {
		delete window.mediaRecorder;
		const audioBlob = new Blob(audioChuncks);
		const audioURL = URL.createObjectURL(audioBlob);
		const audio = new Audio(audioURL);
		audio.play();
	});
}

buttonRecord.addEventListener('click', () => {
	navigator.mediaDevices.getUserMedia({ audio: true })
		.then(handleAudioRecord);
});

buttonStop.addEventListener('click', () => {
	if (window.mediaRecorder) {
		window.mediaRecorder.stop();
	}
});
