import React from "react";
import { DialogActions, Button, DialogTitle, Dialog } from "@material-ui/core";

interface EditClientPopupProps {
  component?: any
  openSnackbar?: (severity: string, message: string) => void
  setOpen?: (open: boolean) => void
  open?: boolean
  title?: string

}

const EditClientPopup: React.FC<EditClientPopupProps> = ({ component: Component, ...rest }) => {
  const props = { ...rest }
  const { open } = props

  return (
    // <Dialog open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
    //   <DialogTitle id="form-dialog-title">Title</DialogTitle>
    //     <Component />
    //   <DialogActions>
    //     <Button onClick={() => handleClose(false)} color="primary">
    //       Cancel
    //       </Button>
    //     <Button onClick={() => handleClose(true)} color="primary">
    //       Transfer
    //     </Button>
    //   </DialogActions>
    // </Dialog>
    <div></div>
  )
}

export default EditClientPopup