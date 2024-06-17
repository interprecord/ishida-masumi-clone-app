import { Box } from "@mui/material";
import React from "react";
import Header from "../Header.page/Header";

const News = () => {
  return (
    <div style={{ padding: "100px" }}>
      <Box sx={{ zIndex: "2", top: "0" }}>
        <Header />
      </Box>
      <div>準備中...</div>
    </div>
  );
};

export default News;
