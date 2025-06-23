import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
 const [importHistoryData, setImportHistoryData] = useState([]);
    useEffect(() => {
    const socket = io('http://localhost:3001');

    
    socket.on('initial_data', (data) => {
      setImportHistoryData(data);
    });

    
    socket.on('import_history_update', (data) => {
      setImportHistoryData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
 <h1 className="mt-[3rem] text-2xl font-bold text-center mb-4">
    Real Time Job Import History Summary
  </h1>
<div className="mt-[3rem] flex items-center justify-center">
    <table className="mx-auto w-[70%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    file name
                </th>
                <th scope="col" className="px-6 py-3">
                    import date-time
                </th>
                <th scope="col" className="px-6 py-3">
                    total
                </th>
                <th scope="col" className="px-6 py-3">
                    new
                </th>
                 <th scope="col" className="px-6 py-3">
                    updated
                </th>
                <th scope="col" className="px-6 py-3">
                    failed
                </th>
            </tr>
        </thead>
        <tbody>
            {
               importHistoryData.map(({jobApi,fetchedAt,total,updated,new:newJobCount,failed})=>{
                return <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {jobApi}
                </th>
                <td className="px-6 py-4">
                    {fetchedAt}
                </td>
                <td className="px-6 py-4">
                    {total}
                </td>
                <td className="px-6 py-4">
                     {updated}
                </td>
                <td className="px-6 py-4">
                     {newJobCount}
                </td>
                <td className="px-6 py-4">
                     {failed}
                </td>
            </tr>
                </>
               })
            }
        </tbody>
    </table>
</div>

    </>
  )
}

export default App
