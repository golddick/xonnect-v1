import React from 'react'
import EnterprisePage from './_component/enterprisePage'
import Head from 'next/head'

const page = () => {
  return (
    <>
     <Head>
        <link rel="canonical" href="https://www.xonnect.net/enterprise" />
      </Head>
      <EnterprisePage/>
    </>
  )
}

export default page
