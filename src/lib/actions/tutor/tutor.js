const BASE_URL = process.env.NEXT_PUBLIC_API_UR || "http://localhost:5000";

export const postTuition = async (postTuitionData) => {
  const res = await fetch(`${BASE_URL}/add-tuition`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(postTuitionData),
  });
  return res.json();
};

export const getTuition = async () => {
  const res = await fetch(`${BASE_URL}/tuition`, {
    cache: "no-store",
  });
  return res.json();
};
