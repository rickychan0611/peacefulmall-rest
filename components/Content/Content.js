import { useRouter } from "next/router";
import styled from "styled-components";
import { Divider } from "semantic-ui-react";
import { useRecoilState } from "recoil";
import { selectedArticle as selectedArticleAtom } from '../../data/atoms';
import { useEffect } from "react";
import moment from "moment";
import axios from 'axios';
import { Markup } from 'interweave';

const Content = () => {
  const router = useRouter();
  const [item, setSelectedArticle] = useRecoilState(selectedArticleAtom);

  useEffect(async () => {
    console.log(router.query)
    if (!item) {
      console.log("Loaded item")
      try {
        let getArticle = await axios.get(
          process.env.NEXT_PUBLIC_STRAPI_URL + '/articles/' +
          router.query.article_id
        )
        // const addUrl = process.env.NEXT_PUBLIC_STRAPI_URL
        getArticle.data.content = getArticle.data.content.replace(/src="/g, 'src="' + process.env.NEXT_PUBLIC_STRAPI_URL)
        console.log("getArticleByID", getArticle.data)
        setSelectedArticle(getArticle.data)
      }
      catch (err) {
        console.log("err", err)
      }
    }
    else {
      let article = {...item}
      article.content = article.content.replace(/src="/g, 'src="' + process.env.NEXT_PUBLIC_STRAPI_URL)
      console.log("getArticleByID", article)
      setSelectedArticle(article)
    }
  }, [router]);

return (
  <>
    {item && <Container>
      <Title>{item.title}</Title>
      <CoverImg src={process.env.NEXT_PUBLIC_STRAPI_URL + item.cover_photo.url} />
      <Wrapper>
        <Row>
          <Credit>{item.author && "撰文：" + item.author} &nbsp;	&nbsp;	&nbsp;	&nbsp;
            最後更新日期：{moment(item.updated_at).format("DD MMM YYYY - h:mma")}</Credit>
        </Row>
        <TwoCol>
          <Text>
            <Markup content={item.content} />
          </Text>
          {item.photos[0] &&
            <Gallery>{item.photos.map((item, i) => {
              return (
                <PhotoWrapper>
                  <Photo key={i} src={process.env.NEXT_PUBLIC_STRAPI_URL + item.url} />
                  <Caption>{item.caption}</Caption>
                </PhotoWrapper>
              )
            })}
            </Gallery>}
        </TwoCol>
      </Wrapper>
    </Container>
    }
  </>
);
};

const TwoCol = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  gap: 50px;
  `;
const Gallery = styled.div`
    flex: 1;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    margin-bottom: 60px;
    gap: 20px;
  `;
const PhotoWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
const Photo = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;
const Caption = styled.div`
  width: 100%;
`;
const Container = styled.div`
  width: 100%;
  background-color: white;
  margin-bottom: 60px;
`;
const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  margin-bottom: 60px;
`;
const Wrapper = styled.div`
  width: 100%;
`;
const CoverImg = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
`;
const Title = styled.div`
  font-size: 32px;
  margin-bottom: 50px;
  line-height: 150%;
  text-align: center;
`;
const Credit = styled.div`
  font-size: 15px;
  color: grey;
`;
const Text = styled.div`
  width: 100%;
  max-width: 550px;
  flex: 2;
  font-size: 17px;
  color: grey;
  p {
    line-height: 170%;
  }
  .image {
    width: 100% !important;
    margin: 30px 0;
  }
  img {
    width: 100% !important;
  }
`;


export default Content;
