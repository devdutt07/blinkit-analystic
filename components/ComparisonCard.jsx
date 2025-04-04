import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
} from "chart.js";
import { fetchCubeData } from "@/utils/cubeApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
);

const ComparisonCard = ({ card }) => {
  const [thisMonthData, setThisMonthData] = useState([]);
  const [lastMonthData, setLastMonthData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queries = JSON.parse(card.query);
        const res = await fetchCubeData(queries);

        if (res?.length === 2) {
          const thisMonth = res[0].data || [];
          const lastMonth = res[1].data || [];
  
          const measureKey = Object.keys(lastMonth[0] || {}).find(
            key => key.includes("sales_mrp_sum") || key.includes("qty_sold")
          );

          // Extract values
          const thisMonthSales = thisMonth.map(item =>
            Number(item[measureKey])
          );
  
          const lastMonthSales = lastMonth.map(item =>
            Number(item[measureKey])
          );
  
          // Extract date labels from this month only (can be adjusted)
          const xLabels = lastMonth.map(item => {
            const date = new Date(item["blinkit_insights_sku.created_at"]);
            return date.getDate().toString().padStart(2, "0");
          });
  
          setLabels(xLabels);
          setThisMonthData(thisMonthSales);
          setLastMonthData(lastMonthSales);
        }
      } catch (error) {
        console.error("Error fetching Cube data:", error);
      }
    };
  
    fetchData();
  }, [card.query]);
  

  const totalThis = thisMonthData.reduce((a, b) => a + b, 0);
  const totalLast = lastMonthData.reduce((a, b) => a + b, 0);
  const growth = totalLast ? (((totalThis - totalLast) / totalLast) * 100).toFixed(1) : "0.0";

  const chartData = {
    labels,
    datasets: [
      {
        label: "This Month",
        data: thisMonthData,
        borderColor: "#0f9d58",
        backgroundColor: "rgba(15, 157, 88, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      },
      {
        label: "Last Month",
        data: lastMonthData,
        borderColor: "#ea4335",
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 0,
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `₹${ctx.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => value.toFixed(1)
        },
        grid: {
          drawTicks: false,
          color: "#eee"
        }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  return (
    <>
        <div className="summary">
            <div className="left">
                <div className="amount">₹{totalThis.toFixed(2)}</div>
            </div>
            <div className="right">
                <div className={`growth ${growth >= 0 ? "up" : "down"}`}>
                    {growth >= 0 ? "↑" : "↓"} {Math.abs(growth)}%
                </div>
                <div className="subtext">vs ₹{totalLast.toFixed(2)} last month</div>
            </div>
        </div>

        <div className="chart-wrapper">
            <Line data={chartData} options={options} />
            <div className="legend">
                <span className="green-dot"></span> This Month
                <span className="orange-dot"></span> Last Month
            </div>
        </div>
    </>
  );
};

export default ComparisonCard;
