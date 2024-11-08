export function convertDateFormat(date: Date): string {
  let [dayStr, monthStr, yearStr] = date.toString().split("/");

  const day = Number(dayStr);
  const month = Number(monthStr);

  return `${day}.${month}.${yearStr}`;
}
