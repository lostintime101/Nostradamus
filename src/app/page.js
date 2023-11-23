import AuthForm from './auth-form'
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <h1>Nostradamus</h1>
    <div style={{ width: '70%', margin: '0 auto', maxWidth: '400px'}}>
        
        <p>Sign in with Twitter is recommended</p>
        <AuthForm />
      </div>
      <footer>
      <p>Part of <Link href="https://backdropbuild.com/">Backdrop Build</Link></p>
      </footer>
      </>
  )
}

