export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function validateContact(data: ContactFormData): string[] {
  const errors: string[] = [];
  if (!data.name || data.name.trim().length === 0) {
    errors.push("Name is required");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("Valid email is required");
  }
  if (!data.message || data.message.trim().length === 0) {
    errors.push("Message is required");
  }
  return errors;
}
