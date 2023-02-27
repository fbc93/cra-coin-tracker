import styled from "styled-components";
import { Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  background-color:${props => props.theme.bgColor};
  padding:0px 20px;
  max-width:480px;
  margin:auto;
`;

const Header = styled.header`
  padding:5vh 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color:${(props) => props.theme.accentColor};
  font-size:30px;
`;

const Loader = styled.div`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: #1e272e;
  padding:20px 30px;
  border-radius: 15px;
  margin-bottom:5px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;

span:first-child {
  font-size:14px; 
  margin-bottom: 10px;
}
`;

const Description = styled.div`
  margin:20px 10px;
  font-size:16px;
  line-height: 25px;
  text-align: left;
`;

const TabList = styled.ul`
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin:20px 0 5px;
`;
const TabItem = styled.li<{ isActive: boolean }>`
  width:calc(50% - 5px);

  a {
    display: block;
    width: 100%;
    padding:10px;
    border-radius: 10px;
    text-align: center;
    background-color: #57606f;
    color : ${props => props.isActive ? props.theme.accentColor : "#999999"};
  }
`;

const HomeLink = styled.div`
  width:100%;
  margin:0 0 20px 0;

  a {
    display: inline-block;
    width: 100%;
    text-align: center;
    background-color:${props => props.theme.accentColor};
    color: #1e272e;
    padding:15px 20px;
    border-radius: 10px;
    font-weight: bold;
  }
`;

interface RouterState {
  state: {
    name: string
  }
}

function Coin() {

  const { coinId } = useParams();
  const { state } = useLocation() as RouterState;
  const priceMatch = useMatch(`/:coinId/information`);
  const chartMatch = useMatch(`/:coinId/chart`);

  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["info", coinId],
    () => fetchCoinInfo(String(coinId))
  );

  const { isLoading: tickersLoading, data: tickersData } = useQuery(
    ["tickers", coinId],
    () => fetchCoinTickers(String(coinId)),
    {
      refetchInterval: 5000,
    }
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Header>
        <Helmet>
          <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
        </Helmet>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
      </Header>

      {loading ? (<Loader>Loading...</Loader>
      ) : (
        <>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>순위</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>심볼</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>현재 가격</span>
              <span>$ {tickersData?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>

          <Overview>
            <OverviewItem>
              <span>총 공급량</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>최대 발행수량</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>시가총액</span>
              <span>{tickersData?.quotes.USD.market_cap}</span>
            </OverviewItem>
          </Overview>

          <Overview>
            <OverviewItem>
              <span>유통량</span>
              <span>{tickersData?.circulating_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>거래량(24h)</span>
              <span>{tickersData?.circulating_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>거래량(24h) 변동</span>
              <span>{tickersData?.quotes.USD.volume_24h_change_24h} %</span>
            </OverviewItem>
          </Overview>
        </>
      )}

      <TabList>
        <TabItem isActive={priceMatch !== null}>
          <Link to="information">{infoData?.symbol} 정보</Link>
        </TabItem>
        <TabItem isActive={chartMatch !== null}>
          <Link to="chart">차트</Link>
        </TabItem>
      </TabList>

      <Outlet context={{ coinId: coinId, data: tickersData }} />
      <HomeLink>
        <Link to={"/"}>리스트로 돌아가기</Link>
      </HomeLink>

    </Container>
  );
}

export default Coin;