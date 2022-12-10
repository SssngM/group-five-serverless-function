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


// Form submission

const $emailInput = document.querySelector("input[name=email]");
$emailInput.addEventListener('keyup', () => validateForm());

const $btn2 = document.querySelector(".btn2");

$btn2.style["pointer-events"] = "none";
$btn2.addEventListener('click', () => validateForm());
$btn2.addEventListener('touchdown', () => validateForm());
const $validationMessage = document.querySelector("#validation-message");

function validateForm() {
  const $emailValue = document.querySelector("input[name=email]").value;

  if (question1State.length === 2 && $emailValue !== '') {
    $validationMessage.style["display"] = "none";
    $btn2.style["pointer-events"] = "inherit";
  } else {
    $validationMessage.style["display"] = "inherit";
  }
}


validateForm();

// the following prevents checkbox state from persisting after form submissions
const inputs = document.querySelectorAll('input');
inputs.forEach(input => input.autocomplete = 'off');

