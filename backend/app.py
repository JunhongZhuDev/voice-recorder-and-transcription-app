from flask import Flask, request, jsonify
from pydub import AudioSegment
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]

    webm_path = os.path.join(UPLOAD_FOLDER, "recording.webm")
    wav_path = os.path.join(UPLOAD_FOLDER, "recording.wav")

    file.save(webm_path)

    # Convert to WAV
    audio = AudioSegment.from_file(webm_path, format="webm")
    audio.export(wav_path, format="wav")

    return jsonify({"message": "File uploaded and converted to WAV"})

if __name__ == "__main__":
    app.run(debug=True)