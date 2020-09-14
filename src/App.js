import React, { useEffect, useState } from "react";
import { getContent } from "./components/api";
import LoanForm from "./components/LoanForm";
import "./styles/css/App.css";

function App() {
 const [data, setData] = useState(null);

 useEffect(() => {
  const fetchData = async () => {
   setData(await getContent());
  };
  fetchData();
 }, []);
 return data ? (
  <div className="App">
   <LoanForm data={data} />
  </div>
 ) : (
  <div>Loading...</div>
 );
}

export default App;
