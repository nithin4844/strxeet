"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, CreditCard, Smartphone, Truck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import {
  COUPONS,
  PAYMENT_METHODS,
  SHIPPING_OPTIONS,
  formatPrice,
  generateOrderNumber,
  getDiscountAmount,
  getShippingCost,
} from "@/lib/commerce";
import {
  CheckoutErrors,
  CheckoutFormValues,
  sanitizeCheckoutInput,
  validateCheckoutForm,
} from "@/lib/validation";

type Step = "info" | "shipping" | "payment" | "confirmation";

interface PaymentState {
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  upiId: string;
}

interface PaymentErrors {
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  upiId?: string;
}

interface ConfirmationState {
  orderNumber: string;
  paymentMethod: string;
  shippingMethod: string;
  total: number;
}

const DRAFT_STORAGE_KEY = "strxeet-checkout-draft";

const defaultForm: CheckoutFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

const defaultPaymentState: PaymentState = {
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
  upiId: "",
};

function sanitizePaymentInput(name: keyof PaymentState, value: string) {
  if (name === "cardNumber" || name === "cardCvv") {
    return value.replace(/\D/g, "");
  }

  return value;
}

function validatePaymentDetails(paymentMethodId: string, payment: PaymentState) {
  const errors: PaymentErrors = {};

  if (paymentMethodId === "card") {
    if (!payment.cardName.trim()) {
      errors.cardName = "Name on card is required";
    }

    if (payment.cardNumber.replace(/\s/g, "").length < 16) {
      errors.cardNumber = "Enter a valid 16-digit card number";
    }

    if (!/^\d{2}\/\d{2}$/.test(payment.cardExpiry.trim())) {
      errors.cardExpiry = "Use MM/YY format";
    }

    if (payment.cardCvv.trim().length < 3) {
      errors.cardCvv = "Enter a valid CVV";
    }
  }

  if (paymentMethodId === "upi" && !/^[\w.+-]+@[\w.-]+$/.test(payment.upiId.trim())) {
    errors.upiId = "Enter a valid UPI ID";
  }

  return errors;
}

