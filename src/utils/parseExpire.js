/**
 * Mengubah format durasi seperti "10m", "1h", "30s", atau "2d" menjadi milidetik.
 * @param {string} duration - Durasi dalam format angka + unit (s/m/h/d).
 * @returns {number} Durasi dalam milidetik.
 * @throws {Error} Jika format tidak valid.
 */
export function parseExpireToMs(duration) {
  if (typeof duration !== "string") {
    throw new Error("Duration must be a string");
  }

  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) throw new Error("Invalid duration format");

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * multipliers[unit];
}
