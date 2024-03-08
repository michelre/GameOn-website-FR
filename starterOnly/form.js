const form = document.querySelector('#form');

const showError = (field, valid) => {
    if(valid){
        field.classList.remove("error")
        return
    }
    field.classList.add("error")
}

const checkFirst = (field) => {
    let valid = true
    if(field.value.length < 2){
        valid = false
    }

    return valid
}

const checkLast = (field) => { 
    let valid = true
    if(field.value.length < 2){
        valid = false
    }

    return valid
}

const checkEmail = (field) => {
    return false
}

const checkBirthdate = (field) => {
    return false
}

const checkQuestion = (field) => {
    return false
}

const checkTournament = (field) => {
    return false
}

const checkConditions = (field) => {
    return false
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const isFirstValid = checkFirst(form.first)
    const isLastValid = checkLast(form.last)

    if(
        isFirstValid && isLastValid
    ) {
        console.log('Formulaire Valid')
        // Fermer la modal
    } else {
        showError(form.first, isFirstValid)
        showError(form.last, isLastValid)
        // Afficher un message d'erreur
    }

})