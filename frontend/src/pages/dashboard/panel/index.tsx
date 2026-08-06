import { DashboardOverview } from "@/@types/Dashboard/dashboard";
import { dashboardService } from "@/classes/DashboardService";
import { debug } from "@/classes/DebugLogger";
import { Dashboard } from "@/components/dashboard/Panel/Dashboard";
import { GetServerSideProps } from "next";
import Head from 'next/head'
import styles from './styles.module.scss'
import axios from "axios";
import { SetupAPIClient } from "@/services/api";

interface Props {
    overview: DashboardOverview
}
//export default const DashboardPage = ({ overview }: Props) => <Dashboard overview={overview} />;

export default function PanelPage({ overview }: Props) {
    return (
        <>
            <Head>
                <title>Painel FlixNext</title>
                <meta name='description' content='conteudo do painel' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <Dashboard overview={overview} />
        </>
    )
}
interface AccessResponse {
    access: boolean
    message: string
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const client = new SetupAPIClient(ctx)

    try {
        const response = await client.api.get<AccessResponse>(
            '/user/access',
        )

        if (!response.data.access) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }
        const responseOverview = await client.api.get('admin/dashboard')
        const overview = responseOverview.data

        return {
            props: {
                overview
            }
        }
    } catch (err) {
        return {
            props: {
                overview: null
            }
        }
    }
}