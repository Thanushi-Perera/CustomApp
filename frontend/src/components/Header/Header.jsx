import React, { useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Logo from "../../assets/images/logo.PNG";
import "./header.css";

import { AuthContext } from "./../../context/AuthContext";

const nav__link = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  
];

const Header = () => {
  const headerRef = useRef(null);
  const navigation = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigation("/");
  };
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/* ================ logo ============= */}
            <div className="logo">
              <img src={Logo} alt="" />
            </div>
            {/* ================ logo end ============= */}

            {/* ================ Menu Start ============= */}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav__link.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* ================ Menu End ============= */}

            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Link to={"/profile"}>
                      <button className="btn btn-info">Profile</button>
                    </Link>
                    <button className="btn btn-dark" onClick={logout}>
                      logout
                    </button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to={"/login"}>Login</Link>
                    </Button>
                    
                  </>
                )}
              </div>
              <span className="mobile__menu">
                <i class="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};
export default Header;
