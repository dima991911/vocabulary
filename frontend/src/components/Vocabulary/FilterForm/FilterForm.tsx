import React, { FC, useState } from 'react';
import { Col, Input, Row, Select } from "antd";

import { FilterWordsType, SortByRateEnum, SortByDateEnum } from "../../../types/types";

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

    const handleChangeFilterSortByDate = (value: SortByDateEnum | undefined) => {
        onChange({ ...filter, sortByDate: value });
    }

    const handleChangeFilterSortByRate = (value: SortByRateEnum) => {
        debugger;
        onChange({ ...filter, sortByRate: value });
    }

    return (
        <Row align="middle">
            <Col span={6}>
                <Select
                    value={filter.sortByDate}
                    onChange={handleChangeFilterSortByDate}
                    style={{ width: '100%' }}
                >
                    <Option value={SortByDateEnum.NEW}>New</Option>
                    <Option value={SortByDateEnum.OLD}>Old</Option>
                </Select>
            </Col>
            <Col span={12}>
                <Input
                    placeholder="Find by word or translate"
                    value={filterQuery}
                    onChange={handleChangeFilterQuery}
                />
            </Col>
            <Col span={6}>
                <Select
                    placeholder="Knowledge rate"
                    style={{ width: '100%' }}
                    value={filter.sortByRate}
                    onChange={handleChangeFilterSortByRate}
                    allowClear={true}
                >
                    <Option value={SortByRateEnum.BAD}>Good</Option>
                    <Option value={SortByRateEnum.GOOD}>Bad</Option>
                </Select>
            </Col>
        </Row>
    )
}

export default FilterForm;
