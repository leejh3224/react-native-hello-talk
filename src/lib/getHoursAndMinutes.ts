const getHoursAndMinutes = (timestamp: number) => {
  return new Intl.DateTimeFormat("ko-kr", {
    hour: "numeric",
    minute: "numeric"
  }).format(timestamp);
};

export default getHoursAndMinutes;
