import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import styles from "@/styles/Layout.module.css";
import { Container } from "@mui/material";
import type { ReactNode } from "react";

type layoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: layoutProps) => {
  return (
    <>
      <Navbar />
      <Container className={styles.container} maxWidth="lg" sx={{ pt: 4 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
