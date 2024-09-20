import React, { useEffect, useState, useRef } from "react";
import { Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CurrencyInput from "../components/CurrencyInput";
import CurrencySelect from "../components/CurrencySelect";

// Interface for storing currency names
interface Currencies {
  [key: string]: string;
}

// Interface for storing conversion information
interface Conversion {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
}

const CurrencyExchange: React.FC = () => {
  const [currenciesName, setCurrenciesName] = useState<Currencies>({});
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [amountInput, setAmountInput] = useState<string>("from");
  const [history, setHistory] = useState<Conversion[]>([]);

  const [debouncedData, setDebouncedData] = useState({
    amount: amount,
    fromCurrency: fromCurrency,
    toCurrency: toCurrency,
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Function to fetch currency names from API
  const fetchCurrenciesNames = async () => {
    try {
      const response = await fetch("https://api.frankfurter.app/currencies");
      const data = await response.json();
      const sortedData = Object.keys(data)
        .sort()
        .reduce((result: { [key: string]: string }, key) => {
          result[key] = data[key];
          return result;
        }, {});

      setCurrenciesName(sortedData);
    } catch (e) {
      console.log("Error fetching:", e);
    }
  };

  // Function to fetch exchange rates from the API
  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await response.json();
      setExchangeRate(data.rates[toCurrency]);
    } catch (e) {
      console.log("Error fetching:", e);
    }
  };
  //fetch of currency names and  fetch of history from localStorage
  useEffect(() => {
    fetchCurrenciesNames();
    const savedHistory = localStorage.getItem("conversionHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  //fetch of exchangeRates
  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  //debounce feature
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setDebouncedData({ amount, fromCurrency, toCurrency }); // setting new debounced data after delay
    }, 1000);
  }, [amount, fromCurrency, toCurrency]);

  //handle amount change as well as validate inputs and update states
  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "from" | "to"
  ) => {
    const value = e.target.value.replace(/[^0-9,]/g, "");
    setAmount(value);
    setAmountInput(type);
  };

  //parsing the amount string to a float
  const parseAmount = (value: string) =>
    parseFloat(value.replace(",", ".")) || 0;

  //calculation of the converted amount based on the input type , exchange rate and amountInput state
  const convertedFromAmount =
    amountInput === "from"
      ? amount
      : exchangeRate
      ? (parseAmount(amount) / exchangeRate).toFixed(2).replace(".", ",")
      : "0";
  const convertedToAmount =
    amountInput === "to"
      ? amount
      : exchangeRate
      ? (parseAmount(amount) * exchangeRate).toFixed(2).replace(".", ",")
      : "0";

  // update history and localStorage when following conditions are met
  useEffect(() => {
    if (
      exchangeRate &&
      debouncedData.amount &&
      debouncedData.fromCurrency === fromCurrency &&
      debouncedData.toCurrency === toCurrency
    ) {
      const conversion: Conversion = {
        fromCurrency: debouncedData.fromCurrency,
        toCurrency: debouncedData.toCurrency,
        fromAmount: parseAmount(convertedFromAmount),
        toAmount: parseAmount(convertedToAmount),
      };

      const updatedHistory = [conversion, ...history.slice(0, 9)];
      setHistory(updatedHistory); // here we updating the history state
      localStorage.setItem("conversionHistory", JSON.stringify(updatedHistory)); // and here we are setting it to tle localStorage
    }
  }, [debouncedData, exchangeRate]);

  return (
    <Paper
      data-testid="currency-exchange-component"
      elevation={3}
      sx={{ padding: 2, maxWidth: 600, margin: "auto" }}
    >
      <Header
        fromAmount={
          !isNaN(parseAmount(convertedFromAmount))
            ? parseAmount(convertedFromAmount)
            : 0
        }
        toAmount={
          !isNaN(parseAmount(convertedToAmount))
            ? parseAmount(convertedToAmount)
            : 0
        }
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        amountInput={amountInput}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CurrencyInput
            label="Amount"
            value={amountInput === "from" ? amount : convertedFromAmount}
            onChange={(e) => handleAmountChange(e, "from")}
          />
        </Grid>

        <Grid item xs={6}>
          <CurrencySelect
            label="Currency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            currencies={currenciesName}
            filterCurrency={toCurrency}
          />
        </Grid>

        <Grid item xs={6}>
          <CurrencyInput
            label="Converted Amount"
            value={amountInput === "to" ? amount : convertedToAmount}
            onChange={(e) => handleAmountChange(e, "to")}
          />
        </Grid>

        <Grid item xs={6}>
          <CurrencySelect
            label="Currency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            currencies={currenciesName}
            filterCurrency={fromCurrency}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={() => navigate("/history")}
      >
        View History
      </Button>
    </Paper>
  );
};

export default CurrencyExchange;
