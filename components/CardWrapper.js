import React from 'react';
import LineChartContainer from './charts/LineChartContainer';
import SemiPieChartContainer from './charts/SemiPieChartContainer';
import TableContainer from './tables/TableContainer';
import SalesLineChart from './SalesLineChart';
import ComparisonCard from './ComparisonCard';
import TopCitiesCard from './TopCitiesCard';
import SkuLevelTable from './SkuLevelTable';

export default function CardWrapper({ card }) {
  // We'll place the card in a 12-column grid, using w from card.gridStackProperties:
  const width = card.gridStackProperties.w;

  return (
    <div
      className={`${card.visualizationType === "table" ? 'sku-table-container' : 'card'}`}
      style={{
        gridColumn: `span ${width}`,
        // Add more styling to match Figma layout
      }}
    >
        <div className="card-header">
          <h3>{card.title}</h3>
          {card.visualizationType === 'linechart' && <ComparisonCard card={card} />}
          {card.visualizationType === 'semipiechart' && <TopCitiesCard  card={card} />}
          {card.visualizationType === 'table' && <SkuLevelTable card={card} />}
        </div>
      </div>
  );
}
