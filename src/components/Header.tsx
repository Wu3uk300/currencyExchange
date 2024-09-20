import React from "react";
import { Box, Typography } from "@mui/material";

// interface for the props that Header component will receive
interface HeaderProps {
  fromAmount: number;
  toAmount: number;
  fromCurrency: string;
  toCurrency: string;
  amountInput: string;
}

const Header: React.FC<HeaderProps> = ({
  fromAmount,
  fromCurrency,
  toCurrency,
  amountInput,
  toAmount,
}) => {
  return (
    <div>
      <Box sx={{ border: "1px solid blue", padding: 1, marginBottom: 2 }}>
        <Typography variant="subtitle1">
          {/* Conditional rendering based on amountInput */}
          {amountInput === "from" ? (
            <div>
              {/* Display fromAmount with 2 decimal places, or "0.00" if it's NaN. Same logic down below but just with different amountInput state */}
              {!isNaN(fromAmount) ? fromAmount.toFixed(2) : "0.00"}{" "}
              {fromCurrency} is
            </div>
          ) : (
            <div>
              {!isNaN(toAmount) ? toAmount.toFixed(2) : "0.00"} {toCurrency} is
            </div>
          )}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {amountInput === "from" ? (
            <div>
              {!isNaN(toAmount) ? toAmount.toFixed(2) : "0.00"} {toCurrency}
            </div>
          ) : (
            <div>
              {!isNaN(fromAmount) ? fromAmount.toFixed(2) : "0.00"}{" "}
              {fromCurrency}
            </div>
          )}
        </Typography>
      </Box>
    </div>
  );
};

export default Header;
