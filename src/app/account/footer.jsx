import React from 'react'
import Link from 'next/link';

export default function Footer() {
  return (
<header style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
    <nav style={{ flexGrow: 1 }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '30px', margin: 0, padding: 0, justifyContent: 'center' }}>
        <li>
          <Link href="/create">Create</Link>
        </li>
        <li>
          <Link href="/stored">Stored</Link>
        </li>
      </ul>
    </nav>
  </header>
  )
}
