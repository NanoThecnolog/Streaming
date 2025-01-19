import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
}

export default function ButtonSearch({ children }: ButtonProps) {
    return (
        <div>{children}</div>
    )
}