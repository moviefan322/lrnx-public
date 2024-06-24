import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.css";
import { fadeIn, fadeInTransition } from "../utils/animation.util";
import { FaX } from "react-icons/fa6";
import styles from "./Header.module.css";
import StartOverModal from "@/components/StartOverModal";

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();
  const isHome = router.pathname === "/";

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <nav className="navbar mb-4 storybook-header">
        <div className="container-fluid pt-2">
          <a className="navbar-brand">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={fadeInTransition}
            >
              <Image
                width="100"
                height="30"
                className="img-fluid"
                alt="Navigation logo"
                src="/laronix-header.png"
              />
            </motion.div>
          </a>
          <button className={styles.nostyleButt} onClick={() => openModal()}>
            {!isHome && <FaX />}
          </button>
        </div>
      </nav>
      {modalIsOpen && <StartOverModal closeModal={closeModal} />}
    </>
  );
};

export default Header;
