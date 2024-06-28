import { Slider } from "@radix-ui/themes";
import React from "react";

const SlideBar = () => {
  const THUMB_SIZE = 32;

//   function calcStepMarkOffset(index: number, maxIndex: number) {
//     const percent = convertValueToPercentage(index, 0, maxIndex);
//     const thumbInBoundsOffset = getThumbInBoundsOffset(THUMB_SIZE, percent, 1);
//     return `calc(${percent}% + ${thumbInBoundsOffset}px)`;
//   }

//   function convertValueToPercentage(value: number, min: number, max: number) {
//     const maxSteps = max - min;
//     const percentPerStep = 100 / maxSteps;
//     const percentage = percentPerStep * (value - min);
//     return clamp(percentage, { max: 100, min: 0 });
//   }

//   function getThumbInBoundsOffset(
//     width: number,
//     left: number,
//     direction: number
//   ) {
//     const halfWidth = width / 2;
//     const halfPercent = 50;
//     const offset = linearScale([0, halfPercent], [0, halfWidth]);
//     return (halfWidth - offset(left) * direction) * direction;
//   }

//   function linearScale(
//     input: readonly [number, number],
//     output: readonly [number, number]
//   ) {
//     return (value: number) => {
//       if (input[0] === input[1] || output[0] === output[1]) return output[0];
//       const ratio = (output[1] - output[0]) / (input[1] - input[0]);
//       return output[0] + ratio * (value - input[0]);
//     };
//   }

  return (
    <div>
      {/* <Slider step={1} max={15} min={1} ></Slider> */}
      <Slider defaultValue={[3]} max={3} min={0} variant="soft"/>
    </div>
  );
};

export default SlideBar;
