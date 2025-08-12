// // components/tabs/SeniTab.tsx

// import { seniData } from '@/data/dataDesaConstants'

// export default function SeniTab() {
//   return (
//     <div>
//       <p className="text-gray-800 mb-4 text-sm font-medium">
//         {seniData.deskripsi}
//       </p>
      
//       <div className="mb-6">
//         <h4 className="font-semibold text-gray-900 mb-3 text-base">
//           a. Kesenian Tradisional (Osing) Seperti:
//         </h4>
//         <ul className="ml-4 space-y-1">
//           {seniData.kesenianTradisional.map((item, index) => (
//             <li key={index} className="text-gray-800 text-sm font-medium">
//               • {item}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="mb-6">
//         <h4 className="font-semibold text-gray-900 mb-3 text-base">
//           b. Kesenian Modern/Konvensional Seperti:
//         </h4>
//         <ul className="ml-4 space-y-1">
//           <li className="text-gray-800 text-sm font-medium">• Organ Tunggal</li>
//           <li className="text-gray-800 text-sm font-medium">• Band</li>
//           <li className="text-gray-800 text-sm font-medium">• Karaoke</li>
//         </ul>
//       </div>

//       <p className="text-gray-800 mb-6 text-sm font-medium">
//         {seniData.budayaInfo}
//       </p>

//       <h3 className="font-bold text-gray-900 mb-4 text-lg">
//         {seniData.budayaTitle}
//       </h3>
//       <p className="text-gray-800 mb-4 text-sm font-medium">
//         {seniData.budayaDesc}
//       </p>
//     </div>
//   )
// }