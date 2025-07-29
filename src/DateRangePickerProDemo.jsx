import React, { useState } from 'react';
import { Calendar, Clock, BarChart3, Settings } from 'lucide-react';
import DateRangePickerPro from './DateRangePickerPro';

const Demo = () => {
  const [dateRangeData, setDateRangeData] = useState(null);
  const [timeData, setTimeData] = useState('12:00');
  const [showSecondPicker, setShowSecondPicker] = useState(false);

  // Handle date range changes from the component
  const handleDateRangeChange = (data) => {
    setDateRangeData(data);
    console.log('Date range changed:', data);
  };

  // Handle time changes from the component
  const handleTimeChange = (time) => {
    setTimeData(time);
    console.log('Time changed:', time);
  };

  // Custom presets for the second picker
  const customPresets = [
    {
      label: 'Last Quarter',
      value: 'lastquarter',
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
      endDate: new Date(),
      icon: <BarChart3 size={16} />
    },
    {
      label: 'This Year',
      value: 'thisyear',
      startDate: new Date(new Date().getFullYear(), 0, 1),
      endDate: new Date(),
      icon: <Calendar size={16} />
    },
    {
      label: 'Next Quarter',
      value: 'nextquarter',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      icon: <BarChart3 size={16} />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Advanced Date & Time Component Demo
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          This demo showcases the Advanced Date & Time Component with different configurations, 
          custom presets, and real-time data binding. The component is fully customizable and 
          can be easily integrated into any React application.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Component Demo */}
        <div className="xl:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Primary Date Range Picker</h2>
            <p className="text-gray-600">Full-featured component with all options enabled</p>
          </div>
          
          <DateRangePickerPro
            onDateRangeChange={handleDateRangeChange}
            onTimeChange={handleTimeChange}
            showTimeSelector={true}
            showPresetsByDefault={true}
            enableTimezone={true}
            className="mb-8"
          />

          {/* Second Component Example */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Custom Configuration</h2>
                <p className="text-gray-600">Component with custom presets and minimal UI</p>
              </div>
              <button
                onClick={() => setShowSecondPicker(!showSecondPicker)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showSecondPicker ? 'Hide' : 'Show'} Second Picker
              </button>
            </div>

            {showSecondPicker && (
              <DateRangePickerPro
                initialStartDate={new Date(new Date().setMonth(new Date().getMonth() - 1))}
                initialEndDate={new Date()}
                customPresets={customPresets}
                showTimeSelector={false}
                showPresetsByDefault={true}
                enableTimezone={false}
                className="border-2 border-blue-200"
              />
            )}
          </div>
        </div>

        {/* Side Panel - Data Display */}
        <div className="space-y-6">
          {/* Real-time Data Display */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="text-green-600" size={24} />
              <h3 className="text-xl font-semibold text-gray-900">Live Data</h3>
            </div>
            
            {dateRangeData && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Start Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {dateRangeData.startDate.toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">End Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {dateRangeData.endDate.toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {Math.ceil((dateRangeData.endDate - dateRangeData.startDate) / (1000 * 60 * 60 * 24)) + 1} days
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Timezone</p>
                  <p className="text-lg font-semibold text-gray-900">{dateRangeData.timezone}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Include Time</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {dateRangeData.includeTime ? 'Yes' : 'No'}
                  </p>
                </div>
                
                {dateRangeData.includeTime && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Selected Time</p>
                    <p className="text-lg font-semibold text-gray-900">{timeData}</p>
                  </div>
                )}
              </div>
            )}
            
            {!dateRangeData && (
              <p className="text-gray-500 italic">
                Interact with the date picker to see live data updates
              </p>
            )}
          </div>

          {/* Component Features */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Component Features</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Smart preset buttons</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Interactive calendar</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Time selection</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Timezone support</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Click-outside to close</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Custom presets</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Callback functions</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Configurable options</span>
              </div>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Statistics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-xs text-gray-500">Components</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-xs text-gray-500">Presets</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">9</div>
                <div className="text-xs text-gray-500">Timezones</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">100%</div>
                <div className="text-xs text-gray-500">Customizable</div>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono">
              <div className="text-gray-600 mb-2">// Basic Usage</div>
              <div className="text-blue-600">import</div>
              <div className="ml-2 text-gray-800">DateRangePickerPro</div>
              <div className="text-blue-600 inline"> from</div>
              <div className="text-green-600 inline"> './DateRangePickerPro'</div>
              
              <div className="mt-3 text-gray-600">// In your component</div>
              <div className="text-red-600">&lt;DateRangePickerPro</div>
              <div className="ml-4 text-purple-600">onDateRangeChange=</div>
              <div className="text-gray-800 inline">{'{handleChange}'}</div>
              <div className="ml-4 text-purple-600">showTimeSelector=</div>
              <div className="text-blue-600 inline">{'{true}'}</div>
              <div className="text-red-600">/&gt;</div>
            </div>
          </div>

          {/* Configuration Options */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Props</h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-blue-600">initialStartDate</span>
                <span className="text-gray-500 ml-2">- Initial start date</span>
              </div>
              
              <div>
                <span className="font-medium text-blue-600">initialEndDate</span>
                <span className="text-gray-500 ml-2">- Initial end date</span>
              </div>
              
              <div>
                <span className="font-medium text-blue-600">onDateRangeChange</span>
                <span className="text-gray-500 ml-2">- Callback for date changes</span>
              </div>
              
              <div>
                <span className="font-medium text-blue-600">onTimeChange</span>
                <span className="text-gray-500 ml-2">- Callback for time changes</span>
              </div>
              
              <div>
                <span className="font-medium text-blue-600">showTimeSelector</span>
                <span className="text-gray-500 ml-2">- Show/hide time picker</span>
              </div>
              
              <div>
                <span className="font-medium text-blue-600">showPresetsByDefault</span>
                <span className="text-gray-500 ml-2">- Show presets initially</span>
              </div>
              
              <div>
                <span className="font-medium text-blue-600">enableTimezone</span>
                <span className="text-gray-500 ml-2">- Enable timezone selection</span>
              </div>
              
              <div>
                <span className="font-medium text-blue-600">customPresets</span>
                <span className="text-gray-500 ml-2">- Custom preset array</span>
              </div>
              
              <div>
                <span className="font-medium text-blue-600">className</span>
                <span className="text-gray-500 ml-2">- Additional CSS classes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Integration Examples */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Integration Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Analytics Dashboard */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="text-blue-600" size={20} />
              <h3 className="font-semibold text-gray-900">Analytics Dashboard</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Perfect for filtering analytics data by date ranges with quick preset options.
            </p>
            <div className="bg-gray-50 rounded p-3 text-xs font-mono">
              <div className="text-gray-600">// Usage in analytics</div>
              <div>&lt;DateRangePickerPro</div>
              <div className="ml-2 text-purple-600">customPresets=</div>
              <div className="text-gray-800 inline">{'{analyticsPresets}'}</div>
              <div className="ml-2 text-purple-600">onDateRangeChange=</div>
              <div className="text-gray-800 inline">{'{updateCharts}'}</div>
              <div>/&gt;</div>
            </div>
          </div>

          {/* Booking System */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="text-green-600" size={20} />
              <h3 className="font-semibold text-gray-900">Booking System</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Ideal for hotel bookings, event scheduling, or any reservation system.
            </p>
            <div className="bg-gray-50 rounded p-3 text-xs font-mono">
              <div className="text-gray-600">// Booking integration</div>
              <div>&lt;DateRangePickerPro</div>
              <div className="ml-2 text-purple-600">showTimeSelector=</div>
              <div className="text-blue-600 inline">{'{true}'}</div>
              <div className="ml-2 text-purple-600">enableTimezone=</div>
              <div className="text-blue-600 inline">{'{true}'}</div>
              <div>/&gt;</div>
            </div>
          </div>

          {/* Report Generation */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Settings className="text-purple-600" size={20} />
              <h3 className="font-semibold text-gray-900">Report Generation</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Generate reports for specific date ranges with business-friendly presets.
            </p>
            <div className="bg-gray-50 rounded p-3 text-xs font-mono">
              <div className="text-gray-600">// Report filtering</div>
              <div>&lt;DateRangePickerPro</div>
              <div className="ml-2 text-purple-600">customPresets=</div>
              <div className="text-gray-800 inline">{'{businessPresets}'}</div>
              <div className="ml-2 text-purple-600">showTimeSelector=</div>
              <div className="text-blue-600 inline">{'{false}'}</div>
              <div>/&gt;</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Advanced Date & Time Component Demo - Built with React and Tailwind CSS</p>
        <p className="mt-1">Features: Smart presets, Interactive calendar, Time selection, Timezone support, Custom callbacks</p>
      </div>
    </div>
  );
};

export default Demo;