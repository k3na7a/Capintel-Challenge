import { configureStore } from '@reduxjs/toolkit';
import tickerReducer, { fetchTickerData } from '../features/ticker/tickerSlice';

export default configureStore({  
    reducer: {
        ticker: tickerReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware(
            { 
                thunk: { 
                    extraArgument: [
                        fetchTickerData
                    ] 
                }, 
                serializableCheck: false 
            }
        )
})