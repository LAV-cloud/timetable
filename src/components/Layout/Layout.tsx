import styles from './Layout.module.scss';

export default function Layout({ children }: { children: any }) {
    return (
        <div className={styles.layout}>
            {children}
            <p className={styles.layout__created}>Created by Бережной Роман для НКЭиВТ</p>
        </div>
    )
}