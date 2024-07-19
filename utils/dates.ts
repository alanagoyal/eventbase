export function formatEventDates(startTimestampz: string, endTimestampz: string) {
    const startDate = new Date(startTimestampz);
    const endDate = new Date(endTimestampz);
  
    const month = startDate.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = startDate.getDate();
    const formattedDate = startDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = `${startDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })} - ${endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  
    return { month, day, formattedDate, formattedTime };
  }