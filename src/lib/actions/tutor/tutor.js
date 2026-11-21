const BASE_URL = process.env.NEXT_PUBLIC_API_UR || "http://localhost:5000";

export const postTuition = async (postTuitionData) => {
  const res = await fetch(`${BASE_URL}/add-tuition`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
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

export const getTuitionByTutorEmail = async (TutorEmail) => {
  const res = await fetch(`${BASE_URL}/tuition/${TutorEmail}`, {
    cache: "no-store",
  });
  return res.json();
};

export const updatePostIsActive = async (id, isActive) => {
  const res = await fetch(`${BASE_URL}/tuition/${id}`, {
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

export const updateTutionData = async ({ id, ...updateTuition }) => {
  const res = await fetch(`${BASE_URL}/update-tuition/${id}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateTuition),
  });

  return res.json();
};

export const deleteTuitionData = async (id) => {
  const res = await fetch(`${BASE_URL}/delete-tuition/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  return res.json();
};
