export interface EditPopupsProps {
  openSnackbar?: (severity: string, message: string) => void
  setOpen?: (open: null | string) => void
  open?: string | null

}