import React, { FC } from 'react';
import { useSelector } from "react-redux";
import { Tag, List, Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { ILanguageType, IWord } from "../../../types/types";

import { DropdownActions, TranslateItem, RateComponent } from '../../index';

import './WordItem.css';
import { AppStateType } from "../../../store";

const { confirm } = Modal;

type PropsType = {
    word: IWord
    showTranslate: boolean

    deleteWord: (wordId: string) => void
}

const WordItem: FC<PropsType> = ({ word, showTranslate, deleteWord }) => {
    const wordLanguage = useSelector<AppStateType, ILanguageType | undefined>(state => state.app.languages.find(l => l._id === word.wordLanguage));
    const translateLanguage = useSelector<AppStateType, ILanguageType | undefined>(state => state.app.languages.find(l => l._id === word.translateLanguage));

    const onEdit = () => {
        console.log('edit');
    }

    const onDelete = () => {
        confirm({
            title: 'Do you want to delete this word?',
            icon: <ExclamationCircleOutlined />,
            onOk: handleDeleteWord
        });
    }

    const handleDeleteWord = async () => {
        await deleteWord(word._id);
    };

    const onChangeRate = (value: number) => {
        console.log(value);
    };

    const actions = [
        { title: 'Edit', onClick: onEdit },
        { title: 'Delete', onClick: onDelete, confirmMessage: 'Are you sure?' , danger: true },
    ]

    return (
        <List.Item className="word-item-container">
            <div className="word-item-info">
                <TranslateItem text={word.word} flagCode={wordLanguage?.code} />
                <TranslateItem
                    text={word.translate}
                    flagCode={translateLanguage?.code}
                    canBeHide={true}
                    isShowing={showTranslate}
                />
            </div>


            <div className="actions-wrapper">
                <div className="flex-row flex-align-end">
                    <RateComponent value={2} onChange={onChangeRate} />

                    <div className="word-item-actions">
                        <DropdownActions actions={actions} />
                    </div>
                </div>

                <div>
                    <Tag color="purple">blue</Tag>
                    <Tag color="purple">geekblue</Tag>
                    <Tag color="purple">purple</Tag>
                </div>
            </div>

        </List.Item>
    )
};

export default WordItem;
