import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Header from './header';
import Footer from './footer';
import PredictionWrapper from './predictionWrapper'
import SharePoster from './generateJpeg'

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
    <Header />
      <main style={{ marginTop: '70px', padding: '20px' }}>
        <PredictionWrapper/>
        <SharePoster/>
      </main>
    <Footer />
    </>
    )
}