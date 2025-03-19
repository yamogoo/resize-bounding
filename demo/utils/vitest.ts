import type { VueWrapper } from "@vue/test-utils";

export const getTypedEmittedEvent = <V>(
  wrapper: VueWrapper,
  eventName: string,
) => {
  return wrapper.emitted(eventName) as V[][];
};
