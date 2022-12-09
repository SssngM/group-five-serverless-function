/* ******************************************************************************** */
/* clipboard funtionality */
/* ******************************************************************************** */

function myFunction() {
  const copyText = document.getElementById("clipboard-input");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  
  const clipboardBtn = document.getElementById("clipboard-btn");
  clipboardBtn.innerHTML = "Copied";
}

function outFunc() {
  const clipboardBtn = document.getElementById("clipboard-btn");
  clipboardBtn.innerHTML = "Copy URL";
}
