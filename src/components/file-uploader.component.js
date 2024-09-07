import React, { useContext, useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { useForm } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { InputError } from './input.component';
import { AppContext } from '../AppContext';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { formatDate } from '../utils/helper';
import { BiUpload } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const FileUploader = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const methods = useForm();
  const [rowCount, setRowCount] = useState(0);
  const [recordData, setRecordData] = useState([]);
  const [success, setSuccess] = useState(false)

  let navigate = useNavigate();

  const { userInfo, setUserInfo } = useContext(AppContext)

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  // Function to handle file input change
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      if (uploadedFile.size > MAX_FILE_SIZE) {
        alert('File size exceeds the 5 MB limit. Please upload a smaller file.');
        setValue('file', null);
        return;
      }
      if (uploadedFile.type === 'text/csv' || uploadedFile.name.endsWith('.csv')) {
        processCSV(uploadedFile);
      } else if (
        uploadedFile.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        uploadedFile.type === 'application/vnd.ms-excel' ||
        uploadedFile.name.endsWith('.xlsx')
      ) {
        processXLSX(uploadedFile);
      } else {
        alert('Please upload a valid CSV or XLSX file.');
        setValue('file', null);
      }
    }
  };

  // Function to process CSV files
  const processCSV = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        setRowCount(result.data.length - 1);
        setRecordData(result.data);
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  // Function to process XLSX files
  const processXLSX = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setRowCount(jsonData.length - 1);
      setRecordData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const onSubmit = (formData) => {
    console.log('Form submitted:', formData);
    console.log('file name', formData.file[0]?.name);
    console.log('user data', recordData);
    let payload = {
      ...userInfo,
      uploadedFiles: [
        ...userInfo?.uploadedFiles,
        {
          startDate: formData.startDate.split('-').reverse().join('/'),
          endDate: formData.endDate.split('-').reverse().join('/'),
          id: userInfo?.uploadedFiles?.length 
            ? userInfo.uploadedFiles.length 
            : 0,
          fileName: formData.file[0]?.name,
          uploadDate: formatDate(new Date()),
          noOfRecords: rowCount,
          records: recordData
        }
      ]
    }
    fetch('http://localhost:8000/users/'+userInfo.id, {
      method: 'PUT',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      console.log('upload',data);
      setUserInfo(data)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        navigate('/details')
      }, 3000);
      methods.reset()
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className='flex flex-row justify-between items-center'>
          <div className="mb-2 w-2/5">
            <div className='flex justify-between'>
              <label htmlFor="startDate" className="mb-1 block text-sm font-medium">
                Select Start Date
              </label>
              <AnimatePresence mode="wait" initial={false}>
                {errors.startDate && (
                  <InputError
                    message={errors.startDate.message}
                    key={errors.startDate.message}
                  />
                )}
              </AnimatePresence>
            </div>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  type="date"
                  id="startDate"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  {...register('startDate', 
                    { required: 'Start date is required' }
                  )}
                />
              </div>
            </div>
          </div>
          <div className="mb-2 w-2/5">
            <div className='flex justify-between'>
              <label htmlFor="endDate" className="mb-1 block text-sm font-medium">
                Select End Date
              </label>
              <AnimatePresence mode="wait" initial={false}>
                {errors.endDate && (
                  <InputError
                    message={errors.endDate.message}
                    key={errors.endDate.message}
                  />
                )}
              </AnimatePresence>
            </div>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  type="date"
                  id='endDate'
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  {...register('endDate', {
                    required: 'End date is required',
                    validate: (value) =>
                      !watch('startDate') || new Date(value) >= new Date(watch('startDate')) || 'End date must be after start date',
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        <div>  
          <div className='flex justify-between'>
            <label htmlFor="csv-file" className="mt-2 block text-sm font-medium">
              Select File
            </label>
            <AnimatePresence mode="wait" initial={false}>
                {errors.file && (
                  <InputError
                    message={errors.file.message}
                    key={errors.file.message}
                  />
                )}
              </AnimatePresence>
          </div>
          <div className="relative mt-2 rounded-md">
            <input
              type="file"
              accept=".csv, .xlsx"
              {...register('file', { required: 'File is required' })}
              onChange={handleFileChange}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <p className='mt-4 text-sm'>Number of rows: {rowCount}</p>
            {/* <div>
              <h3>Uploaded Data:</h3>
              <pre>{JSON.stringify(recordData, null, 2)}</pre>
            </div> */}
          </div>
        </div>
      </div>
      {success && (
        <p className="flex items-center gap-1 mb-5 font-semibold text-green-500">
          <BsFillCheckSquareFill /> Upload form has been submitted successfully
        </p>
      )}
      <button type="submit" className='flex items-center gap-1 p-3 mt-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800'>
        <BiUpload />
        Submit
      </button>
    </form>
  );
};

export default FileUploader;



