'use client';

import { useState, useRef } from 'react';
import { CalendarIcon, PlusCircleIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';

const CircularProgressBar = ({ label, percentage, amountLeft, color }) => {
  const radius = 40; // Radius of the circle
  const strokeWidth = 8; // Width of the stroke
  const normalizedRadius = radius - strokeWidth / 2; // Normalize the radius
  const circumference = normalizedRadius * 2 * Math.PI; // Calculate circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference; // Calculate stroke offset

  return (
    <div className="flex flex-col items-center relative">
      <svg width={radius * 2} height={radius * 2} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke="#e6e6e6" // Light gray background circle
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke={color} // Color based on the passed prop
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`} // Set dash array
          strokeDashoffset={strokeDashoffset} // Set the offset for the progress
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out', // Animation for transition
          }}
        />
      </svg>
      {/* Display percentage in the center */}
      <div 
        className="absolute"
        style={{
          top: '30%', // Adjusted to move higher
          left: '50%', 
          transform: 'translate(-50%, -50%)', // Center the text in the circle
          fontSize: '1.25rem', // Adjust font size as needed
          fontWeight: 'bold',
          color: 'black', // Adjust text color as needed
        }}
      >
        {percentage}%
      </div>
      {/* Text below the progress bar */}
      <p className={`${color} text-xl font-bold`}>{amountLeft}g left</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
};

// Component to display each meal list with a plus button and items
const MealList = ({ title, items, onAdd }) => {
  const router = useRouter(); // Initialize useRouter

  const handleItemClick = (id) => {
    router.push(`/item-overview?id=${id}`); // Redirect to the overview page with the item's ID as a query parameter
  };

  return (
    <div className="mb-4">
    <div className="flex justify-between items-center p-2 border-b">
      <p className="text-lg font-bold">{title}</p>
      <button 
        onClick={onAdd} 
        className="flex items-center p-2 text-blue-500 hover:text-blue-600"
      >
        <PlusCircleIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>

    {/* List of items */}
    <div className="mt-2 space-y-2">
      {items.length === 0 ? (
        <p className="text-gray-500">No items added yet</p>
      ) : (
        items.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-4 p-2 border rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => handleItemClick(item.id)} // Call handleItemClick with the item's ID
          >
            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.kcal} kcal - {item.amount}</p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
  );
};

export default function Home() {
  const router = useRouter(); // Initialize router
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date
  const [showDatePicker, setShowDatePicker] = useState(false); // State to toggle date picker visibility
  const [datePickerPosition, setDatePickerPosition] = useState({ top: 0, left: 0 }); // Position of the date picker
  const agendaButtonRef = useRef(null); // Reference for the agenda button

  const handleAgendaClick = () => {
    // Calculate the position of the button
    const rect = agendaButtonRef.current.getBoundingClientRect();
    setDatePickerPosition({ top: rect.bottom + window.scrollY, left: rect.left + rect.width / 2 }); // Set position below the button
    setShowDatePicker(!showDatePicker); // Toggle date picker on button click
  };

  const handleBarcodeClick = () => {
    router.push('/Dashboard/qr-scanner'); // Redirect to QR scanner page
  };

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date); // Update the selected date
      setShowDatePicker(false); // Hide the date picker
    }
  };

  const handleAddItem = (mealType) => {
    router.push(`/add-item?mealType=${mealType}`); // Redirect to add item page with the meal type as a query param
  };

  return (
    <div>
      <div id='top-part' className="flex justify-between items-center p-4">
        <p style={{ fontSize: '32px' }}>{selectedDate.toLocaleDateString()}</p> {/* Display selected date */}

        <div className="flex space-x-4 ml-auto"> {/* Align buttons to the right */}
          <button 
            onClick={handleAgendaClick} 
            ref={agendaButtonRef} // Attach ref to the agenda button
            className="flex items-center p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            <CalendarIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <button 
            onClick={handleBarcodeClick} 
            className="flex items-center p-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            <QrCodeIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Date Picker Section */}
      {showDatePicker && (
        <div 
          className="absolute z-10" 
          style={{ top: datePickerPosition.top, left: datePickerPosition.left, transform: 'translateX(-50%)' }} // Center the date picker under the button
        >
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline // Show the date picker inline
            className="bg-white border rounded-lg shadow-lg" // Optional styles for visibility
          />
        </div>
      )}

      {/* Mid part with circles for Carbohydrates, Protein, and Fats */}
      <div id='mid-part' className="flex justify-around p-4">
        {/* Circle Component */}
        <CircularProgressBar label="Carbohydrates" percentage={515} amountLeft={375} color="#FF6384" />
        <CircularProgressBar label="Protein" percentage={50} amountLeft={250} color="#36A2EB" />
        <CircularProgressBar label="Fats" percentage={100} amountLeft={125} color="#FFCE56" />
      </div>

      {/* Bottom part with meal type lists */}
      <div id='bottom-part' className="p-4">
        <MealList 
          title="Breakfast" 
          items={[
            { id: 1, image: '/path/to/image1.jpg', name: 'Oats', kcal: 150, amount: '100g' },
            { id: 2, image: '/path/to/image2.jpg', name: 'Banana', kcal: 100, amount: '1 piece' },
          ]}
          onAdd={() => handleAddItem('breakfast')} 
        />
        <MealList 
          title="Snacks After Breakfast" 
          items={[
            { id: 3, image: '/path/to/image3.jpg', name: 'Nuts', kcal: 200, amount: '50g' },
          ]}
          onAdd={() => handleAddItem('snacks-after-breakfast')} 
        />
        <MealList 
          title="Lunch" 
          items={[
            { id: 4, image: '/path/to/image4.jpg', name: 'Grilled Chicken', kcal: 350, amount: '200g' },
          ]}
          onAdd={() => handleAddItem('lunch')} 
        />
        <MealList 
          title="Snacks After Lunch" 
          items={[]}
          onAdd={() => handleAddItem('snacks-after-lunch')} 
        />
        <MealList 
          title="Dinner" 
          items={[
            { id: 5, image: '/path/to/image5.jpg', name: 'Salad', kcal: 150, amount: '150g' },
          ]}
          onAdd={() => handleAddItem('dinner')} 
        />
        <MealList 
          title="Snacks After Dinner" 
          items={[]}
          onAdd={() => handleAddItem('snacks-after-dinner')} 
        />
      </div>
    </div>
  );
}
