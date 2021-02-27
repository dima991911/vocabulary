import React, { FC } from 'react';
import { Skeleton } from "antd";

import './SkeletonLoading.css';

type PropsType = {
    items: number
}

const SkeletonLoading: FC<PropsType> = ({ items = 1 }) => {
      return (
          <div className="skeleton-wrapper">
              {new Array(items).fill(1).map((_, index) => (
                  <Skeleton key={index} active />
              ))}
          </div>
      )
};

export default SkeletonLoading
