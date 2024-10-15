import { Children, FC, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
    AddNewEmployeeModal,
    EmptyState,
    EmployeeCard,
    Header,
    SearchPanel,
    Spinner
} from '../../components';
import { AppDispatch, getEmployeesList, getIsContentLoading } from '../../store/index.ts';
import { fetchEmployeeData, updateEmployeeStatus, saveNewEmployee } from '../../store/employeesSlice.ts';
import { EmployeeModel, NewEmployeeType } from '../../@types';
import styles from './HomePage.module.scss';

const HomePage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [modalOpen, setModalOpen] = useState(false);

    const employees = useSelector(getEmployeesList);
    const isLoading = useSelector(getIsContentLoading);

    useEffect(() => {
        dispatch(fetchEmployeeData());
    }, [dispatch])

    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [modalOpen]);

    const creatClickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setModalOpen(true);
    }, []);

    const saveNewEmployeeHandler = (employee: NewEmployeeType) => {
        setModalOpen(false);
        dispatch(saveNewEmployee(employee));
    };

    const statusUpdateHandler = (id: number,  status: string) => {
        const currentEmployee = employees.find(({ id: employeeId }) => employeeId === id);
        if (currentEmployee?.status !== status) {
            dispatch(updateEmployeeStatus({ id, status }));
        }
    };

    const modal = (
        <AddNewEmployeeModal
            onCancel={() => setModalOpen(false)}
            onSubmit={saveNewEmployeeHandler}
        />
    );

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={classNames(styles.contentWrapper)}>
               <div  className={styles.content}>
                   <div className={styles.searchPanelWrapper}>
                       <SearchPanel onCreateClick={creatClickHandler} />
                   </div>
                   {isLoading ? (
                       <Spinner />
                   ) : (
                       <>
                        <div className={styles.cardsContainer}>
                            {employees.length > 0 && !isLoading ?
                                Children.toArray(employees?.map((employee: EmployeeModel) => (
                                    <EmployeeCard
                                        employeeData={employee}
                                        onStatusUpdate={statusUpdateHandler}
                                    />
                                ))) : (
                                    <EmptyState />
                                )
                            }
                        </div>
                        {modalOpen && createPortal(
                            modal,
                            document.getElementById('root') || document.body
                            )}
                        </>
                   )}
               </div>
            </div>
        </div>
    );
};

export default HomePage;
