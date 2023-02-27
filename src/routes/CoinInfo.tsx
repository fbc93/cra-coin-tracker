import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const ItemWrapper = styled.div`
display:flex;
justify-content: space-between;
margin-bottom:5px;
`;

const Item25W = styled.div`
  width:calc(25% - 3px);
  background-color: #000000;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  div {
    text-align: left;
  }

  div:first-child{
    font-size:13px;
    padding:15px 20px 5px;
    color:#999999;
  }

  div:nth-child(2){
    font-size:18px;
    font-weight: bold;
    padding:0px 20px 15px;
  }
`;

const Item50W = styled.div`
width:calc(50% - 2px);
  background-color: #111111;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  div:first-child{
    font-size:13px;
    padding:15px 20px 10px;
    color:#999999;
  }

  div:nth-child(2){
    font-size:18px;
    font-weight: bold;
    padding:0px 20px 20px;
  }
`;

const ATHWWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom:5px;
`;

const ATHNumber = styled.div`
  width: 70%;
  background-color: #000000;
  border-radius:10px 0px 0 10px;

  div:nth-child(1){
    font-size:14px;
    color:#999999;
    padding:15px 0px 0px 20px;
    margin-bottom:5px;
  }

  div:nth-child(2){
    font-size:13px;
    color:#999999;
    padding:0px 0px 0px 20px;
    margin-bottom:5px;
  }

  div:nth-child(3){
    padding:0px 0px 20px 20px;
    font-size:25px;
  }
`;

const ATHPercent = styled.div`
  width:30%;
  text-align: center;
  background-color: #000000;
  border-radius: 0px 10px 10px 0px;

  div:nth-child(1){
    padding:20px 20px 0px 0px;
    font-size:12px;
    color:#999999;
    margin-bottom:7px;
  }

  div:nth-child(2){
    font-size:30px;
    padding:0px 20px 20px 0px;
  }
`;

const Item100W = styled.div`
  width: 100%;
  background-color: #222222;
  padding:20px 20px;
  border-radius: 10px;
  margin-bottom:20px;
  font-size:14px;
  text-align: center;
`;

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

  return (
    <>
      <ATHWWrapper>
        <ATHNumber>
          <div>최고가격 (ATH)</div>
          <div>{data?.quotes.USD.ath_date}</div>
          <div>$ {data?.quotes.USD.ath_price}</div>
        </ATHNumber>
        <ATHPercent>
          <div>percent from ATH</div>
          <div>{data?.quotes.USD.percent_from_price_ath} %</div>
        </ATHPercent>
      </ATHWWrapper>

      <ItemWrapper>
        <Item25W>
          <div>15분</div>
          <div>{data?.quotes.USD.percent_change_1y} %</div>
        </Item25W>
        <Item25W>
          <div>1시간</div>
          <div>{data?.quotes.USD.percent_change_1h} %</div>
        </Item25W>
        <Item25W>
          <div>1일</div>
          <div>{data?.quotes.USD.percent_change_24h}%</div>
        </Item25W>
        <Item25W>
          <div>1주</div>
          <div>{data?.quotes.USD.percent_change_7d}%</div>
        </Item25W>
      </ItemWrapper>

      <ItemWrapper>
        <Item50W>
          <div>1개월 (30일)</div>
          <div>{data?.quotes.USD.percent_change_30d} %</div>
        </Item50W>
        <Item50W>
          <div>1년</div>
          <div>{data?.quotes.USD.percent_change_30d} %</div>
        </Item50W>
      </ItemWrapper>

      <Item100W>마지막 업데이트: {data?.last_updated}</Item100W>
    </>
  )
}

export default CoinInfo;