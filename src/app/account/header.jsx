import React from 'react'
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';

export default function Header() {
  return (
<header style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#fff', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
    <div>
      <Link href="/"><img src="../../../favicon.ico" style={{ maxWidth: '35px', height: 'auto' }} /></Link>
    </div>
    
    <nav style={{ flexGrow: 1 }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '30px', margin: 0, padding: 0, justifyContent: 'flex-end' }}>
        <li>
          <Link href="/create">Create</Link>
        </li>
        <li>
          <Link href="/stored">Stored</Link>
        </li>
      </ul>
    </nav>

    {/* Settings Cog Icon */}
    <div style={{ padding: '0px 10px 0px 30px' }}>
    <Link href="/settings"><FiSettings style={{ fontSize: '28px', color: '#282530'}} /></Link>
    </div>
  </header>
  )
}
