import { Box, Grid, Stack } from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import styles from "Css/sidebar.module.scss";
import { PicProps } from "@/App";
import dayjs from "dayjs";

interface TimeArrayType {
  time: string;
  forCheckTime: string;
  gapTime: number;
  displayHour: string;
  displayMorE: string;
  isVisible: boolean;
}

interface SidebarType {
  sidebarTimeRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  sidebarOpacity: number;
  setSidebarOpacity: React.Dispatch<React.SetStateAction<number>>;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarType> = ({
  sidebarTimeRefs,
  sidebarOpacity,
  
  theme,
 
}) => {
  const [sortTimeArray, setSortTimeArray] = useState<TimeArrayType[]>([]);

  useEffect(() => {
    const nowHour: number = Number(dayjs().format("HH"));

    const timeArray: TimeArrayType[] = [
      {
        time: "00",
        forCheckTime: "AM 00",
        gapTime: Number("00") - nowHour,
        displayHour: "AM ",
        displayMorE: "(深夜)",
        isVisible: false,
      }, //if(now22:00)ならgapTime -22
      {
        time: "01",
        forCheckTime: "AM 01",
        gapTime: Number("01") - nowHour,
        displayHour: "AM",
        displayMorE: "(深夜)",
        isVisible: false,
      }, // -21  -9
      {
        time: "02",
        forCheckTime: "AM 02",
        gapTime: Number("02") - nowHour,
        displayHour: "AM",
        displayMorE: "(深夜)",
        isVisible: false,
      },
      {
        time: "03",
        forCheckTime: "AM 03",
        gapTime: Number("03") - nowHour,
        displayHour: "AM",
        displayMorE: "(深夜)",
        isVisible: false,
      },
      {
        time: "04",
        forCheckTime: "AM 04",
        gapTime: Number("04") - nowHour,
        displayHour: "AM",
        displayMorE: "(深夜)",
        isVisible: false,
      },
      {
        time: "05",
        forCheckTime: "AM 05",
        gapTime: Number("05") - nowHour,
        displayHour: "AM",
        displayMorE: "(朝)",
        isVisible: false,
      },
      {
        time: "06",
        forCheckTime: "AM 06",
        gapTime: Number("06") - nowHour,
        displayHour: "AM",
        displayMorE: "(朝)",
        isVisible: false,
      },
      {
        time: "07",
        forCheckTime: "AM 07",
        gapTime: Number("07") - nowHour,
        displayHour: "AM",
        displayMorE: "(朝)",
        isVisible: false,
      },
      {
        time: "08",
        forCheckTime: "AM 08",
        gapTime: Number("08") - nowHour,
        displayHour: "AM",
        displayMorE: "(朝)",
        isVisible: false,
      }, //-14
      {
        time: "09",
        forCheckTime: "AM 09",
        gapTime: Number("09") - nowHour,
        displayHour: "AM",
        displayMorE: "(朝)",
        isVisible: false,
      }, //-13
      {
        time: "10",
        forCheckTime: "AM 10",
        gapTime: Number("10") - nowHour,
        displayHour: "AM",
        displayMorE: "(朝)",
        isVisible: false,
      }, //-12 -12
      {
        time: "11",
        forCheckTime: "AM 11",
        gapTime: Number("11") - nowHour,
        displayHour: "AM",
        displayMorE: "(朝)",
        isVisible: false,
      }, //-11
      {
        time: "00",
        forCheckTime: "AM 12",
        gapTime: Number("12") - nowHour,
        displayHour: "PM",
        displayMorE: "(昼)",
        isVisible: false,
      }, //-10
      {
        time: "01",
        forCheckTime: "PM 13",
        gapTime: Number("13") - nowHour,
        displayHour: "PM",
        displayMorE: "(昼)",
        isVisible: false,
      },
      {
        time: "02",
        forCheckTime: "PM 14",
        gapTime: Number("14") - nowHour,
        displayHour: "PM",
        displayMorE: "(昼)",
        isVisible: false,
      },
      {
        time: "03",
        forCheckTime: "PM 15",
        gapTime: Number("15") - nowHour,
        displayHour: "PM",
        displayMorE: "(昼)",
        isVisible: false,
      },
      {
        time: "04",
        forCheckTime: "PM 16",
        gapTime: Number("16") - nowHour,
        displayHour: "PM",
        displayMorE: "(昼)",
        isVisible: false,
      }, //-6
      {
        time: "05",
        forCheckTime: "PM 17",
        gapTime: Number("17") - nowHour,
        displayHour: "PM",
        displayMorE: "(夜)",
        isVisible: false,
      }, // -5
      {
        time: "06",
        forCheckTime: "PM 18",
        gapTime: Number("18") - nowHour,
        displayHour: "PM",
        displayMorE: "(夜)",
        isVisible: false,
      }, // -4
      {
        time: "07",
        forCheckTime: "PM 19",
        gapTime: Number("19") - nowHour,
        displayHour: "PM",
        displayMorE: "(夜)",
        isVisible: false,
      },
      {
        time: "08",
        forCheckTime: "PM 20",
        gapTime: Number("20") - nowHour,
        displayHour: "PM",
        displayMorE: "(夜)",
        isVisible: false,
      },
      {
        time: "09",
        forCheckTime: "PM 21",
        gapTime: Number("21") - nowHour,
        displayHour: "PM",
        displayMorE: "(夜)",
        isVisible: false,
      }, //-1
      {
        time: "10",
        forCheckTime: "PM 22",
        gapTime: Number("22") - nowHour,
        displayHour: "PM",
        displayMorE: "(夜)",
        isVisible: false,
      }, //now 0
      {
        time: "11",
        forCheckTime: "PM 23",
        gapTime: Number("23") - nowHour,
        displayHour: "PM",
        displayMorE: "(深夜)",
        isVisible: false,
      }, // 1
    ];

    const plusGapTimeArray = timeArray.filter(
      (childData) => childData.gapTime >= 0,
    );
    const minusGapTimeArray = timeArray.filter(
      (childData) => childData.gapTime < 0,
    );
    // gapTimeがプラスの場合の降順配列

    const plusSortData = plusGapTimeArray.sort((a, b) => {
      return a.gapTime - b.gapTime;
    });
    const minusSortData = minusGapTimeArray.sort((a, b) => {
      return a.gapTime - b.gapTime;
    });

    const combinedData = [...plusSortData, ...minusSortData];
    setSortTimeArray(combinedData);
  }, []);

  //操作に応じて文字色の変更
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      if (theme) {
        divRef.current.style.color = "#000000";
      } else {
        divRef.current.style.color = "#FFFFFF";
      }
    }
  }, [theme]);

  return (
    <Box
      sx={{
        opacity: sidebarOpacity,
        "@media screen and (max-width:700px)": {
          display: "none",
        },
      }}
      ref={divRef}
    >
      <Stack spacing={1.3} fontSize={9}>
        {sortTimeArray.map((time, index) => (
          <Box key={index}>
            {
              <div
                className={styles.all}
             
                ref={(el) => {
                  if (el) {
                    // 配列の長さを確保する
                    if (sidebarTimeRefs.current.length === index) {
                      sidebarTimeRefs.current.push(el);
                    } else {
                      sidebarTimeRefs.current[index] = el;
                    }
                  }
                }}
              >
                <div className={styles.displayHour}> {time.displayHour} </div>
                <div className={styles.time}> {time.time}</div>

                <div
                  className={styles.displayMorE}
                  // ref={(el) => (timeRefs.current[index] = el)}
                >
                  {" "}
                  {time.displayMorE}{" "}
                </div>
              </div>
            }
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Sidebar;
