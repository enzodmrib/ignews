import { FiX } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa';
import { signIn, signOut, useSession } from 'next-auth/react';

import styles from './styles.module.scss'

export function SignInButton() {
    const { data: session } = useSession();

    return session ? (
        <button
            type="button"
            onClick={() => signOut()}
            className={styles.signInButton}
        >
            <FaGithub color="#04d361" />
            {session.user.name}
            <FiX color="#737380" className={styles.closeIcon} />
        </button >
    ) : (
        <button
            type="button"
            onClick={() => signIn('github')}
            className={styles.signInButton}
        >
            <FaGithub color="#eba417" />
            Sign in with GitHub
        </button >
    );
}