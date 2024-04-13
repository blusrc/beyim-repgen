export const getStudentPerformanceOverPeriod = async (
  start: Date,
  stop: Date
) => {
  const today = new Date();
  console.log("start ", start);
  console.log("stop ", stop);
  console.log("today ", today.toDateString());
  return {
    cats: ["math", "phys"],
    index: "date",
    chartdata: [
      {
        date: "Jan 22",
        math: 100,
        phys: 80,
      },
      {
        date: "Feb 22",
        math: 200,
        phys: 300,
      },
      {
        date: "Feb 22",
        math: 500,
        phys: 400,
      },
    ],
  };
};
