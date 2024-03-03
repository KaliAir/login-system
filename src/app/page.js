"use client"
import Link from "next/link";
import { Style } from "./styleJS";
import { AiOutlineLogin } from "react-icons/ai";
import { MdInventory } from "react-icons/md";
import { motion } from "framer-motion";


const LandingPage = () => {
  return (
    <div style={Style.mainContainer}>
      <div style={Style.nav}>
        <Link href="/login">
        <motion.div style={Style.navItem}
          whileHover={{
            scale: 1.05,
            color: "#78A083",
          }}
        >
          <AiOutlineLogin/>
          <p>Login</p>
        </motion.div>
        </Link>
      </div>
      <div style={Style.content}>
        <div style={Style.contentItem}>
          <MdInventory style={Style.contentItemIcon}/>
          <h1>Welcome to JJM Inventory System</h1>
        </div>
      </div>
      <div style={Style.footer}>
        <h2 style={Style.footerItem}>©2024_JhonJubenMallari</h2>
      </div>
    </div>
  )
};
export default LandingPage;