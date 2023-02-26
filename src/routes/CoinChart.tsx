import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { darkTheme } from "../theme";

interface ChartPropsInterface {
  coinId: string
}

interface ChartHistoricalInterface {
  "time_open": number,
  "time_close": number,
  "open": string,
  "high": string,
  "low": string,
  "close": string,
  "volume": string,
  "market_cap": number
}

function CoinChart() {
  const { coinId } = useOutletContext<ChartPropsInterface>();
  const { isLoading, data } = useQuery<ChartHistoricalInterface[]>(["Chart", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>{isLoading ? "Loading chart..." : <ApexChart
      type="line"
      series={[
        {
          name: "Price",
          data: data?.map((price) => Number(price.close)) as number[],
        }
      ]}
      options={{
        theme: {
          mode: "dark"
        },
        chart: {
          height: 300,
          width: 500,
          toolbar: {
            show: false
          },
          background: "transparent"
        },
        grid: {
          show: false
        },
        stroke: {
          curve: "smooth",
          width: 3
        },
        yaxis: {
          show: false
        },
        xaxis: {
          axisTicks: {
            show: false
          },
          labels: {
            show: false
          },
          type: "datetime",
          categories: data?.map((date) => date.time_close)

        },
        fill: {
          type: "gradient",
          gradient: {
            gradientToColors: ["yellow"],
            stops: [0, 100]
          },
        },
        colors: ["hotpink"],
        tooltip: {
          y: {
            formatter: (value) => `$ ${value.toFixed(3)}`
          }
        }
      }}


    />}</div>
  )
}

export default CoinChart;