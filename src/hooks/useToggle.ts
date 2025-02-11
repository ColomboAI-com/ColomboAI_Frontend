import { useState } from "react";

function useToggle(
  initial = false
): [value: boolean, toggle: () => void, hide: () => void] {
  const [state, setState] = useState<boolean>(initial);
  const toggle = () => setState((prevState) => !prevState);
  return [state, toggle, () => setState(false)];
}
export default useToggle;
