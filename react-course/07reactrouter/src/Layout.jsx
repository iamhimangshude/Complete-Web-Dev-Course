import React from "react";
import { Outlet } from "react-router";
import { Header, Footer } from "./components/index";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
