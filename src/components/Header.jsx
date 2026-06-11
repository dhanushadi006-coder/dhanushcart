import { Link } from "react-router-dom";

function Header() {
  return (
    <div
      style={{
        background: "#000000",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white", margin: 0 }}>
        My MERN App
      </h2>

      <div
        style={{
          display: "flex",
          gap: "25px",
        }}
      >
        <Link
          to="/"
          style={{ color: "white",
             textDecoration: "none",
             }}
        >
          Home
        </Link>

        <Link
          to="/blog"
          style={{ color: "white",
             textDecoration: "none",
             }}
        >
          Blog
        </Link>

        <Link
          to="/contact"
          style={{ color: "white", 
            textDecoration: "none",

           }}
        >
          Contact
        </Link>

        <Link
          to="/product"
          style={{ 
            color: "white", 
            textDecoration: "none",
           }}
        >
          Product
        </Link>
      </div>
    </div>
  );
}

export default Header;