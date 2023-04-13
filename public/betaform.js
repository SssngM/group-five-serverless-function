// quetion1 Choose 2 Main Boxes

let question1State = [];

const $box1 = document.querySelector("#box1");
const $box2 = document.querySelector("#box2");
const $box3 = document.querySelector("#box3");

$box1.addEventListener("click", (evt) => processQuestion1(evt));
$box2.addEventListener("click", (evt) => processQuestion1(evt));
$box3.addEventListener("click", (evt) => processQuestion1(evt));

function processQuestion1(evt) {
  const checkbox = evt.target.closest("input");
  const parent = evt.target.closest("div");

  if (checkbox && parent) {
    const isAlreadyChecked = question1State.some(([curCheckbox]) => curCheckbox === checkbox);
    isAlreadyChecked ? unmarkCheckbox(checkbox, parent) : markCheckbox(checkbox, parent);

    validateForm();
  }

  function unmarkCheckbox(checkbox, parent) {
    checkbox.checked = false;
    parent.style["box-shadow"] = "none";

    question1State = question1State.filter(([curCheckbox]) => curCheckbox !== checkbox);
  }

  function markCheckbox(checkbox, parent) {
    question1State.push([checkbox, parent]);

    if (question1State.length > 2) {
      const [checkbox, parent] = question1State.shift();
      checkbox.checked = false;
      parent.style["box-shadow"] = "none";
    }

    question1State.forEach(([checkbox, parent]) => {
      checkbox.checked = true;
      parent.style["box-shadow"] = "10px 10px #F02FA3";
    });
  }
}


// question2 choose 3 checkboxes

let question2State = [];
const $section2 = document.querySelector("#section2");
$section2.addEventListener("click", (evt) => processQuestion2(evt.target));

function processQuestion2(curTarget) {
  const checkbox = curTarget.closest('input');

  if (checkbox) {
    const isAlreadyChecked = question2State.some((curCheckbox) => curCheckbox === checkbox);
    isAlreadyChecked ? unmarkCheckbox(checkbox) : markCheckbox(checkbox);

    validateForm();
  }

  function unmarkCheckbox(checkbox) {
    checkbox.checked = false;
    question2State = question2State.filter(curCheckbox => curCheckbox !== checkbox);
  }

  function markCheckbox(checkbox) {
    question2State.push(checkbox);

    question2State.forEach((checkbox) => {
      checkbox.checked = true;
    });
  }
}

// question3 choose 3 checkboxes

let question3State = [];
const $section3 = document.querySelector("#section3");
$section3.addEventListener("click", (evt) => processQuestion3(evt.target));

function processQuestion3(curTarget) {
  const checkbox = curTarget.closest('input');

  if (checkbox) {
    const isAlreadyChecked = question3State.some((curCheckbox) => curCheckbox === checkbox);
    isAlreadyChecked ? unmarkCheckbox(checkbox) : markCheckbox(checkbox);

    validateForm();
  }

  function unmarkCheckbox(checkbox) {
    checkbox.checked = false;
    question3State = question3State.filter(curCheckbox => curCheckbox !== checkbox);
  }

  function markCheckbox(checkbox) {
    question3State.push(checkbox);

    question3State.forEach((checkbox) => {
      checkbox.checked = true;
    });
  }
}


// Form submission

const $emailInput = document.querySelector("input[name=email]");
$emailInput.addEventListener('keyup', () => validateForm());

const $btn2 = document.querySelector(".btn2");
const $validationMessage = document.querySelector("#validation-message");

function validateForm() {
  const $emailValue = document.querySelector("input[name=email]").value;

  if (
    $emailValue !== '' && $emailValue.includes('@')
    ) {
    $validationMessage.style["visibility"] = "hidden";
    $btn2.style["pointer-events"] = "inherit";
  } else {
    $validationMessage.style["visibility"] = "inherit";
    $btn2.style["pointer-events"] = "none";
  }
}


validateForm();

// the following prevents checkbox state from persisting after form submissions
const inputs = document.querySelectorAll('input');
inputs.forEach(input => input.autocomplete = 'off');

