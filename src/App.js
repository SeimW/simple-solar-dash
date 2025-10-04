import logo from './solar-panel.png';
import './App.css';
import { useState } from 'react';
import * as finModel from './FinancialModel.js';

function App() {
    //state and gen inputs given by the end user
    var userState = "null";
    var userGen = 0;

    //cost calculated through end user input
    var userCost = 0;

    //states help us use and update the state and roof size inputs as well as the
    //cost, cashflow, irr, pp, and table variables that input influences
    const [inputState, setInputState] = useState("null");
    const [roofSize, setRoofSize] = useState("null");
    const [upfrontCost, setUpfrontCost] = useState("null");
    const [cashFlowData, setCashFlowData] = useState("null");
    const [IRR, setIRR] = useState(0.0);
    const [PP, setPP] = useState(0);
    const [show, setShow] = useState(false);

    function createCashFlowTable(state, userGen){
        //this function is for the 2nd table
        //cashFlowSetup makes the initial 26 length array, but we will need to adjust the 0th row to
        //incorporate the itc credit, install cost, and revised cashflow
        const cashFlowSetup = () =>
            Array.from({length: 26}, (_, i) => ({
                year: i,
                elecrate: Math.round(finModel.STATE_RATE_MAP.get(state) * (finModel.ELEC_EXPENSE_RATE ** i) * 100) / 100 + '¢',
                elecrev: "$" + (Math.round(finModel.STATE_RATE_MAP.get(state) * (finModel.ELEC_EXPENSE_RATE ** i) * finModel.ASSUMED_GEN_KW_YR * 100) / 100).toLocaleString('en-US'),
                installcost: "",
                om: "$" + (finModel.OM_YEAR_KW_COST * finModel.ASSUMED_GEN_KW_YR).toLocaleString('en-US'),
                itc: "",
                cashflow: "$" + (Math.round((finModel.STATE_RATE_MAP.get(state) * (finModel.ELEC_EXPENSE_RATE ** i) * finModel.ASSUMED_GEN_KW_YR - finModel.OM_YEAR_KW_COST * finModel.ASSUMED_GEN_KW_YR) * 100) / 100).toLocaleString('en-US'),
            }));

        //cashFlowRows copies over the intial array so that it can revise row 0 to reflect the Year 0-exclusive
        //install cost and ITC tax credit
        const cashFlowRows = cashFlowSetup();

        cashFlowRows[0] = {
            year: 0,
            elecrate: finModel.STATE_RATE_MAP.get(state) + '¢',
            elecrev: "$" + 0,
            installcost: "$" + (userGen * finModel.KILO_CONV * finModel.INSTALL_RATE).toLocaleString('en-US'),
            om: "$" + 0,
            itc: "$" + (userGen * finModel.KILO_CONV * finModel.INSTALL_RATE * finModel.ITC_TAX_CREDIT_RATE).toLocaleString('en-US'),
            cashflow: "$" + (userGen * finModel.KILO_CONV * finModel.INSTALL_RATE * (finModel.ITC_TAX_CREDIT_RATE - 1)).toLocaleString('en-US'),
        };

        //this array parses the 2nd table to only get the numerical values of the cash flows so that
        //the IRR and and PP can be calculated
        let cashFlowArr = new Array(26);
        for(let i = 0; i < 26; i++){
            //console.log(cashFlowRows[i].cashflow);
            cashFlowArr[i] = parseFloat(cashFlowRows[i].cashflow.slice(1).replace(/,/g, ''));
            console.log(cashFlowArr[i]);
        }
        setIRR(finModel.findIRR(cashFlowArr, 26));

        setPP(finModel.findPaymentPeriod(cashFlowArr, 26));

        //the 2nd table's data is created and set

        setCashFlowData(cashFlowRows);
    }

    const handleClick = () => {
        //on click, it creates the two tables for the solar app
        if (document.getElementById("inputState").value != "none" && document.getElementById("roofSize").value > 0) {
            //these values will be passed to an HTML setup for the 1st table
            userState = document.getElementById("inputState").value;
            userGen = document.getElementById("roofSize").value;
            userCost = "$" + (userGen * finModel.KILO_CONV * finModel.INSTALL_RATE).toLocaleString('en-US');

            setInputState(userState);
            setRoofSize(userGen);
            setUpfrontCost(userCost);

            //generates data for 2nd table and IRR and PP columns for the 1st

            createCashFlowTable(userState, userGen);

            //makes both tables render

            setShow(true);

        }
        else{

            //handles non-positive roof inputs and no-selections for state

            console.log("Invalid input!");
            setShow(false);
        }
    }
  return (
    <div className="App">
        <header className={"App-top-header"}>
            <p>Simple Solar Dashboard</p>
        </header>
        <label>
            {/*This is the dropdown menu for choosing the state where the solar panels will be installed in*/}
            Please choose the state of your solar installation:&nbsp;
            <select className="inputState" id="inputState" defaultValue={"none"}>
                <option value ="none">Select State</option>
                <option value ="Alabama">Alabama</option>
                <option value ="Alaska">Alaska</option>
                <option value ="Arizona">Arizona</option>
                <option value ="Arkansas">Arkansas</option>
                <option value ="California">California</option>
                <option value ="Colorado">Colorado</option>
                <option value ="Connecticut">Connecticut</option>
                <option value ="Delaware">Delaware</option>
                <option value ="District Of Columbia">District of Columbia</option>
                <option value ="Florida">Florida</option>
                <option value ="Georgia">Georgia</option>
                <option value ="Hawaii">Hawaii</option>
                <option value ="Idaho">Idaho</option>
                <option value ="Illinois">Illinois</option>
                <option value ="Indiana">Indiana</option>
                <option value ="Iowa">Iowa</option>
                <option value ="Kansas">Kansas</option>
                <option value ="Kentucky">Kentucky</option>
                <option value ="Louisiana">Louisiana</option>
                <option value ="Maine">Maine</option>
                <option value ="Maryland">Maryland</option>
                <option value ="Massachusetts">Massachusetts</option>
                <option value ="Michigan">Michigan</option>
                <option value ="Minnesota">Minnesota</option>
                <option value ="Mississippi">Mississippi</option>
                <option value ="Missouri">Missouri</option>
                <option value ="Montana">Montana</option>
                <option value ="Nebraska">Nebraska</option>
                <option value ="Nevada">Nevada</option>
                <option value ="New Hampshire">New Hampshire</option>
                <option value ="New Jersey">New Jersey</option>
                <option value ="New Mexico">New Mexico</option>
                <option value ="New York">New York</option>
                <option value ="North Carolina">North Carolina</option>
                <option value ="North Dakota">North Dakota</option>
                <option value ="Ohio">Ohio</option>
                <option value ="Oklahoma">Oklahoma</option>
                <option value ="Oregon">Oregon</option>
                <option value ="Pennsylvania">Pennsylvania</option>
                <option value ="Rhode Island">Rhode Island</option>
                <option value ="South Carolina">South Carolina</option>
                <option value ="South Dakota">South Dakota</option>
                <option value ="Tennessee">Tennessee</option>
                <option value ="Texas">Texas</option>
                <option value ="Utah">Utah</option>
                <option value ="Vermont">Vermont</option>
                <option value ="Virginia">Virginia</option>
                <option value ="Washington">Washington</option>
                <option value ="West Virginia">West Virginia</option>
                <option value ="Wisconsin">Wisconsin</option>
                <option value ="Wyoming">Wyoming</option>
            </select>
        </label>
    <hr>
    </hr>
    <label>
        {/*This asks the user to input the roof size based off of how much energy it can generate*/}
        Roof size (measured in kW DC):&nbsp;
        <input className="roofSize" id="roofSize" type="number" min="1" />
    </label>
        <hr>
        </hr>
        <button onClick = {handleClick} className = "genButton">
            {/*This button is pressed to generate the solar dashboard*/}
            Generate Solar Dashboard
        </button>
        {show && (
        <table>
            {/*This is the HTML tag for the 1st table*/}
            <thead>
                <tr>
                    <th>State</th>
                    <th>Roof Size (kw DC)</th>
                    <th>Upfront cost ($)</th>
                    <th>Annual generation (kwH/yr, assumed)</th>
                    <th>Project IRR</th>
                    <th>Payback period</th>
                </tr>
            </thead>
        <tbody>
            <tr>
                <td id = "stateCell">{inputState}</td>
                <td id = "roofCell">{roofSize}</td>
                <td id = "upfrontCost">{upfrontCost}</td>
                <td id = "annGen">1400</td>
                <td id = "IRR">{IRR}</td>
                <td id = "Payback Period">{PP}</td>
            </tr>
        </tbody>
        </table>
        )}
        <hr>
        </hr>
        {show && (
            <table>
                {/*This is the HTML tag for the 2nd table, since it has many more cells than the first table
                , I use the tbody to map the array to the table*/}
                <thead>
                <tr>
                    <th>Year</th>
                    <th>Electric Rate (cents/kWh)</th>
                    <th>Revenue ($)</th>
                    <th>Install Cost ($)</th>
                    <th>O&M Cost ($)</th>
                    <th>ITC Tax Credit ($)</th>
                    <th>Net Cashflow ($)</th>
                </tr>
                </thead>
                <tbody>
                    {cashFlowData.map((row, i) => (
                        <tr key={i}>
                            <td>{row.year}</td>
                            <td>{row.elecrate}</td>
                            <td>{row.elecrev}</td>
                            <td>{row.installcost}</td>
                            <td>{row.om}</td>
                            <td>{row.itc}</td>
                            <td>{row.cashflow}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the Simple Solar Dashboard. Please input the state of your future installation
            and roof size above to
            generate a dashboard of financial metrics for your new solar system.
        </p>
      </header>
    </div>
  );
}

export default App;
