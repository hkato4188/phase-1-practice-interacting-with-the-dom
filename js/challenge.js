// Pause the counter, which should:
// pause the counter
// disable all buttons except the pause button
// switch the label on the button from "pause" to "resume"
// Click the "resume" button to restart the counter and re-enable the buttons.
// Leave comments on my gameplay, such as: "Wow, what a fun game this is."

const counterElement = document.getElementById("counter");
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");
const heartButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
let likesByNumList = document.getElementById("likes-by-number");
let commentsList = document.getElementById("list");
let counterValue = counterElement.innerText * 1;
let likesByNumber = {};
let counterIntervalId = 0;
let timerId;

incrementTimer();
addIncrementEventListener();
addDecrementEventListener();
addLikesByNumEventListener();
addPauseButtonEventListener();
addCommentFormEventListener();

// See the timer increment every second once the page has loaded.
function incrementTimer() {
  timerId = setInterval(incrementCounter, 1000);
}
function incrementCounter() {
  counterValue += 1;
  counterElement.innerText = counterValue;
}
// Manually increment and decrement the counter using the plus and minus buttons.
function addIncrementEventListener() {
  plusButton.addEventListener("click", incrementCounter);
}
function addDecrementEventListener() {
  minusButton.addEventListener("click", decrementCounter);
}
function decrementCounter() {
  counterValue -= 1;
  counterElement.innerText = counterValue;
}
// "Like" an individual number of the counter.
//I should see the count of the number of "likes" associated with that number displayed.
function addLikesByNumEventListener() {
  heartButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (likesByNumber[counterValue]) {
      likesByNumber[counterValue] += 1;
    } else {
      likesByNumber[counterValue] = 1;
    }
    displayLikesByNum(likesByNumber);
  });
}

function displayLikesByNum(obj) {
  likesByNumList.innerHTML = "";
  for (let num in obj) {
    let numLi = document.createElement("li");
    numLi.innerText = `The number: ${num} has ${obj[num]} many likes!`;
    likesByNumList.append(numLi);
  }
}

function addPauseButtonEventListener() {
  pauseButton.addEventListener("click", () => {
    if (pauseButton.innerText === "pause") {
      clearInterval(timerId);
      pauseButton.innerText = "resume";
      plusButton.disabled = true;
      minusButton.disabled = true;
      heartButton.disabled = true;
    } else {
      pauseButton.innerText = "pause";
      plusButton.disabled = false;
      minusButton.disabled = false;
      heartButton.disabled = false;
      incrementTimer();
    }
  });
}
function addCommentFormEventListener() {
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newComment = document.createElement("li");
    newComment.textContent = commentInput.value;
    commentsList.appendChild(newComment);
  });
}
