# 🎤 Voice Recorder Web App
##  Features
- 🎙️ Record audio directly in the browser
- 📤 Upload recorded audio to backend
- 🔄 Convert .webm → .wav
- 🧩 Simple and beginner-friendly structure
## Tech Stack
- Frontend: HTML, JavaScript (MediaRecorder API)
- Backend: Python (Flask)
- Audio Processing: FFmpeg + pydub
## Setup Instructions
### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/voice-recorder-app.git 
cd voice-recorder-app
```
### 2. Setup Backend
```bash
cd backend 
pip install -r requirements.txt
```
Run the server:
```bash
python app.py
```
Server will start at:
http://localhost:5000
### 3. Install FFmpeg

Linux:
```bash
sudo apt install ffmpeg
```
Mac:
```bash
brew install ffmpeg
```
Windows:

Download FFmpeg and add it to your system PATH.

### 4. Run Frontend
Open frontend/index.html using a browser

## How to Use
- Click Start Recording
- Allow microphone access
- Speak into your microphone
- Click Stop Recording
- Audio will be uploaded and converted to .wav
## Output Files
Converted files are saved in:

backend/uploads/
## Notes
- Microphone access requires localhost or HTTPS
- Browser support: Chrome, Edge, Firefox
- .webm is used for recording and converted to .wav on the backend

##
- MediaRecorder API
- Flask
- pydub
- FFmpeg