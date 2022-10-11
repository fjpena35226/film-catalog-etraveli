import { Box, Typography } from '@mui/material'
import { Film } from 'src/helpers/swapi'

type FilmDetailProps = {
  data?: Film
}

const FilmDetail = ({ data }: FilmDetailProps) => {
  return data ? (
    <Box>
      <Typography variant='h4' sx={{ marginBottom: 2 }}>
        {data?.title || ''}
      </Typography>
      <Typography sx={{ marginBottom: 3 }}>
        {data?.opening_crawl || ''}
      </Typography>
      <Typography>
        <strong>Directed by:</strong> {data?.director || ''}
      </Typography>
    </Box>
  ) : (
    <>No movie is selected</>
  )
}

export default FilmDetail
