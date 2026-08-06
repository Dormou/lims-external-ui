import type { FileMeta } from '@/entities/application/model/types/fileMeta'
import { ApplicationsData } from './applicationsData'
import { ApplicationsInfoData } from './applicationsInfoData'

export const ApplicationsFiles: FileMeta[] = [
  {
    applicationId: ApplicationsInfoData[0].id,
    fileName: `Заявка на испытания от ${ApplicationsData[0].producerName} от ${new Date().toLocaleDateString()}`,
    fileExtension: '.pdf',
    fileSize: '5.2KB',
    createdAt: new Date().toDateString(),
  }
]
