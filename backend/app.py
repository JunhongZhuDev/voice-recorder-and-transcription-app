from flask import Flask, request, jsonify
from flask_cors import CORS  # <-- add this
from pydub import AudioSegment
import whisper
import os

app = Flask(__name__)
CORS(app)  # <-- allow requests from frontend

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model = whisper.load_model("base")

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    webm_path = os.path.join(UPLOAD_FOLDER, "recording.webm")
    wav_path = os.path.join(UPLOAD_FOLDER, "recording.wav")
    file.save(webm_path)

    # Convert to WAV
    audio = AudioSegment.from_file(webm_path, format="webm")
    audio.export(wav_path, format="wav")

    # Transcribe
    result = model.transcribe(wav_path)
    return jsonify({"message": "Success", "text": result["text"]})

if __name__ == "__main__":
    app.run(debug=True)