import { createTheme } from "@mui/material/styles";
import { brown } from "@mui/material/colors";

export const darkBrownTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    background: {
      default: brown[900],
      paper: brown[900],
    },
    text: {
      primary: "#ffffff",
    },
  },

  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", 
            },
            "&:hover fieldset": {
              borderColor: "white", 
            },
            "&.Mui-focused fieldset": {
              borderColor: "white", 
            },
            "& input": {
              color: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white", 
            },
          },
        },
      },
    },


    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#fff",
          "& fieldset": {
            borderColor: "#fff",
          },
          "&:hover fieldset": {
            borderColor: "#fff",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#fff", 
          },
          "& input": {
            color: "#fff",
          },
          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#fff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff", 
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff", 
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
        },
      },
    },

    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: brown[900],
          color: "#fff",
          borderRadius: "12px",
        },
      },
    },

    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.2)",
          },
          "&.Mui-selected": {
            backgroundColor: "#fff",
            color: brown[900],
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.8)",
            },
          },
        },
      },
    },

   
    MuiPickersCalendarHeader: {
      styleOverrides: {
        labelContainer: {
          color: "#fff",
        },
        switchViewButton: {
          color: "#fff",
        },
        iconButton: {
          color: "#fff",
        },
      },
    },
  },
});
