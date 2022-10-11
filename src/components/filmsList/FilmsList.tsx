import { Box, LinearProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { Film } from 'src/helpers/swapi'
import { defaultFormatDate } from 'src/utils/date'

type FilmListProps = {
  data?: Film[]
  onItemSelected?: (film: Film) => void
  isLoading?: boolean,
}

const columns: GridColDef[] = [
  {
    field: 'episode_id',
    headerName: 'Episode Id',
    flex: 0.3,
  },
  {
    field: 'title',
    headerName: 'Title',
    flex: 0.4,
  },
  {
    field: 'release_date',
    headerName: 'Release Date',
    flex: 0.3,
    valueGetter: ({ row }) => defaultFormatDate(row.release_date),
  },
]

const FilmsList = ({ data, onItemSelected, isLoading }: FilmListProps) => {
  const getId = (item: Film) => item.episode_id

  const handleItemSelected = (selection: (number | string)[]) => {
    const id = selection[0]
    const item = data?.find((film) => getId(film) === id)
    if (onItemSelected && item) {
      onItemSelected(item)
    }
  }

  return data ? (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={getId}
        onSelectionModelChange={handleItemSelected}
        loading={isLoading}        
      />
    </Box>
  ) : (
    <LinearProgress sx={{ width: '100%' }} />
  )
}

export default FilmsList
