// import { getEvents } from '@/data'
// import '@/styles/tailwind.css'

// import { ApplicationLayout } from './application-layout'

// export const metadata = {
//   title: {
//     template: '%s - Catalyst',
//     default: 'Catalyst',
//   },
//   description: '',
// }

// export default async function RootLayout({ children }) {
//   let events = await getEvents()

//   return (
//     <html
//       lang="en"
//       className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
//     >
//       <head>
//         <link rel="preconnect" href="https://rsms.me/" />
//         <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
//       </head>
//       <body>
//         <ApplicationLayout events={events}>{children}</ApplicationLayout>
//       </body>
//     </html>
//   )
// }


import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton, SignOutButton } from '@clerk/nextjs'
import { getEvents } from '@/data';
import { ApplicationLayout } from './application-layout';
import '@/styles/tailwind.css'

export default async function RootLayout({
  children,
}) {
  let events = await getEvents()
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            
          </header>
          <main>
            
          <ApplicationLayout events={events}>{children}</ApplicationLayout>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}