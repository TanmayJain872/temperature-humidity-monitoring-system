/* jshint esversion: 11 */

// import logo from './logo.svg';
import './App.css';
import MostRecentDataDisplayer from "./components/MostRecentDataDisplayer";
import TimePeriodSelector from "./components/TimePeriodSelector";
import DataChartDisplayer from "./components/DataChartDisplayer";

function App() {
  return (
    <div className="App">
      <MostRecentDataDisplayer />
      <br />
      {/* <br /> */}
      <TimePeriodSelector />
      <br />
      {/* <br /> */}
      <DataChartDisplayer />
    </div>
  );
}

export default App;
