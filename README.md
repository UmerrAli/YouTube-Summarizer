# YouTube Videos Summarizer using OpenAI API

This project utilizes the power of GPT-3.5 to generate concise and informative summaries for YouTube videos. This repository contain both frontend(HTML/CSS/JS) and backend(Flask).

## Demo

Visit this link for live demo: https://summarizeyoutube.netlify.app/

### Video Demo

https://github.com/UmerrAli/YouTube-Summarizer/assets/106273026/170f3bb1-6762-4430-b8c9-8e90f3c7b7fe

## Frontend

For the frontend of YouTube Video Summarizer, you'll need Node.js and npm (Node Package Manager) which is included with Node.js. Here is how you can install these prerequisites:

- Download and install Node.js from https://nodejs.org/.
- Verify the installation by running the following commands in your terminal or command prompt:
  ```bash
  node -v
  npm -v
  ```

### Run Locally

Parcel is used as the bundler for the project.

1. Clone the project:
   ```bash
   git clone https://github.com/UmerrAli/YouTube-Summarizer
   ```
2. Install dependencies using npm:
   ```bash
   npm install
   ```
3. To start a development server
   ```bash
   npm start
   ```
   This will start the development server at http://localhost:1234. Open this URL in your browser to view the application.
   http://localhost:1234/

## Backend

- Make sure Python is installed on your machine. You can download it from https://www.python.org/.
- Verify the installation by running the following command in your terminal or command prompt:

```bash
python3 --version
```

Create a virtual environment

```bash
python3 -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

### Set up OpenAI API Key

Open the config.py file and add your OpenAI API key. If you don't have an API key, you can obtain one from the OpenAI platform.

```python
API_KEY = 'YOUR_API_KEY'
```

After setting up the environment and adding the API key, you can run the Flask application:

```
flask run
```

The backend server will be running at http://127.0.0.1:5000/. Make sure the backend is running before testing the frontend.
