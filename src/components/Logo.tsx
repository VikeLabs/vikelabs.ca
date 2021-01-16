import React from "react";
import styled from "styled-components";
import logo from "../img/logo.svg";
import blackLogo from "../img/black_logo.svg";
import blueLogo from "../img/blue_logo.svg";
import greenLogo from "../img/green_logo.svg";
import silverLogo from "../img/silver_logo.svg";

const LogoWrapper = styled.img`
  height: 35px;
`;

type LogoVariants = "black" | "blue" | "silver" | "green";

export const VikeLabsLogo = (color?: LogoVariants) => {
  // TODO: fix
  switch (color) {
    case "blue":
      return <LogoWrapper src={blueLogo} />;
    case "green":
      return <LogoWrapper src={greenLogo} />;
    case "silver":
      return <LogoWrapper src={silverLogo} />;
    case "black":
      return <LogoWrapper src={blackLogo} />;
    default:
      return <LogoWrapper src={blackLogo} />;
  }
};

export const VikeLabs = () => <LogoWrapper src={logo} />;
