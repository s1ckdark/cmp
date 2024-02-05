'use client';

import cx from 'clsx';

import styles from './Loading.module.scss';

interface Props {
    className?: string;
}

const Loading = ({ className }: Props) => {
    return (
        <div className={cx(styles.loading, className)}>
            <p>Loading...</p>
        </div>
    );
};

export default Loading;