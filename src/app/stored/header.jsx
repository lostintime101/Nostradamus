import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';
// import { FiSettings } from 'react-icons/fi';

export default function Header() {
  return (
<div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Nostradamus</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><Link href="../create" className="">Created</Link></li>
      <li><Link href="../stored" className="">Stored</Link></li>
      <li><Link href="../profile" className="">Profile</Link></li>
    </ul>
  </div>
</div>
  )
}
