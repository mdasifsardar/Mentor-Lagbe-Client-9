const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getStudentDashboard = async (email) => {
  const res = await fetch(
    `${BASE_URL}/student-dashboard/${encodeURIComponent(email)}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch student dashboard");
  }

  return data;
};
