import React from 'react';
import ScrollPane from './ScrollPane';


type Props = {
    height: number;
}

const RightPane: React.FC<Props> = (props: Props) => {

    return (
        <ScrollPane height={props.height}>
            
        </ScrollPane>
    )
}

export default RightPane;