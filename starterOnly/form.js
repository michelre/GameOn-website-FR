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
  // Vérifier si le champ est vide
  if (field.value.trim() === "") {
    return { valid: false, message: "Le champ ne doit pas être vide" };
  }

  // Vérifier si le champ contient au moins 2 caractères
  if (field.value.length < 2) {
    return {
      valid: false,
      message: "Le champ doit contenir minimum 2 caractères",
    };
  }

  // Vérifier si le champ contient uniquement des lettres
  const regex = new RegExp("^[a-z ,.'-]+$", "i");
  if (!regex.test(field.value)) {
    return {
      valid: false,
      message: "Le champ doit contenir uniquement des lettres",
    };
  }

  // Si aucune des conditions ci-dessus n'est satisfaite, le champ est valide
  return { valid: true };
};

const checkLast = (field) => {
  const regex = new RegExp("^[a-z ,.'-]+$", "i");

  if (regex.test(field.value) && field.value.length >= 2) {
    return true;
  }

  return false;
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

  //Prénom
  const isFirstValid = checkFirst(form.first);
  const firstField = form.first;
  const firstCheck = checkFirst(firstField);

  //Nom
  const isLastValid = checkLast(form.last);

  //Email
  const isEmailValid = checkEmail(form.email);

  //Date
  const isBirthDateValid = checkBirthdate(form.birthdate);

  //Questions
  const isQuestionValid = checkQuestion(form.quantity);

  //Radio
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

  // Afficher l'erreur appropriée pour le champ de prénom
  if (firstCheck.valid) {
    // Si le champ de prénom est valide, effacer le message d'erreur
    document.querySelector("#id_texte").innerHTML = "";
    showError(firstField, true);
  } else {
    // Si le champ de prénom n'est pas valide, afficher le message d'erreur
    document.querySelector("#id_texte").innerHTML = firstCheck.message;
    showError(firstField, false);
    return false;
  }
  if (!isLastValid) return false;
  if (!isEmailValid) return false;
  if (!isBirthDateValid) return false;
  if (!isQuestionValid) return false;
  if (!isTournamentValid) return false;
  console.log("Formulaire Valide");
});
