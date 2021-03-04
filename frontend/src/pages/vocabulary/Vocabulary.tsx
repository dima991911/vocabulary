import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Col, List, Row, Tooltip } from "antd";
import { PlusOutlined } from '@ant-design/icons'

import { CreateWordFormModal, SkeletonLoading, WordItem } from '../../components';

import { addWord, fetchWords } from "../../store/word/word.actions";
import { fetchThemes } from "../../store/theme/theme.actions";

import { CreateWordFormValuesType, IWord, RequestStatusesEnum } from "../../types/types";
import { AppStateType } from "../../store";

import './Vocabulary.css';

type MapStateToProps = {
    words: Array<IWord>
    fetchWordsStatus: RequestStatusesEnum | null
    addWordStatus: RequestStatusesEnum | null
    addWordErrorMessage: string | null
}

type MapDispatchToProps = {
    fetchWords: () => void
    fetchThemes: () => void
    addWord: (word: IWord) => any // TODO: Here is Promise. Add type here
}

type PropsType = MapStateToProps & MapDispatchToProps;

const Vocabulary: FC<PropsType> = ({ fetchThemes, fetchWords, addWord, fetchWordsStatus
                                       , addWordStatus, addWordErrorMessage, words }) => {
    const [showAllTranslate, setShowAllTranslate] = useState<boolean>(false);
    const [isCreateWordModalOpen, setIsCreateWordModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchWords();
        fetchThemes();
    }, []);

    const onShowAllTranslate = () => {
        setShowAllTranslate(!showAllTranslate);
    };

    const openCreateWordModal = () => {
        setIsCreateWordModalOpen(true);
    };

    const handleCancelCreateWordModal = () => {
        setIsCreateWordModalOpen(false);
    }

    const handleOkCreateWordModal = async (values: CreateWordFormValuesType) => {
        const result: RequestStatusesEnum = await addWord(values);
        if (result === RequestStatusesEnum.Success) {
            setIsCreateWordModalOpen(false);
        }
    }

    if (fetchWordsStatus === RequestStatusesEnum.Pending) {
        return <SkeletonLoading items={3} />
    }

    return (
        <div className="page-container">
            <div className="page-top">
                <Row>
                    <Col flex={1}>
                        <Button type="primary" onClick={onShowAllTranslate}>Toggle show al translate</Button>
                    </Col>
                    <Col>
                        <Tooltip title="add word">
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<PlusOutlined />}
                                onClick={openCreateWordModal}
                            />
                        </Tooltip>
                    </Col>
                </Row>
            </div>

            <List
                dataSource={words}
                itemLayout="horizontal"
                renderItem={(word: IWord) => <WordItem showTranslate={showAllTranslate} word={word} />}
            />

            <CreateWordFormModal
                confirmLoading={addWordStatus === RequestStatusesEnum.Pending}
                onCancel={handleCancelCreateWordModal}
                onOk={handleOkCreateWordModal}
                isOpenModal={isCreateWordModalOpen}
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

export default connect<MapStateToProps, MapDispatchToProps, unknown, AppStateType>(
    mapStateToProps, { fetchThemes, fetchWords, addWord }
    )(Vocabulary);
