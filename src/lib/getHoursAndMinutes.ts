const getHoursAndMinutes = (timestamp: number) => {
  /**
   *  https://stackoverflow.com/questions/25611356/display-posts-in-descending-posted-order
   *  Unfortunately, Firebase doesn't support DESC query.
   *  Workaround for this can be using negative timestamp value.
   */
  let positiveTimestamp = timestamp;

  if (timestamp < 0) {
    positiveTimestamp = timestamp * -1;
  }

  return new Intl.DateTimeFormat("ko-kr", {
    hour: "numeric",
    minute: "numeric"
  }).format(positiveTimestamp);
};

export default getHoursAndMinutes;
