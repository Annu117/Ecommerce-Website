// const { default: Footer } = require("./Footer")
// const { default: Navbar } = require("./Navbar")

// import Admin from "../components/Admin";
import Footer from "./Footer"
import Navbar from "./Navbar"
const Layout = ({children}) =>{
    return(
        <>
        <Navbar />
        <main>{children}</main>
        {/* <Route path="/admin" element={<Admin />} /> */}

        <Footer/>
         </>
    )
}
export default Layout;