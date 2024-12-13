import { useState } from "react";
import styles from './styles.module.scss'

interface SwitchProps {
    checked: boolean;
    onChange?: (checked: boolean) => void;
}

export default function Switch({ checked, onChange }: SwitchProps) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };

    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
            />
            <span className={`${styles.slider} ${isChecked ? styles["slider-checked"] : ""}`}></span>
        </label>
    );
};

