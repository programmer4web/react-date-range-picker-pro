# react-date-range-picker-pro

A powerful, customizable React date and time picker component with intelligent presets, interactive calendar, and seamless integration capabilities.

## ✨ Features

- **Smart Presets** - Quick selection buttons (Today, Last 7 days, This month, etc.)
- **Interactive Calendar** - Visual date range selection with click-outside-to-close
- **Time Selection** - Optional time picker with timezone support
- **Highly Customizable** - Custom presets, configurable UI elements
- **Callback Integration** - Real-time data updates via callbacks
- **Responsive Design** - Works seamlessly on all screen sizes
- **Zero Dependencies** - Only requires React and Lucide icons

## 🚀 Quick Start

```jsx
import DateRangePickerPro from 'react-date-range-picker-pro';

function App() {
  const handleDateChange = (data) => {
    console.log('Selected range:', data);
  };

  return (
    <DateRangePickerPro
      onDateRangeChange={handleDateChange}
      showTimeSelector={true}
      enableTimezone={true}
    />
  );
}
```

### CSS Styling

The component styles are automatically injected when you import the component. For **Storybook** or **Server-Side Rendering** setups, you may need to manually import the CSS:

```jsx
import 'react-date-range-picker-pro/dist/index.css';
```

## 📦 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onDateRangeChange` | function | - | Callback for date range changes |
| `onTimeChange` | function | - | Callback for time changes |
| `showTimeSelector` | boolean | true | Show/hide time picker |
| `showPresetsByDefault` | boolean | true | Show presets initially |
| `enableTimezone` | boolean | true | Enable timezone selection |
| `customPresets` | array | null | Custom preset configurations |
| `initialStartDate` | Date | new Date() | Initial start date |
| `initialEndDate` | Date | +7 days | Initial end date |
| `className` | string | "" | Additional CSS classes |

## 🎯 Perfect For

- **Analytics Dashboards** - Filter data by date ranges
- **Booking Systems** - Hotel, event, or appointment scheduling  
- **Report Generation** - Business reporting with date filters
- **Content Management** - Publication date selection
- **E-commerce** - Order date filtering and analysis

## 🛠️ Built With

- React 18+ with Hooks
- Tailwind CSS for styling
- Lucide React for icons
- Modern ES6+ JavaScript

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

MIT License - feel free to use in personal and commercial projects.

---

**Keywords:** react, date-picker, time-picker, calendar, date-range, datetime, react-component, tailwind, responsive, customizable