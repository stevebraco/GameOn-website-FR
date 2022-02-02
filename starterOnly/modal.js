

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector('form')
const modalClose = document.querySelectorAll('.close')
const inputTypeText = document.querySelectorAll("input[type='text']")
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const participateTournament = document.getElementById('quantity');
const cities = document.getElementsByName('location')
const termsConditions = document.getElementById('checkbox1')
const registration = document.querySelector('.validation')
const modalRegistrationClose = document.querySelector('.btn-close')
const iconNav = document.querySelector('.icon')
const inputs = document.querySelectorAll('.text-control')

const firstName = document.getElementById('first');
const lastName = document.getElementById('last');

// reponsive nav
const editNav = () => {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal form
const launchModal = () => {
  modalbg.style.display = "block";
}

// close modal
const closeModal = () => {
  modalbg.style.display = "none";
  registration.style.display = "none";
}

// Display error
// active data-set from div.formData
const showError = (input, message) => {
  input.parentElement.dataset.error = message
  input.parentElement.dataset.errorVisible = true
}

// Remove error
const removeError = (input) => {
  input.parentElement.removeAttribute('data-error')
  input.parentElement.dataset.errorVisible = false
}

const checkFirstNameLength = () => {
    if(firstName.value.length >= 2) removeError(firstName)
    else {
     showError(firstName, `Veuillez entrer 2 caractères ou plus pour le champ du ${firstName.labels[0].innerHTML}.`)
    }
}

const checkLastNameLength = () => {
  if(lastName.value.length >= 2) removeError(lastName)
  else {
   showError(lastName, `Veuillez entrer 2 caractères ou plus pour le champ du ${lastName.labels[0].innerHTML}.`)
  }
}

// // check length text
// const checkLength = () => {
//   inputTypeText.forEach(input => {
//     if(input.value.length >= 2) removeError(input)
//     else {
//      showError(input, `Veuillez entrer 2 caractères ou plus pour le champ du ${input.parentElement.innerText}.`)
//     }
//   })
// }

// check email
const checkEmail = () => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.value.trim())) showError(email, 'Email n\' est pas valide');
   else {
    removeError(email)  
  }
}

// check birthDate
const checkBirthDate = () => {
  // if birthdate.valueAsDate is null, show error
  if(!birthdate.valueAsDate) showError(birthdate, 'Vous devez entrer votre date de naissance.')
  else {
    removeError(birthdate)
  }
}

// check quantity tournament
const checkQuantity = () => {
  // value positive
  if(participateTournament.value < 0 || participateTournament.value === '') showError(participateTournament, 'Une valeur positive doit être entré')
   else {
    removeError(participateTournament)
  }
}

// check cityChecked
const checkCityChecked = () => {
  let isChecked = false

  cities.forEach(city => {
  // if a city is checked
   if(city.checked) {
     isChecked = true
   } 
})
// if isChecked = false, show error
  if(!isChecked) {
    cities.forEach(city => showError(city, 'Vous devez choisir une option'))
  } else {
    cities.forEach(city => removeError(city))
  }
  return isChecked
}

const checkTermsAndConditions = () => {
  if(!termsConditions.checked) {
    showError(termsConditions, 'Vous devez vérifier que vous acceptez les termes et conditions.')
  } else {
    removeError(termsConditions)
  }
}

// check number error
const validationForm = () => {
  let error = 0

  formData.forEach(fData => {
    if(fData.dataset.error) {
      error += 1
    } else {
      error -= 0
    }
  })

  // if error is empty, form accepted
  if(!error) {
    console.log('form accepted');
    
    // init form
    inputs.forEach(input => input.value = '')
    cities.forEach(city => {
      city.checked = false
     })
    
    // close the modal
    modalbg.style.display = "none";
    // launch modal thanks
    registration.style.display = "block";

  } else {
    console.log('error');
  }
}

// verification input on focus out
const checkSwitchInput = (input) => {
  switch (input.id) {
    case 'first':
      checkFirstNameLength()
      break;
    case 'last':
      checkLastNameLength()
      break;
    case 'email':
      checkEmail()
      break;
    case 'birthdate':
      checkBirthDate()
      break;
    case 'quantity':
      checkQuantity()
      break;

    default:
      break;
  }
}

// check error focusOut
// firstName.addEventListener('focusout', checkFirstNameLength)
// lastName.addEventListener('focusout', checkLastNameLength)
// email.addEventListener('focusout', checkEmail)
// birthdate.addEventListener('focusout', checkBirthDate)
// participateTournament.addEventListener('focusout', checkQuantity)

// EVENT
// event check error on focus out
inputs.forEach(input =>  input.addEventListener('focusout', () => {
  checkSwitchInput(input)
}))

// event editNav
iconNav.addEventListener('click', editNav)

// event close modal
modalClose.forEach((close) => close.addEventListener("click", closeModal));

// event close validation thanks
modalRegistrationClose.addEventListener('click', closeModal)

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


// on submit
form.addEventListener('submit', (e) => {
  e.preventDefault()
  checkFirstNameLength()
  checkLastNameLength()
  checkEmail()
  checkBirthDate()
  checkQuantity()
  checkCityChecked()
  checkTermsAndConditions()

  validationForm()
  
})