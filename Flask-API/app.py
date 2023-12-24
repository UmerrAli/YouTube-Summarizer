from flask import Flask, jsonify, request
from openai import OpenAI
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound, InvalidVideoId
from config import API_KEY
from flask_cors import CORS

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/summary": {"origins": "https://summarizeyoutube.netlify.app/"}})


@app.route('/summary', methods=['GET'])
def youtube_summarizer():
    video_id = request.args.get('v')
    try:
        transcript = get_transcript(video_id)
        data = open_ai(transcript)
        # print(data.choices[0].message.content)
    except NoTranscriptFound:
        return jsonify({"data": "No English Subtitles found", "error": True})
    except InvalidVideoId:
        return jsonify({"data": "Invalid Video Id", "error": True})
    except:
        return jsonify({"data": "Unable to Summarize the video", "error": True})

    return jsonify({"data": data.choices[0].message.content, "error": False})


def get_transcript(video_id):
    transcript_response = YouTubeTranscriptApi.get_transcript(video_id)
    transcript_list = [item['text'] for item in transcript_response]
    return ' '.join(transcript_list)


def open_ai(transcript):
    client = OpenAI(api_key=API_KEY)

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=[
            {"role": "system",
             "content": "You have to summarize a YouTube video using its transcript in 10 points"},
            {"role": "user", "content": transcript}
        ]
    )
    return completion


# if __name__ == '__main__':
#     app.run(debug=True)
