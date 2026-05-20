import {
  Group,
  Title,
  Box,
  Stack,
  UnstyledButton,
  Text,
  Center,
  Loader,
} from "@mantine/core";
import "@mantine/core/styles.layer.css";
import { Icon } from "@iconify/react";
import { useApplicationStore } from "../applicationStore";
import { useEffect, useState } from "react";
import { PreformStep } from "./PreformStep";
import { useAutoSave } from "../hooks/useAutoSave";
import { CreateFormStep } from "./CreateFormStep";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SigningStep } from "./SigningStep";
import { useUserConfirmationPolling } from "../hooks/useUserConfirmationPollling";
import { SuccessStep } from "./SuccessStep";
import { ApplicationApi } from "../applicationApi";

export const CreateApplicationManager = () => {
  const { currentStep, setStep, loadApplicationData, reset } =
    useApplicationStore();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const appIdFromUrl = searchParams.get("id");
  const [isInitializing, setIsInitializing] = useState(true);

  const fetchMetadata = useApplicationStore((state) => state.fetchMetadata);
  useEffect(() => {
    fetchMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const initForm = async () => {
      if (appIdFromUrl) {
        try {
          // Загружаем данные существующей заявки
          const appData = await ApplicationApi.getApplicationById(appIdFromUrl);
          loadApplicationData(appData);
        } catch (e) {
          console.error("Не удалось восстановить заявку:", e);
          reset();
        }
      } else {
        reset();
        setStep(0);
      }
      setIsInitializing(false);
    };

    initForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appIdFromUrl]);

  useAutoSave();
  useUserConfirmationPolling();

  return (
    <Stack gap={24} h="100%" w="100%">
      <Group h={45} justify="center" pos="relative" style={{ flexShrink: 0 }}>
        <UnstyledButton
          onClick={() => {
            navigate("/");
          }}
          style={{
            position: "absolute",
            left: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon
            icon="mdi:chevron-left"
            width="24"
            height="24"
            color="#005B9C"
          />
          <Box px={24} py={8}>
            <Text
              c="#005B9C"
              style={{ fontFamily: "PF Din Text Cond Pro", fontSize: "24px" }}
            >
              Назад
            </Text>
          </Box>
        </UnstyledButton>

        <Title c="#212529" order={2} style={{ fontFamily: "DIN Pro" }}>
          Новая заявка
        </Title>
      </Group>

      {isInitializing ? (
        <Center h={400}>
          <Loader size="xl" />
        </Center>
      ) : (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "80vh",
          }}
        >
          {currentStep === 0 && <PreformStep />}
          {currentStep === 1 && <CreateFormStep />}
          {currentStep === 2 && <SigningStep />}
          {currentStep === 3 && <SuccessStep />}
        </Box>
      )}
    </Stack>
  );
};
