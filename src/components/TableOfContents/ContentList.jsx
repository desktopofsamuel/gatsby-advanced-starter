import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import PropTypes from "prop-types";

const Marker = styled.span`
  width: ${(props) => (props.nested ? "12px" : "20px")};
  height: 6px;
  border-radius: 3px;
  background-color: lightgrey;
  margin-right: 8px;
  transition: 0.3s all ease-in-out;
`;

const Anchor = styled.a`
  font-size: ${(props) => (props.nested ? "12px" : "12px")};
  font-weight: ${(props) => (props.nested ? "regular" : "bolder")};
  color: ${(props) => (props.nested ? "lightgrey" : "darkgrey")};
  opacity: ${(props) => (props.active ? "0" : "1")};
  transition: 0.3s all ease-in-out;
`;

const Container = styled.div`
  display: inline-grid;
  grid-template-columns: 20px auto;
  grid-auto-rows: auto;
  gap: 8px 16px;
  align-items: center;

  &:hover ${Anchor} {
    color: darkgrey;
  }

  &:hover ${Marker} {
    background-color: darkgrey;
  }
`;

const List = styled.div`
  padding-inline-start: 0;
  margin: 4px 0;

  &:hover ${Anchor} {
    opacity: 1;
  }
`;

const ContentList = ({ items, nested, active }) => {
  return (
    <List>
      {items.map((item) => {
        return (
          <ContentItem
            key={`${item.url}-item`}
            item={item}
            nested={nested}
            active={active}
          />
        );
      })}
    </List>
  );
};

const ContentItem = ({ item, nested, active }) => (
  <List>
    <Container>
      <Marker nested={nested} />
      <Anchor href={item.url} nested={nested} active={active}>
        {item.title}
      </Anchor>
    </Container>
    {item.items && item.items.length && (
      <>
        <ContentList
          key={`${item.url}-list`}
          items={item.items}
          nested
          active={active}
        />
      </>
    )}
  </List>
);

export default ContentList;

ContentList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  nested: PropTypes.bool,
  active: PropTypes.bool,
};

ContentList.defaultProps = {
  nested: false,
  active: false,
};
