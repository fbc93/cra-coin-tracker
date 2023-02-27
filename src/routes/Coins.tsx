import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  background-color:${props => props.theme.bgColor};
  padding:0px 20px;
  max-width:100%;
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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color:${props => props.theme.bgColor};
  padding: 20px 40px 20px 65px;
  border-radius: 10px;
  margin-bottom:10px;
  position: relative;
  transition: background-color .1s ease-in;
  
  a {
    display: block;
    font-weight: bold;
  }

  span {
    position: absolute;
    right: 15px;
    top: 18px;
    font-size: 20px;
  }

  &:hover{
    background-color:${props => props.theme.accentColor};
  }
`;

const Loader = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

interface InterfaceCoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function Coins() {
  const { isLoading, data } = useQuery<InterfaceCoin[]>("allCoins", fetchCoins)

  return (
    <>
      <Container>
        <Helmet>
          <title>코인 리스트</title>
        </Helmet>
        <Header>
          <Title>코인 리스트</Title>
        </Header>

        {isLoading ? (<Loader>Loading....</Loader>) : (<CoinsList>
          {
            data?.slice(0, 100).map((coin) =>
              <Coin key={`${coin.id}`}>
                <Link to={`${coin.id}/information`} state={{
                  state: {
                    name: coin.name
                  }
                }}>
                  <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="symbol" />
                  {coin.name}
                </Link>
                <span className="material-symbols-rounded">
                  arrow_forward_ios
                </span>
              </Coin>
            )
          }
        </CoinsList>
        )}
      </Container>
    </>
  );
}
export default Coins;