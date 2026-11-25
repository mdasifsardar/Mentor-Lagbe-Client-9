import Payment from "@/components/payment/Payment";

const PaymentPage = async ({ searchParams }) => {
  //
  const { canceled } = await searchParams;

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready.",
    );
  }

  return <Payment />;
};

export default PaymentPage;
