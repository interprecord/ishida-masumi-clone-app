import React, { useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import styles from "Css/firstpage.module.scss";
import { Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
interface HeaderMoralProps{
  open:boolean;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderMordal:React.FC<HeaderMoralProps> = ({open,setOpen}) => {
 
    //レスポンシブメニューでtop、timeを押された時の条件分岐
    const location = useLocation();
    const isRootPath = location.pathname === '/';

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)"}}
        >
          <Box className={styles.innerHeader}>
            <Box className={styles.closeButton}>
              <CloseIcon onClick={() => handleClose()} />{" "}
            </Box>

            <Box className={styles.innerHeadText} onClick={handleClose}>
              KOKORO NAKAMAE{" "}
            </Box>

            <Box className={styles.menu}>
              {" "}
              <nav>
                <ul className={styles.innerUl}>
                <li className={styles.innerNav}>
                    <Link  to="/" onClick={isRootPath ? handleClose : undefined} className={styles.innerLink}>
                      TOP
                    </Link>
                  </li>
                  <li className={styles.innerNav} >
                    <Link to="/" onClick={isRootPath ? handleClose : undefined} className={styles.innerLink} >
                      TIME
                    </Link>
                  </li>
                  <li className={styles.innerNav}>
                    <Link to="/works" className={styles.innerLink}>
                      WORKS
                    </Link>
                  </li>
                  <li className={styles.innerNav}>
                    <Link to="/exhibitions" className={styles.innerLink}>
                      EXHIBITIONS
                    </Link>
                  </li>
                  <li className={styles.innerNav}>
                    <Link to="/books" className={styles.innerLink}>
                      BOOKS
                    </Link>
                  </li>
                  <li className={styles.innerNav}>
                    <Link to="/bio" className={styles.innerLink}>
                      BIO
                    </Link>
                  </li>
                  <li className={styles.innerNav}>
                    <Link to="/contact" className={styles.innerLink}>
                      CONTACT
                    </Link>
                  </li>
                  <li className={styles.innerNav}>
                    <Link to="/news" className={styles.innerLink}>
                      NEWS
                    </Link>
                  </li>
                  <a 
                    
                    className={styles.innerNav}
                  >
                    <InstagramIcon style={{ fontSize: 30 }}></InstagramIcon>
                  </a>
                  <a
                    href="https://x.com/upperprecord"
                    className={styles.innerNav}
                  >
                    <TwitterIcon style={{ fontSize: 30}}></TwitterIcon>
                  </a>
                </ul>
              </nav>
            </Box>
          </Box>
        </Modal>
      </Box>
    </div>
  )
}

export default HeaderMordal