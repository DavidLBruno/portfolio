import React from "react";
import "./Configurations.scss";

type ConfigProps = {
  toggleMenu: () => void;
};

const Configurations = ({ toggleMenu }: ConfigProps) => {
  return (
    <body className="body">
      <div className="container">
        <div className="cruss" onClick={toggleMenu}>
          <svg
            fill="white"
            width="24px"
            height="24px"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
          </svg>
        </div>
        <div className="containerBody">
          <div className="languaje">
            <h1>Idioma</h1>
            <form id="app-cover">
              <div id="select-box">
                <input type="checkbox" id="options-view-button" />
                <div id="select-button" className="brd">
                  <div id="selected-value">
                    <span>Select a platform</span>
                  </div>
                  <div id="chevrons">
                    <i className="fas fa-chevron-up"></i>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                <div id="options">
                  <div className="option">
                    <input
                      className="s-c top"
                      type="radio"
                      name="platform"
                      value="freecodecamp"
                    />
                    <input
                      className="s-c bottom"
                      type="radio"
                      name="platform"
                      value="freecodecamp"
                    />
                    <i className="fab fa-free-code-camp">
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--twemoji"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path
                          fill="#C60A1D"
                          d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"
                        ></path>
                        <path fill="#FFC400" d="M0 12h36v12H0z"></path>
                        <path
                          fill="#EA596E"
                          d="M9 17v3a3 3 0 1 0 6 0v-3H9z"
                        ></path>
                        <path fill="#F4A2B2" d="M12 16h3v3h-3z"></path>
                        <path fill="#DD2E44" d="M9 16h3v3H9z"></path>
                        <ellipse
                          fill="#EA596E"
                          cx="12"
                          cy="14.5"
                          rx="3"
                          ry="1.5"
                        ></ellipse>
                        <ellipse
                          fill="#FFAC33"
                          cx="12"
                          cy="13.75"
                          rx="3"
                          ry=".75"
                        ></ellipse>
                        <path
                          fill="#99AAB5"
                          d="M7 16h1v7H7zm9 0h1v7h-1z"
                        ></path>
                        <path
                          fill="#66757F"
                          d="M6 22h3v1H6zm9 0h3v1h-3zm-8-7h1v1H7zm9 0h1v1h-1z"
                        ></path>
                      </svg>
                    </i>

                    <span className="label">Esp</span>
                    <span className="opt-val">Esp</span>
                  </div>
                  <div id="option-bg"></div>
                </div>
              </div>
            </form>
          </div>
          <div className="modo">
            <h1>Modo</h1>
            <select name="" id="">
              <option value=""></option>
              <option value="">Nocturno</option>
              <option value="">Claro</option>
            </select>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Configurations;
