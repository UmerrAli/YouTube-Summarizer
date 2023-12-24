import * as model from "./model.js";
import * as view from "./view.js";
import { getVideoId } from "./helper.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const controlSummary = async function () {
  try {
    // 0. get video URL from view
    const videoUrl = view.getVideoUrl();

    // 1. get video Id
    const videoId = getVideoId(videoUrl);
    if (!videoId) throw new Error("Please Enter a valid YouTube URL!");

    // 2. Update state
    model.state.videoId = videoId;

    // 3. load spinner for metadata
    view.renderSpinnerMetaData();

    // 4. load metadata
    await model.loadMetaData(videoId);

    // 5. display thumbnail and tittle
    view.displayMetaData();

    // 6. load spinner for summary
    view.renderSpinnerSummary();

    // 7. scroll to summary
    view.scrollToSummary();

    // 8. get summary from model
    await model.loadSummary();

    // 9. Render summary
    view.renderSummary();

    // 10. scroll to summary again when loaded
    view.scrollToSummary();
  } catch (error) {
    view.renderError(error.message);
  }
};

const init = function () {
  view.addHandlerSearch(controlSummary);
};

init();
