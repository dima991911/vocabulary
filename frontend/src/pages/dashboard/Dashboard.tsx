import React, { FC } from "react";

import { PropsType } from "../../types/page";

const Dashboard: FC<PropsType> = ({ title }) => {
    return (
        <div>
            <h2>{title || 'Dashboard'}</h2>
        </div>
    )
}

export default Dashboard;
