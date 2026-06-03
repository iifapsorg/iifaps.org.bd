// validations/authValidation

export function validateSignup({ name, email, password }) {
  if (!name || !email || !password) {
    return "Name, email and password are required";
  }

  if (name.length > 100) {
    return "Name cannot exceed 100 characters";
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Please provide a valid email";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
}

export function validateSignin({ email, password }) {
  if (!email || !password) {
    return "Email and password are required";
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Please provide a valid email";
  }

  return null;
}