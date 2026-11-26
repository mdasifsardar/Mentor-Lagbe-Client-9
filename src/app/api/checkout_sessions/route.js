import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(req) {
  //
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });

  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || req.nextUrl.origin;

    const contentType = req.headers.get("content-type") || "";
    const plan = contentType.includes("application/json")
      ? (await req.json()).plan
      : (await req.formData()).get("plan");

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price:
            plan === "student_pro"
              ? process.env.STRIPE_STUDENT_PRICE_ID
              : process.env.STRIPE_TUTOR_PRICE_ID,
          quantity: 1,
        },
      ],
      customer_email: userSession?.user?.email,
      mode: "payment",
      metadata: {
        userId: userSession?.user?.id,
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,

      integration_identifier: "Mentor_Lagbe_Web_001",
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
