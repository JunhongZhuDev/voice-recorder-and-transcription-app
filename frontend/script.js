// -------------------------
// script.js
// -------------------------

let mediaRecorder;
let audioChunks = [];

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const audioPlayback = document.getElementById("audioPlayback");
const resultDisplay = document.getElementById("result");

// -------------------------
// Start recording
// -------------------------
startBtn.onclick = async () => {
  try {
    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);

    // Store audio data chunks
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    // When recording stops
    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });

      // Create playback URL
      const audioUrl = URL.createObjectURL(blob);
      audioPlayback.src = audioUrl;

      // Upload audio to backend
      const formData = new FormData();
      formData.append("file", blob, "recording.webm");

      resultDisplay.innerText = "Transcribing... please wait.";

      try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          resultDisplay.innerText = data.text || "No transcription available.";
        } else {
          resultDisplay.innerText = "Error: " + (data.error || "Unknown error");
        }
      } catch (err) {
        resultDisplay.innerText = "Error connecting to server: " + err;
      }

      // Clear chunks for next recording
      audioChunks = [];
    };

    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resultDisplay.innerText = "Recording...";
  } catch (err) {
    alert("Microphone access denied or not available: " + err);
  }
};

// -------------------------
// Stop recording
// -------------------------
stopBtn.onclick = () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
};