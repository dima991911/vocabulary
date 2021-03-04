import React, { FC, useEffect, useState } from "react";

import './TranslateItem.css';

type PropsType = {
    text: string
    flagCode?: string
    isShowing?: boolean
    canBeHide?: boolean
}

const TranslateItem: FC<PropsType> = ({ flagCode= 'gb', canBeHide = false,
                                          isShowing = true, text }) => {

    const [isVisible, setIsVisible] = useState<boolean>(isShowing);

    useEffect(() => {
        setIsVisible(isShowing);
    }, [isShowing]);

    const toggleVisible = () => {
        if (canBeHide) {
            setIsVisible(!isVisible);
        }
    }

    return (
        <div className="word-item-info-item">
            <img src={`https://www.countryflags.io/${flagCode}/flat/24.png`} alt={flagCode} />

            {
                isVisible ?
                    <span onClick={toggleVisible}>{text}</span> :
                    <span className="hide-translate" onClick={toggleVisible}>Click that show translate</span>
            }
        </div>
    )
}

export default TranslateItem;
