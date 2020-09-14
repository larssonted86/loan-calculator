export const getContent = () => {
 return new Promise((resolve, reject) => {
  const data = {
   monthlyCostLabel: "Månadskostnad",
   monthlyCostSuffix: "kr",
   loanAmountLabel: "Lånebelopp",
   loanAmountSuffix: "kr",
   repaymentYearsLabel: "Återbetalningstid",
   repaymentYearsSuffix: "år",
   ctaLabel: "Ansök nu",
   interest: 5.77,
   defaultAmount: 250000,
   defaultYears: 14,
  };
  setTimeout(() => resolve(data), 1000);
 });
};
