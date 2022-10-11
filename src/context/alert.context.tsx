import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

interface AlertState {
  alertMessage?: string
  alertColor?: 'error' | 'warning' | 'info' | 'success' | ''
  alertOpen?: boolean
}

interface AlertContextType extends AlertState {
  showAlert: (state: AlertState) => void
  closeAlert: () => void
}

type AlertProviderProps = {
  children: ReactNode[] | ReactNode
}

const AlertContext = createContext<AlertContextType>({
  alertMessage: '',
  alertColor: 'info',
  alertOpen: false,
  showAlert: () => {},
  closeAlert: () => {},
})

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<AlertState>({
    alertMessage: '',
    alertColor: '',
    alertOpen: false,
  })
  const { alertMessage, alertColor } = alert
  const alertOpen = alertMessage ? true : false

  const closeAlert = useCallback(() => {
    setAlert({
      ...alert,
      alertMessage: '',
      alertColor: '',
    })
  }, [alert])

  const showAlert = useCallback(
    ({ alertMessage, alertColor }: AlertState) => {
      setAlert({
        ...alert,
        alertMessage,
        alertColor,
      })
    },
    [alert]
  )

  const value = useMemo<AlertContextType>(
    () => ({ showAlert, closeAlert, alertOpen, alertMessage, alertColor }),
    [alert, alertOpen, alertMessage, alertColor]
  )

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
}

export const useAlert = () => {
  const context = useContext(AlertContext)

  if (!context) throw Error('useAlert should be under Alert Provider')

  return context
}
