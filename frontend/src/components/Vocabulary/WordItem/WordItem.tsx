import React, { FC, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Button } from "antd";

import { ILanguageType, IWord } from "../../../types/types";

import './WordItem.css';
import { AppStateType } from "../../../store";

type PropsType = {
    word: IWord
    showTranslate: boolean
}

const WordItem: FC<PropsType> = ({ word, showTranslate }) => {
    const [isShowTranslate, setIsShowTranslate] = useState<boolean>(showTranslate);
    const wordLanguage = useSelector<AppStateType, ILanguageType | undefined>(state => state.app.languages.find(l => l._id === word.wordLanguage));
    const translateLanguage = useSelector<AppStateType, ILanguageType | undefined>(state => state.app.languages.find(l => l._id === word.translateLanguage));

    useEffect(() => {
        setIsShowTranslate(showTranslate);
    }, [showTranslate])

    const onShowTranslate = () => {
        setIsShowTranslate(!isShowTranslate);
    };

    return (
        <div className="word-item-container">
            <div className="word-item-info">
                <div className="word-item-info-item word-item-info-original">
                    <img src={`https://www.countryflags.io/${wordLanguage?.code}/flat/24.png`} />
                    {word.word}
                </div>

                <div className="word-item-info-item">
                    <img src={`https://www.countryflags.io/${translateLanguage?.code}/flat/24.png`} />
                    {
                        isShowTranslate ?
                            <span>{word.translate}</span> :
                            <span className="hide-translate" onClick={onShowTranslate}>Click that show translate</span>
                    }
                </div>
            </div>
            <div className="word-item-actions">
                <Button type="primary">Edit</Button>
                <Button type="primary" danger>Delete</Button>
            </div>
        </div>
    )
};

export default WordItem;
