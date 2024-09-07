import React, { useContext, useEffect } from 'react'
import Layout from '../components/layout.component'
import FileUploader from '../components/file-uploader.component'
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const { userInfo } = useContext(AppContext);
  let navigate = useNavigate();

  useEffect(() => {
    console.log('userInfo', userInfo)
    if (!userInfo.emnail && !userInfo.id) {
      navigate('/login')
    }
    return () => {}
  }, [navigate, userInfo])
  
  return (
    <Layout>
      <FileUploader />
    </Layout>
  )
}

export default FileUpload