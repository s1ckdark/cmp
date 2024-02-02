import { ReactNode } from 'react';
import cx from 'clsx';
import Link from 'next/link';

import styles from './index.module.scss';

interface Props {
    children: ReactNode;
    className?: string;
    link?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'submit' | 'reset' | 'button';
    size?: 'tiny' | 'small' | 'normal' | 'large' | 'huge';
    skin?: 'primary' | 'inverse' | 'ghost' | 'green' | 'gray' | 'back' | 'normal' | 'submit' | 'cancel' | 'reset';
}

const Button = ({ link, children, className, disabled, onClick, type, size, skin }: Props) => {
    if (link) {
        return (
            <Link
                href={link}
                className={cx(styles.commonButton, className, styles[size ?? 'normal'], styles[skin ?? 'normal'])}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            disabled={disabled}
            className={cx(styles.commonButton, className, styles[size ?? 'normal'], styles[skin ?? 'normal'])}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;