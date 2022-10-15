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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartProps = {
  name: string;
  labels: string[];
  values: number[];
}

const Chart = ({name, labels, values} : ChartProps) => {
  const options = {
    responsive: true,
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

  return <Line options={options} data={data} />;
};

export default Chart;
