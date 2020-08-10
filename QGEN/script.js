console.log("QGEN IGNITED");
//get Quote from API

const quoteBtn = document.getElementById("gen-newquote");
const quoteAuthor = document.getElementById("author");
const quoteText = document.getElementById("main-quote");
const twtBtn = document.getElementById("tweet");

const proxURL = "https://cors-anywhere.herokuapp.com/";
const apiURL =
  "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

async function getQuote() {
  try {
    const resp = await fetch(proxURL + apiURL);
    const data = await resp.json();

    quoteText.innerText = data.quoteText;
    console.log(data.quoteText);
    if (data.quoteText.length >= 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    if (data.quoteAuthor === "") {
      quoteAuthor.innerText = "it's Unknown";
    } else {
      quoteAuthor.innerText = data.quoteAuthor;
    }
  } catch (err) {
    getQuote();

    console.log("err: ", err);
  }
}
//Twitter Web Intent Button

function twitterButtonMeta() {
  if (quoteText.innerText !== "") {
    const webURL = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}`;
    window.open(webURL, "_blank");
  } else {
    alert("Tweet Data is not yet populated, try again later!");
  }
}

twtBtn.addEventListener("click", twitterButtonMeta);
quoteBtn.addEventListener("click", getQuote);
