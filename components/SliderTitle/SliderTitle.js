import { Label, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import  { useIsMobile } from '../../util/useScreenSize';

import { useRecoilState } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';
import {
  currentCat as currentCatAtom,
  catChange as catChangeAtom
} from '../../data/atoms.js';

const SliderTitle = ({ title, hideViewAll, icon }) => {
  const isMobile = useIsMobile();
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const [currentCat, setCurrentCat] = useRecoilState(currentCatAtom);
  const [catChange, setCatChange] = useRecoilState(catChangeAtom);

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

      <Showing>
        {currentCat && currentCat.category_name &&
          <ShowingButton>
            Showing : {currentCat.category_name} &nbsp;	&nbsp;	
            <Icon name="times" color="white" onClick={() => {
              setCatChange(true)
              setCurrentCat(null)
              }} />
          </ShowingButton>
        }
      </Showing>
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
const Showing = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-top: 5px;
`;
const ShowingButton = styled.div`
  background-color: #292929;
  border-radius: 15px;
  padding: 2px 6px 2px 12px; 
  color: white;
  font-weight: bold;
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
