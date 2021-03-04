import React, { FC } from 'react';
import { Modal, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";

import { AppStateType } from "../../../store";
import { ILanguageType, CreateWordFormValuesType } from "../../../types/types";

const { Option } = Select;

type PropsType = {
    isOpenModal: boolean
    confirmLoading: boolean
    onCancel: () => void
    onOk: (values: CreateWordFormValuesType) => void
}

const CreateWordFormModal: FC<PropsType> = ({ isOpenModal, confirmLoading ,onCancel, onOk }) => {
    const userNativeLanguage = useSelector<AppStateType, string>(state => state.user.currentUser?.nativeLanguage || '');
    const languages = useSelector<AppStateType, Array<ILanguageType>>(state => state.app.languages);
    const [form] = Form.useForm<CreateWordFormValuesType>();

    const handleOkModal = () => {
        form.validateFields().then(values => {
            onOk(values);
        });
    }

    const initialFormValues: CreateWordFormValuesType = {
        word: '',
        translate: '',
        wordLanguage: '603a9aaa1070c51544b989c0',
        translateLanguage: userNativeLanguage
    }

    return (
        <Modal
            title="Add Word"
            visible={isOpenModal}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            onOk={handleOkModal}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                form={form}
                initialValues={initialFormValues}
            >
                <Form.Item name="wordLanguage" rules={[{ required: true }]} label="Word language">
                    <Select placeholder="Select a word language">
                        {languages.map(language => <Option key={language._id} value={language._id}>{language.name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item name="word" label="Word" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="translateLanguage" rules={[{ required: true }]} label="Translate language">
                    <Select placeholder="Select a word language">
                        {languages.map(language => <Option key={language._id} value={language._id}>{language.name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item name="translate" label="Translate" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateWordFormModal;
