export function formatDate(createdAt) {
  if (!createdAt) return 'Date non disponible';

  let date;

  if (createdAt.seconds) {
    date = new Date(createdAt.seconds * 1000);
  } else if (createdAt instanceof Date) {
    date = createdAt;
  } else if (typeof createdAt === 'string') {
    date = new Date(createdAt);
  } else {
    return 'Date invalide';
  }

  if (isNaN(date.getTime())) {
    return 'Date invalide';
  }

  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}