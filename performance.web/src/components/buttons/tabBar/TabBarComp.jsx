import React, { useState } from 'react';

const TabBarComp = ({ tabs, onTabClick, className, tabBlink }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    onTabClick(tab);
  };

  return (
    <div className={`flex border-b w-full flex-wrap ${className}`}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`${tabBlink && 'blinking'} text-xs sm:text-sm lg:text-lg xl:text-xl px-4 py-2 focus:outline-none hover:bg-primary_blue_transparent_hover ${activeTab === tab.id ? 'border-b-[3px] border-primary_blue' : ''}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default TabBarComp;