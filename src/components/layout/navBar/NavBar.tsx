import { ChangeEvent, useState } from 'react'
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  TextField,
  Toolbar,
} from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'

import { OrderDirection, OrderModel, PropResolver } from 'src/utils/sort'

type NavBarProps = {
  onChangeOrder?: (order: OrderDirection, orderBy: PropResolver<any>) => void
  onChangeSearch?: (search: string) => void
  orderModel?: OrderModel
}

const NavBar = ({ onChangeOrder, onChangeSearch, orderModel }: NavBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const [search, setSearch] = useState('')
  const [order, setOrder] = useState<OrderDirection>('asc')
  const [orderBy, setOrderBy] = useState<{
    name: string
    resolver: PropResolver<any>
  }>()

  const handleRequestSort = (propName: string, resolver: PropResolver<any>) => {
    const isAsc = orderBy?.name === propName && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy({ name: propName, resolver })
    if (onChangeOrder) {
      onChangeOrder(isAsc ? 'desc' : 'asc', resolver)
    }
    setAnchorEl(null)
  }

  const handleOnChangeSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget
    setSearch(value)
    if (onChangeSearch) onChangeSearch(value)
  }

  return (
    <AppBar
      position='static'
      sx={{
        height: '61px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Toolbar
        variant='dense'
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Button
          onClick={(evt) => setAnchorEl(evt.currentTarget)}
          variant='contained'
          sx={{ minWidth: '150px', display: { xs: 'none', sm: 'flex' } }}
          startIcon={<SortIcon />}
        >
          Sort by...
        </Button>
        <IconButton
          aria-label='sort'
          onClick={(evt) => setAnchorEl(evt.currentTarget)}
          sx={{ display: { xs: 'flex', sm: 'none' } }}
        >
          <SortIcon sx={{ color: '#FFFFFF' }} />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuList dense sx={{ width: 160 }}>
            <MenuItem className='disabled'>
              <ListItemText>Sort By</ListItemText>
            </MenuItem>
            <Divider />
            {orderModel &&
              orderModel.props?.map((prop) => (
                <MenuItem
                  key={`order-by-${prop.fieldName}`}
                  onClick={() =>
                    handleRequestSort(prop.fieldName, prop.resolver)
                  }
                >
                  <ListItemText>{prop.name}</ListItemText>
                  {orderBy?.name === prop.fieldName &&
                    (order === 'desc' ? (
                      <ExpandLessIcon fontSize='small' />
                    ) : (
                      <ExpandMoreIcon fontSize='small' />
                    ))}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
        <TextField
          name='filmName'
          placeholder='Type to search...'
          variant='standard'
          value={search || ''}
          sx={{ marginLeft: '1.5rem', maxWidth: { xs: '95%', sm: '50%' } }}
          fullWidth
          onChange={handleOnChangeSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
