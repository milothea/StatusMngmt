import { FC } from 'react';
import classNames from "classnames";
import { PlusIcon } from '../../assets/icons';
import styles from './Closeicon.module.scss';

interface CloseIconProps {
    onClick: () => void
    className?: string
}

export const CloseIcon: FC<CloseIconProps> = ({ onClick, className = '' }) => (
    <div
        className={classNames(styles.iconWrapper, className)}
        onClick={onClick}
    >
        <PlusIcon />
    </div>
);