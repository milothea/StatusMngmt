import { FC } from 'react';
import classNames from 'classnames';
import { StatusSelect } from '../index.ts';
import { NoAvatar } from '../../assets/icons';
import { EmployeeModel } from '../../@types';
import styles from './EmployeeCard.module.scss';

const MAX_NAME_LENGTH = 25;

interface EmployeeCardProps {
    employeeData: EmployeeModel
    onStatusUpdate: (id: number, status: string) => void
}

export const EmployeeCard: FC<EmployeeCardProps> = ({ employeeData, onStatusUpdate }) => {
    const { id, status, img: avatarUrl, name} = employeeData;

    const statusChangeHandler = (status: string) => {
        onStatusUpdate(id, status);
    };

    return (
        <div className={styles.container}>
            <div className={classNames(styles.cardBock, styles.avatarBlock)}>
                {avatarUrl ? (
                    <img
                        className={styles.avatar}
                        src={avatarUrl}
                        alt="employee avatar"
                    />
                ) : (
                    <div className={styles.noAvatar}>
                        <NoAvatar height={180} width={180} />
                    </div>
                )}
            </div>
            <div className={classNames(styles.cardBock, styles.infoBlock)}>
                <h2 className={classNames(styles.employeeName, { [styles.ellipsis]: name.length > MAX_NAME_LENGTH})}>
                    {name}
                </h2>
                <StatusSelect
                    onFilterChange={statusChangeHandler}
                    selectedValue={status}
                    withStatusIcons
                />
            </div>
        </div>
    );
};
