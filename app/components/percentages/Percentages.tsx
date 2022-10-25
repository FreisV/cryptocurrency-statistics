import { GreenSpan, NoWrapSpan, RedSpan } from "../styles/styles";

type PercentagesProps = {
  percentages: number | null;
};

const Percentages = ({ percentages }: PercentagesProps) => {
  if (percentages === null) {
    return <NoWrapSpan>none</NoWrapSpan>;
  }

  if (percentages > 0) {
    return <GreenSpan>{percentages} %</GreenSpan>;
  }

  if (percentages < 0) {
    return <RedSpan>{percentages} %</RedSpan>;
  }

  return <NoWrapSpan>{percentages} %</NoWrapSpan>;
};

export default Percentages;
