import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Header from './header';
import Footer from './footer';
import Predictions from './predictions';

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
        <Predictions />
      </main>
    <Footer />
    </>
    )
}