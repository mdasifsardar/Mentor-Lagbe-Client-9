import { authFetch } from "@/lib/auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const request = async (path, options = {}) => {
  const res = await authFetch(`${BASE_URL}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const getAdminStats = () => request("/admin/stats");

export const getRevenueCount = () => request("/admin/revenue");

export const getReportedRevenue = async () => {
  const data = await getRevenueCount();
  return data.totalRevenue || 0;
};

export const getAdminUsers = () => request("/admin/users");

export const updateUserRole = (id, role) =>
  request(`/admin/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });

export const getAdminTuitions = () => request("/admin/tuitions");

export const updateTuitionApproval = (id, approvalStatus) =>
  request(`/admin/tuitions/${id}/approval`, {
    method: "PATCH",
    body: JSON.stringify({ approvalStatus }),
  });

export const getAdminTransactions = () => request("/admin/transactions");
