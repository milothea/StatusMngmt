import { FC, SVGProps } from 'react';

export const PlusIcon: FC<SVGProps<number>> = ({ width = 20, height = 20 }) => (
    <svg
        fill="#fff"
        width={width}
        height={height}
        viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg"
        id="memory-plus"
    >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
            <g id="SVGRepo_iconCarrier">
                <path d="M12 17H10V12H5V10H10V5H12V10H17V12H12Z"/>
            </g>
        </svg>
);
