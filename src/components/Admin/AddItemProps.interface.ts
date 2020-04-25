export interface AddItemProps {
  clientId?: number
  clientName?: string
  setClientName?: (name: string) => void
  openSnackbar?: (severity: string, message: string) => void
}