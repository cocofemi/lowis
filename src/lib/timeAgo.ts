export function timeAgo(date: string | Date): string {
  if (!date) return "";

  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: [number, string][] = [
    [60, "second"],
    [60 * 60, "minute"],
    [60 * 60 * 24, "hour"],
    [60 * 60 * 24 * 7, "day"],
    [60 * 60 * 24 * 30, "week"],
    [60 * 60 * 24 * 365, "month"],
  ];

  const years = Math.floor(seconds / (60 * 60 * 24 * 365));
  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;

  for (let i = intervals.length - 1; i >= 0; i--) {
    const secondsPer = intervals[i][0];
    const label = intervals[i][1];
    const count = Math.floor(seconds / secondsPer);

    if (count >= 1) {
      return `${count} ${label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
