export default async function getTickerData( ticker : String ) {
    const URL = `https://challenge.capintel.com/v1/stocks/${ticker}`;
    const result = await fetch(URL, { method: "get" })
        .then( res => res.json() )
        .then( data => {
            return { code : 0, data : data }
        })
        .catch( function( error ) {
            return { code : 1, data : error }
        });
    return result;
}