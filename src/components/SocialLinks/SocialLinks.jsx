import React, { Component } from "react";
import styled from "styled-components";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  FacebookShareCount,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  LinkedinIcon,
} from "react-share";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";
import "./SocialLinks.css";
import "../../utils/styles";
import mediaQuery from "../../utils/mediaQuery";

const Container = styled.div`
  ${mediaQuery.maxTablet} {
    order: 2;
  }
`;
const Wrapper = styled.aside`
  position: sticky;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;

  ${mediaQuery.maxTablet} {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;

class SocialLinks extends Component {
  render() {
    const { postNode, postPath, mobile } = this.props;
    const post = postNode.frontmatter;
    const url = urljoin(config.siteUrl, config.pathPrefix, postPath);
    const iconSize = mobile ? 20 : 36;
    const filter = (count) => (count > 0 ? count : "");
    const renderShareCount = (count) => (
      <div className="share-count">{filter(count)}</div>
    );

    return (
      <Container>
        <Wrapper>
          <TwitterShareButton url={url} title={post.title}>
            <TwitterIcon
              round
              size={iconSize}
              bgStyle={{ fill: "var(--color-grey-shades-100)" }}
              iconFillColor="var(--color-grey-shades-300)"
            />
          </TwitterShareButton>
          <FacebookShareButton url={url} quote={postNode.excerpt}>
            <FacebookIcon
              round
              size={iconSize}
              bgStyle={{ fill: "#eee" }}
              iconFillColor="#aaa"
            />
            <FacebookShareCount url={url}>
              {(count) => renderShareCount(count)}
            </FacebookShareCount>
          </FacebookShareButton>
          <LinkedinShareButton
            url={url}
            title={post.title}
            description={postNode.excerpt}
          >
            <LinkedinIcon
              round
              size={iconSize}
              bgStyle={{ fill: "#eee" }}
              iconFillColor="#aaa"
            />
          </LinkedinShareButton>
          <TelegramShareButton url={url}>
            <TelegramIcon
              round
              size={iconSize}
              bgStyle={{ fill: "#eee" }}
              iconFillColor="#aaa"
            />
          </TelegramShareButton>
        </Wrapper>
      </Container>
    );
  }
}

export default SocialLinks;
