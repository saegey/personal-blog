import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const required = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET', 'R2_PUBLIC_BASE_URL']

const config = () => {
  const missing = required.filter(key => !process.env[key])
  if (missing.length) throw new Error(`Missing R2 env var(s): ${missing.join(', ')}. Run through 1Password or export them first.`)
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL.replace(/\/$/, '')
  if (publicBaseUrl.includes('r2.cloudflarestorage.com')) throw new Error('R2_PUBLIC_BASE_URL must be a public bucket URL, not the private S3 API endpoint.')
  return {
    accountId: process.env.R2_ACCOUNT_ID,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucket: process.env.R2_BUCKET,
    publicBaseUrl,
  }
}

let client
export const publicUrlFor = key => `${config().publicBaseUrl}/${key}`
export const uploadBuffer = async (key, body, contentType) => {
  const cfg = config()
  client ??= new S3Client({
    region: 'auto',
    endpoint: `https://${cfg.accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: cfg.accessKeyId, secretAccessKey: cfg.secretAccessKey },
  })
  await client.send(new PutObjectCommand({ Bucket: cfg.bucket, Key: key, Body: body, ContentType: contentType }))
  return `${cfg.publicBaseUrl}/${key}`
}
