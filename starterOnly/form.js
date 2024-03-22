const form = document.querySelector("#form");

const showError = (valid, message, errorFieldId) => {
  const errorField = document.querySelector(errorFieldId)
  if (valid) {
    errorField.innerHTML = ''
    return;
  }
  errorField.innerHTML = message
};

const checkName = (field) => {
  if (field.value.trim() === "") {
    return { valid: false, message: "Le champ ne doit pas être vide" };
  }

  if (field.value.length < 2) {
    return {
      valid: false,
      message: "Le champ doit contenir minimum 2 caractères",
    };
  }

  const regex = new RegExp("^[a-z ,.'-,é,è]+$", "i");
  if (regex.test(field.value)) {
    return { valid: true };
  }

  return {
    valid: false,
    message: "Le champ doit contenir uniquement des lettres",
  };
};

const checkEmail = (field) => {
  if (field.value.trim() === "") {
    return { valid: false, message: "Le champ ne doit pas être vide" };
  }

  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(field.value)) {
    return { valid: false, message: "Veuillez saisir un email correct" };
  }

  return { valid: true };
};

const checkBirthdate = (field) => {
  const dateValue = new Date(field.value);

  if (field.value.trim() === "") {
    return { valid: false, message: "Veuillez indiquer votre Date" };
  }

  if (isNaN(dateValue.getTime()) || dateValue.getFullYear() < 1914) {
    return {
      valid: false,
      message: "Veuillez saisir une date correcte ( minimum 1914)",
    };
  }

  return { valid: true };
};

const checkQuestion = (field) => {
  const answer = field.value.trim();

  if (answer === "") {
    return { valid: false, message: "Le champ ne doit pas être vide" };
  }

  if (answer < 0 || answer > 500) {
    return { valid: false, message: "Maximum de 500" };
  }

  return { valid: true };
};

const checkTournament = (radioGroup) => {
  let valid = false;
  radioGroup.forEach((radio) => {
    if (radio.checked) {
      valid = true;
    }
  });
  return valid
    ? { valid: true }
    : { valid: false, message: "Veuillez sélectionner une des villes" };
};

const checkConditions = () => {
  const conditionCheckbox = document.getElementById("checkbox1");
  const conditionLabel = document.querySelector(
    `label[for="${conditionCheckbox.id}"]`
  );
  if (conditionCheckbox.checked) {
    conditionLabel.classList.remove("error");
    return { valid: true };
  }
  conditionLabel.classList.add("error");
  return {
    valid: false,
    message: "Vous devez accepter les conditions d'utilisation",
  };
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Validation des champs
  const isFirstValid = checkName(form.first);
  const isLastValid = checkName(form.last);
  const isEmailValid = checkEmail(form.email);
  const isBirthDateValid = checkBirthdate(form.birthdate);
  const isQuestionValid = checkQuestion(form.quantity);
  const isTournamentValid = checkTournament(
    document.querySelectorAll("[name='location']")
  );
  const isConditionsAccepted = checkConditions();

  // Affichage des messages d'erreur pour chaque champ
  showError(isFirstValid.valid, isFirstValid.message, '#id_texte_prénom');
  showError(isLastValid.valid, isLastValid.message, '#id_texte_nom');
  showError(isEmailValid.valid, isEmailValid.message, '#id_texte_email');
  showError(isBirthDateValid.valid, isBirthDateValid.message, '#id_texte_birthdate');
  showError(isQuestionValid.valid, isQuestionValid.message, '#id_texte_question');
  showError(isTournamentValid.valid, isTournamentValid.message, "#id_texte_tournament");
  showError(isConditionsAccepted.valid, isConditionsAccepted.message, "#id_texte_conditions");

  // Si tous les champs sont valides, afficher la modale de confirmation
  if (
    isFirstValid.valid &&
    isLastValid.valid &&
    isEmailValid.valid &&
    isBirthDateValid.valid &&
    isQuestionValid.valid &&
    isTournamentValid.valid &&
    isConditionsAccepted.valid
  ) {
    showConfirmationModal();
  }
});
