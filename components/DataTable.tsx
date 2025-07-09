// components/DataTable.tsx

interface DataTableProps {
  data: string[][]
  className?: string
}

export default function DataTable({ data, className = "" }: DataTableProps) {
  return (
    <div className={`overflow-x-auto mb-6 ${className}`}>
      <table className="w-full border border-gray-400">
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex === 0 ? "bg-gray-200" : "bg-white"}>
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex}
                  className={`
                    border border-gray-400 px-4 py-3 text-black
                    ${rowIndex === 0 
                      ? "font-bold text-center bg-gray-200" 
                      : cellIndex === 0 
                        ? "font-semibold bg-gray-50" 
                        : "text-center"
                    }
                  `}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}