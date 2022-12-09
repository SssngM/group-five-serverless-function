/* ******************************************************************************** */
/* click button effect funtionality */
/* ******************************************************************************** */

const buttons = document.querySelectorAll("button");
buttons.forEach(buttonEle => applyButtonPressEffect(buttonEle));

function applyButtonPressEffect(buttonEle) {
  buttonEle.addEventListener("mousedown", () => {
    buttonEle.style["box-shadow"] = "none" 
    buttonEle.style["top"] = "5px";
    buttonEle.style["left"] = "5px";
  });
  buttonEle.addEventListener("mouseup", () => {
    buttonEle.style["box-shadow"] = "5px 5px #F02FA3";
    buttonEle.style["top"] = "0";
    buttonEle.style["left"] = "0";
  });

  // mobile
  buttonEle.addEventListener("touchstart", () => {
    buttonEle.style["box-shadow"] = "none" 
    buttonEle.style["top"] = "5px";
    buttonEle.style["left"] = "5px";
  });
  buttonEle.addEventListener("touchend", () => {
    buttonEle.style["box-shadow"] = "5px 5px #F02FA3";
    buttonEle.style["top"] = "0";
    buttonEle.style["left"] = "0";
  });
}
