import Bio from "./components/Bio";
import Books from "./components/Books";
import Contact from "./components/Contact";
import Exhibitions from "./components/Exhibitions";
// import Header from "./components/Header";
import News from "./components/News";
import Time from "./TimePage/Time";
import Work from "./components/Work";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Nomatch from "./components/Routes/Nomatch";
import { useEffect, useState } from "react";
import { client } from "./components/libs/client";
import Exhibition from "./components/exhibitionsPages/Exhibition";
import { Box } from "@mui/material";
import TimeMordal from "./TimePage/TimeMordal";

export interface Root {
  contents: Content[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface Content {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  firstPage: FirstPage[];
  detailPage: DetailPage[];
}

interface bioPicture {
  url: string;
  height: number;
  width: number;
}
export interface FirstPage {
  fieldId: string;
  Timepictures?: Timepictures;
  time?: string;
  exhibitionsPicture?: ExhibitionsPicture;
  exhibitionsText?: string;
  biotext?: string;
  biopicture?: bioPicture;
  contactBody?: ContactBody[];
}

export interface Timepictures {
  url: string;
  height: number;
  width: number;
}

export interface ExhibitionsPicture {
  url: string;
  height: number;
  width: number;
}

interface Gazo {
  url: string;
  height: number;
  width: number;
}
export interface ContactBody {
  fieldId: string;
  header?: string;
  urlIntroduction?: string;
  url?: string;
  URL2?: Url2[];
  gazo?: Gazo;
}

export interface Url2 {
  fieldId: string;
  urlIntroduction: string;
  url: string;
}

export interface DetailPage {
  fieldId: string;
  exhibitionTitle: string;
  exhibitionPicture: ExhibitionPicture[];
}

export interface ExhibitionPicture {
  url: string;
  height: number;
  width: number;
}

export interface PicProps {
  picture: string | undefined;
  time: string | undefined;
  gapTime: number | undefined;
  editedTime: string;
}

function App() {
  const [data, setData] = useState<Content[] | undefined>(undefined);
  const [theme, setTheme] = useState(true);
  const [showMordal, setShowMordal] = useState<boolean>(false);
  const [selectedPicIndex, setSelectedPicIndex] = useState<number | null>(null);
  const [picData, setPicsData] = useState<PicProps[]>([]);
 

  //microCMSからデータをフェッチ
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.get({
          endpoint: "blog",
        });
        if (res.contents) {
          setData(res.contents);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    
  }, []);

  return (
    <Router>
      <Box>
        <Box>
          <Box>
            <Routes>
              <Route
                path="/"
                element={
                  <Time
                    data={data}
                    theme={theme}
                    setTheme={setTheme}
                    picData={picData}
                    setPicsData={setPicsData}
                    showMordal={showMordal}
                    setShowMordal={setShowMordal}
                    selectedPicIndex={selectedPicIndex}
                    setSelectedPicIndex={setSelectedPicIndex}
                  />
                }
              />
              <Route path="works" element={<Work />} />
              <Route
                path="/exhibitions"
                element={<Exhibitions data={data} />}
              ></Route>

              <Route
                path="/exhibition/:id"
                element={<Exhibition data={data} />}
              />

              <Route path="/books" element={<Books />} />

              <Route path="/bio" element={<Bio data={data} />} />
              <Route path="/contact" element={<Contact data={data} />} />
              <Route path="/news" element={<News />} />
              <Route path="*" element={<Nomatch />} />
            </Routes>

            {showMordal && (
              <TimeMordal
                selectedPicIndex={selectedPicIndex}
                setSelectedPicIndex={setSelectedPicIndex}
                showMordal={showMordal}
                setShowMordal={setShowMordal}
                picData={picData}
                theme={theme}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
