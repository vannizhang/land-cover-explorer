import React, { FC } from 'react';
import { getAvailableYears } from '../../services/sentinel-2-10m-landcover/timeInfo';

type Props = {
    closeButtonOnClick: () => void;
};

const Header: FC<Props> = ({ closeButtonOnClick }: Props) => {
    const years = getAvailableYears();

    const getBulkDownloadLinks = () => {
        const links = years.map((year) => {
            const url = `https://lulctimeseries.blob.core.windows.net/lulctimeseriespublic/lc${year}/lulc${year}.zip`;
            return (
                <>
                    <a
                        className="underline"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {year}
                    </a>
                    {', '}
                </>
            );
        });

        return (
            <span>
                Alternatively, click on the following links to bulk download all
                tiles for each year as a zip file: {links}(Each annual zip
                download is approximately 60 GB).
            </span>
        );
    };

    return (
        <div className="relative text-custom-light-blue flex justify-between items-center mb-4 z-10">
            <div>
                <h5 className="uppercase mr-4 mb-2 text-xl">
                    Sentinel-2 10m Land Use/Land Cover Download
                </h5>

                <div className="text-sm">
                    <span>
                        Click on the map to select a tile and year to download
                        individual GeoTIFF files.
                    </span>{' '}
                    {getBulkDownloadLinks()}
                </div>
            </div>

            <div
                className="absolute top-0 right-0 cursor-pointer text-custom-light-blue "
                onClick={closeButtonOnClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    height="32"
                    width="32"
                >
                    <path
                        fill="currentColor"
                        d="M22.864 10.843L17.207 16.5l5.657 5.657-.707.707-5.657-5.657-5.657 5.657-.707-.707 5.657-5.657-5.657-5.657.707-.707 5.657 5.657 5.657-5.657zM29.8 16.5A13.3 13.3 0 1 1 16.5 3.2a13.3 13.3 0 0 1 13.3 13.3zm-1 0a12.3 12.3 0 1 0-12.3 12.3 12.314 12.314 0 0 0 12.3-12.3z"
                    />
                    <path fill="none" d="M0 0h32v32H0z" />
                </svg>
            </div>
        </div>
    );
};

export default Header;
