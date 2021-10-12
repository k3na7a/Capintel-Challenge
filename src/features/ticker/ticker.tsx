import React from 'react';
import { connect } from "react-redux";
import {
    fetchTickerData,
    changeTickerValue
} from './tickerSlice';
import { 
    STRINGS, 
    COLORS,
    VALUES,
    TICKERS
} from '../../Assets/Data/TickersData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Line } from 'react-chartjs-2';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const Ticker = (props: any) => {
    function handleChange(event: any) { props.Fetch(event.target.value) }
    function handleDayClick(day: any) {
        const TIMESTAMP : number = day.getTime()
        props.ChangeDate(TIMESTAMP)
    }
    switch(props.ticker.status){
        case `${STRINGS.EN.STS.SCC}`:
            let ReactUI: JSX.Element;
            try{
                let rolloffdaysPre      = Array(VALUES.ROLLOFF)
                let rolloffdaysPost     = Array(VALUES.ROLLOFF)
                const STARTDAY          = props.ticker.data.performance.at(-2)[0]
                const LASTDAY           = props.ticker.data.performance[0][0]
                for (let index = 0; index < VALUES.ROLLOFF; index++) {
                    rolloffdaysPre[index]   = (new Date(LASTDAY - VALUES.FULLDAY * (index + 1)))
                    rolloffdaysPost[index]  = (new Date(STARTDAY + VALUES.FULLDAY * (index + 1)))
                }
                const SELECTED_DAY      = new Date(props.ticker.selectedDay)
                const FIRST_DAY         = new Date(STARTDAY)
                let initialDataSet      = (props.ticker.data) ? props.ticker.data.performance : []
                initialDataSet          = initialDataSet.filter((element: any) => element[0] > props.ticker.selectedDay)
                let newDataSet          = Array(initialDataSet.length)
                let counter             = VALUES.INITIAL_INVESTMENT
                initialDataSet.forEach((element: any, index: any) => {
                    counter             = (index) ? counter + ((element[1] / 100) * counter) : counter
                    newDataSet[index]   = counter.toFixed(2)
                })
                ReactUI = 
                    <React.Fragment>
                        <div className="py-3 px-5 d-flex flex-column Ticker mx-auto w-75">
                            <div className="d-flex justify-content-around text-white text-header">
                                <h1>
                                    {`${STRINGS.EN.Header.Title}`}
                                </h1>
                            </div>
                            <div className="d-flex justify-content-around text-white text-content">
                                <h5 className="text-accent fw-bold">
                                    {`${STRINGS.EN.Header.subtitle}`}
                                </h5>
                            </div> 
                            <div className="d-flex justify-content-around text-white mt-3 text-header">
                                <p>
                                    <span>
                                        {`${STRINGS.EN.SubHeader.Growth}`}
                                    </span>
                                </p>
                                <p className="text-muted fw-bold">
                                    <span>{`${props.ticker.data.ticker}:${props.ticker.data.exchange}`}</span>
                                </p>
                            </div>
                            <div className="d-flex justify-content-around text-white fw-bold text-content">
                                <p>
                                    <FontAwesomeIcon className="text-accent me-2" icon={["fas", "chart-line"]} />
                                    {`${props.ticker.data.ticker}`}
                                </p>
                            </div>               
                            <Line 
                                data={{
                                    labels: initialDataSet.map((element: any) => `${new Date(element[0]).toLocaleDateString()}`),
                                    datasets: [
                                        {
                                            label:              `${STRINGS.EN.Chart.Popup}`,
                                            data:               newDataSet.map((element: any) => element),
                                            fill:               false,
                                            backgroundColor:    COLORS.ACCENT,
                                            borderColor:        COLORS.ACCENT,
                                            borderWidth:        VALUES.BORDER_W,
                                        },
                                    ]
                                }} 
                                options={{
                                    plugins: {
                                        legend: { display: false }
                                    },
                                    scales: {
                                        xAxes: {
                                            grid: { color: COLORS.GRID_COLOR },
                                            ticks: { 
                                                color:          COLORS.GRID_ACCENT, 
                                                maxTicksLimit:  VALUES.MAX_TICKLIMIT,
                                            },
                                        },
                                        yAxes: {
                                            grid:   { color: function(context) {
                                                if (context.tick.value == VALUES.INITIAL_INVESTMENT || context.tick.value == 0) {
                                                    return COLORS.GRID_ACCENT;
                                                }
                                                return COLORS.GRID_COLOR;
                                            },},
                                            ticks: { color: COLORS.GRID_ACCENT }, 
                                            beginAtZero: true,
                                        }
                                    }
                                }}
                            />
                            <div className="d-flex mt-4 text-content">
                                <select 
                                    className       = "form-select form-select-sm me-3" 
                                    onChange        = {handleChange} 
                                    aria-label      = ".form-select-lg example"
                                    defaultValue    = {props.ticker.value}
                                >
                                    {TICKERS.map((element: any, index: any) => (
                                        <option 
                                            key     = {index} 
                                            value   = {element.ticker}
                                        >
                                            {`${element.companyName}`}
                                        </option>
                                    ))}
                                </select>
                                <div className="input-group ms-3">
                                    <input 
                                        type                = "text" 
                                        disabled 
                                        className           = "form-control" 
                                        placeholder         = {`${SELECTED_DAY.toLocaleDateString()} to ${FIRST_DAY.toLocaleDateString()}`} 
                                        aria-describedby    = "button-addon2"
                                    />
                                    <button className="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        <FontAwesomeIcon className="text-white" icon={["fas", "calendar-day"]} />
                                    </button>
                                </div>
                                <div 
                                    className           = "modal fade" 
                                    id                  = "staticBackdrop" 
                                    data-bs-backdrop    = "static" 
                                    data-bs-keyboard    = "false" 
                                    aria-labelledby     = "staticBackdropLabel" 
                                    aria-hidden         = "true"
                                >
                                    <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                                        <div className="modal-content">
                                            <div className="modal-header bg-primary text-white">
                                                <h5 className="modal-title fw-bold" id="staticBackdropLabel">
                                                    <FontAwesomeIcon className="me-3" icon={["fas", "calendar-day"]} />
                                                    {`${STRINGS.EN.Modal.Header}`}
                                                </h5>
                                            </div>
                                            <div className="modal-body">
                                                <DayPicker
                                                    selectedDays        = {[new Date(props.ticker.selectedDay)]}
                                                    disabledDays        = {rolloffdaysPre.concat(rolloffdaysPost)}
                                                    initialMonth        = {new Date(props.ticker.selectedDay)}
                                                    toMonth             = {new Date(STARTDAY)}
                                                    fromMonth           = {new Date(LASTDAY)}
                                                    onDayClick          = {handleDayClick}
                                                    fixedWeeks
                                                    showWeekNumbers
                                                    pagedNavigation
                                                    numberOfMonths      = {VALUES.NOMONTHS}
                                                />
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                    {`${STRINGS.EN.Modal.Button}`}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                                     
                        </div>
                    </React.Fragment>
            }catch{
                ReactUI =   
                    <React.Fragment>
                        <div className="py-3 px-5 d-flex flex-column Ticker mx-auto w-75 align-items-center">
                            <div className="alert alert-warning" role="alert">
                                <FontAwesomeIcon className="me-2" icon={["fas", "exclamation-triangle"]} />
                                {`${STRINGS.EN.Status.Error1}`}
                                <FontAwesomeIcon className="ms-2" icon={["fas", "exclamation-triangle"]} />
                            </div>
                        </div>
                    </React.Fragment>
            }
            return ReactUI
        case `${STRINGS.EN.STS.LDG}`:
            return(
                <React.Fragment>
                    <div className="py-3 px-5 d-flex flex-column Ticker mx-auto w-75 align-items-center">
                        <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">
                            {`${STRINGS.EN.Status.Loading}`}
                            </span>
                        </div>
                    </div>
                </React.Fragment>
            )
        default:
            return(
                <React.Fragment>
                    <div className="py-3 px-5 d-flex flex-column Ticker mx-auto w-75 align-items-center">
                        <div className="alert alert-warning" role="alert">
                            <FontAwesomeIcon className="me-2" icon={["fas", "exclamation-triangle"]} />
                            {`${STRINGS.EN.Status.Error2}`}
                            <FontAwesomeIcon className="ms-2" icon={["fas", "exclamation-triangle"]} />
                        </div>
                    </div>
                </React.Fragment>
            )
    }
}

const mapStateToProps = (state : any) => { return { ticker: state.ticker, }; }
const mapDispatchToProps = ({
    Fetch: (fetch : any) => {
        return(fetchTickerData(fetch))
    },
    ChangeDate: (date : any) => {
        return(changeTickerValue(date))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Ticker);