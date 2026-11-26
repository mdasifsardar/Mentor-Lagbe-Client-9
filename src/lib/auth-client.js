import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [jwtClient()],
});

// BetterAuth signs the JWT on the server. The browser only asks for it.
export const getAuthToken = async () => {
  if (typeof window === "undefined") return null;

  const { data, error } = await authClient.$fetch("/token");

  if (error || !data?.token) return null;
  return data.token;
};

// Send protected requests with a JWT. On 401, refresh once and retry.
export const authFetch = async (url, options = {}) => {
  const send = (token) =>
    fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

  let res = await send(await getAuthToken());

  if (res.status === 401) {
    const freshToken = await getAuthToken();

    if (freshToken) {
      res = await send(freshToken);
    }
  }

  return res;
};

// Upload one image to ImgBB and return its public URL.
export const uploadImage = async (file) => {
  if (!file || typeof window === "undefined") return null;

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

// Update the logged-in user's own profile.
export const updateProfile = async (profile) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const res = await authFetch(`${baseUrl}/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  await authClient.getSession();
  return data.user;
};
