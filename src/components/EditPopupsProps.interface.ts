export interface EditPopupsProps {
  openSnackbar?: (severity: string, message: string) => void
  setOpen?: (open: boolean) => void
  open?: boolean

}