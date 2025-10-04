//install cost per watt
export const INSTALL_RATE = 2.50;

//kw to w
export const KILO_CONV = 1000;

//assumed kilowatt-hour annual generation
export const ASSUMED_GEN_KW_YR = 1400;

//electricity price escalation per year
export const ELEC_EXPENSE_RATE = 1.025;

//price of operations and maintenance, measured per year and kilowatt
export const OM_YEAR_KW_COST = 15;

//year 0 tax credit for solar installation
export const ITC_TAX_CREDIT_RATE = 0.3;

export const STATE_RATE_MAP = new Map();
STATE_RATE_MAP.set("Alabama", 16.00);
STATE_RATE_MAP.set("Alaska", 26.88);
STATE_RATE_MAP.set("Arizona", 15.28);
STATE_RATE_MAP.set("Arkansas", 13.33);
STATE_RATE_MAP.set("California", 33.52);
STATE_RATE_MAP.set("Colorado", 16.16);
STATE_RATE_MAP.set("Connecticut", 27.24);
STATE_RATE_MAP.set("Delaware", 18.15);
STATE_RATE_MAP.set("District Of Columbia", 22.70);
STATE_RATE_MAP.set("Florida", 15.36);
STATE_RATE_MAP.set("Georgia", 16.00);
STATE_RATE_MAP.set("Hawaii", 40.96);
STATE_RATE_MAP.set("Idaho", 12.07);
STATE_RATE_MAP.set("Illinois", 18.33);
STATE_RATE_MAP.set("Indiana", 16.60);
STATE_RATE_MAP.set("Iowa", 15.39);
STATE_RATE_MAP.set("Kansas", 15.00);
STATE_RATE_MAP.set("Kentucky", 13.62);
STATE_RATE_MAP.set("Louisiana", 12.64);
STATE_RATE_MAP.set("Maine", 28.14);
STATE_RATE_MAP.set("Maryland", 19.33);
STATE_RATE_MAP.set("Massachutsetts", 30.37);
STATE_RATE_MAP.set("Michigan", 20.85);
STATE_RATE_MAP.set("Minnesota", 17.14);
STATE_RATE_MAP.set("Mississippi", 13.94);
STATE_RATE_MAP.set("Missouri", 15.84);
STATE_RATE_MAP.set("Montana", 14.85);
STATE_RATE_MAP.set("Nebraska", 13.17);
STATE_RATE_MAP.set("Nevada", 11.42);
STATE_RATE_MAP.set("New Hampshire", 23.51);
STATE_RATE_MAP.set("New Jersey", 24.88);
STATE_RATE_MAP.set("New Mexico", 14.77);
STATE_RATE_MAP.set("New York", 26.53);
STATE_RATE_MAP.set("North Carolina", 13.33);
STATE_RATE_MAP.set("North Dakota", 13.68);
STATE_RATE_MAP.set("Ohio", 17.52);
STATE_RATE_MAP.set("Oklahoma", 13.62);
STATE_RATE_MAP.set("Oregon", 15.77);
STATE_RATE_MAP.set("Pennsylvania", 19.70);
STATE_RATE_MAP.set("Rhode island", 26.84);
STATE_RATE_MAP.set("South carolina", 14.71);
STATE_RATE_MAP.set("South dakota", 14.23);
STATE_RATE_MAP.set("Tennessee", 13.98);
STATE_RATE_MAP.set("Texas", 15.23);
STATE_RATE_MAP.set("Utah", 13.12);
STATE_RATE_MAP.set("Vermont", 23.21);
STATE_RATE_MAP.set("Virginia", 15.41);
STATE_RATE_MAP.set("Washington", 12.98);
STATE_RATE_MAP.set("Westvirginia", 15.82);
STATE_RATE_MAP.set("Wisconsin", 18.57);
STATE_RATE_MAP.set("Wyoming", 14.89);

export function findIRR(arr, years){
    //this function gets and adjusts a midpoint to find a value that would bring
    //npv to 0 through a summation equation involving the midpoint. When npv is 0, then we know that we have
    //found the irr, as it would be the midpoint value that brings npv to 0
    let low = -1.0;
    let hi = 1.0;
    let midpoint, npv;
    do{
        midpoint = (low + hi) / 2;
        npv = 0;
        for(let i = 0; i < years; i++){
            npv += arr[i]/((1 + midpoint) ** i);
        }
        if(npv > 0){
            low = midpoint;
        }
        else{
            hi = midpoint;
        }
    }while (Math.abs(npv) > 0.000001);
    return (Math.round(midpoint * 10000) / 100);
}

export function findPaymentPeriod(arr, years){
    //This function finds the payment period by seeing how many years it would take until
    //the intial investment has made its money back (when cashNet is positive or zero)
    let cashNet = arr[0];
    for(let i = 1; i < years; i++){
        cashNet += arr[i];
        //console.log(cashNet);
        if(cashNet >= 0){
            return i;
        }
    }
    return -1;
}
/*export const cashFlowColumns = [
    {header: 'Year', accessor: 'year'},
    {header: 'Price of electricity (cents/kWh)', accessor: 'elecrate'},
    {header: 'Revenue from electricity ($)', accessor: 'elecrev'},
    {header: 'Install cost', accessor: 'install'},
    {header: 'O&M', accessor: 'om'},
    {header: 'ITC tax credit', accessor: 'itc'},
    {header: 'Cash Flow', accessor: 'cashflow'}
];

export function createCashFlowTable(state, userGen, setDataState){
    const cashFlowSetup = () =>
        Array.from({length: 25}, (_, i) => ({
            year: i + 1,
            elecrate: STATE_RATE_MAP.get(state) * 2.5 ** i,
            electrev: (STATE_RATE_MAP.get(state) * 2.5 ** i) * 1400,
            installcost: "",
            om: OM_YEAR_KW_COST * 1400,
            itc: "",
            cashflow: ((STATE_RATE_MAP.get(state) * 2.5 ** i) * 1400) - (OM_YEAR_KW_COST * 1400),
        }));
    setDataState(cashFlowSetup());
}*/