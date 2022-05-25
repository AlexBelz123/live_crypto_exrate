const defaultDate = new Date(Date.now()).toISOString().toString();

export function getPrevDate(currentDate = defaultDate, monthsToRemove = 1) {
  const d = new Date(currentDate);
  d.setMonth(d.getMonth() - monthsToRemove);
  return {
    now: currentDate,
    past: d.toString(),
  };
}
