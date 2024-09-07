import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/layout.component'
import { AppContext } from '../AppContext'
import SingleRecord from '../components/single-record.component'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

const Details = () => {
  const [selectedRecord, setSelectedRecord] = useState({})
  const [viewAllDetails, setViewAllDetails] = useState(true)
  const { userInfo: { uploadedFiles: records } } = useContext(AppContext);

  const { userInfo } = useContext(AppContext);
  let navigate = useNavigate();

  useEffect(() => {
    console.log('viewAllDetails', viewAllDetails)
    if (!userInfo.emnail && !userInfo.id) {
      navigate('/login')
    }
    return () => {}
  }, [navigate, userInfo])

  const handleViewRecords = (record) => {
    setSelectedRecord(record)
    setViewAllDetails(false)
  }

  return (
    <Layout>
      <div className="mt-6">
        <div className="inline-block min-w-full align-middle">
          {!viewAllDetails && <button 
            type="button"
            onClick={() => {
              setViewAllDetails(true);
              setSelectedRecord({})
            }}
            className='flex items-center gap-1 p-3 mb-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800'
          >
           <BiArrowBack /> Back
          </button>}
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="lg:hidden">
              {records?.map((record) => (
                <div
                  key={record.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{record.fileName}</p>
                      </div>
                      <p className="text-sm text-gray-500">{record.uploadDate}</p>
                    </div>
                    {record.noOfRecords}
                  </div>
                  <div className="flex w-full flex-row items-center justify-between pt-4">
                      <span className="font-medium">
                        <strong>Start Date: </strong> {record.startDate}
                      </span>
                      <span>
                        <strong>End Date:</strong>{record.endDate}
                      </span>
                  </div>
                </div>
              ))} 
            </div>
            {viewAllDetails ? 
              (
                <table className="hidden min-w-full text-gray-900 lg:table">
                  <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                      <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        File Name
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Upload Date
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Start Date
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        End Date
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        No. of records
                      </th>
                      <th scope="col" className="relative py-3 pl-6 pr-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {records?.map((record) => (
                      <tr
                        key={record.id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                      >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex items-center gap-3">
                          
                            <p>{record.fileName}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {record.uploadDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                         {record.startDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {record.endDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {record.noOfRecords}
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex justify-end gap-3">
                            <button 
                              type="button"
                              onClick={() => handleViewRecords(record)}
                              className='flex items-center gap-1 p-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800'
                            >
                              View Records
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <SingleRecord 
                  selectedRecord={selectedRecord}
                  setSelectedRecord={setSelectedRecord}
                />
              )  
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Details