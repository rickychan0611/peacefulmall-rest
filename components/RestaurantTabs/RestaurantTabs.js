import React from 'react';
import { List, Label, Tab } from 'semantic-ui-react';
import RestaurantMenu from '../RestaurantMenu/RestaurantMenu';
import ReviewFeed from '../ReviewFeed/index.js';
import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import {
  selections as selectionsAtom,
  selectedItem as itemAtom,
  activeTabIndex as activeTabAtom
} from '../../data/atoms.js';

const RestaurantTabs = ({ labelRef }) => {
  const [activeTabIndex, setActiveTabIndex] = useRecoilState(activeTabAtom);

  const handleTabChange = (e, { activeIndex }) => {
    console.log(activeIndex);
    setActiveTabIndex(activeIndex);
  };

  const panes = [
    {
      menuItem: { icon: 'food', content: 'Full Menu' },
      pane: {
        key: 'menu',
        content: <RestaurantMenu labelRef={labelRef} />
      }
    },
    {
      menuItem: { icon: 'star', content: 'Reviews' },
      pane: {
        key: 'review',
        content: (
          <Container>
            <ReviewFeed />
          </Container>
        )
      }
    },
    {
      menuItem: { icon: 'newspaper outline', content: 'Feature Articles' },
      pane: {
        key: 'article',
        content: <Container>This tab will contain Feature Articles</Container>
      }
    }
  ];

  return (
    <Tab
      panes={panes}
      renderActiveOnly={false}
      activeIndex={activeTabIndex}
      onTabChange={handleTabChange}
    />
  );
};

const Container = styled.div`
  overflow-y: scroll;
  height: 77vh;
  scroll-behavior: smooth;
`;

export default RestaurantTabs;
