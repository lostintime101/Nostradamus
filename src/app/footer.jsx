import React from 'react'
import Link from 'next/link';

export default function Footer() {
  return (
<footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
  <nav className="grid grid-flow-col gap-4">
    <Link href="https://nostradamus1.xyz/" className="link link-hover">About</Link>
    <Link href="https://docs.nostradamus1.xyz/" className="link link-hover">Docs</Link>
    <Link href="https://docs.nostradamus1.xyz/legal/terms-of-service/" className="link link-hover">Terms</Link>
    <Link href="https://docs.nostradamus1.xyz/legal/privacy-policy/" className="link link-hover">Privacy</Link>
  </nav> 
  <nav>
    <div className="grid grid-flow-col gap-4">
      <Link href="https://twitter.com/nostradamus1__"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-white"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></Link>
      <Link href="https://github.com/lostintime101/Nostradamus"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 26 26" className="fill-white"><path d="M12 0a12 12 0 0 0-3.819 23.383c.6.12.819-.262.819-.582 0-.287-.01-1.043-.015-2.05-3.338.724-4.042-1.61-4.042-1.61C4.275 18.14 3.6 17.7 3.6 17.7c-1.087-.745.083-.73.083-.73 1.205.085 1.838 1.24 1.838 1.24 1.07 1.834 2.805 1.305 3.49.997.108-.77.415-1.305.756-1.605-2.65-.3-5.42-1.325-5.42-5.89 0-1.302.465-2.365 1.235-3.198-.125-.302-.54-1.518.12-3.16 0 0 1.005-.32 3.3 1.23a11.45 11.45 0 0 1 3.007-.405c1.017.01 2.04.136 3.007.405 2.292-1.55 3.297-1.23 3.297-1.23.66 1.642.25 2.86.12 3.16.77.833 1.235 1.896 1.235 3.198 0 4.577-2.775 5.585-5.428 5.88.425.36.81 1.092.81 2.204 0 1.594-.015 2.873-.015 3.27 0 .323.216.703.825.58A12 12 0 0 0 12 0z"/></svg></Link>
      <Link href="https://docs.nostradamus1.xyz/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 204.376 204.376" className="fill-white"><path d="M110.397,47.736V0H33.13c-2.485,0-4.5,2.015-4.5,4.5v195.376c0,2.485,2.015,4.5,4.5,4.5h138.117c2.485,0,4.5-2.015,4.5-4.5  V61.35h-51.744C116.501,61.35,110.397,55.243,110.397,47.736z M108.499,168.626h-46.5v-10h46.5V168.626z M143.499,143.626h-81.5v-10  h81.5V143.626z M143.499,118.627h-81.5v-10h81.5V118.627z M143.499,93.627h-81.5v-10h81.5V93.627z M120.397,47.736v-37.34  L164.2,51.35h-40.197C122.014,51.35,120.397,49.729,120.397,47.736z"/></svg></Link>
    </div>
  </nav> 
  <aside>
    <p>Copyright © 2023 - All rights reserved Lostin Code</p>
  </aside>
</footer>
  )
}
