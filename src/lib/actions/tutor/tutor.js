const BASE_URL = process.env.NEXT_PUBLIC_API_UR || "http://localhost:5000";

export const postTution = async (postTutionData) => {
  const res = await fetch(`${BASE_URL}/add-tution`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(postTutionData),
  });
  return res.json();
};
