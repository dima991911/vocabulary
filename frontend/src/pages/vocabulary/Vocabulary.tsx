import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, List } from "antd";

import { SkeletonLoading, WordItem } from '../../components';

import { fetchWords } from "../../store/word/word.actions";
import { fetchThemes } from "../../store/theme/theme.actions";

import { IWord, RequestStatusesEnum } from "../../types/types";
import { AppStateType } from "../../store";

import './Vocabulary.css';

type MapStateToProps = {
    words: Array<IWord>
    fetchWordsStatus: RequestStatusesEnum | null
}

type MapDispatchToProps = {
    fetchWords: () => void
    fetchThemes: () => void
}

type PropsType = MapStateToProps & MapDispatchToProps;

const Vocabulary: FC<PropsType> = ({ fetchThemes, fetchWords, words, fetchWordsStatus }) => {
    const [showAllTranslate, setShowAllTranslate] = useState<boolean>(false);

    useEffect(() => {
        fetchWords();
        fetchThemes();
    }, []);

    if (fetchWordsStatus === RequestStatusesEnum.Pending) {
        return <SkeletonLoading items={3} />
    }

    const onShowAllTranslate = () => {
        setShowAllTranslate(!showAllTranslate);
    };

    return (
        <div className="page-container">
            <Button type="primary" onClick={onShowAllTranslate}>Toggle show al translate</Button>

            <List
                dataSource={words}
                itemLayout="horizontal"
                renderItem={(word) => <List.Item><WordItem showTranslate={showAllTranslate} word={word} /></List.Item>}
            />
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    const { word } = state;

    return {
        ...word,
    };
};

export default connect<MapStateToProps, MapDispatchToProps, unknown, AppStateType>(mapStateToProps, { fetchThemes, fetchWords })(Vocabulary);
