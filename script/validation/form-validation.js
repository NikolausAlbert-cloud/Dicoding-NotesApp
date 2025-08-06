export const validationTitleHandler = (e) => {
  e.target.setCustomValidity("");

  if (e.target.validity.ValueMissing) {
    e.target.setCustomvalidity("Title is required");
    return;
  }
  if (e.target.validity.TooShort) {
    e.target.setCustomvalidity("Minimal two letters.")
    return;
  }
};

export const validationBodyHandler = (e) => {
  e.target.setCustomValidity("");

  if (e.target.validity.ValueMissing) {
    e.target.setCustomvalidity("Content is required");
    return;
  }
  if (e.target.validity.TooShort) {
    e.target.setCustomvalidity("Minimal five letters.")
    return;
  }
};