import React, { useState } from 'react';
import './MenuBar.css';

interface MenuItem {
  label: string;
  subItems?: string[];
}

const menuData: MenuItem[] = [
  { label: 'Home' },
  { label: 'About', subItems: ['Our Team', 'Mission', 'Careers'] },
  { label: 'Services', subItems: ['Consulting', 'Sales', 'Support'] },
  { label: 'Contact' },
];

const MenuBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  return (
    <div className="menu-bar">
      {menuData.map((item, index) => (
        <div
          key={index}
          className="menu-item"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <span>{item.label}</span>
          {item.subItems && activeIndex === index && (
            <div className="sub-menu">
              {item.subItems.map((subItem, subIndex) => (
                <div key={subIndex} className="sub-menu-item">
                  {subItem}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
