import React from "react";
import { dataProps } from "../Exhibitions";
import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box } from "@mui/material";
import Header from "../../Header.page/Header";
import { Link } from "react-router-dom";

const Exhibition6: React.FC<dataProps> = ({ data }) => {
  return (
    <Box
      sx={{
        marginTop: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: "100px",
        "@media screen and (max-width: 600px)": {
          maxWidth: "600px",
          paddingBottom: "100px",
          position: "relative",
        },
      }}
    >
      <Box sx={{ zIndex: "2", top: "0" }}>
        <Header />
      </Box>
      <Box sx={{ margin: "20px" }}>
        {data && parse(data[1].detailPage[5].exhibitionTitle)}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
        }}
      >
        {data &&
          data[1].detailPage[5].exhibitionPicture.map((picture) => (
            <img
              src={picture.url}
              key={uuidv4()}
              style={{
                width: "100%",
                maxHeight: "600px",
                objectFit: "cover",
                marginTop: "20px",
              }}
            />
          ))}
      </Box>
      <Link to="/exhibitions" style={{ margin: "20px" }}>
        <ArrowBackIosNewIcon sx={{ fontSize: "30px" }} />
      </Link>
    </Box>
  );
};

export default Exhibition6;
