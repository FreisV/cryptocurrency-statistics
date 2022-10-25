import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { HistoryType } from "~/types/cryptocurrencies";
import { StyledLine } from "./styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

enum months {
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
}

type ChartProps = {
  name: string;
  history: HistoryType[];
};

const getLabel = (el: HistoryType) => {
  const date = new Date(el.time);

  const hours = date.getHours();
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month} ${hours}:00`;
};

const Chart = ({ name, history }: ChartProps) => {
  const labels = history.map((el) => getLabel(el));

  const values = history.map((el) => parseFloat(el.priceUsd));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "History of price",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: name,
        data: values,
        borderColor: "rgb(99, 180, 255)",
        backgroundColor: "rgba(99, 167, 255, 0.5)",
      },
    ],
  };

  return <StyledLine options={options} data={data} />;
};

export default Chart;
