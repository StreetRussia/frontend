import React from 'react';
import styles from './Upcoming.module.scss';
import type { CardEventData } from '@/type/type';
import { CardEvent } from '@components/index';

interface CardsEventsProps {
  eventsToRender: CardEventData[];
  pageEvents: boolean;
}

export const Upcoming: React.FC<CardsEventsProps> = ({
  eventsToRender,
  pageEvents,
}) => {
  return (
    <section className={styles.upcoming}>
      <h2 className={styles.title}>БЛИЖАЙШИЕ СОБЫТИЯ</h2>
      <div className={styles.events}>
        {eventsToRender.slice(0, 1).map(card => (
          <CardEvent
            key={card.id}
            data={card}
            size="big"
            pageEvents={pageEvents}
          />
        ))}
        <ul className={styles.list}>
          {eventsToRender.slice(1, 3).map(card => (
            <CardEvent
              key={card.id}
              data={card}
              size="small"
              pageEvents={pageEvents}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
