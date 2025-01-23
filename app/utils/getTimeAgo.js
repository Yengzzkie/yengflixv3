export const getTimeAgo = (timestamp) => {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  if (seconds < 60) return `${seconds}s`; // Seconds
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`; // Minutes
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`; // Hours
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`; // Days
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w`; // Weeks
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`; // Months
  const years = Math.floor(days / 365);
  return `${years}y`; // Years
};
