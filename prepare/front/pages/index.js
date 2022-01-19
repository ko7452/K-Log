import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import axios from 'axios';
import { wrapper } from '../store/configureStore';

import { Wrapper, Introduce, BoaderBox, BoardListWrapper, ListBox } from '../style/indexSt';

import AppLayout from '../components/AppLayout';

import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();

  const quotes = [
    '추천도서1',
    '추천도서2',
    '추천도서3',
    '추천도서4',
    '추천도서5',
    '추천도서6',
    '추천도서7',
    '추천도서8',
    '추천도서9',
    '추천도서10',
  ];
  const popularBooks = [
    '인기도서1',
    '인기도서2',
    '인기도서3',
    '인기도서4',
    '인기도서5',
    '인기도서6',
    '인기도서7',
    '인기도서8',
    '인기도서9',
    '인기도서10',
  ];
  const realTimeGroups = [
    '카테고리 모임1',
    '카테고리 모임2',
    '카테고리 모임3',
    '카테고리 모임4',
    '카테고리 모임5',
    '카테고리 모임6',
    '카테고리 모임7',
    '카테고리 모임8',
    '카테고리 모임9',
    '카테고리 모임10',
  ];

  return (
    <AppLayout>
      <Head>
        <title>e도서관</title>
      </Head>
      <Wrapper>
        <Introduce>
          <h1>지금 있는 곳에서 책을 읽고 사람들과 공유하세요</h1>
          <p>
            <span>e도서관</span>에 오신 여러분을 환영합니다.
          </p>
        </Introduce>
        <BoaderBox>
          <h2>"책은 내 마음 속의 언 바다를 깨는 도끼와도 같다."</h2>
          <p>프란츠 카프카(유대계의 독일인 작가)</p>
        </BoaderBox>
        <BoardListWrapper>
          <ListBox>
            <ul>
              <h1>추천 도서</h1>
              {quotes.map((quote, index) => {
                return (
                  <li key={quote}>
                    <a>
                      {index + 1}. {quote}
                    </a>
                  </li>
                );
              })}
            </ul>
            <ul>
              <h1>인기 도서</h1>
              {popularBooks.map((popularBook, index) => {
                return (
                  <li key={popularBook}>
                    <a>
                      {index + 1}. {popularBook}
                    </a>
                  </li>
                );
              })}
            </ul>
            <ul>
              <h1>최신 모임 현황</h1>
              {realTimeGroups.map((realTimeGroup, index) => {
                return (
                  <li key={realTimeGroup}>
                    <a>
                      {index + 1}. {realTimeGroup}
                    </a>
                  </li>
                );
              })}
            </ul>
          </ListBox>
        </BoardListWrapper>
      </Wrapper>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  console.log('getServerSideProps req: ', req);
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Home;
