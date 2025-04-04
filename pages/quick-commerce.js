import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import hiringTaskJson from '../data/hiring-task.json';
import LineChartContainer from '../components/charts/LineChartContainer';
import SemiPieChartContainer from '../components/charts/SemiPieChartContainer';
import TableContainer from '../components/tables/TableContainer';

import styles from '../styles/QuickCommerce.module.css';

export default function QuickCommercePage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // 1) sort the cards by x
    const sorted = [...hiringTaskJson.cards].sort(
      (a, b) => a.gridStackProperties.x - b.gridStackProperties.x
    );
    setCards(sorted);
  }, []);

  return (
    <Layout>
      <div className={styles.pageHeader}>
        <h2>Quick Commerce</h2>
        {/* Example brand toggles, date range, etc. */}
        <div className={styles.topControls}>
          <button className={styles.activeBrand}>Blinkit</button>
          <button>Zepto</button>
          <button>Instamart</button>
          <div className={styles.toggleWrapper}>
            <input type="checkbox" defaultChecked />
          </div>
          <div className={styles.dateRangePicker}>
            <span>Aug 01, 2024 - Aug 03, 2024</span>
          </div>
        </div>
      </div>

      <div className={styles.cardsGrid}>
        {cards.map((card) => {
          if (!card.active) return null;
          return (
            <div
              key={card.id}
              className={styles.dashboardCard}
              style={{
                gridColumn: `span ${card.gridStackProperties.w}`, // 12-col system
              }}
            >
              {/* Render based on visualizationType */}
              {card.visualizationType === 'linechart' && <LineChartContainer card={card} />}
              {card.visualizationType === 'semipiechart' && <SemiPieChartContainer card={card} />}
              {card.visualizationType === 'table' && <TableContainer card={card} />}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
