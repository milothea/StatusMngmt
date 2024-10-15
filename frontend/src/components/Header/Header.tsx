import {FC, MouseEventHandler} from 'react';
import {Button, ButtonTypes} from '../index.ts';
import styles from './Header.module.scss';

export const Header: FC = () => {

    const logOutHandler: MouseEventHandler<HTMLButtonElement> = () => console.log('logged out');
    return (
        <div className={styles.header}>
            <h1 className={styles.headerTitle}>
                Employees
            </h1>
            <Button
                className={styles.logOutButton}
                label="Log Out"
                onClick={logOutHandler}
                buttonType={ButtonTypes.secondary}
            />
        </div>
    );
};
