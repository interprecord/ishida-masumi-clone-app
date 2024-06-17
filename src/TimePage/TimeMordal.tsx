import React, { useEffect, useRef, useState } from "react";

import { Box, Grid } from "@mui/material";
import { PicProps } from "@/App";
import CloseIcon from "@mui/icons-material/Close";

interface MordalProps {
  picData: PicProps[];
  selectedPicIndex: number | null;
  setSelectedPicIndex: React.Dispatch<React.SetStateAction<number | null>>;
  showMordal: boolean;
  setShowMordal: React.Dispatch<React.SetStateAction<boolean>>;
  theme: boolean;
}

const TimeMordal: React.FC<MordalProps> = ({
  picData,
  selectedPicIndex,
  setSelectedPicIndex,
  showMordal,
  setShowMordal,
  theme,
}) => {
  const mordalRef = useRef<HTMLDivElement>(null);
  const [selectedPic, setSelectedPic] = useState<PicProps | null>(null);
  // picDataや、押された写真が変わるたびに、表示させる写真を変える
  useEffect(() => {
    if (selectedPicIndex !== null) {
      setSelectedPic(picData[selectedPicIndex]);
    }
  }, [selectedPicIndex, picData]);

  const closeMordal = () => {
    setShowMordal(!showMordal);
  };

  const minusIndexButton = () => {
    if (selectedPicIndex !== null && selectedPicIndex > 0) {
      const newIndex = selectedPicIndex - 1;
      setSelectedPicIndex(newIndex);
    }
  };

  const plusIndexButton = () => {
    if (selectedPicIndex !== null && selectedPicIndex < picData.length - 1) {
      const newIndex = selectedPicIndex + 1;
      setSelectedPicIndex(newIndex);
    }
  };

  useEffect(() => {
    if (mordalRef.current) {
      if (theme) {
        mordalRef.current.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
      } else {
        mordalRef.current.style.backgroundColor = "#000000";
        mordalRef.current.style.color = "#FFFFFF";
      }
    }
  }, [theme]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        width: "100%",
        height: "100%",
        zIndex: "1000",
        display: "flex",
        flexDirection:"column",
        "@media screen and (max-width:600px)": {
          maxWidth: '600px',
        

        
          display: "flex",
        },
      }}
      ref={mordalRef}
    >
      {/* ボタン配置のための親要素 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          // alignItems: "flex-start",
          position: "relative",
          // padding: "10px",
          // backgroundColor:"aqua"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "0",
            cursor: "pointer",
            // backgroundColor: "white",
          }}
        >
          <CloseIcon
            sx={{
              fontWeight: "100",
              fontFamily: "Arial",
              marginTop: "10px",
              paddingTop: "0",
              fontSize: "60px",
              lineHeight: "1",
            }}
            onClick={() => closeMordal()}
          >
            {" "}
            ×
          </CloseIcon>
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: "700px",
          maxHeight: "500px",
          margin: "auto",
          marginTop: "120px",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor: "pink",
          position: "relative",
          "@media screen and (max-width:600px)": {
            width: "340px",maxHeight:"300px"}
  
          
        }}
      >
        <Box sx={{backgroundColor:"white",width:"100%",height:"100%" }}>
          {selectedPic && (
            <img
              src={selectedPic?.picture}
              alt="Image"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
             
              }}
            />
          )}
        </Box>
     
      </Box>
      <Box
          sx={{
            // position: "absolute",
            marginBottom: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "50px",
            

          }}
        >
          <Box
            sx={{
              // backgroundColor: "green",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: "0 20px",
            }}
          >
            {selectedPicIndex && selectedPicIndex > 0 ? (
              <Box
                sx={{
                  fontSize: "40px",
                  cursor: "pointer",
                  marginRight: "60px",
                }}
                onClick={() => minusIndexButton()}
              >
                ＜
              </Box>
            ) : (
              <Box sx={{ width: "40px" }}></Box>
            )}
            {selectedPic && (
              <Box sx={{ fontSize: "15px" }}>{selectedPic.editedTime}</Box>
            )}
            {selectedPicIndex !== picData.length - 1 ? (
              <Box
                sx={{ fontSize: "40px", cursor: "pointer", marginLeft: "60px" }}
                onClick={() => plusIndexButton()}
              >
                ＞
              </Box>
            ) : (
              <Box sx={{ width: "40px" }}></Box>
            )}
          </Box>
        </Box>
    </Box>
  );
};

export default TimeMordal;
