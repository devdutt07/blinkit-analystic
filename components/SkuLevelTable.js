import React, { useEffect, useState } from "react";
import { fetchCubeData } from "@/utils/cubeApi";
import "./../styles/SkuTable.css";

const SkuLevelTable = ({ card }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const queries = JSON.parse(card.query);
        const res = await fetchCubeData(queries[0]);
        const resultData = res[0]?.data || [];

        setData(resultData);

        // dynamically pull column info from datatableProperties
        const visibleColumns = card.datatableProperties.columnsVisible;
        const order = card.datatableProperties.columnOrder.filter(
          (key) => visibleColumns[key] !== false
        );

        const formattedColumns = order.map((key) => ({
          key,
          label: key.split(".").pop().replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        }));

        setColumns(formattedColumns);
      } catch (err) {
        console.error("Error loading data", err);
      }
    };

    loadData();
  }, [card.query]);

  const getTotal = (key) => {
    return data.reduce((sum, row) => {
      const val = parseFloat(row[key]);
      return isNaN(val) ? sum : sum + val;
    }, 0);
  };

  return (
    <>
      <p>{card.description}</p>

      <div className="sku-table-wrapper">
        <table className="sku-table">
          <thead>
            <tr>
              <th></th>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td><input type="checkbox" className="sku-checkbox" /></td>
                {columns.map((col) => (
                  <td key={col.key}>
                    {row[col.key] !== null && row[col.key] !== undefined
                      ? formatValue(row[col.key], col.key)
                      : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={2}>Total</td>
              {columns.slice(1).map((col) => (
                <td key={col.key}>
                  {isNumericColumn(col.key)
                    ? formatValue(getTotal(col.key), col.key)
                    : "-"}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

function formatValue(value, key) {
  const num = parseFloat(value);
  if (key.includes("sales") || key.includes("price")) {
    return `₹${num.toLocaleString()}`;
  } else if (key.includes("availability") || key.includes("discount")) {
    return `${num.toFixed(2)}%`;
  } else if (key.includes("inv_qty")) {
    return Math.round(num).toLocaleString();
  } else if (!isNaN(num)) {
    return num.toFixed(2);
  }
  return value;
}

function isNumericColumn(key) {
  return ["sales", "price", "qty", "rank", "discount", "inv"].some((k) =>
    key.includes(k)
  );
}

export default SkuLevelTable;