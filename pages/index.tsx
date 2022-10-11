import { ChangeEvent, useEffect, useState } from 'react'
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import { useIsFetching, useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import {
  Box,
  Dialog,
  Grid,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { Film, FilmService, Request } from 'src/helpers/swapi'
import FilmsList from 'src/components/filmsList/FilmsList'
import FilmDetail from 'src/components/filmDetail/FilmDetail'
import Layout from 'src/components/layout/Layout'
import { useAlert } from 'src/context/alert.context'
import {
  getComparator,
  OrderDirection,
  OrderModel,
  PropResolver,
} from 'src/utils/sort'
import useDebounce from 'src/hooks/useDebounce'
import { useRouter } from 'next/router'

const FilmOrderModel: OrderModel = {
  props: [
    {
      name: 'Episode',
      fieldName: 'episode_id',
      resolver: (film: Film) => film?.episode_id,
    },
    {
      name: 'Year',
      fieldName: 'release_date',
      resolver: (film: Film) =>
        film?.release_date
          ? new Date(film?.release_date).getTime()
          : new Date().getTime(),
    },
  ],
}

export const getServerSideProps: GetServerSideProps = async () => {
  const films = await FilmService.list()
  return {
    props: {
      films,
    },
  }
}

const Home: NextPage = ({
  films,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const theme = useTheme()
  const { showAlert, alertOpen } = useAlert()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [orderedData, setOrderedData] = useState<Film[]>()
  const [selectedItem, setSelectedItem] = useState<Film>()
  const [dialogOpen, setDialogOpen] = useState(false)

  const [searchState, setSearchState] = useState('')
  const debouncedSearch = useDebounce(searchState)

  const {
    isError,
    data,
    error: errorFetchingFilms,
    failureCount,
  } = useQuery<Request<Film>>(
    ['getFilms', debouncedSearch],
    async () =>
      await FilmService.list({
        search: debouncedSearch,
      }),
    { initialData: films, refetchOnWindowFocus: false }
  )
  const isFetching = useIsFetching() === 1

  const handleOrderChange = (
    order: OrderDirection,
    orderBy: PropResolver<Film>
  ) => {
    const comparator = getComparator<Film>(order, orderBy)
    const ordered = orderedData ? [...orderedData].sort(comparator) : undefined
    setOrderedData(ordered)
  }

  const handleItemSelection = (film: Film) => {
    setSelectedItem({
      ...film,
    })
    if (isMobile) {
      setDialogOpen(true)
    }
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedItem(undefined)
  }

  const handleOnChangeSearch = (search: string) => {
    setSearchState(search)
    setSelectedItem(undefined)
  }

  useEffect(() => {
    if (data) {
      setOrderedData(data?.results)
    }
  }, [isFetching, data])

  useEffect(() => {
    if (isError && errorFetchingFilms && !alertOpen && failureCount < 5) {
      showAlert({
        alertMessage: 'Something went wrong fetching the films',
        alertColor: 'error',
      })
      console.error(errorFetchingFilms)
    }
  }, [isError, errorFetchingFilms, showAlert])

  useEffect(() => {
    const { search } = router?.query
    if (search && search !== searchState) setSearchState(search as string)
  }, [router.query, searchState])

  return (
    <>
      <Head>
        <title>Films catalog</title>
      </Head>
      <Layout
        orderModel={FilmOrderModel}
        handleChangeOrder={handleOrderChange}
        handleChangeSearch={handleOnChangeSearch}
      >
        <Grid
          container
          justifyContent='center'
          alignItems='self-start'
          sx={{ display: 'flex', alignItems: 'stretch' }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              padding: { xs: 2, md: 4 },
              borderRight: { sm: '1px solid #cccccc' },
            }}
          >
            <FilmsList
              data={orderedData}
              onItemSelected={handleItemSelection}
              isLoading={isFetching}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            container
            justifyContent='center'
            alignItems='flex-start'
            sx={{ padding: 4, display: { xs: 'none', sm: 'flex' } }}
          >
            <FilmDetail data={selectedItem} />
          </Grid>
        </Grid>
        <Dialog onClose={handleCloseDialog} open={dialogOpen}>
          <Box sx={{ padding: 4 }}>
            <FilmDetail data={selectedItem} />
          </Box>
        </Dialog>
      </Layout>
    </>
  )
}

export default Home
