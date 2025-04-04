import React, {useEffect, useState} from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

const SalesLineChart = ({ card }) => {
  const [salesData, setSalesData] = useState([]);
  const [totalValue, setTotalValue] = useState(null);
    useEffect(() => {
        // For linechart, card.query is JSON string with 2 queries [0]= totals, [1]=timeseries
        const queries = JSON.parse(card.query);
    
        async function loadData() {
          try {
            // 1) totals
            const totalRes = await fetchCubeData(queries[0]);
            if (totalRes.length > 0) {
              // pick the measure from the first row
              const sumVal = totalRes[0]['blinkit_insights_sku.sales_mrp_sum'] || 0;
              setTotalValue(sumVal);
            }
            // 2) timeseries
            const tsRes = await fetchCubeData(queries[1]);
            const shapedData = tsRes.map((row) => ({
              date: row['blinkit_insights_sku.created_at'],
              value: row['blinkit_insights_sku.sales_mrp_sum']
            }));
            setSalesData(tsRes);
          } catch (e) {
            console.error(e);
          }
        }
        loadData();
      }, [card.query]);

  const labels = salesData.map((entry) =>
    new Date(entry["blinkit_insights_city.created_at"]).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short"
    })
  );

  const values = salesData.map((entry) =>
    Number(entry["blinkit_insights_city.sales_mrp_sum"])
  );

  const data = {
    labels,
    datasets: [
      {
        label: "MRP Sales (₹)",
        data: values,
        fill: true,
        borderColor: "#0070f3",
        backgroundColor: "rgba(0, 112, 243, 0.1)",
        tension: 0.3,
        pointRadius: 3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `₹${value}`
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesLineChart;
