import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    ({ pageParam = 0 }) => {
      return api
        .get('/api/images', {
          params: {
            after: pageParam,
          },
        })
        .then(response => {
          return response.data;
        });
    },
    {
      getNextPageParam: after => {
        if (after.after !== null) {
          return after.after;
        }
        return null;
      },
    }
  );

  const formattedData = useMemo(() => {
    const result = data?.pages
      .map(page => page.data)
      .flat()
      .map(d => {
        return {
          title: d.title,
          description: d.description,
          url: d.url,
          ts: d.ts,
          id: d.id,
        };
      });
    return result;
  }, [data]);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage ? (
          <Button mt="2rem" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando....' : 'Carregar mais'}
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
