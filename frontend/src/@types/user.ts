export interface UserProps {
    id: string,
    name: string,
    email: string,
    avatar: string,
    token: string,
    verified: boolean,
    birthday: Date,
    myList: MyListPorps[]
}

interface MyListPorps {
    id: string,
    title: string,
    subtitle: string,
    userId: string,
    created_at: string,
    updated_at: string
}