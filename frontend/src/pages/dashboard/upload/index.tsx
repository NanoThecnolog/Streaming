import Upload from '@/components/dashboard/Upload'
import styles from './styles.module.scss'
import { debug } from '@/classes/DebugLogger'
import { SetupAPIClient } from '@/services/api'
import { GetServerSideProps } from 'next'

export default function PageUpload() {
    return (
        <main className={styles.container}>
            <Upload />
        </main>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const client = new SetupAPIClient(ctx)

    try {
        const response = await client.api.get('/user/access')
        const data: { access: boolean, message: string } = response.data
        debug.log(data)
        if (!data.access) return {
            redirect: {
                destination: '/series',
                permanent: false
            }
        }

        return {
            props: {}
        }
    } catch (err) {
        console.log('Error getting access for user', err)

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
}