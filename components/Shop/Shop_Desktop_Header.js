import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { currentShop as currentShopAtom } from '../../data/atoms';

const Shop_Desktop_Header = () => {
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);

  return (
    <>
      {currentShop &&
        <Wrapper>
          {currentShop?.logo ? (
            <Avatar src={process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + currentShop.logo} />
          ) : (
            <Avatar src="/avatar-placeholder.png" />
          )}
          <div style={{ width: 'calc(100% - 50px)' }}>
            <Title>{currentShop?.name}</Title>
            <Description>{currentShop?.description}</Description>
          </div>
        </Wrapper>
      }
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 30px;
`;
const Avatar = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: solid 2px white;
  height: 60px;
  width: 60px;
  object-fit: contain;
  box-shadow: 0px 0px 5px#a5a5a5;
  margin-right: 20px;
`;
const Title = styled.h2`
  color: "black";
  margin: 0 10px 0 0;
  display: flex;
  align-items: center;
`;
const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 30px;
`;
export default Shop_Desktop_Header;
