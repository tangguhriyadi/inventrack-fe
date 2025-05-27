import type { GetRef, InputProps } from "antd";
import { Input as AntInput } from "antd";
import React, { Ref } from "react";
import { cn } from "@/utils/cn";
import { PasswordProps, TextAreaProps } from "antd/es/input";
import { OTPProps } from "antd/es/input/OTP";
import EyeOpenIcon from "../../icon/eye-open";
import EyeClosedIcon from "../../icon/eye-closed";

type BaseInputProps = {
  label?: string;
  error?: string;
  isCurrency?: boolean;
  ref?: Ref<GetRef<typeof AntInput>>;
};

const Input: React.FC<BaseInputProps & InputProps> = (props) => {
  const {
    label,
    error,
    name,
    size = "middle",
    required,
    value,
    className,
    placeholder,
    prefix,
    ...rest
  } = props;
  return (
    <div className={cn("w-full relative floating-input-container")}>
      <div>
        <AntInput
          size={size}
          id={name}
          status={error && "error"}
          value={value}
          className={cn(
            "core-input",
            className,
            value && "input-filled !pb-[11px] !pt-[20px]",
          )}
          prefix={prefix}
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
          value && "label-float",
          prefix && !value && "label-with-prefix",
        )}
      >
        {value ? label : !!placeholder ? placeholder : label}
      </label>
    </div>
  );
};

const InputPassword: React.FC<BaseInputProps & PasswordProps> = (props) => {
  const {
    label,
    error,
    name,
    size = "middle",
    required,
    value,
    className,
    placeholder,
    ref,
    ...rest
  } = props;
  return (
    <div className={cn("w-full relative floating-input-container")}>
      <div>
        <AntInput.Password
          size={size}
          id={name}
          status={error && "error"}
          value={value}
          className={cn(
            "core-input",
            className,
            value && "input-filled !pb-[11px] !pt-[20px]",
          )}
          iconRender={(visible) =>
            visible ? (
              <EyeClosedIcon width={20} height={20} className="!text-xl" />
            ) : (
              <EyeOpenIcon width={20} height={20} className="!text-xl" />
            )
          }
          ref={ref}
          {...rest}
        />
        <div className="relative">
          {error && (
            <span className="text-[12px] text-error absolute">{error}</span>
          )}
        </div>
      </div>
      <label
        htmlFor={name}
        className={cn(
          "text-sm font-medium floating-label",
          required && "label-required",
          value && "label-float",
        )}
      >
        {value ? label : !!placeholder ? placeholder : label}
      </label>
    </div>
  );
};

const InputArea: React.FC<BaseInputProps & TextAreaProps> = (props) => {
  const {
    label,
    error,
    name,
    size = "middle",
    required,
    value,
    className,
    placeholder,
    ...rest
  } = props;
  return (
    <div className={cn("w-full relative floating-input-container")}>
      <div>
        <AntInput.TextArea
          size={size}
          id={name}
          status={error && "error"}
          value={value}
          className={cn(
            "core-input",
            className,
            value && "input-filled !pb-[11px] !pt-[20px]",
          )}
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
          value && "label-float",
        )}
      >
        {value ? label : !!placeholder ? placeholder : label}
      </label>
    </div>
  );
};
const InputOTP: React.FC<OTPProps> = (props) => {
  const { size = "middle", ...rest } = props;
  return <AntInput.OTP size={size} {...rest} />;
};
const InputNumber: React.FC<BaseInputProps & InputProps> = (props) => {
  const {
    label,
    error,
    name,
    size = "middle",
    required,
    value,
    className,
    placeholder,
    prefix,
    onChange,
    isCurrency = false,
    ...rest
  } = props;

  // Format value with thousand separators
  const formatNumber = (num: string | number | undefined): string => {
    if (num === undefined || num === "") return "";

    // Convert to string and handle zero case
    const numStr = String(num);
    if (numStr === "0") return "0";

    // Remove non-numeric characters except decimal point
    const cleanNum = numStr.replace(/[^\d.]/g, "");

    // Split into integer and decimal parts
    const parts = cleanNum.split(".");

    // Format integer part with thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Return with decimal part if it exists
    return parts.length > 1 ? parts.join(".") : parts[0];
  };

  // Clean a formatted value (remove thousand separators)
  const cleanFormattedValue = (formatted: string): string => {
    return formatted.replace(/\./g, "");
  };

  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Get cursor position before change
    // const cursorPosition = e.target.selectionStart || 0;

    // Remove formatting to get numeric value (keep decimal point)
    const numericValue = cleanFormattedValue(inputValue);

    // Check if empty or valid number
    const isEmpty = !numericValue || numericValue.length === 0;
    const isValidNumber = /^\d*\.?\d*$/.test(numericValue);

    if ((isValidNumber || isEmpty) && onChange) {
      // Create a synthetic event with the numeric value
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: numericValue,
        },
      };

      // Pass the raw numeric value to parent component
      onChange(syntheticEvent);
    }
  };

  // Get the display value
  const displayValue = isCurrency ? formatNumber(String(value)) : value;

  return (
    <div className={cn("w-full relative floating-input-container")}>
      <div>
        <AntInput
          size={size}
          id={name}
          status={error ? "error" : undefined}
          value={displayValue}
          className={cn(
            "core-input",
            className,
            "input-filled !pb-[11px] !pt-[20px]",
          )}
          prefix={prefix}
          onChange={handleInputChange}
          {...rest}
        />
        <div className="relative mb-2">
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
          (value || value === 0) && "label-float",
          value === 0 && "label-float",
        )}
      >
        {value || value === 0 ? label : !!placeholder ? placeholder : label}
      </label>
    </div>
  );
};

const CoreInput = Object.assign(Input, {
  Password: InputPassword,
  TextArea: InputArea,
  OTP: InputOTP,
  Number: InputNumber,
});

export default CoreInput;
