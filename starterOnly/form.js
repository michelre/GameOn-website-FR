const form = document.querySelector("#form");

const showError = (field, valid) => {
  if (valid) {
    field.classList.remove("error");
    return;
  }
  field.classList.add("error");
};

const showRadioError = (radioGroup, valid) => {
    if (valid) {
      radioGroup.forEach((radio) => {
        const label = document.querySelector(`label[for="${radio.id}"]`);
        label.classList.remove("error");
      });
      return;
    }
    radioGroup.forEach((radio) => {
      const label = document.querySelector(`label[for="${radio.id}"]`);
      label.classList.add("error");
    });
  };
const checkFirst = (field) => {
  let valid = true;
  if (field.value.length < 2) {
    valid = false;
  }

  return valid;
};

const checkLast = (field) => {
  let valid = true;
  if (field.value.length < 2) {
    valid = false;
  }

  return valid;
};

const checkEmail = (field) => {
  let valid = false;
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (emailRegExp.test(field.value)) {
    valid = true;
  }
  return valid;
};

const checkBirthdate = (field) => {
  return false;
};

const checkQuestion = (field) => {
  return false;
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
  const isTournamentValid = checkTournament(document.querySelectorAll("[name='location']"));

  


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
  } else {
    showError(form.first, isFirstValid);
    showError(form.last, isLastValid);
    showError(form.email, isEmailValid);
    showError(form.birthdate, isBirthDateValid);
    showError(form.quantity, isQuestionValid);
    showRadioError(document.querySelectorAll("[name='location']"), isTournamentValid);
    // Afficher un message d'erreur
    console.log("Formulaire non Valide");
  }
});
