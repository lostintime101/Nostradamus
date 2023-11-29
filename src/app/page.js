import AuthForm from './auth-form'
import Link from 'next/link';
import Footer from './footer';

export default function Home() {
  return (
    <>
      <div className="h-screen">
      <h1>Nostradamus</h1>
      <div style={{ width: '70%', margin: '0 auto', maxWidth: '400px'}}>
        
        <p>Sign in with Twitter is recommended</p>
        <AuthForm />
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2" >
        <p>Part of <Link href="https://backdropbuild.com/">Backdrop Build</Link></p>
      </div>
        
      </div>
      <Footer />
    </>
  )
};

