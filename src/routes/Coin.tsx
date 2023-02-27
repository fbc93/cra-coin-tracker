import styled from "styled-components";
import { Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
  background-color:${props => props.theme.bgColor};
  padding:0px 20px;
  max-width:480px;
  margin:auto;
`;

const Header = styled.header`
  height: 10vh;
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
  margin:20px 0;
`;
const TabItem = styled.li<{ isActive: boolean }>`
  width:calc(50% - 5px);

  a {
    display: block;
    width: 100%;
    padding:10px;
    border-radius: 10px;
    text-align: center;
    background-color: #1e272e;
    color : ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
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
    () => fetchCoinTickers(String(coinId))
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
      </Header>
      {loading ? (<Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>OPEN SOURCE</span>
              <span>{infoData?.open_source ? "YES" : "NO"}</span>
            </OverviewItem>
          </Overview>

          <Description>{infoData?.description}</Description>

          <Overview>
            <OverviewItem>
              <span>TOTAL SUPPLY</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX SUPPLY</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
        </>
      )}

      <TabList>
        <TabItem isActive={chartMatch !== null}>
          <Link to="chart">CHART</Link>
        </TabItem>
        <TabItem isActive={priceMatch !== null}>
          <Link to="information">INFO</Link>
        </TabItem>
      </TabList>

      <Outlet context={{ coinId: coinId }} />
    </Container>
  );
}

export default Coin;