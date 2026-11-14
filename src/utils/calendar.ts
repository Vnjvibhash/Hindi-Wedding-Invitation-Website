/**
 * Calendar utility to create .ics files and Google Calendar links for events.
 */

export interface WeddingEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO string with timezone, e.g. "2026-11-20T17:00:00+05:30"
  endDate: string;   // ISO string with timezone
}

function formatDateToICS(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function downloadICS(event: WeddingEvent): void {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//UdayJyotiWedding//Hindi Invitation//HI",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}-${Date.now()}@udayjyotiwedding.in`,
    `DTSTAMP:${formatDateToICS(new Date().toISOString())}`,
    `DTSTART:${formatDateToICS(event.startDate)}`,
    `DTEND:${formatDateToICS(event.endDate)}`,
    `SUMMARY:${event.title} - उदय संग ज्योती`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.setAttribute("download", `${event.id}-uday-jyoti.ics`);
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
}

export function getGoogleCalendarLink(event: WeddingEvent): string {
  const start = formatDateToICS(event.startDate);
  const end = formatDateToICS(event.endDate);
  const title = encodeURIComponent(`${event.title} - उदय संग ज्योती`);
  const details = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.location);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}
