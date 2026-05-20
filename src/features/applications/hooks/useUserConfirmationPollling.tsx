import { useEffect } from "react";
import { useApplicationStore } from "../applicationStore";
import { ApplicationApi } from "../applicationApi";

export const useUserConfirmationPolling = (intervalMs: number = 10000) => {
  const isUserConfirmed = useApplicationStore((s) => s.isUserConfirmed);
  const setIsUserConfirmed = useApplicationStore((s) => s.setIsUserConfirmed);

  useEffect(() => {
    if (isUserConfirmed) return;

    const checkStatus = async () => {
      try {
        const confirmData = await ApplicationApi.checkUserConfirmation();
        setIsUserConfirmed(confirmData.confirmed);
      } catch (e) {
        console.error("Ошибка проверки подтверждения пользователя:", e);
      }
    };

    checkStatus();

    const intervalId = setInterval(checkStatus, intervalMs);

    return () => clearInterval(intervalId);
  }, [isUserConfirmed, setIsUserConfirmed, intervalMs]);
};
