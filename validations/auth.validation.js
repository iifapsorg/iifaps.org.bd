// validations/auth.validation

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

/* ---------------------------
 * VALIDATE SIGN UP / CREATE USER
----------------------------*/
export function validateSignup({ name, email, password }) {
  if (!name || !email || !password) {
    return "Name, email and password are required";
  }

  if (name.length > 100) {
    return "Name cannot exceed 100 characters";
  }

  if (!EMAIL_REGEX.test(email)) {
    return "Please provide a valid email";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
}

/* ---------------------------
 * VALIDATE SIGN IN
----------------------------*/
export function validateSignin({ email, password }) {
  if (!email || !password) {
    return "Email and password are required";
  }

  if (!EMAIL_REGEX.test(email)) {
    return "Please provide a valid email";
  }

  return null;
}


