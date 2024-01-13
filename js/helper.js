import { TIMEOUT_SECONDS } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

// Validate url and return video id if valid
export const getVideoId = function (url) {
  if (validateYouTubeUrl(url)) {
    const pattern =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(pattern);

    if (match) {
      return match[1]; // Return the extracted video ID
    } else {
      return null; // Return null if no match found
    }
  } else {
    return null; // Return null if url is not a valid YouTube URL
  }
};

const validateYouTubeUrl = function (url) {
  const pattern = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return pattern.test(url); // Returns true if URL matches the pattern, false otherwise
};
