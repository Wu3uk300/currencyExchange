import React from "react";
import { TextField, MenuItem } from "@mui/material";

// Interface for the props that CurrencySelect component will receive
interface CurrencySelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currencies: { [key: string]: string };
  filterCurrency?: string;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  label,
  value,
  onChange,
  currencies,
  filterCurrency,
}) => {
  return (
    <TextField select label={label} value={value} fullWidth onChange={onChange}>
      {Object.entries(currencies) //this method returns an array of the  in the format [key, value] to make the process more convenient
        .filter(([code]) => code !== filterCurrency)
        .map(([code, fullName]) => (
          <MenuItem key={code} value={code}>
            {fullName}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default CurrencySelect;
