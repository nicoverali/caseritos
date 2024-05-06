import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useState } from "react";

export type LiftTriggerFunction = (yPos: number) => boolean;

export default function useLiftOnScroll(
  trigger = triggerBelowZero,
  initial = false
) {
  const [lift, setLift] = useState(initial);
  useScrollPosition(
    ({ currPos }) => {
      const shouldLift = trigger(currPos.y);
      if (shouldLift != lift) {
        setLift(shouldLift);
      }
    },
    [lift]
  );

  return [lift] as const;
}

function triggerBelowZero(yPos: number) {
  return yPos < 0;
}
