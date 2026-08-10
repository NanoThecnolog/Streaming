import { GetServerSideProps } from 'next'

export default function OldPayment() {
  return null
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/',
      permanent: true,
    },
  }
}
