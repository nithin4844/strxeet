export interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

export type CheckoutField = keyof CheckoutFormValues;
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;
const PINCODE_PATTERN = /^\d{6}$/;

export function sanitizeCheckoutInput(name: string, value: string) {
  if (name === "phone" || name === "pincode") {
    return value.replace(/\D/g, "");
  }

  return value;
}

export function validateCheckoutForm(values: CheckoutFormValues) {
  const errors: CheckoutErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Enter a valid 10-digit mobile number";
  }

  if (!values.address.trim()) {
    errors.address = "Street address is required";
  }

  if (!values.city.trim()) {
    errors.city = "City is required";
  }

  if (!values.state.trim()) {
    errors.state = "State is required";
  }

  if (!PINCODE_PATTERN.test(values.pincode.trim())) {
    errors.pincode = "Enter a valid 6-digit pincode";
  }

  return errors;
}
