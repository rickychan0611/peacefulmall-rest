import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';
import {
  articles as articlesAtom,
  selectedPage as selectedPageAtom
} from '../../data/atoms';

import { Grid, Icon } from 'semantic-ui-react';
import EditorCards from '../EditorCards';
import ShopSideBar from '../ShopSideBar';
import Shop_Desktop_Header from './Shop_Desktop_Header';

const Shop_Desktop_Article_Index = () => {
  const [articles, setArticles] = useRecoilState(articlesAtom);
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageAtom);
  
  setSelectedPage("articles")

  return (
    <div>
      <Grid>
        <Grid.Column width={4} style={{ paddingBottom: 100 }}>
          <ShopSideBar />
        </Grid.Column>

        <Grid.Column width={12} style={{ padding: '30px 20px 80px 20px' }}>
          <div>
            <Shop_Desktop_Header />
            <Wrapper>
              <Title>
                <Icon name="newspaper" size="small" style={{ marginRight: 10 }} />
                Featured Articles
              </Title>
            </Wrapper>
            <CardContainer>
              {articles && articles.length !== 0 ?
                <EditorCards /> : <>No article yet</>}
            </CardContainer>
          </div>
        </Grid.Column>
      </Grid>
    </div >
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 30px;
`;
const CardContainer = styled.div`
  padding-bottom: 30px;
  display: grid;
  grid-gap: ${(p) => (p.isMobile && !p.toggle ? "10px" : "15px")};
  grid-template-columns: ${(p) =>
  p.isMobile
  ? "repeat(auto-fill, minmax(220px, 1fr))"
  : "repeat(auto-fill, minmax(220px, 1fr))"};
  `;
const Title = styled.h2`
  color: "black";
  margin: 0 10px 0 0;
  display: flex;
  align-items: center;
  /* text-align: center; */
`;
export default Shop_Desktop_Article_Index;
