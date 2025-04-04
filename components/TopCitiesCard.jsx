import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { fetchCubeData } from "@/utils/cubeApi";

ChartJS.register(ArcElement, Tooltip, Legend);

const cityColors = ["#6c63ff", "#ff6f61", "#f9be4d", "#cfd8dc"];

const TopCitiesCard = ({ card }) => {
  const [thisMonthData, setThisMonthData] = useState([]);
  const [cityGrowths, setCityGrowths] = useState([]);
  const [totalGrowth, setTotalGrowth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queries = JSON.parse(card.query);

        // Fetch current month
        const resCurrent = await fetchCubeData([queries]);
        const currentData = resCurrent[0]?.data || [];

        // Fetch last month
        const lastMonthQuery = {
          ...queries,
          timeDimensions: [
            {
              ...queries.timeDimensions[0],
              dateRange: "Last month"
            }
          ]
        };
        const resLast = await fetchCubeData([lastMonthQuery]);
        const lastData = resLast[0]?.data || [];

        setThisMonthData(currentData);

        // Compute growth
        const growths = currentData.map((city, i) => {
          const current = Number(city["blinkit_insights_city.sales_mrp_sum"]);
          const last = Number(lastData[i]?.["blinkit_insights_city.sales_mrp_sum"] || 0);
          return last > 0 ? (((current - last) / last) * 100).toFixed(2) : 0;
        });

        setCityGrowths(growths);

        const totalCurrent = currentData.reduce((sum, c) => sum + Number(c["blinkit_insights_city.sales_mrp_sum"]), 0);
        const totalLast = lastData.reduce((sum, c) => sum + Number(c["blinkit_insights_city.sales_mrp_sum"]), 0);
        const overallGrowth = totalLast > 0 ? (((totalCurrent - totalLast) / totalLast) * 100).toFixed(1) : 0;

        setTotalGrowth(overallGrowth);
      } catch (error) {
        console.error("Error fetching Cube data:", error);
      }
    };

    fetchData();
  }, [card.query]);

  const totalSales = thisMonthData.reduce(
    (sum, city) => sum + Number(city["blinkit_insights_city.sales_mrp_sum"]),
    0
  );

  const formattedTotal = (totalSales / 100000).toFixed(1); // ₹xx.xL

  const labels = thisMonthData.map((city) => city["blinkit_insights_city.name"]);
  const values = thisMonthData.map((city) =>
    Number(city["blinkit_insights_city.sales_mrp_sum"])
  );

  const shares = values.map((v) => ((v / totalSales) * 100).toFixed(0));

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: cityColors,
        borderWidth: 0,
        cutout: "70%"
      }
    ]
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    rotation: -90,
    circumference: 180,
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <>
      <div className="donut-wrapper">
        <Doughnut data={chartData} options={options} />
        <div className="center-text">
            <div className="label">Total</div>
            <div className="total">₹{formattedTotal}L</div>
            <div className={`change ${totalGrowth >= 0 ? "up" : "down"}`}>
            {totalGrowth >= 0 ? "↑" : "↓"} {Math.abs(totalGrowth)}%
            </div>
        </div>
      </div>

      <div className="city-list">
        {thisMonthData.map((city, idx) => (
          <div className="city-row" key={idx}>
            <span className="dot" style={{ backgroundColor: cityColors[idx % cityColors.length] }}></span>
            <span className="name">{city["blinkit_insights_city.name"]}</span>
            <span className="value">₹{(values[idx] / 100000).toFixed(1)}L</span>
            <span className="share">{shares[idx]}%</span>
            <span
              className={`growth ${cityGrowths[idx] >= 0 ? "up" : "down"}`}
            >
              {cityGrowths[idx] >= 0 ? "↑" : "↓"} {Math.abs(cityGrowths[idx])}%
            </span>
          </div>
        ))}
      </div>
      </>
  );
};

export default TopCitiesCard;
