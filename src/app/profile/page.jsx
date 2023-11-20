import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AccountForm from './account-form'
import Header from './header';
import Footer from './footer';

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
        <AccountForm session={session} />
      </main>
    <Footer />
    </>
    )
}