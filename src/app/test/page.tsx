import React from 'react'
import S3 from 'aws-sdk/clients/s3'
import { randomUUID } from 'crypto'

const upload = async () => {
  const s3 = new S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET,
    region: process.env.S3_UPLOAD_REGION,
    signatureVersion: 'v4',
  })
  const Key = `${randomUUID()}`
  const s3Params = {
    Bucket: process.env.S3_UPLOAD_BUCKET,
    Key,
    Expires: 60,
    // ContentType: `image/${ex}`,
  }
  const uploadUrl = await s3.getSignedUrl('putObject', s3Params)
}
const page = () => {
  return <div>page</div>
}

export default page
