import { MouseEventHandler, FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

export enum ButtonTypes {
    primary = 'primary',
    secondary = 'secondary',
}

interface ButtonProps {
    buttonType: ButtonTypes
    label: string | ReactNode
    onClick: MouseEventHandler
    className?: string
    disabled?: boolean
}

const getRelevantClassName = (type: ButtonTypes, disabled?: boolean) => {
    if (disabled) return styles.disabled;

    switch (type) {
        case ButtonTypes.primary:
            return styles.primary;
        case ButtonTypes.secondary:
            return styles.secondary;
        default:
            return '';
    }
}

export const Button: FC<ButtonProps> = ({
    buttonType,
    disabled,
    label,
    onClick,
    className = ''
}) => {
    return (
        <button
            className={classNames(
                styles.button,
                getRelevantClassName(buttonType, disabled),
                className,
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    )
};
