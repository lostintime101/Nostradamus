import AuthForm from './auth-form'

export default function Home() {
  return (
    <>
    <h1>Nostradamus</h1>
    <div style={{ width: '70%', margin: '0 auto', maxWidth: '400px'}}>
        
        <p>Sign in with Twitter is recommended</p>
        <AuthForm />
      </div>
      </>
  )
}