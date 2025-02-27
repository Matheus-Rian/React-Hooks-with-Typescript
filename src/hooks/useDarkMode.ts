import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useMedia } from "./useMedia";

export function useDarkMode() {

  const [enabledState, setEnabledState] = useLocalStorage<boolean>(
    'dark-mode-enabled',
    false ,
  );

  const preferDarkMode = usePreferDarkMode();

  const enabled = enabledState ?? preferDarkMode;

  useEffect(() => {
    const className = 'dark-mode';
    const element = window.document.body;

    if (enabled)
      element.classList.add(className);
    else
      element.classList.remove(className);

  }, [enabled]);

  return [enabled, setEnabledState];
}

function usePreferDarkMode() {
  return useMedia<boolean>(["prefers-color-scheme: dark"], [true], false);
}