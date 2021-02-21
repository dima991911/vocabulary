import React, { FC } from "react";

import { PropsType } from "../../types/page";

export const Home: FC<PropsType> = ({ title }) => {
    return <div>{title || 'Home'}</div>
}
