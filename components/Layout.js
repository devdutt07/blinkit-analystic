import React, { useState } from 'react';
import BrandBar from './BrandBar';
import CollapsibleSidebar from './CollapsibleSidebar';
import QuickCommerceHeader from './QuickCommerceHeader';

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
      setIsOpen((prev) => !prev);
    };
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left brand bar */}
      <BrandBar />
      {/* Main collapsible sidebar */}
      <CollapsibleSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      {/* Main content area */}
      <div style={{ flex: 1, padding: '1rem', marginLeft: isOpen ? '14.5%' : '9.8%' }}>
      <QuickCommerceHeader
          selectedChannels={['Blinkit']}
          dateRange="Aug 01, 2024 - Aug 03, 2024"
          onDateChange={() => console.log('Date changed')}
        />
        {children}
      </div>
    </div>
  );
}
