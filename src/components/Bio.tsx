import React from "react";
import parse from "html-react-parser";
import { dataProps } from "./Exhibitions";
import { Box } from "@mui/material";
import Header from "../Header.page/Header";

//APIからとってきたデータをmapで取り出してreturn以下で表示したい。
const Bio: React.FC<dataProps> = ({ data }) => {
  return (
    <Box sx={{}}>
      <Box sx={{ zIndex: "2", top: "0" }}>
        <Header />
      </Box>
      <Box
        sx={{
          marginLeft: "auto",
          display: "flex",
          flexDirection: "row",
          width: "80%",
          "@media screen and (max-width: 600px)": {
            maxWidth: "600px",
            margin: "auto",
            marginTop: "10px",
            paddingBottom: "100px",
            position: "relative",
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            paddingTop: "80px",
            width: "30%",
            overflowWrap: "anywhere",
            lineHeight: "2.5",
            fontSize: "13px",
            "@media screen and (max-width: 600px)": { width: "100%" },
          }}
        >
          {data &&
            typeof data[2].firstPage[0].biotext === "string" &&
            parse(data[2].firstPage[0].biotext)}
        </Box>
        <Box
          sx={{
            width: "500px",
            marginTop: "300px",
            marginBottom: "20px",
            paddingLeft: "100px",
            "@media screen and (max-width: 600px)": {
              margin: "20px",
              padding: "20px",
              width: "250px",
            },
          }}
        >
          <img
            src={data?.[2].firstPage?.[0].biopicture?.url}
            alt="bioPicture"
            style={{ maxWidth: "100%", height: "auto", margin: "auto" }}
            
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Bio;
