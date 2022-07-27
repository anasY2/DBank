import { DBank_backend } from "../../declarations/DBank_backend";
import sweetAlert from "sweetalert";

window.addEventListener("load", async () => {

  //getting the current balance
  let currentAmount = await DBank_backend.checkBalance();

  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;

})

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  //getting the amount to be updated and withdraw
  let inputAmount = parseFloat(document.getElementById("input-amount").value);
  let outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);
  let btn = document.getElementById("submit-btn");
  btn.setAttribute("disabled", true);

  //if the input in any of the fields is not a number
  if(isNaN(inputAmount)){
    inputAmount=0;
  }
  if(isNaN(outputAmount)){
    outputAmount=0;
  }

  //updating if there is any top up
  await DBank_backend.topUp(inputAmount);

  //check for the with-drawal amount
 let currentAmount = await DBank_backend.withDraw(outputAmount);

  await DBank_backend.compound();
  //check to see if the available amount is less than the wanted amount
  if (currentAmount < 0) {

    //displaying an alert box
    sweetAlert({
      title: "Error",
      text: "Oops! Insufficient balance",
      icon: "error"
    });

    btn.removeAttribute("disabled");
  } else {

    document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
    btn.removeAttribute("disabled");

  }

})