import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color:${props => props.theme.bgColor};
  padding:0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color:${(props) => props.theme.accentColor}
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color:${props => props.theme.bgColor};
  padding:20px;
  border-radius: 10px;
  margin-bottom:10px;
  position: relative;
  transition: background-color .1s ease-in;
  
  a {
    display: block;
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

//sample obj data
const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];

function Coins() {
  return (
    <>
      <Container>
        <Header>
          <Title>코인</Title>
        </Header>
        <CoinsList>
          {coins.map((coin) =>
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>
                {coin.name}
              </Link>
              <span className="material-symbols-rounded">
                arrow_forward_ios
              </span>
            </Coin>
          )}
        </CoinsList>
      </Container>
    </>
  );
}
export default Coins;