import React, { useRef } from "react";

export default function Test() {
  const refRoot = useRef<HTMLDivElement | null>(null);
  return <div ref={refRoot}>Hello</div>;
}
