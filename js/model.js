import axios from "axios";
import { API_URL } from "./config";
import { getJSON } from "./helper";

export const state = {
  videoId: "",
  summary: "",
  title: "",
  thumbnailUrl: "",
};

export const loadSummary = async function () {
  try {
    const data = await getJSON(`${API_URL}/summary?v=${state.videoId}`);
    // console.log(data.data);
    state.summary = data.data;
  } catch (err) {
    throw err;
  }
};

export const loadMetaData = async function (videoId) {
  try {
    const requestUrl = `https://youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const result = await axios.get(requestUrl);
    // console.log(result.data);
    state.title = result.data.title;
    state.thumbnailUrl = result.data.thumbnail_url;
  } catch (err) {
    throw err;
  }
};
