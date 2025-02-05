import { ReactNode } from "react";
import { UserProps } from "../user";

export type ContextProviderProps = {
    children: ReactNode;
}
export interface ContextProps {
    user: UserProps | null | undefined;
    setUser: (user: UserProps) => void
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
}
export type SignInProps = {
    email: string,
    password: string
}