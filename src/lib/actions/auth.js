import { authClient } from "@/lib/auth-client";

// Get JWT token
export const getAuthToken = async () => {
  const { data } = await authClient.$fetch("/token");

  return data?.token || null;
};

// Fetch protected API with JWT
export const authFetch = async (url, options = {}) => {
  const token = await getAuthToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// Upload image to ImgBB
export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result?.error?.message || "Image upload failed!");
  }

  return result.data.url;
};

// Update profile
export const updateProfile = async (profile) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await authFetch(`${baseUrl}/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  await authClient.getSession();

  return data.user;
};
