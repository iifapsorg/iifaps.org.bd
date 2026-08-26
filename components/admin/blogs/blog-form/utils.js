export function getId(value) {
  if (!value) return "";

  if (typeof value === "object") {
    return value._id?.toString() || "";
  }

  return value.toString();
}
