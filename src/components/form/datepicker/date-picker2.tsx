"use client";

import React, { useState } from "react";
import {
  DatePicker as AntDatePicker,
  DatePickerProps as AntDatePickerProps,
} from "antd";
import { cn } from "@/utils/cn";
import dayjs, { Dayjs } from "dayjs";
import { RangePickerProps as AntRangePickerProps } from "antd/es/date-picker";

interface DatePickerProps
  extends Omit<AntDatePickerProps, "value" | "onChange"> {
  label?: string;
  error?: string;
  name: string;
  value?: Dayjs | null;
  onChange: (date: string | null) => void;
  placeholder?: string;
  className?: string;
}

interface RangePickerProps
  extends Omit<AntRangePickerProps, "value" | "onChange"> {
  label?: string;
  error?: string;
  name: string;
  value?: [Dayjs | null, Dayjs | null] | null;
  onChange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
  placeholder?: [string, string];
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  error,
  name,
  value,
  onChange,
  placeholder = "Pilih Tanggal",
  className,
}) => {
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
          size="middle"
          id={name}
          status={error && "error"}
          className={cn(
            "core-input-date w-full",
            className,
            value && "input-filled !pb-[11px] !pt-[20px]",
          )}
          value={value || null}
          placeholder={placeholder}
          onChange={(date) => onChange(date ? date.format("YYYY-MM-DD") : null)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          popupClassName="custom-date-picker-popup"
          allowClear={true}
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
          value && "label-float",
        )}
      >
        {value ? label : placeholder || label}
      </label>
    </div>
  );
};

const RangePicker: React.FC<RangePickerProps> = ({
  label,
  error,
  name,
  value,
  onChange,
  placeholder = ["Start Date", "End Date"],
  className,
}) => {
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
          size="middle"
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
          onChange={(dates) =>
            onChange(dates ? [dates[0] || null, dates[1] || null] : null)
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          popupClassName="custom-date-picker-popup"
          allowClear={true}
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
