"use client";

import React, { useState } from "react";
import {
  DatePicker as AntDatePicker,
  DatePickerProps as AntDatePickerProps,
} from "antd";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";
import { RangePickerProps as AntRangePickerProps } from "antd/es/date-picker";
// import customDayjs from "@/utils/day-js";

interface DatePickerProps extends AntDatePickerProps {
  label?: string;
  error?: string;
}

interface RangePickerProps extends AntRangePickerProps {
  label?: string;
  error?: string;
}

const DatePicker: React.FC<DatePickerProps> = (prop) => {
  const {
    label,
    error,
    name,
    size = "middle",
    required,
    className,
    value,
    placeholder = "",
    ...rest
  } = prop;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        "w-full relative floating-input-date-container",
        isFocused || value ? "active" : "",
      )}
    >
      <div>
        <AntDatePicker
          size={size}
          id={name}
          status={error && "error"}
          className={cn(
            "core-input-date w-full",
            className,
            value && "input-filled !pb-[11px] !pt-[20px]",
          )}
          value={value ? dayjs(value) : null}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        <div className="relative">
          {error && (
            <span className="text-[12px] text-danger absolute">{error}</span>
          )}
        </div>
      </div>
      <label
        htmlFor={name}
        className={cn(
          "text-sm font-medium floating-label",
          required && "label-required",
          !!value && "label-float",
        )}
      >
        {value ? label : !!placeholder ? placeholder : label}
      </label>
    </div>
  );
};

const RangePicker: React.FC<RangePickerProps> = (prop) => {
  const {
    label,
    error,
    name,
    size = "middle",
    required,
    className,
    value,
    placeholder = ["", ""],
    ...rest
  } = prop;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        "w-full relative floating-input-date-range-container",
        isFocused || (value && value.length) ? "active" : "",
      )}
    >
      <div>
        <AntDatePicker.RangePicker
          size={size}
          id={name}
          status={error && "error"}
          className={cn(
            "core-input-date-range w-full",
            className,
            value && value.length && "input-filled !pb-[11px] !pt-[20px]",
          )}
          value={
            value
              ? [
                  value[0] ? dayjs(value[0]) : null,
                  value[1] ? dayjs(value[1]) : null,
                ]
              : null
          }
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        <div className="relative">
          {error && (
            <span className="text-[12px] text-danger absolute">{error}</span>
          )}
        </div>
      </div>
      <label
        htmlFor={name}
        className={cn(
          "text-sm font-medium floating-label",
          required && "label-required",
          value && value.length && "label-float",
        )}
      >
        {value && value.length
          ? label
          : !!placeholder[0]
          ? placeholder[0]
          : label}
      </label>
    </div>
  );
};

const CoreDatePicker = Object.assign(DatePicker, { Range: RangePicker });

export default CoreDatePicker;
