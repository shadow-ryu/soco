"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  defaultColor: string;
  title: string;
  setColor: any;
  normalMode?: boolean;
}
const CustomColorPicker = ({
  defaultColor,
  title,
  setColor,
  normalMode = false,
}: ColorPickerProps) => {
  const handleColorChange = (e: any) => {
    setColor(e.target.value);
    console.log(setColor,"ff")
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <h2>{title}</h2>

      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <div className="flex justify-start items-center ">
              <div
                className="w-[50px] h-[40px] mr-1 rounded"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                style={{
                  background: defaultColor,
                }}
              ></div>
              <div>
                <Input
                  value={defaultColor}
                  width={40}
                  className="ml-1 w-[70%] h-[5%] focus:border-none border-gray-100"
                  onChange={(e) => handleColorChange(e)}
                />
              </div>
            </div>
          </span>
        </HoverCardTrigger>
        <HoverCardContent
          className=" border-none max-w-max  w-full  h-full text-sm bg-white"
          side="left"
        >
          {normalMode ? (
            <HexColorPicker color={defaultColor} onChange={setColor} />
          ) : (
            <ColorPicker
              hidePresets
              hideInputs
              value={defaultColor}
              onChange={setColor}
              className=""
            />
          )}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default CustomColorPicker;
