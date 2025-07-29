import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const DateRangePickerPro = ({
  initialStartDate = new Date(),
  initialEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  onDateRangeChange,
  onTimeChange,
  showTimeSelector = true,
  showPresetsByDefault = true,
  enableTimezone = true,
  customPresets = null,
  className = ""
}) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [activePreset, setActivePreset] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);
  const [includeTime, setIncludeTime] = useState(false);
  const [timezone, setTimezone] = useState('UTC');
  const [showPresets, setShowPresets] = useState(showPresetsByDefault);
  const calendarRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showCalendar]);

  // Notify parent of changes
  useEffect(() => {
    if (onDateRangeChange) {
      onDateRangeChange({ startDate, endDate, timezone, includeTime });
    }
  }, [startDate, endDate, timezone, includeTime, onDateRangeChange]);

  useEffect(() => {
    if (onTimeChange) {
      onTimeChange(selectedTime);
    }
  }, [selectedTime, onTimeChange]);

  // Utility functions
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const startOfWeek = (date) => {
    const result = new Date(date);
    const day = result.getDay();
    const diff = result.getDate() - day;
    return new Date(result.setDate(diff));
  };

  const endOfWeek = (date) => {
    const result = new Date(date);
    const day = result.getDay();
    const diff = result.getDate() - day + 6;
    return new Date(result.setDate(diff));
  };

  const startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const endOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  // Smart preset configurations
  const presets = useMemo(() => {
    if (customPresets) return customPresets;
    
    const today = new Date();
    return [
      {
        label: 'Today',
        value: 'today',
        startDate: today,
        endDate: today,
        icon: <Calendar size={16} />
      },
      {
        label: 'Yesterday',
        value: 'yesterday',
        startDate: addDays(today, -1),
        endDate: addDays(today, -1),
        icon: <Calendar size={16} />
      },
      {
        label: 'Last 7 days',
        value: 'last7days',
        startDate: addDays(today, -7),
        endDate: today,
        icon: <Calendar size={16} />
      },
      {
        label: 'Last 30 days',
        value: 'last30days',
        startDate: addDays(today, -30),
        endDate: today,
        icon: <Calendar size={16} />
      },
      {
        label: 'This week',
        value: 'thisweek',
        startDate: startOfWeek(today),
        endDate: endOfWeek(today),
        icon: <Calendar size={16} />
      },
      {
        label: 'This month',
        value: 'thismonth',
        startDate: startOfMonth(today),
        endDate: endOfMonth(today),
        icon: <Calendar size={16} />
      },
      {
        label: 'Next 7 days',
        value: 'next7days',
        startDate: today,
        endDate: addDays(today, 7),
        icon: <Calendar size={16} />
      },
      {
        label: 'Next 30 days',
        value: 'next30days',
        startDate: today,
        endDate: addDays(today, 30),
        icon: <Calendar size={16} />
      }
    ];
  }, [customPresets]);

  // Handle preset selection
  const handlePresetSelect = useCallback((preset) => {
    setStartDate(preset.startDate);
    setEndDate(preset.endDate);
    setActivePreset(preset.value);
    setShowCalendar(false);
  }, []);

  // Calculate duration
  const rangeDuration = useMemo(() => {
    const timeDiff = endDate - startDate;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  }, [startDate, endDate]);

  // Calendar component
  const CalendarComponent = () => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    
    const getDaysInMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handleDateClick = (day) => {
      const selectedDate = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
      
      if (selectingStart) {
        setStartDate(selectedDate);
        if (selectedDate > endDate) {
          setEndDate(selectedDate);
        }
        setSelectingStart(false);
      } else {
        setEndDate(selectedDate);
        if (selectedDate < startDate) {
          setStartDate(selectedDate);
        }
        setSelectingStart(true);
        setShowCalendar(false);
      }
      setActivePreset(null);
    };

    const isDateInRange = (day) => {
      const date = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
      return date >= startDate && date <= endDate;
    };

    const isDateSelected = (day) => {
      const date = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
      return date.toDateString() === startDate.toDateString() || 
             date.toDateString() === endDate.toDateString();
    };

    const daysInMonth = getDaysInMonth(calendarMonth);
    const firstDay = getFirstDayOfMonth(calendarMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isInRange = isDateInRange(day);
      const isSelected = isDateSelected(day);
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-100 
            ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
            ${isInRange && !isSelected ? 'bg-blue-100 text-blue-900' : ''}
            ${!isInRange && !isSelected ? 'text-gray-700 hover:text-gray-900' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return (
      <div ref={calendarRef} className="bg-white rounded-lg shadow-lg p-4 border absolute z-10 mt-2">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft size={16} />
          </button>
          <h3 className="text-lg font-semibold">
            {monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
          </h3>
          <button
            onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">
            {selectingStart ? 'Select start date' : 'Select end date'}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectingStart(true)}
              className={`px-3 py-1 rounded text-sm ${selectingStart ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Start
            </button>
            <button
              onClick={() => setSelectingStart(false)}
              className={`px-3 py-1 rounded text-sm ${!selectingStart ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              End
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Handle custom date changes
  const handleStartDateChange = (newDate) => {
    if (newDate && !isNaN(newDate)) {
      setStartDate(newDate);
      setActivePreset(null);
      if (newDate > endDate) {
        setEndDate(newDate);
      }
    }
  };

  const handleEndDateChange = (newDate) => {
    if (newDate && !isNaN(newDate)) {
      setEndDate(newDate);
      setActivePreset(null);
      if (newDate < startDate) {
        setStartDate(newDate);
      }
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="text-blue-600" size={24} />
        <h2 className="text-2xl font-semibold text-gray-900">Smart Date Range Picker</h2>
      </div>

      {/* Preset Buttons */}
      {showPresets && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Quick Select Presets</h3>
            <button
              onClick={() => setShowPresets(false)}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Hide presets
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handlePresetSelect(preset)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                  ${activePreset === preset.value 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                  }`}
                >
                {preset.icon}
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <hr className="my-6 border-gray-200" />

      {/* Show Presets Toggle (when hidden) */}
      {!showPresets && (
        <div className="mb-4">
          <button
            onClick={() => setShowPresets(true)}
            className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
          >
            <Calendar size={14} />
            Show quick presets
          </button>
        </div>
      )}

      {/* Custom Date Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Date Range</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <button
              onClick={() => {
                setShowCalendar(!showCalendar);
                setSelectingStart(true);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            >
              {formatDate(startDate)}
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <button
              onClick={() => {
                setShowCalendar(!showCalendar);
                setSelectingStart(false);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            >
              {formatDate(endDate)}
            </button>
          </div>
          {showCalendar && <CalendarComponent />}
        </div>
      </div>

      {/* Range Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="text-blue-600" size={20} />
          <div>
            <p className="font-medium text-blue-900">
              Selected Range: {formatDate(startDate)} - {formatDate(endDate)}
            </p>
            <p className="text-sm text-blue-700">
              Duration: {rangeDuration} day{rangeDuration !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Time Selection */}
      {showTimeSelector && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-blue-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Time Selection</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="text-sm text-gray-600">
              Current: {selectedTime}
            </div>
          </div>
        </div>
      )}

      {/* Advanced Options */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Advanced Options</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeTime}
              onChange={(e) => setIncludeTime(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Include time in selection</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showPresets}
              onChange={(e) => setShowPresets(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Show quick presets</span>
          </label>
          
          {enableTimezone && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
                <option value="Asia/Shanghai">Shanghai</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Active Preset Indicator */}
      {activePreset && (
        <div className="mt-4 pt-4 border-t">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <Check size={16} />
            Active Preset: {presets.find(p => p.value === activePreset)?.label}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePickerPro;