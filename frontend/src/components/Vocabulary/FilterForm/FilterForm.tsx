import React, { FC, useState } from 'react';
import { Col, Input, Row, Select } from "antd";

import { FilterWordsType, SortByEnum } from "../../../types/types";

const { Option } = Select;

type PropsType = {
    filter: FilterWordsType

    onChange: (filter: FilterWordsType) => void
}

const FilterForm: FC<PropsType> = ({ filter, onChange }) => {
    const [filterQuery, setFilterQuery] = useState<string>(filter.query);
    const [changeTimer, setChangeTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    const handleChangeFilterQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterQuery(e.target.value);
        if (changeTimer) clearTimeout(changeTimer);

        setChangeTimer(setTimeout(() => {
            onChange({ ...filter, query: e.target.value });
        }, 1000));
    }

    const handleChangeFilterSortBy = (value: SortByEnum) => {
        onChange({ ...filter, sortBy: value });
    }

    return (
        <Row align="middle">
            <Col span={8}>
                <Input
                    placeholder="Find by word or translate"
                    value={filterQuery}
                    onChange={handleChangeFilterQuery}
                />
            </Col>
            <Col offset={1} span={6}>
                <Select value={filter.sortBy} onChange={handleChangeFilterSortBy}>
                    <Option value={SortByEnum.NEW}>New created</Option>
                    <Option value={SortByEnum.GOOD_RATE}>Good know</Option>
                    <Option value={SortByEnum.BAD_RATE}>Bad know</Option>
                    <Option value={SortByEnum.OLD}>Old created</Option>
                </Select>
            </Col>
        </Row>
    )
}

export default FilterForm;
