/* ******************************************************************************** */
/* click button effect funtionality */
/* ******************************************************************************** */

const buttons = document.querySelectorAll("button");
buttons.forEach(buttonEle => applyButtonPressEffect(buttonEle));

function applyButtonPressEffect(buttonEle) {
  buttonEle.addEventListener("mousedown", () => buttonEle.style["box-shadow"] = "none" );
  buttonEle.addEventListener("mouseup", () => buttonEle.style["box-shadow"] = "5px 5px #F02FA3" );
}
