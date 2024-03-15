const form = document.querySelector("#form");

const showError = (field, valid) => {
  if (valid) {
    field.classList.remove("error");
    return;
  }
  field.classList.add("error");
};

const showRadioError = (radioGroup, valid) => {
  radioGroup.forEach((radio) => {
    const label = document.querySelector(`label[for="${radio.id}"]`);
    if (valid) {
      label.classList.remove("error");
    } else {
      label.classList.add("error");
    }
  });
};

const checkFirst = (field) => {
  let valid = true;
  if (field.value.length < 2) {
    //regexp name
    valid = false;
  }

  return valid;
};

const checkLast = (field) => {
  let valid = true;
  if (field.value.length < 2) {
    //regexp name
    valid = false;
  }

  return valid;
};

const checkEmail = (field) => {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  return emailRegExp.test(field.value);
};

const checkBirthdate = (field) => {
  const dateValue = new Date(field.value);

  return !isNaN(dateValue.getTime()) && dateValue.getFullYear() >= 1914;
};

const checkQuestion = (field) => {
  const answer = field.value.trim();

  return answer !== "" && answer >= 0 && answer <= 500;
};

const checkTournament = (radioGroup) => {
  let valid = false;

  radioGroup.forEach((radio) => {
    if (radio.checked) {
      valid = true;
    }
  });

  return valid;
};

const checkConditions = (field) => {
  return false;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const isFirstValid = checkFirst(form.first);
  const isLastValid = checkLast(form.last);
  const isEmailValid = checkEmail(form.email);
  const isBirthDateValid = checkBirthdate(form.birthdate);
  const isQuestionValid = checkQuestion(form.quantity);
  const isTournamentValid = checkTournament(
    document.querySelectorAll("[name='location']")
  );

  showError(form.first, isFirstValid);
  showError(form.last, isLastValid);
  showError(form.email, isEmailValid);
  showError(form.birthdate, isBirthDateValid);
  showError(form.quantity, isQuestionValid);
  showRadioError(
    document.querySelectorAll("[name='location']"),
    isTournamentValid
  );

  if (
    isFirstValid &&
    isLastValid &&
    isEmailValid &&
    isBirthDateValid &&
    isQuestionValid &&
    isTournamentValid
  ) {
    console.log("Formulaire Valide");
    // Fermer la modal
  }
});
