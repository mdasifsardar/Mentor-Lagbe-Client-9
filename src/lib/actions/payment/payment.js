const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const checkoutVerify = async (sessionId) => {
  const res = await fetch(`${BASE_URL}/payments/checkout-verify`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId }),
  });

  return res.json();
};
