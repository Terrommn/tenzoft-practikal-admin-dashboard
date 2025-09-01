import { supabase } from '@/supabase'

// Storage bucket names
export const BUCKETS = {
  CV_ORIGINAL: 'cv-original',
  CV_FORMATTED_LONG: 'cv-formatted-long',
  CV_FORMATTED_SHORT: 'cv-formatted-short'
} as const

// File upload function
export async function uploadFile(
  bucket: string,
  file: File,
  fileName: string,
  options?: {
    upsert?: boolean
  }
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: options?.upsert ?? false
    })

  if (error) {
    console.error('Error uploading file:', error)
    throw error
  }

  return data
}

// Get public URL for a file
export function getPublicUrl(bucket: string, fileName: string) {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)

  return data.publicUrl
}

// Delete a file
export async function deleteFile(bucket: string, fileName: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([fileName])

  if (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

// List files in a bucket
export async function listFiles(bucket: string, path?: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(path)

  if (error) {
    console.error('Error listing files:', error)
    throw error
  }

  return data
}

// CV-specific upload functions
export async function uploadOriginalCV(file: File, candidateId: string) {
  const fileName = `${candidateId}/original/${file.name}`
  const data = await uploadFile(BUCKETS.CV_ORIGINAL, file, fileName)
  return getPublicUrl(BUCKETS.CV_ORIGINAL, data.path)
}

export async function uploadFormattedCVLong(file: File, candidateId: string) {
  const fileName = `${candidateId}/formatted-long/${file.name}`
  const data = await uploadFile(BUCKETS.CV_FORMATTED_LONG, file, fileName)
  return getPublicUrl(BUCKETS.CV_FORMATTED_LONG, data.path)
}

export async function uploadFormattedCVShort(file: File, candidateId: string) {
  const fileName = `${candidateId}/formatted-short/${file.name}`
  const data = await uploadFile(BUCKETS.CV_FORMATTED_SHORT, file, fileName)
  return getPublicUrl(BUCKETS.CV_FORMATTED_SHORT, data.path)
}

// Generate unique CV UID
export function generateCVUid(): string {
  return `cv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
