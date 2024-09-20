import React from "react";
import { TextField } from "@mui/material";

// Interface for the props that CurrencyInput component will receive
interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
    />
  );
};

export default CurrencyInput;
