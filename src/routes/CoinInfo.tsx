import { useOutletContext } from "react-router-dom";
interface IContextData {
  coinId: string,
  data: {
    max_supply: number,
    circulating_supply: number,
    total_supply: number,
    last_updated: number,

    quotes: {
      USD: {
        percent_change_15m: number,
        percent_change_1h: number,
        percent_change_24h: number,
        percent_change_7d: number,
        percent_change_30d: number,
        percent_change_1y: number,
        volume_24h: number,
        volume_24h_change_24h: number,
        market_cap: number,
        ath_price: number,
        percent_from_price_ath: number,
        ath_date: number,
      }
    }
  }
}

function CoinInfo() {
  const { data } = useOutletContext<IContextData>();
  console.log(data)
  return (
    <>
      <div>MIN 변동 : {data?.quotes.USD.percent_change_1y}</div>
      <div>HOUR 변동 : {data?.quotes.USD.percent_change_1h}</div>
      <div>DAY 변동 : {data?.quotes.USD.percent_change_24h}</div>
      <div>WEEK 변동 : {data?.quotes.USD.percent_change_7d}</div>
      <div>MONTH 변동 : {data?.quotes.USD.percent_change_30d}</div>
      <div>YEAR 변동 : {data?.quotes.USD.percent_change_30d}</div>

      <div>최고가격에서 % : {data?.quotes.USD.percent_from_price_ath}</div>
      <div>ATH(All Time High), 최고가격 :{data?.quotes.USD.ath_price}</div>
      <div>ATH 날짜 : {data?.quotes.USD.ath_date}</div>

      <div>거래량(24h) : {data?.quotes.USD.volume_24h}</div>
      <div>거래량(24h) 변동 : {data?.quotes.USD.volume_24h_change_24h}</div>

      <div>유통량 : {data?.circulating_supply}</div>
      <div>총 공급량 : {data?.total_supply}</div>
      <div>최대 발행량 : {data?.max_supply}</div>

      <div>시가총액 : {data?.quotes.USD.market_cap}</div>
      <div>last_updated : {data?.last_updated}</div>
    </>
  )
}

export default CoinInfo;