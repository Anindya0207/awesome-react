import React, { useEffect, useRef } from 'react';
import { Flex1 } from '../../Flex';
import './Carousal.css';
import { Box } from '@mui/material';

const itemWidth = 600;
const Carousal: React.FC<{}> = () => {
  let interval = useRef<any>(null);
  useEffect(() => {
    const container = document.querySelector('#container');
    if (container) {
      let children = container?.children;
      let firstClone = children[0].cloneNode(true);
      let lastClone = children[children.length - 1].cloneNode(true);
      container.prepend(firstClone);
      container.append(lastClone);
      let scrollWidth = container.scrollWidth;
      let offset = itemWidth;
      container.scrollLeft = itemWidth;
      const autoPlay = () => {
        offset += itemWidth;
        container.scrollTo({ left: offset, behavior: 'smooth' });
        setTimeout(() => {
          if (offset >= scrollWidth - itemWidth) {
            container.scrollLeft = itemWidth;
            offset = itemWidth;
          }
          if (offset <= 0) {
            container.scrollLeft = scrollWidth - 2 * itemWidth;
            offset = scrollWidth - 2 * itemWidth;
          }
        }, 500);
      };
      setInterval(() => autoPlay(), 2000);
    }

    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, []);
  return (
    <Box className="container" id="container">
      <img
        className="carousal"
        loading="lazy"
        src="https://www.petlandtexas.com/wp-content/uploads/2016/08/Red_Bunny_Petland_Puppy.jpg"
      />
      <img
        className="carousal"
        loading="lazy"
        src="https://bestfriends.org/sites/default/files/2023-02/Victory3427MW_Social.jpg"
      />
      <img
        className="carousal"
        loading="lazy"
        src="https://www.simplemost.com/wp-content/uploads/2016/04/AdobeStock_57941839-e1461087232448.jpeg"
      />
      <img
        className="carousal"
        loading="lazy"
        src="https://d.newsweek.com/en/full/2035920/husband-builds-home-baby-bunnies.jpg?w=1200&f=4bb0ded06040b813a8724de42f6bac3c"
      />
      <img
        className="carousal"
        loading="lazy"
        src="https://img.freepik.com/premium-photo/curious-baby-bunny-exploring-flowerfilled-meadow_954355-388.jpg"
      />
    </Box>
  );
};

export default Carousal;
