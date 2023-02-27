import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
interface IcoinId {
  coinId: string
}

interface IHistorical {
  "time_open": string,
  "time_close": number,
  "open": number,
  "high": number,
  "low": number,
  "close": number,
  "volume": string,
  "market_cap": number
}

function CoinChart() {
  const { coinId } = useOutletContext<IcoinId>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );

  const candleOptions: ApexOptions = {
    title: {
      text: 'USD 기준',
      align: 'left'
    },
    theme: {
      mode: "dark",
    },
    chart: {
      type: 'candlestick',
      width: 300,
      height: 350,
      toolbar: {
        show: false
      },
      background: "transparent"
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: "dd MMM",
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    }
  }

  const candleSeries: ApexAxisChartSeries = [
    {
      name: "price",
      data: data?.map((price) => {
        return {
          x: price.time_close * 1000,
          y: [
            price.open,
            price.high,
            price.low,
            price.close,
          ]
        }
      }) as unknown as number[],
    },
  ];

  return (
    <div>
      {isLoading ? ("Loading chart...") :
        (<ApexChart
          type="candlestick"
          series={candleSeries}
          options={candleOptions}
        />
        )}
    </div>
  )
}

export default CoinChart;