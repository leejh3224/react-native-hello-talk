const getYearMonthAndDay = (timestamp: number) => {
  return new Intl.DateTimeFormat("ko-kr", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).format(timestamp);
};

export default getYearMonthAndDay;
