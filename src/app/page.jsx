// 'use client'

// import { Heading } from '@/components/heading'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
// import { useAuth } from '@clerk/nextjs'
// import { initializeApp } from 'firebase/app'
// import { ref, onValue, getDatabase } from 'firebase/database';
// import { useEffect, useState } from 'react'


// // Add your Firebase config object
// const firebaseConfig = {
//   apiKey: "AIzaSyCSOLXug0ase9mkrkEOFpB7AfktQvRFJkM",
//   authDomain: "catalyst-firebase-demo.firebaseapp.com",
//   projectId: "catalyst-firebase-demo",
//   storageBucket: "catalyst-firebase-demo.appspot.com",
//   messagingSenderId: "2499367874",
//   appId: "1:2499367874:web:d5b1b5c1ce52a1bccabc5b",
//   measurementId: "G-4R3LW7GTXC",
// };

// // Connect to your Firebase app
// const app = initializeApp(firebaseConfig)
// // Connect to your Firestore database
// const database = getDatabase(app)


// export default function FirebaseUI() {
//   const [orders, setOrders] = useState([])
//   const { userId } = useAuth()

//   // Handle if the user is not signed in
//   if (!userId) {
//     return <p>Please sign in to access this page.</p>
//   }


//   useEffect(() => {
//     const dbRef = ref(database, 'orders');

//     const unsubscribe = onValue(dbRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const ordersArray = Object.entries(data).map(([key, value]) => ({
//           id: key,
//           ...value
//         }));
//         setOrders(ordersArray);
//       } else {
//         setOrders([]);
//       }
//     }, (error) => {
//       console.error('Error reading data:', error);
//     });

//     return () => {
//       console.log('Cleaning up subscription');
//       unsubscribe();
//     };
//   }, []);


//   return (
//     <main style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
//       <Heading className="mt-14">Recent orders</Heading>
//       <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
//         <TableHead>
//           <TableRow>
//             <TableHeader>Order number</TableHeader>
//             <TableHeader>Purchase date</TableHeader>
//             <TableHeader>Customer</TableHeader>
//             <TableHeader>Event</TableHeader>
//             <TableHeader className="text-right">Amount</TableHeader>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {!!orders.length && orders?.map((order) => (
//             <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
//               <TableCell>{order.order_number}</TableCell>
//               <TableCell className="text-zinc-500">{new Date(order.purchase_date
//                 ?.seconds * 1000).toLocaleDateString("en-US")}</TableCell>
//               <TableCell>{order.customer}</TableCell>
//               <TableCell>
//                 <div className="flex items-center gap-2">

//                   <span>{order.event}</span>
//                 </div>
//               </TableCell>
//               <TableCell className="text-right">{`US $${order.amount}`}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </main>
//   )
// }

'use client'

import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { useAuth } from '@clerk/nextjs'
import { initializeApp } from 'firebase/app'
import { ref, onValue, getDatabase } from 'firebase/database';
import { useEffect, useState } from 'react'

// Add your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyCSOLXug0ase9mkrkEOFpB7AfktQvRFJkM",
  authDomain: "catalyst-firebase-demo.firebaseapp.com",
  projectId: "catalyst-firebase-demo",
  storageBucket: "catalyst-firebase-demo.appspot.com",
  messagingSenderId: "2499367874",
  appId: "1:2499367874:web:d5b1b5c1ce52a1bccabc5b",
  measurementId: "G-4R3LW7GTXC",
};

// Connect to your Firebase app
const app = initializeApp(firebaseConfig)
// Connect to your Firestore database
const database = getDatabase(app)

export default function FirebaseUI() {
  const [orders, setOrders] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      return; // Prevent fetching data if not authenticated
    }

    const dbRef = ref(database, 'orders');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ordersArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setOrders(ordersArray);
      } else {
        setOrders([]);
      }
    }, (error) => {
      console.error('Error reading data:', error);
    });

    return () => {
      console.log('Cleaning up subscription');
      unsubscribe();
    };
  }, [userId]);

  // Handle if the user is not signed in
  if (!userId) {
    return <p>Please sign in to access this page.</p>;
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <Heading className="mt-14">Recent orders</Heading>
      {!!orders.length ? <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Event</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.order_number}</TableCell>
              <TableCell className="text-zinc-500">{new Date(order.purchase_date?.seconds * 1000).toLocaleDateString("en-US")}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{order.event}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{`US $${order.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> : <div className='flex justify-center'>Loading...</div>}
    </main>
  )
}
