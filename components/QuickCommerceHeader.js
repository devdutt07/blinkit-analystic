import React from 'react';
import styles from '../styles/QuickCommerceHeader.module.css';

export default function QuickCommerceHeader({ selectedChannels = [], dateRange, onDateChange }) {
    return (
        <div className={styles.headerContainer}>
            {/* Top bar */}
            <div className={styles.topBar}>
                <h2 className={styles.title}>Quick Commerce</h2>

                <div className={styles.actions}>
                    <button className={styles.iconButton}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 3v18h18" />
                            <polyline points="4 14 8 10 12 13 16 6 20 10" />
                        </svg>
                        <div className={styles.toggle}>
                            <div className={styles.toggleCircle}></div>
                        </div>
                    </button>
                    <div className={styles.datePicker}>
                        <svg
                            className={styles.dateIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{dateRange}</span>
                        <span className={styles.dropdownArrow}>▼</span>
                    </div>
                </div>
            </div>
            {/* Channel selectors */}
            <div className={styles.channelTabs}>
            <button className={`${styles.channelBtn} ${selectedChannels.includes('Blinkit') ? styles.active : ''}`}>
                <img src="/blinkit.png" alt="Blinkit Logo" className={styles.logo} />
                Blinkit
                </button>

                <button className={styles.disabled}>
                <img src="/zepto.png" alt="Zepto Logo" className={styles.logo} />
                Zepto
                </button>

                <button className={styles.disabled}>
                <img src="/Swiggy-Logo-png.png" alt="Instamart Logo" className={styles.logo} />
                Instamart
            </button>
            </div>
        </div>
    );
}
