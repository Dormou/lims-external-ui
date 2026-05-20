import { Stack, FileInput } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useApplicationStore } from "../applicationStore";

export const DocsTab = () => {
  const {
    regulatoryDocument,
    specification,
    shema,
    additionalDocuments,
    setFile,
    setAdditionalFiles,
  } = useApplicationStore();

  return (
    <Stack gap="xl" w="100%" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <FileInput
        label="Нормативный документ, в соответствии с которым изготовлен(-ы) объект(-ы) испытаний"
        required
        placeholder="Выберите файл"
        leftSection={<Icon icon="mdi:file-document-outline" width={20} />}
        value={regulatoryDocument}
        onChange={(file) => setFile("regulatoryDocument", file)}
        clearable
      />

      <FileInput
        label="Технические условия"
        required
        placeholder="Выберите файл"
        leftSection={<Icon icon="mdi:file-certificate-outline" width={20} />}
        value={specification}
        onChange={(file) => setFile("specification", file)}
        clearable
      />

      <FileInput
        label="Схема строповки"
        required
        placeholder="Выберите файл"
        leftSection={<Icon icon="mdi:file-cog-outline" width={20} />}
        value={shema}
        onChange={(file) => setFile("shema", file)}
        clearable
      />

      <FileInput
        label="Дополнительные документы"
        placeholder="Можно выбрать несколько файлов"
        leftSection={<Icon icon="mdi:file-multiple-outline" width={20} />}
        multiple
        value={additionalDocuments}
        onChange={setAdditionalFiles}
        clearable
      />
    </Stack>
  );
};
