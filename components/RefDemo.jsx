"use client";
import React, { useEffect } from "react";
import { useRef } from "react";

function RefDemo() {
  const refContainer = useRef(null);
  console.log("Ref", refContainer.current);
  useEffect(() => {
    if (refContainer.current) {
      refContainer.current.style.color = "red";
    }
  }, []);
  return (
    <>
      <div ref={refContainer}>Map function</div>
      <div ref={refContainer}>Markers</div>
    </>
  );
}

export default RefDemo;
