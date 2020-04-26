import { createMuiTheme } from "@material-ui/core"


export const datePickerTheme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif'
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#8DBDC3',
      },
    },
    MuiPickersDay: {
      daySelected: {
        '&:hover': {
          backgroundColor: '#8DBDC3'
        },
        backgroundColor: '#8DBDC3',
      },
      current: {
        color: '#202020'
      },
    },
    MuiPickersYear: {
      yearSelected: {
        color: '#8DBDC3'
      }
    },
    MuiPickersClockNumber: {
      clockNumberSelected: {
        backgroundColor: '#8DBDC3'
      }
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: '#8DBDC3'
      },
      thumb: {
        border: '14px solid #8DBDC3'
      }
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: '#8DBDC3'
      }
    },
    MuiPickersModal: {
      // dialogAction: {
      //   color: '#8DBDC3',
      // }
    },
  },
});