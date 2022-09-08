import styles from './styles.module.scss'
import { FiX } from 'react-icons/fi'

import { FaGithub } from 'react-icons/fa';

export function SignInButton() {
    const isUserLoggedIn = false;

    return isUserLoggedIn ? (
        <button
            type="button"
            className={styles.signInButton}
        >
            <FaGithub color="#04d361" />
            NOME
            <FiX color="#737380" className={styles.closeIcon} />
        </button >
    ) : (
        <button
            type="button"
            className={styles.signInButton}
        >
            <FaGithub color="#eba417" />
            Sign in with Github
        </button >
    );
}