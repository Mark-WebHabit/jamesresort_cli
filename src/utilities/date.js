export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export function getTourTimes(selectedDate, isDaytour, DAYTOUR, OVERNIGHT) {
  let tourType = "daytour";

  if (!isDaytour) {
    tourType = "overnight";
  }

  const startTime = new Date(selectedDate);
  const endTime = new Date(selectedDate);

  if (tourType === "daytour") {
    startTime.setHours(startTime.getHours() + DAYTOUR.startingDate);
    endTime.setHours(startTime.getHours() + 12); // Add 12 hours to startTime
  } else if (tourType === "overnight") {
    startTime.setHours(startTime.getHours() + OVERNIGHT.startingDate);
    endTime.setHours(startTime.getHours() + 12); // Add 12 hours to startTime
  }

  return { startTime, endTime };
}

export function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutesStr + " " + ampm;
  return strTime;
}
