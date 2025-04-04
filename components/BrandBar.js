import React from 'react';
import Image from 'next/image';
import styles from '../styles/BrandBar.module.css';

export default function BrandBar() {
  return (
    <div className={styles.brandBarContainer}>
      {/* Top brand icons */}
      <div className={styles.brandIcons}>
        {/* Example brand icons */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="12" fill="#FCEEEE" stroke="#00A14B" stroke-width="2"/>
          <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="10" font-family="Arial" fill="#333">
            perfora
          </text>
        </svg>
        <svg width="80" height="48" viewBox="0 0 160 48" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" rx="12" fill="white" stroke="#E5E7EB" />
          <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#00ADEF">mama</text>
          <text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#8BC34A">earth</text>
        </svg>
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="12" fill="#111" />
          <polygon points="24,8 28,24 20,24" fill="red" />
          <rect x="14" y="28" width="20" height="2" fill="red" />
        </svg>

        {/* Add new brand button */}
        <button className={styles.addBrandBtn}>+</button>
      </div>

      {/* Bottom icons for people & user */}
      <div className={styles.bottomSection}>
        {/* People icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        {/* Logged-in user avatar "SS" */}
        <div className={styles.userAvatar}>SS</div>
      </div>
    </div>
  );
}
