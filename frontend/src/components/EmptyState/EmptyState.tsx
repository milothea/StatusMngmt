import { FC } from 'react';
import { SearchResultIcon } from '../../assets/icons';
import styles from './EmptyState.module.scss';

export const EmptyState: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.message}>No results found</div>
            <div>
                <SearchResultIcon />
            </div>
        </div>
    );
};
