import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { maxq } from "../../styles/globalstyles/variables";

export const CommitData = styled.div`
  p {
    margin-bottom: 0;
    width: calc(100% - 3em);
    ${maxq[1]} {
      width: calc(100% - 3em);
    }
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`
export const AuthorDate = styled.p`
  color: var(--color-text);
  :hover {
    color: var(--color-text);
  }
`
export const Author = styled.span`
  color: var(--color-green);
`
export const CommitMessage = styled.p`
  color: var(--color-orange);
`