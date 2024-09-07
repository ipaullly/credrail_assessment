import React, { useState } from 'react'
import { formatTableCells, formatTableHeaders } from '../utils/helper'
import { BiArrowBack } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'

const SingleRecord = ({ selectedRecord }) => {
  const [pageNo, setPageNo] = useState(0)
  const recordTableHeaders = formatTableHeaders(selectedRecord?.records)
  const recordTableCells = formatTableCells(selectedRecord?.records);

  return (
    <>
    <table className="hidden min-w-full text-gray-900 lg:table">
      <thead className="rounded-lg text-left text-sm font-normal">
        <tr>
        {
          recordTableHeaders?.map((headerCell, idx) => (
            <th scope="col" key={idx} className="px-3 py-5 font-medium">
              {headerCell}
            </th>
          ))
        }
        </tr>
      </thead>
      <tbody className="bg-white">
        {recordTableCells[pageNo]?.map((record, idx) => (
            <tr
              key={idx}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              {record?.map((recordCell, cellIdx) => (
                <td key={cellIdx} className="whitespace-nowrap px-3 py-3">
                  {recordCell}
                </td>
              ))} 
            </tr>
        ))}
       </tbody>
    </table>
    <div className='flex flex-row items-center justify-between max-w-40 mt-4'>
     {(pageNo >= 1) && <button 
        type="button" 
        onClick={() => setPageNo(pageNo-1)}
        className='flex items-center gap-1 px-2 py-3 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-800'>
        <BiArrowBack /> {pageNo + 1}
      </button>}
      {(pageNo <= (recordTableCells.length - 2)) && <button 
          type="button"
          onClick={() => setPageNo(pageNo+1)}
          className='flex items-center gap-1 px-2 py-3 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-800'>
          {pageNo + 2 } <BsArrowRight />
      </button>}
    </div>
    </>
  )
}

export default SingleRecord;
  