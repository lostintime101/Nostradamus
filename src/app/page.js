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
        
      </div>
      <Footer />
    </>
  )
};

