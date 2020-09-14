import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../styles/css/loanForm.css";

const INCREMENT_AMOUNT = "INCREMENT_AMOUNT";
const DECREMENT_AMOUNT = "DECREMENT_AMOUNT";
const INCREMENT_YEAR = "INCREMENT_YEAR";
const DECREMENT_YEAR = "DECREMENT_YEAR";

function calculateMonthlyCost(
 loanAmount,
 repaymentYears,
 interest,
 setMonthlyCost
) {
 let months = repaymentYears * 12;
 let newAmount = Math.round(
  (loanAmount * (interest / 100)) /
   12 /
   (1 - Math.pow(1 + interest / 100 / 12, months * -1))
 );
 setMonthlyCost(newAmount);

 return newAmount;
}

export default function LoanForm({ data }) {
 const [monthlyCost, setMonthlyCost] = useState(0);
 const [loanAmount, setAmount] = useState(0);
 const [repaymentYears, setYears] = useState(0);
 const [editAmount, setEditAmount] = useState(false);
 const [editYear, setEditYear] = useState(false);
 const { register, handleSubmit } = useForm({});

 useEffect(() => {
  setAmount(data.defaultAmount);
  setYears(data.defaultYears);
  calculateMonthlyCost(
   data.defaultAmount,
   data.defaultYears,
   data.interest,
   setMonthlyCost
  );
 }, [data.defaultAmount, data.defaultYears, data.interest]);

 useEffect(() => {
  if (loanAmount < 5000 || loanAmount > 600000) return;
  if (repaymentYears < 1 || repaymentYears > 15) return;
  console.log(typeof repaymentYears);
  calculateMonthlyCost(
   loanAmount,
   repaymentYears,
   data.interest,
   setMonthlyCost
  );
 }, [loanAmount, repaymentYears, data.interest]);

 const toggleMaskerAmount = (e) => {
  setEditAmount((editAmount) => !editAmount);
  if (loanAmount < 5000) setAmount(5000);
  if (loanAmount > 600000) setAmount(600000);
 };
 const toggleMaskerYear = (e) => {
  setEditYear((editYear) => !editYear);
  if (repaymentYears < 1) setYears(1);
  if (repaymentYears > 15) setYears(15);
 };

 const onSubmit = (_data, e) => {
  e.preventDefault();
 };

 const numberFormatter = (number) => {
  const formatter = new Intl.NumberFormat("sv-SE", {
   maximumSignificantDigits: 6,
  });
  return formatter.format(number);
 };

 const handleButtons = (action) => {
  switch (action) {
   case INCREMENT_AMOUNT:
    return loanAmount + 5000 > 600000
     ? undefined
     : setAmount(loanAmount + 5000);
   case DECREMENT_AMOUNT:
    return loanAmount - 5000 < 5000 ? undefined : setAmount(loanAmount - 5000);
   case INCREMENT_YEAR:
    return repaymentYears + 1 > 15 ? undefined : setYears(repaymentYears + 1);
   case DECREMENT_YEAR:
    return repaymentYears - 1 < 1 ? undefined : setYears(repaymentYears - 1);
   default:
    return;
  }
 };
 return (
  <div className="calculatorContainer">
   <form className="loanform" onSubmit={handleSubmit(onSubmit)}>
    <div className="loanform-monthlycost-display">
     <label>{data.monthlyCostLabel}</label>
     <p>
      {numberFormatter(monthlyCost)} {data.loanAmountSuffix}
     </p>
    </div>
    <div className="loanform-input-container">
     <label className="loanform-input-label">{data.loanAmountLabel}</label>
     <div className="loanform-input">
      <button
       onClick={() => handleButtons(DECREMENT_AMOUNT)}
       className="loanform-button"
       type="button"
      >
       -
      </button>
      <input
       className="loanform-inputfield"
       type="number"
       value={loanAmount}
       name="loanAmountInput"
       ref={register({ required: true, max: 600000, min: 5000 })}
       onChange={(e) => {
        const value = parseInt(e.target.value);
        !value ? setAmount(1) : setAmount(value);
       }}
       onBlur={toggleMaskerAmount}
       onFocus={toggleMaskerAmount}
      />
      <button
       onClick={() => handleButtons(INCREMENT_AMOUNT)}
       className="loanform-button"
       type="button"
      >
       +
      </button>
      {editAmount ? null : (
       <p className="masker">
        {numberFormatter(loanAmount)} {data.loanAmountSuffix}
       </p>
      )}
     </div>
    </div>
    <div className="loanform-input-container">
     <label className="loanform-input-label">{data.repaymentYearsLabel}</label>
     <div className="loanform-input">
      <button
       onClick={() => handleButtons(DECREMENT_YEAR)}
       className="loanform-button"
       type="button"
      >
       -
      </button>
      <input
       className="loanform-inputfield"
       type="number"
       value={repaymentYears}
       name="repaymentYearsInput"
       ref={register({ required: true, max: 15, min: 1 })}
       onChange={(e) => {
        const value = parseInt(e.target.value);
        !value ? setYears(1) : setYears(value);
       }}
       onBlur={toggleMaskerYear}
       onFocus={toggleMaskerYear}
      />
      <button
       onClick={() => handleButtons(INCREMENT_YEAR)}
       className="loanform-button"
       type="button"
      >
       +
      </button>
      {editYear ? null : (
       <p className="masker">
        {repaymentYears} {data.repaymentYearsSuffix}
       </p>
      )}
     </div>
    </div>
    <button className="calculator-apply-button" type="submit">
     {data.ctaLabel}
    </button>
   </form>
  </div>
 );
}
