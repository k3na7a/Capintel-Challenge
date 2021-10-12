export const VALUES = {
    ROLLOFF:                365,
    INITIAL_INVESTMENT:     10000,
    FULLDAY:                86400000,
    NOMONTHS:               6,
    BORDER_W:               2,
    MAX_TICKLIMIT:          5,
    APPROX_3YRS_DATA:       160
}

export const TICKERS = [
    {ticker:'AAPL', companyName:'Apple Inc.'},
    {ticker:'TSLA', companyName:'Tesla Inc.'},
    {ticker:'AMZN', companyName:'Amazon.com Inc.'}
];

export const COLORS = {
    ACCENT      :   '#ffc107',
    GRID_COLOR  :   '#38444d',
    GRID_ACCENT :   '#ffffff'
}

export const STRINGS = {
    EN:{
        Header: {
            Title:              `CAPINTEL CHALLENGE`,
            subtitle:           `John Desjardins`
        },
        SubHeader: {
            Growth:             `Growth of 10,000$`
        },
        Modal: {
            Header:             `CHOOSE NEW DATE`,
            Button:             `CLOSE`
        },
        Chart: {
            Popup:              `INVESTMENT VALUE`
        },
        Status: {
            Error1:             `There was an Error processing your request! Try RELOADING the page`,
            Error2:             `There was an Error somewhere along the way! Try RELOADING the page.`,
            Loading:            `LOADING...`
        },
        STS: {
            SCC:                `OK`,
            ERR:                `ERROR`,
            LDG:                `LOADING`
        }
    }
}