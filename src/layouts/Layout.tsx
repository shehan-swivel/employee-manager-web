import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import styles from "@/styles/Layout.module.css";
import { Container } from "@mui/material";
import { ReactNode } from "react";

type layoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: layoutProps) => {
  return (
    <>
      <Navbar />
      <Container className={styles.container} maxWidth="lg">
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
