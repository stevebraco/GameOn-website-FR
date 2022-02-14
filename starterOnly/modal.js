// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form");
const modalClose = document.querySelectorAll(".close");
// Inputs text
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const participateTournament = document.getElementById("quantity");
const inputs = document.querySelectorAll(".text-control");

// Input radio
const cities = document.getElementsByName("location");

// Input checkbox
const termsConditions = document.getElementById("checkbox1");
const registration = document.querySelector(".validation");

// button modal close registration
const btnCloseRegistrationModal = document.querySelector(".btn-close");

// button menu responsive
const iconNav = document.querySelector(".icon");

// reponsive nav
const editNav = () => {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
};

// launch modal form
const launchModal = () => {
  modalbg.style.display = "block";
};

// close modal
const closeModal = () => {
  // Modal form
  modalbg.style.display = "none";
  // Modal thanks
  registration.style.display = "none";
};

// Display error
const showError = (input, message) => {
  // active data-set from div.formData
  input.parentElement.dataset.error = message;
  input.parentElement.dataset.errorVisible = true;
};

// Remove error
const removeError = (input) => {
  input.parentElement.removeAttribute("data-error");
  input.parentElement.dataset.errorVisible = false;
};

const checkFirstNameLength = () => {
  if (firstName.value.length >= 2) removeError(firstName);
  else {
    showError(
      firstName,
      `Veuillez entrer 2 caractères ou plus pour le champ du ${firstName.labels[0].innerHTML}.`
    );
  }
};

const checkLastNameLength = () => {
  if (lastName.value.length >= 2) removeError(lastName);
  else {
    showError(
      lastName,
      `Veuillez entrer 2 caractères ou plus pour le champ du ${lastName.labels[0].innerHTML}.`
    );
  }
};

// check email
const checkEmail = () => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // if the regex is false show error
  if (!re.test(email.value.trim())) showError(email, "Email n' est pas valide");
  else {
    removeError(email);
  }
};

// check birthDate
const checkBirthDate = () => {
  let yearLength = birthdate.value.split("-")[0].length;
  // if birthdate.valueAsDate is null, show error
  if (!birthdate.valueAsDate || yearLength > 4)
    showError(birthdate, "Vous devez entrer votre date de naissance.");
  else {
    removeError(birthdate);
  }
};

// check quantity tournament
const checkQuantity = () => {
  // value positive
  if (
    participateTournament.value < 0 ||
    participateTournament.value === "" ||
    isNaN(participateTournament.value)
  )
    showError(participateTournament, "Une valeur positive doit être entré");
  else {
    removeError(participateTournament);
  }
};

// check cityChecked
const checkCityChecked = () => {
  let isChecked = false;

  cities.forEach((city) => {
    // if a city is checked
    if (city.checked) {
      isChecked = true;
    }
  });
  if (!isChecked) {
    // if isChecked = false, show error
    cities.forEach((city) => showError(city, "Vous devez choisir une option"));
  } else {
    cities.forEach((city) => removeError(city));
  }
  return isChecked;
};

const checkTermsAndConditions = () => {
  // if not checked show error
  if (!termsConditions.checked) {
    showError(
      termsConditions,
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
  } else {
    removeError(termsConditions);
  }
};

// verification input on focus out
const checkSwitchInput = (input) => {
  switch (input.id) {
    case "first":
      checkFirstNameLength();
      break;
    case "last":
      checkLastNameLength();
      break;
    case "email":
      checkEmail();
      break;
    case "birthdate":
      checkBirthDate();
      break;
    case "quantity":
      checkQuantity();
      break;
    default:
      console.log("not found this input");
      break;
  }
};

// check number error
const validationForm = () => {
  let error = 0;

  formData.forEach((fData) => {
    if (fData.dataset.error) {
      error += 1;
    } else {
      error -= 0;
    }
  });

  // if 0 error, form accepted
  if (!error) {
    console.log("form accepted");

    // close the modal
    modalbg.style.display = "none";

    // launch modal thanks
    registration.style.display = "block";

    // init form
    inputs.forEach((input) => (input.value = ""));
    cities.forEach((city) => {
      city.checked = false;
    });
  } else {
    console.log("error");
  }
};

// event editNav
iconNav.addEventListener("click", editNav);

// event close modal
modalClose.forEach((close) => close.addEventListener("click", closeModal));

// event close validation thanks
btnCloseRegistrationModal.addEventListener("click", closeModal);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// event check error on focus out
inputs.forEach((input) =>
  input.addEventListener("focusout", () => {
    checkSwitchInput(input);
  })
);

// on submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkFirstNameLength();
  checkLastNameLength();
  checkEmail();
  checkBirthDate();
  checkQuantity();
  checkCityChecked();
  checkTermsAndConditions();
  validationForm();
});
