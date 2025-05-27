const TypographyUtils = {
  capitalize: (str: string) => {
    if (!str || str.length === 0) return null;
    return str
      .split(" ") // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
      .join(" "); // Join the words back into a single string;
  },
  formatRupiah: (value: number, fractionDigit?: number) => {
    return `Rp ${value.toLocaleString("id-ID", {
      minimumFractionDigits: fractionDigit ?? 0,
      maximumFractionDigits: fractionDigit ?? 2,
    })}`;
  },
  formatCurrency: (value: number, fractionDigit?: number) => {
    return `${value.toLocaleString("id-ID", {
      minimumFractionDigits: fractionDigit ?? 0,
      maximumFractionDigits: fractionDigit ?? 2,
    })}`;
  },
  formatPhoneNumber: (str?: string) => {
    if (!str) return "";
    return str.startsWith("0") ? "62" + str.slice(1) : str;
  },
  formatPhoneNumberWithZero: (str?: string) => {
    if (!str) return "";
    return str.startsWith("62") ? "0" + str.slice(2) : str;
  },
} as const;

export default TypographyUtils;
