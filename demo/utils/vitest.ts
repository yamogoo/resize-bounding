import type { VueWrapper } from "@vue/test-utils";

export const getTypedEmittedEvent = <V>(
  wrapper: VueWrapper,
  eventName: string,
) => {
  return wrapper.emitted(eventName) as V[][];
};

export const delay = (ms = 1000) => {
  return new Promise((res: (value: void | PromiseLike<void>) => void) => {
    setTimeout(() => {
      res();
    }, ms);
  });
};
