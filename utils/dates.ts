export function formatEventDates(start: string, end: string) {
  const options = { timeZone: 'America/Los_Angeles' };
  const startDate = new Date(start);
  const endDate = new Date(end);

  const pacificStartDate = new Date(startDate.toLocaleString('en-US', options));
  
  const month = pacificStartDate.toLocaleString('default', { month: 'short' });
  const day = pacificStartDate.getDate();

  const formattedDate = pacificStartDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = `${startDate.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    ...options
  })} - ${endDate.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    ...options
  })}`;

  return { month, day, formattedDate, formattedTime };
}