import classNames from 'classnames';
import React, { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import {
    selectIsSentinel2LayerOutOfVisibleRange,
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectSwipePosition,
    selectYearsForSwipeWidgetLayers,
} from '../../store/Map/selectors';
import {
    selectAnimationMode,
    selectShowSwipeWidgetYearIndicator,
} from '../../store/UI/selectors';

type Props = {
    /**
     * If true, map view is in process of update (e.g. fetch layer data, render layer)
     */
    isUpdating: boolean;
    /**
     * Indicate if swipe widget is currently visible
     */
    visible: boolean;
};

const SwipeWidgetReferenceInfo: FC<Props> = ({
    isUpdating,
    visible,
}: Props) => {
    const position = useSelector(selectSwipePosition);

    const animationMode = useSelector(selectAnimationMode);

    const isSentinel2LayerOutOfVisibleRange = useSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const showSwipeWidgetYearIndicator = useSelector(
        selectShowSwipeWidgetYearIndicator
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    if (animationMode) {
        return null;
    }

    return (
        <div
            className={classNames(
                'absolute top-0 bottom-0 left-0 w-full z-10 pointer-events-none'
            )}
        >
            <div
                className="absolute top-0 bottom-0 left-0 flex items-center justify-center"
                style={{
                    width: visible === false ? '100%' : `${position}%`,
                }}
            >
                {isUpdating &&
                    shouldShowSentinel2Layer &&
                    isSentinel2LayerOutOfVisibleRange === false && (
                        <calcite-loader active scale="s"></calcite-loader>
                    )}

                {shouldShowSentinel2Layer &&
                    isSentinel2LayerOutOfVisibleRange && (
                        <div className="p-2 bg-custom-background-85 text-custom-light-blue uppercase">
                            Zoom in to enable Sentinel-2 Imagery
                        </div>
                    )}

                {showSwipeWidgetYearIndicator && (
                    <div
                        className="absolute bottom-0 theme-background text-custom-light-blue text-sm py-1 px-2"
                        style={{
                            right: 7,
                            bottom: 10,
                        }}
                    >
                        {year4LeadingLayer}
                    </div>
                )}
            </div>

            <div
                className={classNames(
                    'absolute top-0 bottom-0 right-0 flex items-center',
                    {
                        hidden: visible === false,
                    }
                )}
                style={{
                    width: `${100 - position}%`,
                }}
            >
                {showSwipeWidgetYearIndicator && (
                    <div
                        className="absolute bottom-0 theme-background text-custom-light-blue text-sm py-1 px-2"
                        style={{
                            left: 2,
                            bottom: 10,
                        }}
                    >
                        {year4TrailingLayer}
                    </div>
                )}

                {isUpdating && shouldShowSentinel2Layer && (
                    <calcite-loader active scale="s"></calcite-loader>
                )}
            </div>
        </div>
    );
};

export default SwipeWidgetReferenceInfo;
