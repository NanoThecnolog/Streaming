import Head from "next/head";
import styles from '@/styles/Watch.module.scss';
import { useState } from "react";

interface WatchProps {
    title: string;
    subTitle: string;
    src: string;
}

export default function Watch({ title, subTitle, src }: WatchProps) {
    return (
        <>
            <Head>
                <title>Assistir {title}</title>
            </Head>
            <div className={styles.container}>
                <div className="movie">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="position-absolute movie">
                                <h3 id="titulo">{title} {subTitle != "" && `- ${subTitle}`}</h3>
                                <iframe title={title} id="movie-iframe" allowFullScreen width="100%" height="100%" src={src} allow="autoplay"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async (ctx: WatchProps) => {
    const { title, subTitle, src } = ctx;
    return {
        props: {
            title,
            subTitle,
            src
        }
    }
}