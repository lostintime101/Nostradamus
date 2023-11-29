import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Header from './header';
import Footer from './footer';
import Prediction from './prediction';

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
  const { data: { session },} = await supabase.auth.getSession()
  const userUUID = session?.user.id

  return (
    <>
    <Header />
      <main className="h-screen flex flex-col ">
        <div className="container">
        {userUUID && <Prediction userUUID = {userUUID}/>}  
        </div>
      </main>
    <Footer />
    </>
    )
}