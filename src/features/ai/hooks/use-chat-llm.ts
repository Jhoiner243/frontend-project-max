import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { usePostMutationLLMMutation } from "../../../store/ai/api";
import { addChatMessage, addResponseChat } from "../../../store/ai/slice";
import { formatLlmResponse } from "../../../utils/utils";

export const useChatLlm = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();
  const [onSubmit, { isLoading, isError, data: documents, reset }] =
    usePostMutationLLMMutation();

  useEffect(() => {
    if (documents) {
      const response = formatLlmResponse(documents);
      dispatch(addResponseChat(response));
    }
  }, [dispatch, documents]);

  useEffect(() => {
    if (textAreaRef.current) adjustHeight();
  }, []);

  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${
        textAreaRef.current.scrollHeight + 2
      }px`;
    }
  };

  const [localStorage, setLocalStorage] = useLocalStorage("input", "");
  useEffect(() => {
    if (textAreaRef.current) {
      const domValue = textAreaRef.current.value;
      // Prefiera el valor DOM sobre localStorage para manejar la hidratación
      const finalValue = domValue || localStorage || "";
      //Asignamos el valor final al input
      setInput(finalValue);
      adjustHeight();
    }
  }, [localStorage]);

  //Guardamos el valor del input en localStorage
  useEffect(() => {
    setLocalStorage(input);
  }, [setLocalStorage, input]);

  //Handle input para obtener los cambios de escritura
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const handleSubmit = () => {
    onSubmit({
      prompt: input,
    });
    dispatch(addChatMessage(input));
    setInput("");
    setLocalStorage("");
    if (width && width > 768) {
      textAreaRef.current?.focus();
    }
  };

  if (isError === true) {
    toast.error("Error al enviar option");
  }

  return {
    textAreaRef,
    handleInput,
    handleSubmit,
    onSubmit,
    input,
    isLoading,
    documents,
    reset,
  };
};
