import { Dispatch, SetStateAction, useRef, useState } from "react";

type UseDebouncedStateResult<T> = [T, Dispatch<SetStateAction<T>>, T];

export const useDebouncedState = <T>(
  defaultValue: T,
  debounceTime: number = 500
): UseDebouncedStateResult<T> => {
  const [value, setValue] = useState<T>(defaultValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(defaultValue);
  const timeoutId = useRef<number | null>(null);

  const timeoutFinishedHandler = (setStateAction: SetStateAction<T>) => {
    timeoutId.current = null;
    setDebouncedValue(setStateAction);
  };

  const updateValue: Dispatch<SetStateAction<T>> = (setStateAction) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    setValue(setStateAction);

    timeoutId.current = window.setTimeout(
      () => timeoutFinishedHandler(setStateAction),
      debounceTime
    );
  };

  return [value, updateValue, debouncedValue];
};
