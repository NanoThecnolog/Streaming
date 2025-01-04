import React from 'react'
import styles from './styles.module.scss'

interface ButtonProps {
    children: React.ReactNode;
}

export default function ButtonSearch({ children }: ButtonProps) {
    return (
        <div>{children}</div>
    )
}