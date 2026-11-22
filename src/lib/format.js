const LEVEL_LABELS = {
  ssc: "SSC",
  hsc: "HSC",
  admission: "Admission",
};

export const formatClassLevel = (value = "") => {
  if (!value) return "Any Class";

  if (value.startsWith("class-")) {
    return `Class ${value.replace("class-", "")}`;
  }

  return LEVEL_LABELS[value.toLowerCase()] || value;
};

export const formatDate = (value) => {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatCurrency = (value, currency = "৳") =>
  `${currency}${Number(value || 0).toLocaleString("en-BD")}`;
