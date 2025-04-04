// CollapsibleSidebar.js
import React, { useState } from 'react';
import styles from '../styles/CollapsibleSidebar.module.css';

export default function CollapsibleSidebar({isOpen, toggleSidebar}) {
  const [channelsOpen, setChannelsOpen] = useState(true);

  const toggleChannels = () => {
    setChannelsOpen((prev) => !prev);
  };

  return (
    <div className={`${styles.sidebarContainer}`}>
      {/* Header section */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          {/* Capsule */}
          <div className={styles.capsule}>
            <div className={styles.avatar}>SS</div>
            {isOpen && <><span className={styles.brandText}>Test_brand</span>
            <div className={styles.chevrons}>
              <span>▲</span>
              <span>▼</span>
            </div></>}
          </div>

          {/* Toggle */}
          <button className={styles.toggleBtn} onClick={toggleSidebar}>
            {isOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00785A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="11 17 6 12 11 7" />
                <polyline points="18 17 13 12 18 7" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00785A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Main nav */}
      <div className={styles.menuItem}>
        <nav className={styles.navMenu}>
            <ul>
            <li>
                <div className={styles.menuItem}>
                <svg className={!isOpen ? styles.iconLarge : ''} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                {isOpen && <span>Overview</span>}
                </div>
            </li>
            <li>
                <div className={styles.menuItem} onClick={toggleChannels}>
                <svg className={!isOpen ? styles.iconLarge : ''} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {isOpen && <><span>Channels</span>
                <span className={styles.chevron}>{channelsOpen ? '▲' : '▼'}</span></>}
                </div>
                
                {isOpen &&channelsOpen && (
                <ul className={styles.subMenu}>
                    <li>Meta Ads</li>
                    <li>Google Ads</li>
                    <li className={styles.highlight}>Quick Commerce</li>
                </ul>
                )}
            </li>
            <li>
                <div className={styles.menuItem}>
                <svg className={!isOpen ? styles.iconLarge : ''} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <path d="M3 9h18M9 21V9" />
                </svg>
                {isOpen &&<span>Creatives</span>}
                </div>
            </li>
            </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.menuItem}>
            <div className={styles.footerItem}>
                <svg className={!isOpen ? styles.iconLarge : ''} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                {isOpen &&<span>Help</span>}
            </div>
        </div>
        <div className={styles.menuItem}></div>
            <div className={styles.footerItem}>
                <svg className={!isOpen ? styles.iconLarge : ''} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                {isOpen &&<span>Settings</span>}
            </div>
        </div>
      </div>
    // </div>
  );
}