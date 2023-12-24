import { state } from "./model.js";

const metaDataParent = document.querySelector(".meta-data-container");
const summaryParent = document.querySelector(".summary-container");
const button1 = document.querySelector("#button1");
// const button2 = document.querySelector("#button2");
const search = document.querySelector("#search-input");

export const displayMetaData = function () {
  clear(metaDataParent);
  const markup = `
    <div class="meta-data-item">
        <div id="video-title">${state.title}</div>
    </div>
    <div class="meta-data-item">
        <div id="video-thumbnail"><img src="${state.thumbnailUrl}"></div>
    </div>
  `;
  metaDataParent.insertAdjacentHTML("afterbegin", markup);
};

export const getVideoUrl = function () {
  const url = search.value;
  search.value = "";
  return url;
};

const clear = function (element) {
  element.innerHTML = "";
};

export const renderSpinnerMetaData = function () {
  clear(metaDataParent);
  const markup = `
    <div class="spinner"></div>`;
  metaDataParent.insertAdjacentHTML("afterbegin", markup);
};

export const renderSpinnerSummary = function () {
  clear(summaryParent);
  const markup = `
    <div class="summary-text">
        <h2>Video Summary:</h2>
        <div class="summary-spinner">
            <div class="spinner"></div>
        </div>
    </div>`;
  summaryParent.insertAdjacentHTML("afterbegin", markup);
};

export const renderSummary = function () {
  clear(summaryParent);
  summary = state.summary
    .replace(/\n/g, "<br>")
    .replace(/(\d+)\./g, "<b>$1.</b>"); //replace all newlines with <br> and all numbers with bold numbers
  const markup = `
    <div class="summary-text">
        <h2>Video Summary:</h2>
        <div class="summary">
            <div class="summary">${summary}</div>
        </div>
    </div>`;
  summaryParent.insertAdjacentHTML("afterbegin", markup);
};

export const renderError = function (errorMessage) {
  clear(metaDataParent);
  clear(summaryParent);
  const markup = `
    <div class="error">
        <div class="error-text">${errorMessage}</div>
    </div>`;
  metaDataParent.insertAdjacentHTML("afterbegin", markup);
};

export const scrollToSummary = function () {
  summaryParent.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const addHandlerSearch = function (handler) {
  button1.addEventListener("click", function (e) {
    e.preventDefault();
    handler();
  });
};
