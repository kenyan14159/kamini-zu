import styles from "./Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    onClick,
    type = "button",
    disabled = false,
    className = "",
}: ButtonProps) {
    const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

    if (href) {
        return (
            <a href={href} className={classes}>
                <span className={styles.text}>{children}</span>
                <span className={styles.icon}>→</span>
            </a>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            <span className={styles.text}>{children}</span>
            <span className={styles.icon}>→</span>
        </button>
    );
}
