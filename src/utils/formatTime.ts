export function formatTime(time: string) {
  const date = new Date(time);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
