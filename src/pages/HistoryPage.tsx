import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../styles/HistoryPage.module.css";

// interface for the conversion history items
interface Conversion {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<Conversion[]>([]);
  const navigate = useNavigate();

  //using useEffect to load the localStorage history
  useEffect(() => {
    const savedHistory = localStorage.getItem("conversionHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("conversionHistory");
    setHistory([]);
  };

  return (
    <div className={styles.wrapper}>
      <Paper elevation={3} sx={{ padding: 2, maxWidth: 600, margin: "auto" }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Conversion History
        </Typography>
        <List>
          {history.map((conversion, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${conversion.fromAmount.toFixed(2)} ${
                  conversion.fromCurrency
                } = ${conversion.toAmount.toFixed(2)} ${conversion.toCurrency}`}
              />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: 2, marginRight: 2 }}
          onClick={clearHistory}
        >
          Clear History
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={() => navigate("/")}
        >
          Back to Currency Exchange
        </Button>
      </Paper>
    </div>
  );
};

export default HistoryPage;
