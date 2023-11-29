import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Header from './header';
import Footer from './footer';
import PredictionsWrapper from './predictionsWrapper';

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
  const { data: { session },} = await supabase.auth.getSession()
  const userUUID = session?.user.id

  return (
    <>
    <Header />
      <main style={{ marginTop: '70px', padding: '20px' }}>
       {userUUID && <PredictionsWrapper userUUID = {userUUID}/>}
      </main>
    <Footer />
    </>
    )
}