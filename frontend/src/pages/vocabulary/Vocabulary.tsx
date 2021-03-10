import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Col, List, Row, Tooltip, Modal } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import { CreateWordFormModal, SkeletonLoading, WordItem } from '../../components';

import { addWord, deleteWord, fetchWords, updateWord, deleteWords } from "../../store/word/word.actions";
import { fetchThemes } from "../../store/theme/theme.actions";

import { IWord, NewWordType, RequestStatusesEnum } from "../../types/types";
import { AppStateType } from "../../store";

import './Vocabulary.css';

const { confirm } = Modal;

type MapStateToProps = {
    words: Array<IWord>
    fetchWordsStatus: RequestStatusesEnum | null
    addWordStatus: RequestStatusesEnum | null
    addWordErrorMessage: string | null
    countWords: number,
}

type MapDispatchToProps = {
    fetchWords: () => void
    fetchThemes: () => void
    deleteWord: (id: string) => void
    addWord: (word: NewWordType) => any // TODO: Here is Promise. Add type here
    updateWord: (word: IWord) => void
    deleteWords: (ids: Array<string>) => void
}

type PropsType = MapStateToProps & MapDispatchToProps;

const Vocabulary: FC<PropsType> = ({ fetchThemes, fetchWords, addWord, deleteWord,
                                       deleteWords,
                                       fetchWordsStatus, updateWord, addWordStatus,
                                       words, countWords }) => {

    const [showAllTranslate, setShowAllTranslate] = useState<boolean>(false);
    const [showAllWords, setShowAllWords] = useState<boolean>(true);
    const [isCreateWordModalOpen, setIsCreateWordModalOpen] = useState<boolean>(false);
    const [selectedWords, setSelectedWords] = useState<Array<string>>([]);

    useEffect(() => {
        fetchWords();
        fetchThemes();
    }, []);

    const onLoadWords = () => {
        fetchWords();
    };

    const openCreateWordModal = () => {
        setIsCreateWordModalOpen(true);
    };

    const onDeleteAllSelected = () => {
        confirm({
            title: 'Do you want to delete this word?',
            icon: <ExclamationCircleOutlined />,
            onOk: handleDeleteWords
        });
    };

    const handleDeleteWords = async () => {
        await deleteWords(selectedWords);
        setSelectedWords([]);
    };

    const handleCancelCreateWordModal = () => {
        setIsCreateWordModalOpen(false);
    };

    const handleOkCreateWordModal = async (values: NewWordType) => {
        const result: RequestStatusesEnum = await addWord(values);
        if (result === RequestStatusesEnum.Success) {
            setIsCreateWordModalOpen(false);
        }
    };

    const handleSelectWord = (id: string) => {
        if (selectedWords.indexOf(id) === -1) {
            setSelectedWords([ ...selectedWords, id ]);
        } else {
            setSelectedWords(selectedWords.filter(wId => wId !== id));
        }
    };

    const toggleShowAllWords = () => {
        setShowAllWords(!showAllWords);
    };

    const toggleShowAllTranslate = () => {
        setShowAllTranslate(!showAllTranslate);
    };

    if (fetchWordsStatus === RequestStatusesEnum.Pending && countWords === 0) {
        return <SkeletonLoading items={3} />
    }

    const loadMoreButton =
        countWords !== words.length ? (
            <div className="load-more-button">
                <Button
                    onClick={onLoadWords}
                    loading={fetchWordsStatus === RequestStatusesEnum.Pending}
                >
                    loading more
                </Button>
            </div>
        ) : null;

    return (
        <div className="page-container">
            <div className="page-top">
                <Row>
                    <Col flex={1}>
                        <Row align="middle" justify="space-between">
                            <Col>
                                <Row align="middle">
                                    <Col>
                                        <Checkbox onClick={toggleShowAllWords} checked={showAllWords}>Show all words</Checkbox>
                                    </Col>
                                    <Col>
                                        <Checkbox onClick={toggleShowAllTranslate} checked={showAllTranslate}>Show all translate</Checkbox>
                                    </Col>
                                    <Col className="delete-all-button">
                                        {selectedWords.length > 0 &&
                                            <Button type="primary" danger onClick={onDeleteAllSelected}>
                                                Delete all selected
                                            </Button>
                                        }
                                    </Col>
                                </Row>
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
                    </Col>
                </Row>
            </div>

            <List
                dataSource={words}
                itemLayout="horizontal"
                loadMore={loadMoreButton}
                renderItem={(word: IWord) => (
                    <WordItem
                        showWord={showAllWords}
                        showTranslate={showAllTranslate}
                        isSelected={selectedWords.some(wId => wId === word._id)}
                        word={word}
                        deleteWord={deleteWord}
                        updateWord={updateWord}
                        onSelect={handleSelectWord}
                    />
                )}
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
    mapStateToProps, { fetchThemes, fetchWords, addWord, deleteWord, updateWord, deleteWords }
    )(Vocabulary);
