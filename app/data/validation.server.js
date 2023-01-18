function isValidTitle(value) {
  return value && value.trim().length > 0 && value.trim().length <= 30;
}

function isValidAmount(value) {
  const amount = parseFloat(value);
  return !isNaN(amount) && amount > 0;
}

function isValidDate(value) {
  return value && new Date(value).getTime() < new Date().getTime();
}

export function validateExpenseInput(input) {
  let validationErrors = {};

  if (!isValidTitle(input.title)) {
    validationErrors.title = 'Invalid expense title. Must be at most 30 characters long.'
  }

  if (!isValidAmount(input.amount)) {
    validationErrors.amount = 'Invalid amount. Must be a number greater than zero.'
  }

  if (!isValidDate(input.date)) {
    validationErrors.date = 'Invalid date. Must be a date before today.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}

function isValidEmail(value) {
  return String(value)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

function isValidPassword(value) {
  return value && value.trim().length >= 5 && value.trim().length <= 10;
}

export function validateCredentials(input) {
  let validationErrors = {};

  if (!isValidEmail(input.email)) {
    validationErrors.email = 'Invalid email address.'
  }

  if (!isValidPassword(input.password)) {
    validationErrors.password = 'Invalid password. Must be at least 7 characters long.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}

// export function validateAuthInput(input) {
//   let validationErrors = {};

//   if (!isValidEmail(input.email)) {
//     validationErrors.email = 'Invalid email address.'
//   }

//   if (!isValidPassword(input.password)) {
//     validationErrors.password = 'Invalid password. Password length must be greater than 5 characters and less than 10.'
//   }

//   if (Object.keys(validationErrors).length > 0) {
//     throw validationErrors;
//   }
// }