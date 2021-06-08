import { useEffect } from 'react';
import axios from 'axios';
import { HOST_URL } from '../../../env';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';
import SearchShopCards from '../../../components/SearchShopCards';
import SearchBanner from '../../../components/SearchBanner';
import BackButton from '../../../components/BackButton';
import { useIsMobile } from '../../../util/useScreenSize';
import { useRecoilState } from 'recoil';
import { 
  searchValue as searchValueAtom,
} from '../../../data/atoms';

const search = ({ shops, keyword }) => {
  const isMobile = useIsMobile();
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtom);

  useEffect( ()=>{
    setSearchValue(keyword);
    return () => setSearchValue();
  },[keyword] )

  return (
    <>
      <SearchBannerWrapper>
        <SearchBanner />
        <BackButton />
      </SearchBannerWrapper>
      <Container style={{ marginTop: 100, paddingBottom: 50 }}>
        <Header>{shops.length} results found for </Header>
        <Header style={{ fontSize: 24, marginBottom: 20 }}>"{keyword}"</Header>
        <CardContainer isMobile={isMobile}>
          <SearchShopCards shops={shops} />
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
    grid-gap:  ${p => p.isMobile ? "10px" : "20px"};
    grid-template-columns: ${p => p.isMobile ? "repeat(auto-fill, minmax(150px, 1fr))" : "repeat(auto-fill, minmax(180px, 1fr))"} ;
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
