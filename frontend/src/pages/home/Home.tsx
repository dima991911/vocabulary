import React, { FC } from "react";

import { PropsType } from "../../types/page";

const Home: FC<PropsType> = ({ title }) => {
    return (
        <div>
            <h2>{title || 'Home'}</h2>
        </div>
    )
}

export default Home;
