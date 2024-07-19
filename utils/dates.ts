export function formatEventDates(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const month = startDate.toLocaleString('default', { month: 'short' });
  const day = startDate.getDate();

  const formattedDate = startDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Los_Angeles'
  });

  const formattedTime = `${startDate.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    timeZone: 'America/Los_Angeles'
  })} - ${endDate.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    timeZone: 'America/Los_Angeles'
  })}`;

  return { month, day, formattedDate, formattedTime };
}