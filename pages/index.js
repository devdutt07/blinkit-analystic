import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CardWrapper from '../components/CardWrapper';
import hiringTaskJson from '../data/hiring-task.json';

export default function Home() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // 1) Sort the 'cards' array by gridStackProperties.x so they appear in increasing order
    const sortedCards = [...hiringTaskJson.cards].sort(
      (a, b) => a.gridStackProperties.x - b.gridStackProperties.x
    );
    setCards([...hiringTaskJson.cards]);
  }, []);

  return (
    <Layout>
      <div className="cards-container">
        {cards.map((card) => {
          // 2) If card is not active, skip rendering
          if (!card.active) return null;
          // 3) Render each card using a dedicated component
          return <CardWrapper key={card.id} card={card} />;
        })}
      </div>
    </Layout>
  );
}
