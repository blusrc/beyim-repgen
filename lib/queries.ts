export const getStudentPerformance = async () => {
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
