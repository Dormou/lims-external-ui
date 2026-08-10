import { Modal, Text, Button, Stack, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Icon } from "@iconify/react";
import { APP_CONFIG } from "@/shared/constants/constants";
import classes from "./SupportModal.module.css";
import { FileCard } from "@/shared/ui";

export const SupportModal = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const handleDownloadInstruction = () => {
        const link = document.createElement("a");
        link.href = '/manuals/Руководство пользователя ЛИМС.pdf'
        link.download = 'Руководство пользователя ЛИМС.pdf'
        link.click();
    };

    const handleDownloadVideoInstruction = () => {
        const link = document.createElement('a')
        link.href = '/manuals/Видео руководство пользователя ЛИМС.mp4'
        link.download = 'Видео руководство пользователя ЛИМС.mp4'
        link.click()
    }

    return (
        <>
            <Button
                className={classes.floatingButton}
                onClick={open}
                title="Нужна помощь?"
            >
                <Icon icon="mdi:support" width="var(--mantine-spacing-xl)" />
            </Button>

            <Modal
                opened={opened}
                onClose={close}
                title={
                    <Text fw={400} fz={20} className={classes.modalTitle}>
                        Техническая поддержка
                    </Text>
                }
                centered
                size={460}
                radius="sm"
                classNames={{
                    content: classes.content,
                    body: classes.body,
                    header: classes.header,
                    title: classes.title,
                }}
            >
                <Stack gap={24}>
                    <Text>
                        Если у Вас возникли трудности или вопросы при работе с системой,
                        пожалуйста, ознакомьтесь с документацией или напишите в службу
                        технической поддержки.
                    </Text>

                    <Stack gap={8}>
                        <Text variant="emphasis" c="darkGray" tt="uppercase" lts="1px">
                            Документация
                        </Text>
                        <FileCard
                            fileName="Руководство пользователя ЛИМС"
                            fileSize={1572864}
                            fileType="pdf"
                            onDownload={handleDownloadInstruction}
                        />
                        <FileCard
                            fileName="Видео руководство пользователя ЛИМС"
                            fileSize={38145567}
                            fileType="mp4"
                            onDownload={handleDownloadVideoInstruction}
                        />
                    </Stack>

                    <Stack gap={8}>
                        <Text variant="emphasis" c="darkGray" tt="uppercase" lts="1px">
                            Служба технической поддержки
                        </Text>
                        <Group gap="xs" align="center">
                            <Icon
                                icon="mdi:email-outline"
                                color="var(--mantine-color-darkGray-6)"
                                width={18}
                            />
                            <Text size="sm" c="black">
                                Пишите нам на{" "}
                                <a
                                    href={`mailto:${APP_CONFIG.supportEmail}`}
                                    className={classes.supportEmail}
                                >
                                    {APP_CONFIG.supportEmail}
                                </a>
                            </Text>
                        </Group>
                        <Text size="xs" c="darkGray" style={{ marginLeft: 26 }}>
                            Приём обращений ведётся по будням с 9.00 до 18.00 (Мск)
                        </Text>
                        <Text size="xs" c="darkGray" style={{ marginLeft: 26 }}>
                            В обращении указывайте, пожалуйста, вашу версию браузера и
                            прикрепляйте скриншот экрана с проблемой (если применимо)
                        </Text>
                    </Stack>
                </Stack>
            </Modal>
        </>
    );
};
