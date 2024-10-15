import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonTypes, CloseIcon, StatusSelect } from '../';
import { MagnifyingGlass, PlusIcon } from '../../assets/icons';
import { AppDispatch } from '../../store';
import { fetchEmployeeData, filterEmployees } from '../../store/employeesSlice.ts';
import { FilterStateType } from '../../@types';
import styles from './SearchPanel.module.scss';

interface SearchPanelProps {
    onCreateClick: MouseEventHandler<HTMLButtonElement>
}

const InitialFilterState: FilterStateType = {
    searchQuery: '',
    status: '',
};

export const SearchPanel: FC<SearchPanelProps> = ({ onCreateClick }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [initialRender, setInitialRender] = useState(true);
    const [filterState, setFilterState] = useState<FilterStateType>(InitialFilterState);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (!initialRender) {
            (filterState.searchQuery || filterState.status) ?
                dispatch(filterEmployees(filterState))
                :
                dispatch(fetchEmployeeData());
        }
    }, [dispatch, filterState]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilterState((prevState) => ({
                ...prevState,
                searchQuery: inputValue,
            }));
        }, 300);

        return () => {
            clearTimeout(timeout);
        }
    }, [inputValue]);

    const searchChangeHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        setInputValue(() => target.value);
        initialRender && setInitialRender(false);
    };

    const statusChangeHandler = (selectedValue: string) => {
        if (!selectedValue) {
            setFilterState((prevState) => {
                const updateFilter = { ...prevState };

                delete updateFilter.status;

                return updateFilter;
            })
        } else {
            setFilterState((prevState) => ({
                ...prevState,
                status: selectedValue,
            }));
        }
        initialRender && setInitialRender(false);
    };

    return (
        <div className={styles.container}>
            <Button
                className={styles.createButton}
                label={<div className={styles.buttonLabel}>
                    <span className={styles.text}>Create</span>
                    <PlusIcon width={50} height={50} />
                </div>}
                onClick={onCreateClick}
                buttonType={ButtonTypes.primary}
            />
            <div className={styles.filters}>
                <div className={styles.inputWrapper}>
                    <div className={styles.magnifyingIcon}>
                        <MagnifyingGlass width={25} height={25}/>
                    </div>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={searchChangeHandler}
                        value={inputValue}
                        placeholder="Type to search"
                    />
                    {inputValue && (
                        <CloseIcon
                            className={styles.closeIcon}
                            onClick={() => setInputValue('')}
                        />
                    )}
                </div>
                <div className={styles.divider} />
                <StatusSelect
                    selectedValue={filterState.status}
                    onFilterChange={statusChangeHandler}
                    searchFilter
                />
            </div>
        </div>
    );
};
