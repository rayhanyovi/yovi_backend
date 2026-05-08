const TIME_PATTERN = /^([01]\d|2[0-3]):(00|30)$/;
const CONSUMPTION_TYPES = ["MAKAN_SIANG", "SNACK_SIANG", "SNACK_SORE"];

function isValidTimeSlot(value) {
  return TIME_PATTERN.test(value);
}

function isValidDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

function normalizeTime(value) {
  return typeof value === "string" ? value.slice(0, 5) : value;
}

function normalizeDate(value) {
  if (value instanceof Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return typeof value === "string" ? value.slice(0, 10) : value;
}

module.exports = {
  CONSUMPTION_TYPES,
  isValidDate,
  isValidTimeSlot,
  normalizeDate,
  normalizeTime,
};
