function pad(value) {
  return String(value).padStart(2, '0');
}

export function formatDate(dateText) {
  if (!dateText) {
    return '--';
  }
  const normalized = dateText.replace(/-/g, '/');
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    return dateText;
  }
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatShortDate(dateText) {
  if (!dateText) {
    return '--';
  }
  const normalized = dateText.replace(/-/g, '/');
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    return dateText;
  }
  return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
}

export function formatDateTime(dateText) {
  if (!dateText) {
    return '--';
  }
  const normalized = dateText.replace(/-/g, '/');
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    return dateText;
  }
  return `${formatDate(dateText)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
