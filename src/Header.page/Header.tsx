import React, { useEffect, useRef, useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import styles from "Css/firstpage.module.scss";
import { Link, } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TocIcon from "@mui/icons-material/Toc";
import HeaderMordal from "./HeaderMordal";

interface HeaderProps {
  theme?: boolean;
  setTheme?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ theme = true }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (headerRef.current) {
      if (theme) {
        headerRef.current.style.backgroundColor = "#FFFFFF"; //白
        headerRef.current.style.color = "#000000";
      } else {
        headerRef.current.style.backgroundColor = "#000000";
        headerRef.current.style.color = "#FFFFFF";
      }
    }
  }, [theme]);

  return (
    <Box className={styles.body}>
      <header ref={headerRef} className={styles.header}>
        <Box className={styles.headTextPosition}>
          <Link to="/" className={styles.headText}>
            KOKORO NAKAMAE in Kyoto{" "}
          </Link>
        </Box>
        <Box className={styles.humButton} onClick={() => handleOpen()}>
          <TocIcon sx={{ fontSize: "50px" }} />
        </Box>

        <nav>
          <ul className={styles.ul}>
            <li className={styles.nav}>
              <Link to="/" className={styles.link}>
                TIME
              </Link>
            </li>
            <li className={styles.nav}>
              <Link to="/works" className={styles.link}>
                WORKS
              </Link>
            </li>
            <li className={styles.nav}>
              <Link to="/exhibitions" className={styles.link}>
                EXHIBITIONS
              </Link>
            </li>
            <li className={styles.nav}>
              <Link to="/books" className={styles.link}>
                BOOKS
              </Link>
            </li>
            <li className={styles.nav}>
              <Link to="/bio" className={styles.link}>
                BIO
              </Link>
            </li>
            <li className={styles.nav}>
              <Link to="/contact" className={styles.link}>
                CONTACT
              </Link>
            </li>
            <li className={styles.nav}>
              <Link to="/news" className={styles.link}>
                NEWS
              </Link>
            </li>
            <a className={styles.nav}>
              <InstagramIcon style={{ fontSize: 15 }}></InstagramIcon>
            </a>
            <a href="https://x.com/upperprecord" className={styles.nav}>
              <TwitterIcon style={{ fontSize: 15 }}></TwitterIcon>
            </a>
          </ul>
        </nav>
      </header>
      <Box>
        <HeaderMordal open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
};

export default Header;
