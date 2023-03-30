import type { NextApiRequest, NextApiResponse } from 'next'
import S3 from 'aws-sdk/clients/s3'
import { randomUUID } from 'crypto'

const s3 = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.S3_UPLOAD_KEY2,
  secretAccessKey: process.env.S3_UPLOAD_SECRET2,
  region: process.env.S3_UPLOAD_REGION,
  signatureVersion: 'v4',
})

const allowedFormats = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!allowedFormats.includes(req.query.fileType as string)) {
      return res.status(400).json({
        fileType: req.query.fileType,
        message: 'Invalid File Type',
      })
    }
    if (
      req.query.fileType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      req.query.fileType = 'application/docx'
    }
    const type = (req.query.fileType as string).split('/')[1]
    const Key = `${randomUUID()}.${type}`
    const s3Params = {
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key,
      Expires: 60,
      ContentType: req.query.fileType,
    }
    const uploadUrl = s3.getSignedUrl('putObject', s3Params)
    return res.status(200).json({
      uploadUrl,
      key: Key,
    })
  } catch (error) {
    return res.status(400).json({
      message: error,
    })
  }
  // console.log(type)
  // console.log(Key)
  // const s3Params = {
  //   Bucket: process.env.S3_UPLOAD_BUCKET,
  //   Key,
  //   Expires: 60,
  //   ContentType: req.query.fileType,
  // }

  // const uploadUrl = s3.getSignedUrl('putObject', s3Params)

  // console.log('Server', uploadUrl)

  // return res.status(200).json({
  //   uploadUrl,
  //   key: Key,
  // })
  // return res.status(200).json({
  //   type,
  //   key: Key,
  // })
}
