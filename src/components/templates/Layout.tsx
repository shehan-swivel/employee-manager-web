import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import styles from "@/styles/Layout.module.css";
import { Container } from "@mui/material";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
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
