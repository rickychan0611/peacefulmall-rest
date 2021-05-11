import { Label, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useIsMobile from '../../util/useIsMobile';

import { useRecoilState } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';
import {
  currentItem as currentItemAtom,
  currentStore as currentStoreAtom,
  currentCat as currentCatAtom
} from '../../data/atoms.js';

const SliderTitle = ({ title, hideViewAll, icon }) => {
  const isMobile = useIsMobile();
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const [currentCat, setCurrentCat] = useRecoilState(currentCatAtom);

  const router = useRouter();

  return (
    <>
      <SpaceBetween>
        <Container>
          <Title isMobile={isMobile}>
            {icon && <Icon name={icon} size="small" style={{ marginRight: 10 }} />}
            {title}
          </Title>
        </Container>

        <a
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelections((prev) => ({ ...prev, category: title }));
            router.push({
              pathname: '/[cuisine]/[category]',
              query: { cuisine: selections.cuisine, category: title }
            });
          }}>
          {!hideViewAll && 'View All >'}
        </a>

      </SpaceBetween>
      <Row>
        {currentCat && currentCat.category_name &&
          <>
            Showing: {currentCat.category_name} &nbsp;	&nbsp;	
            <Icon name="times circle" color="grey" onClick={() => setCurrentCat(null)} />
          </>
        }
      </Row>
    </>
  );
};

const SpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 0 0px 0;
`;
const Title = styled.h2`
  font-size: ${p => p.isMobile ? "5.7vw" : ""};
  color: "black";
  margin: 0 10px 0 0;
  display: flex;
  align-items: center;
`;

export default SliderTitle;
