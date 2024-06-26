import React, { useState } from "react";
import { PFileFetcher, PTabBarComp } from "../../..";
import { useResponsive } from "../../../../hooks";
import { tabBarCardVariants } from "../../../../styles/variants";

const TabBarCardComp = ({ tabs, buttonTitle, size, onClick }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeSubTab, setActiveSubTab] = useState(
    activeTab.subTabs ? activeTab.subTabs[0] : null
  );

  const screenSize = useResponsive();
  const finalSize = size || screenSize;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab.subTabs) {
      setActiveSubTab(tab.subTabs[0]);
    } else {
      setActiveSubTab(null);
    }
  };

  const handleSubTabClick = (subTab) => {
    setActiveSubTab(subTab);
  };

  const [tabBlink, setTabBlink] = useState(false);

  return (
    <div
      onMouseEnter={() => setTabBlink(true)}
      onMouseLeave={() => setTabBlink(false)}
      className={tabBarCardVariants({ size: finalSize })}
    >
      <div className={tabBarCardVariants({ photoSize: finalSize })}>
        <PFileFetcher
          className="h-full w-full object-cover"
          fileName={(activeSubTab || activeTab).image}
        />
      </div>
      <div className={tabBarCardVariants({ mms: finalSize })}>
        <div>
          <div className="flex flex-col gap-3 justify-between">
            <PTabBarComp
              tabBlink={tabBlink}
              tabs={tabs}
              onTabClick={handleTabClick}
            />
            {activeTab.subTabs && (
              <PTabBarComp
                tabBlink={tabBlink}
                tabs={activeTab.subTabs}
                onTabClick={handleSubTabClick}
              />
            )}
          </div>
          <div className="px-6">
            <h6 className={tabBarCardVariants({ title: finalSize })}>
              {(activeSubTab || activeTab).title}
            </h6>
            <h4 className={tabBarCardVariants({ subtitle: finalSize })}>
              {(activeSubTab || activeTab).subtitle}
            </h4>
            <p className={tabBarCardVariants({ description: finalSize })}>
              {(activeSubTab || activeTab).description}
            </p>
          </div>
        </div>
        {activeTab.href && (
          <button
            className="inline-block mt-4 group w-auto"
            onClick={() => onClick(activeTab.href)}
          >
            <div className="flex items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-secondary_blue transition-all hover:bg-secondary_blue/10 active:bg-secondary_blue/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              {buttonTitle}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default TabBarCardComp;
