from flask import Flask, jsonify, request
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound, InvalidVideoId
from youtube_transcript_api.proxies import WebshareProxyConfig
from flask_cors import CORS
import os
import random
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "active", "message": "Service is running"}), 200

@app.route('/summary', methods=['GET'])
def youtube_summarizer():
    video_id = request.args.get('v')
    try:
        transcript = get_transcript(video_id)
        summary = generate_summary(transcript)
    except NoTranscriptFound:
        return jsonify({"data": "No English Subtitles found", "error": True})
    except InvalidVideoId:
        return jsonify({"data": "Invalid Video Id", "error": True})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"data": "Unable to Summarize the video", "error": True})

    return jsonify({"data": summary, "error": False})


def get_transcript(video_id):
    username = os.getenv("WEBSHARE_USERNAME")
    password = os.getenv("WEBSHARE_PASSWORD")
    # Use Webshare Proxy
    try:
        proxy_config = WebshareProxyConfig(proxy_username=username, proxy_password=password)
        ytt_api = YouTubeTranscriptApi(proxy_config=proxy_config)
        transcript_response = ytt_api.fetch(video_id)
        return ' '.join([snippet.text for snippet in transcript_response])
    except Exception as e:
        print(f"Proxy connection failed: {e}")
        raise e


def generate_summary(transcript):
    model = genai.GenerativeModel("gemini-2.5-flash")
    prompt = "You have to summarize a YouTube video using its transcript in 10 points. Transcript: " + transcript
    response = model.generate_content(prompt)
    return response.text
