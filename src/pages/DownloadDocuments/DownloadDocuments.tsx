import { Center, Stack, Title } from '@mantine/core'
import { useSearchParams } from 'react-router-dom';

import { DownloadDocumentsForm } from '@/features/download-documents'

export const DownloadDocumentsPage = () => {

    const [searchParams] = useSearchParams();
    const applicationId = searchParams.get('applicationId');

    if (!applicationId) {
        return (
            <Center flex={1} bg="white">
                <Stack w={400} gap={32}>
                    <Title order={1} ta="center" c="errorRed">
                        Неверный формат ссылки
                    </Title>
                </Stack>
            </Center>
        )
    }

    return (
        <>
            <Center flex={1} bg="white">
                <Stack w={400} gap={32}>
                    <Title order={1} ta="center" c="primaryBlue">
                        Скачивание пакета документов
                    </Title>
                    <DownloadDocumentsForm applicationId={applicationId} />
                </Stack>
            </Center>
        </>
    )
}
