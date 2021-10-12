import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import getTickerData from '../../services/fetch'
import { STRINGS, TICKERS, VALUES } from '../../Assets/Data/TickersData'

export const fetchTickerData = createAsyncThunk(
    'ticker/fetchTickerData',  async (tickerValue: any) => {    
        const response = await getTickerData(tickerValue)
        return response.data
    }
)
export const tickerSlice = createSlice({
    name: 'ticker',
    initialState: {
        status:         `${STRINGS.EN.STS.LDG}`,
        value:          `${TICKERS[0].ticker}`,
        data:           null,
        selectedDay:    null
    },
    reducers: {
        changeTickerValue: (state, action) => {
            state.selectedDay       = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTickerData.fulfilled, (state, action) => {
            try{
                const DATA          = action.payload
                state.data          = DATA
                state.selectedDay   = (!state.selectedDay) ? DATA.performance.at(-VALUES.APPROX_3YRS_DATA)[0] : state.selectedDay
                state.value         = DATA.ticker
                state.status        = `${STRINGS.EN.STS.SCC}`
            }catch{
                state.status        = `${STRINGS.EN.STS.ERR}`
            }
        })
        builder.addCase(fetchTickerData.pending, (state) => {
            state.status            = `${STRINGS.EN.STS.LDG}`
        })
        builder.addCase(fetchTickerData.rejected, (state) => {
            state.status            = `${STRINGS.EN.STS.ERR}`
        })
    }
})
export const { changeTickerValue } = tickerSlice.actions;
export default tickerSlice.reducer;