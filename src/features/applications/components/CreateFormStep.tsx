import { Box, Tabs, Group, Tooltip, Button, ScrollArea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { GeneralInfoTab } from "./GeneralInfoTab";
import { ParametersTab } from "./ParametersTab";
import { TestsTab } from "./TestsTab";
import { DocsTab } from "./DocsTab";
import { useApplicationStore, useIsFormValid } from "../applicationStore";
import { useState } from "react";
import { ApplicationApi } from "../applicationApi";

export const CreateFormStep = () => {
  const { activeTab, setActiveTab, setStep, applicationId, setGeneratedFile } =
    useApplicationStore();
  const isFormValid = useIsFormValid();
  const [isGenerating, setIsGenerating] = useState(false);
  const state = useApplicationStore();

  const handleGenerate = async () => {
    if (!applicationId) return;
    setIsGenerating(true);

    try {
      await ApplicationApi.saveDraft(state);
      const fileData = await ApplicationApi.generateApplication(applicationId);
      setGeneratedFile(fileData);
      setStep(2);
    } catch (error: any) {
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const backendErrors: string[] = error.response.data.errors;

        backendErrors.forEach((errText) => {
          notifications.show({
            title: "Ошибка валидации заявки",
            message: errText,
            color: "red",
            autoClose: 5000,
          });
        });
      } else {
        notifications.show({
          title: "Ошибка",
          message: "Не удалось сформировать заявку. Попробуйте позже.",
          color: "red",
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <Box
      style={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={(val) => setActiveTab(val || "general")}
        variant="custom"
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <Tabs.List style={{ flexShrink: 0 }}>
          <Tabs.Tab value="general">Общая информация</Tabs.Tab>
          <Tabs.Tab value="params">Характеристики объектов испытаний</Tabs.Tab>
          <Tabs.Tab value="tests">Требования к испытаниям</Tabs.Tab>
          <Tabs.Tab value="docs">Техническая документация</Tabs.Tab>
        </Tabs.List>

        <Box style={{ padding: "24px 0" }}>
          <Tabs.Panel
            value="general"
          >
            <GeneralInfoTab />
          </Tabs.Panel>
          <Tabs.Panel value="params">
            <ParametersTab />
          </Tabs.Panel>
          <Tabs.Panel value="tests">
            <TestsTab />
          </Tabs.Panel>
          <Tabs.Panel value="docs">
            <DocsTab />
          </Tabs.Panel>
        </Box>
      </Tabs>

      <Group justify="center">
        <Tooltip
          label="Пожалуйста, заполните обязательные поля формы и данные в Личном кабинете"
          disabled={isFormValid}
          multiline
          w={300}
          withArrow
          position="top"
        >
          <div style={{ display: "inline-block" }}>
            <Button
              variant="filled"
              size="lg"
              disabled={!isFormValid}
              loading={isGenerating}
              onClick={handleGenerate}
              style={{ cursor: !isFormValid ? "not-allowed" : "pointer" }}
            >
              Сформировать заявку
            </Button>
          </div>
        </Tooltip>
      </Group>
    </Box>
  );
};
