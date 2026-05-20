import { useEffect, useRef } from "react";
import { useApplicationStore } from "../applicationStore";
import { ApplicationApi } from "../applicationApi";

export const useAutoSave = () => {
  const currentStep = useApplicationStore((s) => s.currentStep);
  const applicationId = useApplicationStore((s) => s.applicationId);
  const branchId = useApplicationStore((s) => s.branchId);
  const equipmentTypeId = useApplicationStore((s) => s.equipmentTypeId);
  const objects = useApplicationStore((s) => s.objects);
  const parameters = useApplicationStore((s) => s.parameters);
  const tests = useApplicationStore((s) => s.tests);
  const producerName = useApplicationStore((s) => s.producerName);
  const producerAddress = useApplicationStore((s) => s.producerAddress);
  const regulatoryDocument = useApplicationStore((s) => s.regulatoryDocument);
  const specification = useApplicationStore((s) => s.specification);
  const shema = useApplicationStore((s) => s.shema);
  const additionalDocuments = useApplicationStore((s) => s.additionalDocuments);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (currentStep !== 1) return;
    if (!applicationId) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      const payload = {
        applicationId,
        branchId,
        equipmentTypeId,
        objects,
        parameters,
        tests,
        producerName,
        producerAddress,
        regulatoryDocument,
        specification,
        shema,
        additionalDocuments,
      };
      try {
        await ApplicationApi.saveDraft(payload);
      } catch (e) {
        console.error("Ошибка автосохранения:", e);
      }
    }, 2000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [
    currentStep,
    applicationId,
    branchId,
    equipmentTypeId,
    objects,
    parameters,
    tests,
    producerName,
    producerAddress,
    regulatoryDocument,
    specification,
    shema,
    additionalDocuments,
  ]);
};
