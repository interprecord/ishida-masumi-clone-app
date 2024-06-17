import React from "react";
import parse from "html-react-parser";
import { dataProps } from "./Exhibitions";
import { Box } from "@mui/material";
import Header from "../Header.page/Header";

//APIからとってきたデータをmapで取り出してreturn以下で表示したい。
const Contact: React.FC<dataProps> = ({ data }) => {
  const dataChildren = data?.[4].firstPage[0].contactBody;

  return (
    <Box style={{ textAlign: "center", padding: "100px" }}>
      <Box sx={{ zIndex: "2", top: "0" }}>
        <Header />
      </Box>
      <Box
        sx={{
          "@media screen and (max-width: 600px)": {
            maxWidth: "600px",

            paddingBottom: "100px",
            position: "relative",
            fontSize: "12px",
          },
        }}
      >
        <Box>
          {dataChildren &&
            typeof dataChildren[0].header === "string" &&
            parse(dataChildren[0].header)}
        </Box>
        <Box style={{ marginTop: "50px" }}>
          {dataChildren &&
            typeof dataChildren[1].header === "string" &&
            parse(dataChildren[1].header)}
        </Box>
        <Box style={{ marginTop: "20px" }}>
          {dataChildren &&
            typeof dataChildren[1].urlIntroduction === "string" &&
            parse(dataChildren[1].urlIntroduction)}
        </Box>
        <Box style={{ marginTop: "10px" }}>
          {dataChildren &&
            typeof dataChildren[1].url === "string" &&
            parse(dataChildren[1].url)}
        </Box>
        <Box style={{ marginTop: "30px" }}>
          {dataChildren &&
            typeof dataChildren[2].URL2?.[0].urlIntroduction === "string" &&
            parse(dataChildren[2].URL2[0].urlIntroduction)}
        </Box>
        <Box style={{ marginTop: "10px" }}>
          {dataChildren &&
            typeof dataChildren[2].URL2?.[0].url === "string" &&
            parse(dataChildren[2].URL2[0].url)}
        </Box>

        <Box style={{ marginTop: "60px", maxWidth: "600px", margin: "auto" }}>
          <img
            src={dataChildren?.[3]?.gazo?.url}
            alt="Contact"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
