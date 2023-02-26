import { Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface priceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {

  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation() as RouterState;
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<priceData>();
  const priceMatch = useMatch(`/:coinId/information`);
  const chartMatch = useMatch(`/:coinId/chart`);

  useEffect(() => {
    (async () => {
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);

    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : info?.name}</Title>
      </Header>
      {loading ? (<Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>OPEN SOURCE</span>
              <span>{info?.open_source ? "YES" : "NO"}</span>
            </OverviewItem>
          </Overview>

          <Description>{info?.description}</Description>

          <Overview>
            <OverviewItem>
              <span>TOTAL SUPPLY</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX SUPPLY</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
        </>
      )}

      <TabList>
        <TabItem isActive={priceMatch !== null}>
          <Link to="information">INFO</Link>
        </TabItem>
        <TabItem isActive={chartMatch !== null}>
          <Link to="chart">CHART</Link>
        </TabItem>
      </TabList>

      <Outlet />
    </Container>
  );
}

export default Coin;