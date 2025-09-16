import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { observer } from "mobx-react";

import Button from "@components/Button";
import { ConnectWalletButton } from "@components/ConnectWalletButton";
import { media } from "@themes/breakpoints";

import Logo from "@assets/icons/logo.svg?react";

import useFlag from "@hooks/useFlag";
import { useMedia } from "@hooks/useMedia";

import { SmartFlex } from "../SmartFlex";

const Header: React.FC = observer(() => {
  const media = useMedia();
  const [isMobileMenuOpen, , closeMobileMenu] = useFlag();

  useEffect(() => {
    if (media.desktop) {
      closeMobileMenu();
    }
  }, [media]);

  const renderWallet = () => {
    const dataOnboardingConnectKey = `connect-${media.mobile ? "mobile" : "desktop"}`;

    return (
      <>
        <WalletContainer data-onboarding={dataOnboardingConnectKey} isVisible={!isMobileMenuOpen}>
          <ConnectWalletButton targetKey="header_connect_btn" data-connect-button fitContent>
            <ConnectButton showBalance={true} />
          </ConnectWalletButton>
        </WalletContainer>
      </>
    );
  };

  const renderMobile = () => {
    return (
      <>
        <SmartFlex center="y">
          <a href="/" rel="noreferrer noopener">
            <LogoStyled />
          </a>
        </SmartFlex>
        <SmartFlex center="y" gap="8px">
          {renderWallet()}
        </SmartFlex>
      </>
    );
  };

  const renderDesktop = () => {
    return (
      <>
        <SmartFlex center="y">
          <a href="/" rel="noreferrer noopener">
            <LogoStyled />
          </a>
          <Divider />
        </SmartFlex>
        <SmartFlex center="y" gap="16px">
          {renderWallet()}
        </SmartFlex>
      </>
    );
  };

  return <Root>{media.mobile ? renderMobile() : renderDesktop()}</Root>;
});

export default Header;

const Root = styled(SmartFlex)`
  justify-content: space-between;
  width: 100%;
  height: 56px;
  min-height: 56px;
  padding: 0 12px;

  ${media.mobile} {
    height: 40px;
    min-height: 40px;
    padding: 0 8px;
    margin: 4px 0;
  }
`;

const Divider = styled.div`
  margin: 0 16px;
  width: 1px;
  height: 32px;
  background: ${({ theme }) => theme.colors.bgSecondary};
`;

const WalletContainer = styled(SmartFlex)<{ isVisible?: boolean }>`
  opacity: ${({ isVisible = true }) => (isVisible ? "1" : "0")};
  transition: opacity 150ms;

  ${media.mobile} {
    ${Button} {
      height: 32px;
    }
  }
`;

const LogoStyled = styled(Logo)`
  width: 124px;
  height: 40px;

  ${media.mobile} {
    width: 100px;
    height: 32px;
  }
`;
