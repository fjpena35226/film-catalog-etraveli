import { ChangeEvent, ReactNode } from 'react'
import { Alert, Box, Snackbar } from '@mui/material'
import { useAlert } from 'src/context/alert.context'
import NavBar from './navBar/NavBar'
import { OrderDirection, OrderModel, PropResolver } from 'src/utils/sort'

type LayoutProps = {
  children: ReactNode[] | ReactNode
  handleChangeOrder?: (
    order: OrderDirection,
    orderBy: PropResolver<any>
  ) => void
  handleChangeSearch?: (search: string) => void
  orderModel?: OrderModel
}

const Layout = ({
  children,
  handleChangeOrder,
  handleChangeSearch,
  orderModel,
}: LayoutProps) => {
  const { alertOpen, alertMessage, alertColor, closeAlert } = useAlert()

  return (
    <>
      {alertOpen && (
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={() => closeAlert()}
        >
          <Alert
            onClose={() => closeAlert()}
            severity={alertColor || 'info'}
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      )}
      <NavBar
        onChangeOrder={handleChangeOrder}
        onChangeSearch={handleChangeSearch}
        orderModel={orderModel}
      />
      <Box
        sx={{
          minHeight: `calc(100vh - 61px)`,
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        {children}
      </Box>
    </>
  )
}

export default Layout
