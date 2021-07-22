import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Icon } from 'semantic-ui-react';

const Shop_Desktop = () => {
  const router = useRouter();
  const url = '/shop/' + currentShop.name + '/' + currentShop.id

  return (
    <div>
      {/************* Photo Gallery ***********/}
      <Wrapper>
        <Title>
          <Icon name="photo" size="small" style={{ marginRight: 10 }} />
          Photo Gallery
        </Title>
        <Button onClick={() => router.push(url + '/photos')}> View All Photos </Button>
      </Wrapper>

      <ImageRow>
        <ImageWrapper>
          {result && result.popular && result.popular.map((item, i) => {
            return (
              <>{item.images && item.images[0] ? (
                <>
                  {i < 4 && <>
                    <Img src={process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + JSON.parse(item.images)[0]} />
                  </>
                  }
                  {i === result.popular.length - 1 &&
                    <LastImg>
                      <Img style={{ opacity: 0.3 }} src={process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + JSON.parse(item.images)[0]} />
                      <Num>10+</Num>
                    </LastImg>
                  }
                </>
              ) : (
                <Img src="/no-image.png" />
              )}</>
            )
          })}
        </ImageWrapper>
      </ImageRow>
    </div >
  );
};

const Button = styled.div({
  margin: 5,
  padding: "6px 15px",
  cursor: "pointer",
  textAlign: "center",
  borderRadius: 25,
  fontSize: 12,
  fontWeight: "bold",
  // backgroundColor: "#e8ebe9",
  color: "black",
  border: "1px solid grey"
});
const LastImg = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
const Num = styled.div`
  position: absolute;
  color: white;
  font-size: 30px;
  font-weight: bold;
  `;
const ImageRow = styled.div`
  position: relative;
  width: 100%;
  max-width: 965px;
  /* height: 180px; */
  margin-Bottom: 50px;
`;
const ImageWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  `;
const Img = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 20px;
`;
const Title = styled.h2`
color: "black";
margin: 0 20px 0 0;
display: flex;
align-items: center;
`;
export default Shop_Desktop;
