import { Children, FC, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { CloseIcon } from '../../components';
import { ArrowIcon } from '../../assets/icons/arrow-icon.tsx';
import { STATUSES, StatusType } from '../../constants/index.ts';
import styles from './StatusSelect.module.scss';

interface StatusSelectProps {
    onFilterChange: (value: string) => void
    selectedValue?: string
    withStatusIcons?: boolean
    searchFilter?: boolean
    customClassName?: string
}

const getStatusClass = (status: string) => {
    switch (status) {
        case StatusType.WORKING:
            return styles.working;
        case StatusType.ON_VACATION:
            return styles.onVacation;
        case StatusType.BUSINESS_TRIP:
            return styles.businessTrip;
        case StatusType.LUNCH_TIME:
            return styles.lunchTime;
        default:
            return '';
    }
}

export const StatusSelect: FC<StatusSelectProps> = ({
    customClassName = '',
    onFilterChange,
    selectedValue,
    withStatusIcons = false,
    searchFilter = false,
}) => {
    const showPlaceholder = searchFilter && !selectedValue;
    const showClearIcon = searchFilter && selectedValue;
    const showArrow = searchFilter ? !selectedValue : true;

    const selectOptionHandler: MouseEventHandler<HTMLDivElement> = ({ target }) => {
        const element = target as HTMLDivElement;

        onFilterChange(element.id);
    };

    return (
        <div
            className={classNames(styles.select, customClassName, {
                [styles.searchFilter]: searchFilter
            })}
        >
            {showPlaceholder && (
                <div className={styles.placeholder}>Filter by status</div>
            )}
            {selectedValue && (
                <div
                    className={classNames(styles.selectedValue, {
                        [styles.withStatusIcon]: withStatusIcons
                    })}
                >
                    {withStatusIcons && (
                        <div className={classNames(styles.statusIcon, getStatusClass(selectedValue))} />
                    )}
                    {selectedValue}
                </div>
            )}
            <div
                className={styles.dropdownList}
                onClick={selectOptionHandler}
            >
                {Children.toArray(STATUSES.map((status) => (
                    <div
                        id={status}
                        className={classNames(styles.dropdownItem, {
                            [styles.selectedItem]: status === selectedValue,
                            [styles.withStatusIcon]: withStatusIcons
                        })}
                    >
                        {withStatusIcons && (
                            <div className={classNames(styles.statusIcon, getStatusClass(status))}/>
                        )}
                        {status}
                    </div>
                )))}
            </div>
            {showClearIcon && (
                <CloseIcon
                    onClick={() => onFilterChange('')}
                />
            )}
            {showArrow && (
                <div className={classNames(styles.arrowIcon)}>
                    <ArrowIcon/>
                </div>
            )}
        </div>
    );
};
