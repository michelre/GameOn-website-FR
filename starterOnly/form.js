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
    if (valid) {
      radio.classList.remove("error");
    } else {
      radio.classList.add("error");
    }
  });
};

const checkFirst = (field) => {
  if (field.value.trim() === "") {
    return { valid: false, message: "Le champ ne doit pas être vide" };
  }

  if (field.value.length < 2) {
    return {
      valid: false,
      message: "Le champ doit contenir minimum 2 caractères",
    };
  }

  const regex = new RegExp("^[a-z ,.'-]+$", "i");
  if (regex.test(field.value)) {
    return { valid: true };
  }

  return {
    valid: false,
    message: "Le champ doit contenir uniquement des lettres",
  };
};

const checkLast = (field) => {
  if (field.value.trim() === "") {
    return { valid: false, message: "Le champ ne doit pas être vide" };
  }

  if (field.value.length < 2) {
    return {
      valid: false,
      message: "Le champ doit contenir minimum 2 caractères",
    };
  }

  const regex = new RegExp("^[a-z ,.'-]+$", "i");
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
// Fonction pour fermer la modale en cliquant en dehors d'elle
const closeModalOnClickOutside = (modal) => {
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });
};

// Fonction pour afficher une modale de confirmation
const showConfirmationModal = () => {
  // Fermer la modale du formulaire
  document.querySelector(".bground").style.display = "none";

  // Créer une nouvelle modale de confirmation
  const confirmationModal = document.createElement("div");
  confirmationModal.classList.add("confirmation-modal");
  confirmationModal.innerHTML = `
    <div class="modal-content">
      <p>Super ! Merci pour ton inscription !</p>
    </div>
  `;
  document.body.appendChild(confirmationModal);

  // Appeler la fonction pour fermer la modale en cliquant en dehors d'elle
  closeModalOnClickOutside(confirmationModal);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Validation des champs
  const isFirstValid = checkFirst(form.first);
  const isLastValid = checkLast(form.last);
  const isEmailValid = checkEmail(form.email);
  const isBirthDateValid = checkBirthdate(form.birthdate);
  const isQuestionValid = checkQuestion(form.quantity);
  const isTournamentValid = checkTournament(
    document.querySelectorAll("[name='location']")
  );
  const isConditionsAccepted = checkConditions();

  // Affichage des messages d'erreur pour chaque champ
  showError(form.first, isFirstValid.valid);
  showError(form.last, isLastValid.valid);
  showError(form.email, isEmailValid.valid);
  showError(form.birthdate, isBirthDateValid.valid);
  showError(form.quantity, isQuestionValid.valid);
  showRadioError(
    document.querySelectorAll("[name='location']"),
    isTournamentValid
  );

  // Affichage des messages d'erreur spécifiques pour les champs de prénom, de nom, d'email, de date de naissance, de question et de boutons radio
  document.querySelector("#id_texte_prénom").innerHTML = isFirstValid.valid
    ? ""
    : isFirstValid.message;
  document.querySelector("#id_texte_nom").innerHTML = isLastValid.valid
    ? ""
    : isLastValid.message;
  document.querySelector("#id_texte_email").innerHTML = isEmailValid.valid
    ? ""
    : isEmailValid.message;
  document.querySelector("#id_texte_birthdate").innerHTML =
    isBirthDateValid.valid ? "" : isBirthDateValid.message;
  document.querySelector("#id_texte_question").innerHTML = isQuestionValid.valid
    ? ""
    : isQuestionValid.message;
  document.querySelector("#id_texte_tournament").innerHTML =
    isTournamentValid.valid ? "" : isTournamentValid.message;
  document.querySelector("#id_texte_conditions").innerHTML =
    isConditionsAccepted.valid ? "" : isConditionsAccepted.message;

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
