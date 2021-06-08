import axios from 'axios';
import { HOST_URL } from '../../../env';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';
import SearchShopCards from '../../../components/SearchShopCards';
import SearchBanner from '../../../components/SearchBanner';
import BackButton from '../../../components/BackButton';

const search = ({ shops, keyword }) => {
  return (
    <>
      <SearchBannerWrapper>
        <SearchBanner />
        <BackButton />
      </SearchBannerWrapper>
      <Container style={{ marginTop: '100px' }}>
        <Header>{shops.length} results found for </Header>
        <Header style={{ fontSize: 24, marginBottom: 20 }}>"{keyword}"</Header>
        <CardContainer>
          <SearchShopCards shops={shops} />
          {/* {JSON.stringify(shops)} */}
        </CardContainer>
      </Container>
    </>
  );
};

export const getServerSideProps = async (context) => {
  console.log(context.params.keyword);
  const getShops = await axios.get(HOST_URL + '/api/search', {
    params: {
        keyword: context.params.keyword
    }
  });
  return {
    props: {
      keyword: context.params.keyword,
      shops: getShops.data.data.shops 
    }
  };
};

const Header = styled.h4`
  margin: 10px 0;
`;

const CardContainer = styled.div`
  display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr) ) ;
`;

const SearchBannerWrapper = styled.div`
  z-index: 1000;
  position: fixed;
  top: 62px;
  .active {
    visibility: visible;
    transition: all 200ms ease-in;
  }
  .hidden {
    visibility: hidden;
    transition: all 200ms ease-out;
    transform: translate(0, -100%);
  }
`;

export default search;
