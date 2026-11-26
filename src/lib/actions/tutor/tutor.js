import { authFetch } from "@/lib/auth-client";

// Base API URL fallback set to local Express server on port 5000
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// POST /add-tuition -> Create a new tuition post
export const postTuition = async (postTuitionData) => {
  const res = await authFetch(`${BASE_URL}/add-tuition`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postTuitionData),
  });
  return res.json();
};

// GET /tuitions (with optional query params) -> Fetch tuitions list
export const getTuitions = async (query = "") => {
  const res = await fetch(`${BASE_URL}/tuitions${query ? `?${query}` : ""}`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch tuitions");
  }

  return data;
};

// GET /tuition/:TutorEmail -> Fetch tuitions posted by a specific tutor email
export const getTuitionByTutorEmail = async (TutorEmail) => {
  const res = await fetch(`${BASE_URL}/tuition/${TutorEmail}`, {
    cache: "no-store",
  });
  return res.json();
};

// GET /applications/tutor/:tutorEmail -> Fetch applications received by a tutor
export const getApplicationsForTutor = async (tutorEmail) => {
  try {
    const res = await fetch(
      `${BASE_URL}/applications/tutor/${encodeURIComponent(tutorEmail)}`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch tutor applications");
    }

    return data;
  } catch (error) {
    console.error("Get tutor applications error:", error);
    throw error;
  }
};

// PATCH /tuition/:id -> Update active status (isActive) of a tuition
export const updatePostIsActive = async (id, isActive) => {
  const res = await authFetch(`${BASE_URL}/tuition/${id}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isActive,
    }),
  });

  return res.json();
};

// PATCH /update-tuition/:id -> Update tuition details by ID
export const updateTutionData = async ({ id, ...updateTuition }) => {
  const res = await authFetch(`${BASE_URL}/update-tuition/${id}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateTuition),
  });

  return res.json();
};

// DELETE /delete-tuition/:id -> Delete a tuition post by ID
export const deleteTuitionData = async (id) => {
  const res = await authFetch(`${BASE_URL}/delete-tuition/${id}`, {
    method: "DELETE",
    cache: "no-store",
    headers: {
    },
  });

  return res.json();
};

// GET /tuition/:id -> Fetch single tuition details by ID
export const getTuitionById = async (id) => {
  const res = await fetch(`${BASE_URL}/tuition/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch tuition");
  }

  return data.tuition;
};

// PATCH /applications/:id -> Update application status by ID
export const updateApplicationStatus = async (id, status) => {
  const res = await authFetch(`${BASE_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const text = await res.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      `Server returned a non-JSON response (status ${res.status}). Check NEXT_PUBLIC_API_URL and that the /applications/:id route is reachable.`,
    );
  }

  if (!res.ok) {
    throw new Error(data.message || "Failed to update application");
  }

  return data;
};
