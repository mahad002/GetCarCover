import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  label?: string;
  error?: string;
  helperText?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  showTimeSelect?: boolean;
  dateFormat?: string;
  placeholderText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({
    label,
    error,
    helperText,
    value,
    onChange,
    minDate,
    maxDate,
    showTimeSelect = false,
    dateFormat = 'MM/dd/yyyy h:mm aa',
    placeholderText,
    fullWidth = true,
    disabled = false,
  }, ref) => {
    const customInput = (
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Calendar size={18} />
        </div>
        <input
          type="text"
          className={`
            rounded-lg border bg-white px-3 py-2 pl-9 focus:outline-none focus:ring-2
            transition-all duration-200 placeholder:text-gray-400 w-full
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
          placeholder={placeholderText}
          readOnly
        />
      </div>
    );

    return (
      <div ref={ref} className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <ReactDatePicker
          selected={value}
          onChange={onChange}
          customInput={customInput}
          minDate={minDate}
          maxDate={maxDate}
          showTimeSelect={showTimeSelect}
          dateFormat={dateFormat}
          disabled={disabled}
          className="w-full"
        />
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;