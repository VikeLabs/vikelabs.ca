import React from "react";
import styled from "@emotion/styled";

export type SocialIcon = {
  icon: React.ReactNode;
  url: string;
};

const SocialIconRow = styled.div`
  display: flex;
  justify-content: center;
`;

const SocialIconLink = styled.a`
  font-size: 30px;
`;

const SocialIcons = ({ socialIcons }: { socialIcons: SocialIcon[] }) => {
  return (
    <SocialIconRow>
      {socialIcons.map((socialIcon: SocialIcon) => (
        <SocialIconLink key={socialIcon.url} href={socialIcon.url}>
          {socialIcon.icon}
        </SocialIconLink>
      ))}
    </SocialIconRow>
  );
};

export default SocialIcons;
