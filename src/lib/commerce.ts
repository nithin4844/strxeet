export const FREE_SHIPPING_THRESHOLD = 999;
export const STANDARD_SHIPPING_COST = 79;
export const EXPRESS_SHIPPING_COST = 199;

export const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Standard Delivery",
    time: "4-7 business days",
    price: STANDARD_SHIPPING_COST,
    freeOverThreshold: true,
    description: "Tracked delivery across India.",
  },
  {
    id: "express",
    label: "Express Delivery",
    time: "1-2 business days",
    price: EXPRESS_SHIPPING_COST,
    freeOverThreshold: false,
    description: "Priority fulfilment for urgent orders.",
  },
] as const;

export const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit or Debit Card",
    description: "Demo-only card checkout for storefront testing.",
  },
  {
    id: "upi",
    label: "UPI",
    description: "Demo-only UPI collection flow.",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when the order reaches you. Available for eligible pin codes.",
  },
] as const;

export const COUPONS = {
  STRXEET10: {
    code: "STRXEET10",
    type: "percentage" as const,
    value: 10,
    description: "10% off your order",
  },
};

export function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function getShippingCost(subtotal: number, shippingOptionId: string) {
  const option = SHIPPING_OPTIONS.find((item) => item.id === shippingOptionId) || SHIPPING_OPTIONS[0];

  if (option.freeOverThreshold && subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }

  return option.price;
}

export function getDiscountAmount(subtotal: number, couponCode?: string) {
  if (!couponCode) {
    return 0;
  }

  const coupon = COUPONS[couponCode.toUpperCase() as keyof typeof COUPONS];

  if (!coupon) {
    return 0;
  }

  if (coupon.type === "percentage") {
    return Math.round((subtotal * coupon.value) / 100);
  }

  return 0;
}

export function generateOrderNumber() {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 12);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `STX-${stamp}-${random}`;
}