function CheckoutContent() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const searchParams = useSearchParams();

  const couponFromQuery = searchParams.get("coupon")?.trim().toUpperCase();
  const couponCode = couponFromQuery && couponFromQuery in COUPONS ? couponFromQuery : "";

  const [step, setStep] = useState<Step>("info");
  const [form, setForm] = useState<CheckoutFormValues>(defaultForm);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [payment, setPayment] = useState<PaymentState>(defaultPaymentState);
  const [paymentErrors, setPaymentErrors] = useState<PaymentErrors>({});
  const [selectedShippingId, setSelectedShippingId] = useState<string>(SHIPPING_OPTIONS[0].id);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>(PAYMENT_METHODS[0].id);
  const [confirmation, setConfirmation] = useState<ConfirmationState | null>(null);

  useEffect(() => {
    const savedDraft = window.localStorage.getItem(DRAFT_STORAGE_KEY);

    if (!savedDraft) {
      return;
    }

    try {
      const parsed = JSON.parse(savedDraft) as {
        form?: CheckoutFormValues;
        payment?: PaymentState;
        shippingId?: string;
        paymentId?: string;
      };

      if (parsed.form) {
        setForm({ ...defaultForm, ...parsed.form });
      }

      if (parsed.payment) {
        setPayment({ ...defaultPaymentState, ...parsed.payment });
      }

      if (parsed.shippingId && SHIPPING_OPTIONS.some((option) => option.id === parsed.shippingId)) {
        setSelectedShippingId(parsed.shippingId);
      }

      if (parsed.paymentId && PAYMENT_METHODS.some((method) => method.id === parsed.paymentId)) {
        setSelectedPaymentId(parsed.paymentId);
      }
    } catch {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({
        form,
        payment,
        shippingId: selectedShippingId,
        paymentId: selectedPaymentId,
      })
    );
  }, [form, payment, selectedPaymentId, selectedShippingId]);

  const subtotal = getTotalPrice();
  const discount = getDiscountAmount(subtotal, couponCode || undefined);
  const shippingCost = getShippingCost(subtotal, selectedShippingId);
  const total = subtotal - discount + shippingCost;
  const selectedShipping = SHIPPING_OPTIONS.find((option) => option.id === selectedShippingId) || SHIPPING_OPTIONS[0];
  const selectedPayment = PAYMENT_METHODS.find((method) => method.id === selectedPaymentId) || PAYMENT_METHODS[0];

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const nextValue = sanitizeCheckoutInput(name, value);

    setForm((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nextValue = sanitizePaymentInput(name as keyof PaymentState, value);

    setPayment((prev) => ({ ...prev, [name]: nextValue }));
    setPaymentErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const goToShipping = () => {
    const nextErrors = validateCheckoutForm(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error("Please fix the highlighted checkout details");
      return;
    }

    setStep("shipping");
  };

  const goToPayment = () => {
    if (!selectedShippingId) {
      toast.error("Select a shipping method");
      return;
    }

    setStep("payment");
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const nextFormErrors = validateCheckoutForm(form);

    if (Object.keys(nextFormErrors).length > 0) {
      setErrors(nextFormErrors);
      setStep("info");
      toast.error("Please complete your contact and shipping details");
      return;
    }

    const nextPaymentErrors = validatePaymentDetails(selectedPaymentId, payment);

    if (Object.keys(nextPaymentErrors).length > 0) {
      setPaymentErrors(nextPaymentErrors);
      toast.error("Please complete your payment details");
      return;
    }

    setConfirmation({
      orderNumber: generateOrderNumber(),
      paymentMethod: selectedPayment.label,
      shippingMethod: selectedShipping.label,
      total,
    });
    clearCart();
    window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    setStep("confirmation");
    toast.success("Order placed in demo mode");
  };

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-4xl tracking-widest mb-4">No Items in Cart</h1>
        <p className="text-brand-gray-500 mb-8">
          Add products to your cart before moving to shipping and checkout.
        </p>
        <Link href="/shop" className="btn-primary">
          Shop Now
        </Link>
      </div>
    );
  }

  if (step === "confirmation" && confirmation) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="bg-brand-gray-50 border border-brand-gray-200 p-8 sm:p-10 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-gray-400 mb-3">
            Demo Confirmation
          </p>
          <h1 className="font-display text-4xl sm:text-5xl tracking-widest mb-4">
            {confirmation.orderNumber}
          </h1>
          <p className="text-brand-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
            Your order flow completed successfully. This storefront still uses a dummy payment system, so no
            real charge was made.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 text-left mb-8">
            <div className="border border-brand-gray-200 bg-white p-4">
              <p className="text-xs uppercase tracking-widest text-brand-gray-400 mb-2">Shipping</p>
              <p className="text-sm font-medium">{confirmation.shippingMethod}</p>
            </div>
            <div className="border border-brand-gray-200 bg-white p-4">
              <p className="text-xs uppercase tracking-widest text-brand-gray-400 mb-2">Payment</p>
              <p className="text-sm font-medium">{confirmation.paymentMethod}</p>
            </div>
            <div className="border border-brand-gray-200 bg-white p-4">
              <p className="text-xs uppercase tracking-widest text-brand-gray-400 mb-2">Total</p>
              <p className="text-sm font-medium">{formatPrice(confirmation.total)}</p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-0 sm:flex sm:justify-center sm:gap-3">
            <Link href="/" className="btn-primary inline-flex items-center justify-center w-full sm:w-auto">
              Back to Home
            </Link>
            <Link href="/shop" className="btn-secondary w-full sm:w-auto">
              Continue Shopping
            </Link>
          </div>

          <p className="text-xs text-brand-gray-400 mt-6">
            Replace this demo payment step with a real gateway before taking live orders.
          </p>
        </div>
      </div>
    );
  }

  const steps: { id: Step; label: string }[] = [
    { id: "info", label: "Contact & Address" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ];

  const stepIndex = steps.findIndex((entry) => entry.id === step);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cart" className="flex items-center gap-2 text-sm text-brand-gray-500 hover:text-brand-black transition-colors">
          <ArrowLeft size={16} /> Back to Cart
        </Link>
        <span className="font-display text-3xl tracking-widest ml-auto">STRXEET</span>
      </div>

      <div className="flex items-center gap-4 mb-10 overflow-x-auto hide-scrollbar">
        {steps.map((entry, i) => (
          <div key={entry.id} className="flex items-center gap-2 shrink-0">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < stepIndex
                  ? "bg-green-500 text-white"
                  : i === stepIndex
                    ? "bg-brand-black text-white"
                    : "bg-brand-gray-200 text-brand-gray-500"
              }`}
            >
              {i < stepIndex ? <Check size={12} /> : i + 1}
            </div>
            <span
              className={`text-sm uppercase tracking-wider font-medium ${
                i === stepIndex ? "text-brand-black" : "text-brand-gray-400"
              }`}
            >
              {entry.label}
            </span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-brand-gray-200 ml-2" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {step === "info" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-semibold uppercase tracking-widest text-sm mb-4">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "firstName", placeholder: "First Name", type: "text" },
                    { name: "lastName", placeholder: "Last Name", type: "text" },
                    { name: "email", placeholder: "Email Address", type: "email" },
                    { name: "phone", placeholder: "10-digit Mobile Number", type: "tel" },
                  ].map((field) => (
                    <div key={field.name}>
                      <input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.name as keyof CheckoutFormValues]}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-3 border text-sm focus:outline-none transition-colors ${
                          errors[field.name as keyof CheckoutErrors]
                            ? "border-red-400 focus:border-red-500"
                            : "border-brand-gray-200 focus:border-brand-black"
                        }`}
                      />
                      {errors[field.name as keyof CheckoutErrors] && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors[field.name as keyof CheckoutErrors]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-semibold uppercase tracking-widest text-sm mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <input
                      name="address"
                      placeholder="Street Address"
                      value={form.address}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-3 border text-sm focus:outline-none transition-colors ${
                        errors.address ? "border-red-400 focus:border-red-500" : "border-brand-gray-200 focus:border-brand-black"
                      }`}
                    />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>
                  <input
                    name="apartment"
                    placeholder="Apartment, suite, landmark (optional)"
                    value={form.apartment}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-brand-gray-200 text-sm focus:outline-none focus:border-brand-black transition-colors"
                  />
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { name: "city", placeholder: "City" },
                      { name: "state", placeholder: "State" },
                      { name: "pincode", placeholder: "Pincode" },
                    ].map((field) => (
                      <div key={field.name}>
                        <input
                          name={field.name}
                          placeholder={field.placeholder}
                          value={form[field.name as keyof CheckoutFormValues]}
                          onChange={handleFormChange}
                          maxLength={field.name === "pincode" ? 6 : undefined}
                          className={`w-full px-4 py-3 border text-sm focus:outline-none transition-colors ${
                            errors[field.name as keyof CheckoutErrors]
                              ? "border-red-400 focus:border-red-500"
                              : "border-brand-gray-200 focus:border-brand-black"
                          }`}
                        />
                        {errors[field.name as keyof CheckoutErrors] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[field.name as keyof CheckoutErrors]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  <textarea
                    name="notes"
                    placeholder="Delivery notes (optional)"
                    value={form.notes}
                    onChange={handleFormChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-brand-gray-200 text-sm focus:outline-none focus:border-brand-black transition-colors resize-none"
                  />
                </div>
              </div>

              <button onClick={goToShipping} className="btn-primary w-full mt-4">
                Continue to Shipping
              </button>
            </div>
          )}

          {step === "shipping" && (
            <div className="space-y-6">
              <h2 className="font-semibold uppercase tracking-widest text-sm">Shipping Method</h2>
              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((option) => {
                  const optionCost = getShippingCost(subtotal, option.id);

                  return (
                    <label
                      key={option.id}
                      className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${
                        selectedShippingId === option.id
                          ? "border-brand-black"
                          : "border-brand-gray-200 hover:border-brand-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={selectedShippingId === option.id}
                        onChange={() => setSelectedShippingId(option.id)}
                        className="accent-brand-black"
                      />
                      <Truck size={18} className="text-brand-gray-400 shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{option.label}</p>
                        <p className="text-brand-gray-400 text-xs">{option.time}</p>
                        <p className="text-brand-gray-500 text-xs mt-1">{option.description}</p>
                      </div>
                      <div className="text-sm font-semibold">
                        {optionCost === 0 ? <span className="text-green-600">FREE</span> : formatPrice(optionCost)}
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep("info")} className="btn-secondary flex-1">
                  Back
                </button>
                <button onClick={goToPayment} className="btn-primary flex-1">
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-6">
              <h2 className="font-semibold uppercase tracking-widest text-sm">Payment Method</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-start gap-3 border p-4 cursor-pointer transition-colors ${
                      selectedPaymentId === method.id
                        ? "border-brand-black bg-brand-gray-50"
                        : "border-brand-gray-200 hover:border-brand-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedPaymentId === method.id}
                      onChange={() => {
                        setSelectedPaymentId(method.id);
                        setPaymentErrors({});
                      }}
                      className="accent-brand-black mt-1"
                    />
                    <div>
                      <p className="font-medium text-sm flex items-center gap-2">
                        {method.id === "upi" ? <Smartphone size={14} className="text-brand-gray-400" /> : <CreditCard size={14} className="text-brand-gray-400" />}
                        {method.label}
                      </p>
                      <p className="text-xs text-brand-gray-500 mt-1">{method.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="bg-brand-accent/20 border border-brand-accent p-4 text-sm text-brand-black">
                This step is still a dummy payment flow for storefront QA. The form validates customer input,
                but no real payment is processed.
              </div>

              {selectedPaymentId === "card" && (
                <div className="space-y-4">
                  <div>
                    <input
                      name="cardName"
                      placeholder="Name on Card"
                      value={payment.cardName}
                      onChange={handlePaymentChange}
                      className={`w-full px-4 py-3 border text-sm focus:outline-none transition-colors ${
                        paymentErrors.cardName ? "border-red-400 focus:border-red-500" : "border-brand-gray-200 focus:border-brand-black"
                      }`}
                    />
                    {paymentErrors.cardName && <p className="text-xs text-red-500 mt-1">{paymentErrors.cardName}</p>}
                  </div>
                  <div>
                    <input
                      name="cardNumber"
                      placeholder="Card Number"
                      value={payment.cardNumber}
                      onChange={handlePaymentChange}
                      maxLength={16}
                      className={`w-full px-4 py-3 border text-sm focus:outline-none transition-colors ${
                        paymentErrors.cardNumber ? "border-red-400 focus:border-red-500" : "border-brand-gray-200 focus:border-brand-black"
                      }`}
                    />
                    {paymentErrors.cardNumber && <p className="text-xs text-red-500 mt-1">{paymentErrors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={payment.cardExpiry}
                        onChange={handlePaymentChange}
                        maxLength={5}
                        className={`w-full px-4 py-3 border text-sm focus:outline-none transition-colors ${
                          paymentErrors.cardExpiry ? "border-red-400 focus:border-red-500" : "border-brand-gray-200 focus:border-brand-black"
                        }`}
                      />
                      {paymentErrors.cardExpiry && <p className="text-xs text-red-500 mt-1">{paymentErrors.cardExpiry}</p>}
                    </div>
                    <div>
                      <input
                        name="cardCvv"
                        placeholder="CVV"
                        type="password"
                        value={payment.cardCvv}
                        onChange={handlePaymentChange}
                        maxLength={4}
                        className={`w-full px-4 py-3 border text-sm focus:outline-none transition-colors ${
                          paymentErrors.cardCvv ? "border-red-400 focus:border-red-500" : "border-brand-gray-200 focus:border-brand-black"
                        }`}
                      />
                      {paymentErrors.cardCvv && <p className="text-xs text-red-500 mt-1">{paymentErrors.cardCvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {selectedPaymentId === "upi" && (
                <div>
                  <input
                    name="upiId"
                    placeholder="yourname@bank"
                    value={payment.upiId}
                    onChange={handlePaymentChange}
                    className={`w-full px-4 py-3 border text-sm focus:outline-none transition-colors ${
                      paymentErrors.upiId ? "border-red-400 focus:border-red-500" : "border-brand-gray-200 focus:border-brand-black"
                    }`}
                  />
                  {paymentErrors.upiId && <p className="text-xs text-red-500 mt-1">{paymentErrors.upiId}</p>}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep("shipping")} className="btn-secondary flex-1">
                  Back
                </button>
                <button onClick={handlePlaceOrder} className="btn-accent flex-1">
                  Place Order · {formatPrice(total)}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-brand-gray-50 border border-brand-gray-200 p-6 sticky top-24">
            <h2 className="font-semibold uppercase tracking-widest text-sm mb-5">Order Summary</h2>

            <div className="space-y-3 pb-4 border-b border-brand-gray-200 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color.name}`} className="flex gap-3">
                  <div className="relative w-12 h-16 bg-white border border-brand-gray-200 shrink-0 overflow-hidden">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="48px" />
                    <span className="absolute -top-1 -right-1 bg-brand-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-brand-gray-400">
                      {item.size} · {item.color.name}
                    </p>
                  </div>
                  <p className="text-sm font-semibold shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 pb-4 border-b border-brand-gray-200 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray-500">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({couponCode})</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray-500">Shipping</span>
                <span className={shippingCost === 0 ? "text-green-600" : ""}>
                  {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                </span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-2">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-brand-gray-400">
              The checkout experience is production-shaped, but the payment system is intentionally dummy for now.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
