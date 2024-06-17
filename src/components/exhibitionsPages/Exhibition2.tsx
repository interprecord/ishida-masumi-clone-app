import React from "react";
import { dataProps } from "../Exhibitions";
import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/material";
import Header from "../../Header.page/Header";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Exhibition2: React.FC<dataProps> = ({ data }) => {
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
      <Box style={{ margin: "20px" }}>
        {data && parse(data[1].detailPage[1].exhibitionTitle)}
      </Box>
      <Box sx={{ zIndex: "2", top: "0" }}>
        <Header />
      </Box>

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
        }}
      >
        {data &&
          data[1].detailPage[1].exhibitionPicture.map((picture) => (
            <img
              src={picture.url}
              key={uuidv4()}
              style={{
                width: "100%",
                maxHeight: "500px",
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

export default Exhibition2;
