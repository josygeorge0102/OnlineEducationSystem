import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import * as React from "react";

export default function DatePicker(props) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {
        <DesktopDatePicker
          fullWidth
          variant="inline"
          inputVariant="outlined"
          label={label}
          name={name}
          value={value}
          onChange={(date) => onChange(convertToDefEventPara(name, date))}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      }
    </LocalizationProvider>
  );
}
