// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector('.close')

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

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
  modalbg.style.display = "none";

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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function closeModal() {
  modalbg.style.display = 'none'
}

modalClose.addEventListener('click', () => {
  closeModal();
})