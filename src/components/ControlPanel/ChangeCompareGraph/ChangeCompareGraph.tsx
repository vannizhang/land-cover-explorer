import React, { FC } from 'react';

import DivergingBarChart from '../../QuickD3Chart/DivergingBarChart/DivergingBarChart';
import { QuickD3ChartData } from '../../QuickD3Chart/types';
import HeaderText from '../HeaderText/HeaderText';

type Props = {
    earlierYear: number;
    laterYear: number;
    data: QuickD3ChartData;
};

const ChangeCompareGraph: FC<Props> = ({
    earlierYear,
    laterYear,
    data,
}: Props) => {
    return (
        <div className="h-40 w-96 text-center mx-6">
            <HeaderText
                text={`Land Cover Change (Acres) from ${earlierYear} to ${laterYear}`}
            />

            {data ? (
                <DivergingBarChart data4Bars={data} showAxis={true} />
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <calcite-loader active scale="s"></calcite-loader>
                </div>
            )}
        </div>
    );
};

export default ChangeCompareGraph;
