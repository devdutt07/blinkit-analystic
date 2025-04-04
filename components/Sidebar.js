import React from 'react';
import Image from 'next/image';
import styles from '../styles/Sidebar.module.css';

/*
   Replace /icons/... with your actual icon files in public/icons/
   For example, mamaearth.svg, brand2.svg, home.svg, channels.svg, etc.
*/
export default function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>

      {/* TOP SECTION */}
      <div>
        <div className={styles.topSection}>

          {/* Brand dropdown row */}
          <div className={styles.brandDropdownRow}>
            <div className={styles.brandCircle}>SS</div>
            <div className={styles.brandNameSelect}>
              <span>Test_brand</span>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l4-4H2l4 4z"></path>
              </svg>
            </div>
            <div className={styles.collapseArrow}>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 6l-6 6-6-6"></path>
              </svg>
            </div>
          </div>

          {/* Left brand icons */}
          <div className={styles.leftBrandIcons}>
            <Image src="/icons/mamaearth.svg" alt="Mama Earth" width={32} height={32} />
            <Image src="/icons/brand2.svg" alt="Brand2" width={32} height={32} />
            <button>+</button> {/* Add new brand button */}
          </div>

          {/* Menu section */}
          <div className={styles.menuSection}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Image src="/icons/home.svg" alt="home" width={20} height={20} />
                <span>Overview</span>
              </li>

              <li className={styles.navItem}>
                <Image src="/icons/channels.svg" alt="channels" width={20} height={20} />
                <span>Channels</span>
              </li>
              {/* Submenu for Channels */}
              <ul className={styles.subMenu}>
                <li>Meta Ads</li>
                <li>Google Ads</li>
              </ul>

              <li className={styles.navItem} style={{ background: '#F2FAF8' }}>
                <Image src="/icons/quick-commerce.svg" alt="quick commerce" width={20} height={20} />
                <span>Quick Commerce</span>
              </li>

              <li className={styles.navItem}>
                <Image src="/icons/creatives.svg" alt="creatives" width={20} height={20} />
                <span>Creatives</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className={styles.footerSection}>
        <div className={styles.footerLinks}>
          <div className={styles.footerLinkItem}>
            <Image src="/icons/help.svg" alt="help" width={18} height={18} />
            <span>Help</span>
          </div>
          <div className={styles.footerLinkItem}>
            <Image src="/icons/settings.svg" alt="settings" width={18} height={18} />
            <span>Settings</span>
          </div>
        </div>
        <div className={styles.userAvatarRow}>
          <div className={styles.userAvatarCircle}>SS</div>
        </div>
      </div>

    </div>
  );
}
