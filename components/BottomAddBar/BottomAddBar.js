import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import _ from 'lodash';

const BottomAddBar = ({qty, setQty}) => {

  return (
    <>
      <BottomBar>
        <QtyContainer>
          <Icon
            name="minus circle"
            size="large"
            onClick={() => {
              qty > 0 && setQty(qty-1);
            }}
          />
          <QtyNum>{qty}</QtyNum>
          <Icon
            name="plus circle"
            size="large"
            onClick={() => {
              setQty(qty+1);
            }}
          />
        </QtyContainer>

        <QtyContainer>
          <AddButton>ADD - ${qty > 0 ? qty * 13 : 0}</AddButton>
        </QtyContainer>
      </BottomBar>
    </>
  );
};

const BottomBar = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 70px;
  background-color: white;
  border-top: solid 1px #d1d1d1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;
const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  background-color: #ff614d;
  color: white;
  font-weight: bold;
  padding: 10px 25px 10px 25px;
  border-radius: 25px;
`;
const QtyContainer = styled.div`
  margin: 0 10px 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;
const QtyNum = styled.h3`
  margin: 0;
  display: inline-block;
  margin: 0 10px 0 10px;
`;

export default BottomAddBar;
