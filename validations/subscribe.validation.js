// validations/subscribe.validation

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

/* ---------------------------
 * VALIDATE SUBSCRIBE
----------------------------*/
export function validateSubscribe({ email }) {
  if (!email) {
    return "Email is required";
  }

  if (!EMAIL_REGEX.test(email)) {
    return "Please provide a valid email";
  }

  return null;
}
