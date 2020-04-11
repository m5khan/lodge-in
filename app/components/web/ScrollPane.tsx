import React from 'react';
import styled from 'styled-components';



const StyledPane = styled.div`
    max-height: ${(props: Props) => `${props.height}px`};
    overflow-x: hidden;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 8px;
      }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

    &::-webkit-scrollbar-thumb {
        background: #888;
      }
`;

type Props = {
    height: number;
    children: (string | JSX.Element) | (string | JSX.Element)[]
}

const ScrollPane: React.FC<Props> = (props: Props) => {

    return (
        <StyledPane {...props}>
          {props.children}
        </StyledPane>
    )
}

export default ScrollPane;