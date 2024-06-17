import React from "react";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { Content, FirstPage, Root } from "@/App";
import { Box } from "@mui/material";
import Header from "../Header.page/Header";

export interface dataProps {
  data: Content[] | undefined;
}

//APIからとってきたデータをmapで取り出してreturn以下で表示したい。
const Exhibitions: React.FC<dataProps> = ({ data }) => {
  // const [data, setData] = useState<dataType>();
  // console.log()
  const navigate = useNavigate();

  const handleImageClick = (index: React.Key | null | undefined) => {
    navigate(`/exhibition/${index}`);
  };

  return (
    <Box
      sx={{
        width: "70%",
        textAlign: "center",
        margin: "auto",
        marginTop: "100px",
        paddingBottom: "100px",
        position: "relative",
        "@media screen and (max-width: 600px)": {
          maxWidth: "600px",
          marginTop: "100px",
          paddingBottom: "100px",
          position: "relative",
        },
      }}
    >
      <Box sx={{ zIndex: "2", top: "0" }}>
        <Header />
      </Box>
      {/* dataをオブジェクトで取り出してa タグのhrefに代入していく。 */}
      {data &&
        data[1].firstPage.map(
          (picNText, index: React.Key | null | undefined) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "18px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  border: "1px solid ",
                }}
              >
                {picNText.exhibitionsPicture?.url && (
                  <img
                    key={index}
                    onClick={() => handleImageClick(index)}
                    src={picNText.exhibitionsPicture.url}
                    style={{
                      maxWidth: "100%",
                      objectFit: "cover",
                    }}
                    alt="picture"
                  />
                )}
              </Box>
              <Box
                sx={{
                  "@media screen and (max-width:600px)": {
                    fontSize: "12px",
                  },
                }}
                onClick={() => handleImageClick(index)}
              >
                {typeof picNText.exhibitionsText === "string" &&
                  parse(picNText.exhibitionsText)}
              </Box>
            </Box>
          ),
        )}
    </Box>
  );
};

export default Exhibitions;
