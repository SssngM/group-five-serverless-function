const $button = document.querySelector('button');
$button.addEventListener("mousedown", () => $button.style['box-shadow'] = 'none' );
$button.addEventListener("mouseup", () => $button.style['box-shadow'] = '6px 6px #F02FA3' );

const boxesState = [];
const $box1 = document.querySelector('#box1');
const $box2 = document.querySelector('#box2');
const $box3 = document.querySelector('#box3');

$box1.addEventListener("click", (evt) => {
  updateBoxesState(evt);
  updateUI();
});

$box2.addEventListener("click", (evt) => {
  updateBoxesState(evt);
  updateUI();
});

$box3.addEventListener("click", (evt) => {
  updateBoxesState(evt);
  updateUI();
});

function updateBoxesState(evt) {
  evt.target.checked = true;
  evt.target.parentElement;
  console.log(evt.target.parentElement);

  if (boxesState.length > 1) {
    const ele = boxesState.shift();
    ele.style['box-shadow'] = 'none';
  }
  boxesState.push(evt.target.parentElement);
}

function updateUI() {
  boxesState.forEach($ele => {
    $ele.style['box-shadow'] = '6px 6px #F02FA3';
  });
}
