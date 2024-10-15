import {ChangeEventHandler, Children, FC, MouseEventHandler, useState} from 'react';
import { Button, ButtonTypes, CloseIcon } from '../index.ts';
import { STATUSES, StatusType } from '../../constants';
import { NewEmployeeType } from '../../@types/index.ts';
import styles from './AddNewEmployeeModal.module.scss';

interface AddNewEmployeeModalProps {
    onCancel: () => void
    onSubmit: (employee: NewEmployeeType) => void
}

const INITIAL_STATE: NewEmployeeType = {
    status: StatusType.WORKING,
    name: '',
}

export const AddNewEmployeeModal: FC<AddNewEmployeeModalProps> = ({ onCancel, onSubmit }) => {
    const [newEmployee, setNewEmployee] = useState<NewEmployeeType>(INITIAL_STATE);

    const nameChangeHandler: ChangeEventHandler<HTMLInputElement>  = ({ target }) => {
        setNewEmployee((prevState) => ({
            ...prevState,
            name: target.value,
        }));
    };

    const clearNameHandler = () => {
        setNewEmployee((prevState) => ({
            ...prevState,
            name: '',
        }));
    };

    const statusChangeHandler: MouseEventHandler<HTMLInputElement>  = ({ target }) => {
        const element = target as HTMLInputElement;

        setNewEmployee((prevState) => ({
            ...prevState,
            status: element.value,
        }));
    };

    const saveHandler = () => {
        if (newEmployee.name) {
            onSubmit(newEmployee);
        }
    };

    const cancelHandler = () => {
        onCancel();
    };

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalWindow}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Add new employee</h2>
                    <CloseIcon
                        className={styles.closeIcon}
                        onClick={cancelHandler}
                    />
                </div>
                <div className={styles.modalContent}>
                    <label
                        className={styles.label}
                        htmlFor="employeeName"
                    >
                        Employee name
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            id="employeeName"
                            className={styles.input}
                            placeholder="Enter employee name"
                            onChange={nameChangeHandler}
                            value={newEmployee.name}
                        />
                        {newEmployee.name && (
                            <CloseIcon onClick={clearNameHandler} className={styles.clearIcon}/>
                        )}
                    </div>
                    <label
                        className={styles.label}
                        htmlFor="employeeName"
                    >
                        Select employee's current status
                    </label>
                    {Children.toArray(STATUSES.map((status) => (
                        <div className={styles.statusRadio} onClick={statusChangeHandler}>
                            <input
                                type="radio"
                                value={status}
                                id={status}
                                checked={newEmployee.status === status}
                            />
                            <label htmlFor={status}>{status}</label>
                        </div>
                    )))}
                </div>
                <div className={styles.modalFooter}>
                    <Button
                        onClick={cancelHandler}
                        label="Cancel"
                        buttonType={ButtonTypes.secondary}
                    />
                    <Button
                        onClick={saveHandler}
                        label="Add employee"
                        buttonType={ButtonTypes.primary}
                        disabled={!(newEmployee.name && newEmployee.status)}
                    />
                </div>
            </div>
        </div>
    );
};
