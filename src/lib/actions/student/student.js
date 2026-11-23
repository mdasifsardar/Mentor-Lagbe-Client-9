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

export const getStudentApplications = async (email) => {
  const res = await fetch(
    `${BASE_URL}/applications/student/${encodeURIComponent(email)}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch applications");
  }

  return data;
};

export const deleteApplication = async (applicationId) => {
  const res = await fetch(
    `${BASE_URL}/applications/${encodeURIComponent(applicationId)}`,
    {
      method: "DELETE",
      cache: "no-store",
    },
  );

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete application");
  }

  return data;
};

export const applyForTuition = async (applicationData) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicationData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to submit application");
  }

  return data;
};
