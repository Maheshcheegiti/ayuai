// utils/barcodeHelper.js
export const formatToGTIN13 = (rawBarcode) => {
  let digitsOnly = rawBarcode.replace(/\D/g, ""); // Remove non-numeric
  if (digitsOnly.length < 13) {
    digitsOnly = digitsOnly.padStart(13, "0"); // Pad to GTIN-13
  } else if (digitsOnly.length > 13) {
    digitsOnly = digitsOnly.slice(0, 13); // Truncate if too long
  }
  return digitsOnly;
};
