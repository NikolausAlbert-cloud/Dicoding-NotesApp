import { validationTitleHandler, validationBodyHandler } from "./form-validation.js";

const validation = () => {
  const form = document.querySelector("form");
  const title = form.Elements("title");
  const body = form.Elements("body");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  title.addEventListener("change", validationTitleHandler);
  title.addEventListener("invalid", validationTitleHandler);
  body.addEventListener("change", validationBodyHandler);
  body.addEventListener("invalid", validationBodyHandler);

  title.addEventListner("blur", (e) => {
    const isValid = e.target.validity.valid; 
    const errorMessage = e.target.validationMessage; 

    const connectedValidationId = document.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId?.document.getElementById(connectedValidationId);

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  });

  body.addEventListner("blur", (e) => {
    const isValid = e.target.validity.valid; 
    const errorMessage = e.target.validationMessage; 

    const connectedValidationId = document.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId?.document.getElementById(connectedValidationId);

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  });
};

export default validation;