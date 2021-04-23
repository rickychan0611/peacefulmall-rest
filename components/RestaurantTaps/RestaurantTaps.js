import React from 'react';
import { List, Label, Tab } from 'semantic-ui-react';
import RestaurantMenu from '../RestaurantMenu/RestaurantMenu';

const RestaurantTaps = ({ labelRef }) => {
  const panes = [
    {
      menuItem: {icon: "food", content: 'Full Menu'},
      pane: {
        key: 'Menu',
        content: <RestaurantMenu labelRef={labelRef} />
      }
    },
    {
      menuItem: {icon: "star", content: 'Reviews'},
      pane: {
        key: 'tab2',
        content: 'This tab has center-aligned text',
        textAlign: 'center'
      }
    },
    {
      menuItem: {icon: "newspaper outline", content: 'Feature Articles'},
      pane: {
        key: 'tab3',
        content: (
          <div>
            This tab contains a <Label>Features</Label> element
          </div>
        )
      }
    }
  ];

  return <Tab panes={panes} renderActiveOnly={false} />;
};

export default RestaurantTaps;
