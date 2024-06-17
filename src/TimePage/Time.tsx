import React, { useEffect, useRef, useState } from "react";
import { dataProps } from "../components/Exhibitions";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidebar from "./Sidebar";
import { FirstPage, PicProps, Timepictures } from "@/App";
import styles from "Css/Timepage.module.scss";
import Header from "@/Header.page/Header";

interface TimeProps extends dataProps {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  showMordal: boolean;
  setShowMordal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPicIndex: number | null;
  setSelectedPicIndex: React.Dispatch<React.SetStateAction<number | null>>;
  picData: PicProps[];
  setPicsData: React.Dispatch<React.SetStateAction<PicProps[]>>;
}

const Time: React.FC<TimeProps> = ({
  data,
  picData,
  setPicsData,
  theme,
  setTheme,
  showMordal,
  setShowMordal,
  selectedPicIndex,
  setSelectedPicIndex,
}) => {
  const [topPicOpacity, setTopPicOpacity] = useState(1);
  const [picsOpacity, setPicsOpacity] = useState(0);
  const [topPic, setTopPic] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const sidebarTimeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileTimeRef = useRef<(HTMLDivElement | null)[]>([]);
  const timeRef = useRef<HTMLDivElement>(null);

  const [localTheme, setLocalTheme] = useState(theme);
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 700,
        left: 0,
        behavior: "smooth",
      });
    };

    scrollToTop();
  }, [data]);
  //mordal画面になったらスクロールできなくする。
  useEffect(() => {
    if (showMordal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // クリーンアップ関数を使用して、コンポーネントがアンマウントされるときにスクロールを元に戻す
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMordal]);

  const topPicClick = () => {
    //表示されている要素が最後でなければtopPicに1追加

    if (topPic !== picData.length - 1) {
      setTopPic(topPic + 1);
    } else {
      setTopPic(0);
    }
  };

  //topPicscrollイベント
  useEffect(() => {
    const handleScroll = () => {
      let topPicOpacity = 1 - Math.min(window.scrollY / 250, 1);
      let picsOpacity = Math.min(window.scrollY / 250, 1);

      setTopPicOpacity(topPicOpacity);
      setPicsOpacity(picsOpacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMordal = (index: number) => {
    setSelectedPicIndex(index);
    setShowMordal(!showMordal);
  };

  useEffect(() => {
    const nowHnM: number = Number(dayjs().format("HH" + "mm"));

    if (data) {
      const newData = data[0].firstPage.map((prevPicData) => {
        const time = dayjs(prevPicData.time).format("HHmm");
        const isAM = Number(time.slice(0, 2)) < 11;
        const editedTime = `${isAM ? "AM" : "PM"} ${time.slice(0, 2)}:${time.slice(2)}`;

        return {
          picture: prevPicData.Timepictures?.url,
          time: time,
          editedTime: editedTime,
          gapTime: Number(time) - nowHnM,
        };
      });

      setPicsData(newData);

      const plusGapTimeData = newData.filter(
        (childData) => childData.gapTime >= 0,
      );

      const minusGapTimeData = newData.filter(
        (childData) => childData.gapTime < 0,
      );

      const sortPlusData = plusGapTimeData.sort((a, b) => {
        if (typeof a.gapTime === "number" && typeof b.gapTime === "number") {
          return a.gapTime - b.gapTime;
        }
        if (typeof a.gapTime === "undefined") {
          return 1;
        }
        if (typeof b.gapTime === "undefined") {
          return -1;
        }
        return 0;
      });

      const sortMinusData = minusGapTimeData.sort((a, b) => {
        if (typeof a.gapTime === "number" && typeof b.gapTime === "number") {
          return a.gapTime - b.gapTime;
        }
        if (typeof a.gapTime === "undefined") {
          return 1;
        }
        if (typeof b.gapTime === "undefined") {
          return -1;
        }
        return 0;
      });

      const combinedData = [...sortPlusData, ...sortMinusData];
      const combinedDataWithIds = combinedData.map((item, index) => ({
        ...item,
        id: index,
      }));

      setPicsData(combinedDataWithIds);
    }
  }, [data]);

  //時間によって背景色を変える
  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.backgroundColor = theme ? "#FFFFFF" : "#000000";
      // mobileTimeRef.current.style.color = theme ? "#000000" : "#FFFFFF";
    }
  }, [theme]);

  // sideBarの設定
  useEffect(() => {
    const callback = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const time = entry.target.innerText;

          ///背景の変更
          const updateTime = Number(time.slice(2, 5));
          const isWithinRange: boolean = updateTime >= 5 && updateTime < 18;

          //  最後の要素かどうかをチェック
          const isLastElement =
            entry.target === timeElements[timeElements.length - 1];
          if (!isLastElement) {
            setTheme(isWithinRange);
          }

          sidebarTimeRefs.current.forEach((element) => {
            const childHour = element?.children[0] as HTMLElement;
            const childTime = element?.children[1] as HTMLElement;
            const childMorE = element?.children[2] as HTMLElement;
            const timeValue = Number(childTime.textContent?.trim());

            // AM/PMに基づいて24時間表記に変換
            let forCheckTime;
            if (childHour.textContent?.trim() === "PM") {
              forCheckTime = timeValue !== 12 ? timeValue + 12 : 12;
            } else {
              forCheckTime =
                timeValue === 12 ? 0 : String(timeValue).padStart(2, "0");
            }

            const timeBarTime =
              childHour.textContent &&
              childHour.textContent.trim() + forCheckTime;
            const scrollTime =
              time.slice(0, 2).trim() + time.slice(2, 5).trim().toUpperCase();

            if (timeBarTime === scrollTime) {
              childHour.style.opacity = "1";
              childMorE.style.opacity = "1";
            } else {
              childHour.style.opacity = "0";
              childMorE.style.opacity = "0";
            }
          });

          //isWithinRangeによってHeaderのthemeを変える。
          const checkTime = () => {
            setLocalTheme(isWithinRange); //朝昼ならtrue
          };
          checkTime();

          const intervalId = setInterval(checkTime, 600000);
          return () => clearInterval(intervalId);
        }
      });
    };

    const options = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: [
        0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,
        0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
      ],
    };
    const observer = new IntersectionObserver(callback, options);

    const timeElements = document.querySelectorAll(".imgContainer");
    timeElements.forEach((el) => observer.observe(el));

    return () => timeElements.forEach((el) => observer.unobserve(el));
  }, [picData]);

  return (
    <Box
      ref={divRef}
      style={{
        transition: "background-color 0.3s ease",
        width: "100%",
      }}
    >
      <Box sx={{ zIndex: "2", top: "0" }}>
        <Header theme={localTheme} />
      </Box>

      <Box style={{ position: "relative" }}>
        <Box
          onClick={() => topPicClick()}
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "700px",
            opacity: topPicOpacity,
            width: "100%",
            cursor: "pointer",
            "@media screen and (max-width:600px)": {
              height: "500px",
            },
          }}
        >
          <img src={picData?.[topPic]?.picture} className={styles.topImg} />
          {picData && picData.length > 0 && picData[0].editedTime && (
            <Box ref={mobileTimeRef} className={styles.mobileTime}>
              {picData[0].editedTime}
            </Box>
          )}
        </Box>

        <Box className={styles.scrolldown} style={{ opacity: topPicOpacity }}>
          <span>・</span>
        </Box>
      </Box>

      <Box sx={{ position: "fixed", top: "150px", left: "50px" }}>
        <Sidebar
          theme={theme}
          setTheme={setTheme}
          sidebarOpacity={picsOpacity}
          setSidebarOpacity={setPicsOpacity}
          sidebarTimeRefs={sidebarTimeRefs}
        />
      </Box>

      <Box
        sx={{
          width: "85%",
          margin: "auto",
          mt: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "90px",
          opacity: picsOpacity,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            // backgroundColor: "green",
            marginBottom: "300px",
          }}
        >
          {picData.map((sortedData, index) => (
            <Grid
              key={index}
              item
              xs={6}
              sm={6}
              md={4}
              lg={2.29}
              sx={{
                position: "relative",
                paddingRight: "0",
                overflow: "hidden",
              }}
            >
              <Box
                className={`${styles.imgContainer} imgContainer`}
                ref={timeRef}
              >
                <Box className={styles.imgTime}>{sortedData.editedTime}</Box>
                <Box>
                  <img
                    src={sortedData.picture}
                    alt="Image"
                    className={styles.img}
                    onClick={() => handleMordal(index)}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Time;
