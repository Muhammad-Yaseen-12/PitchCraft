import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br to-indigo-100 flex items-center justify-center p-4">
      <div className="p-8 flex flex-col items-center space-y-4">
        <FaSpinner className="text-7xl text-blue-600 animate-spin" />
        {/* <h2 className="text-xl font-semibold text-gray-700">Loading...</h2> */}
        {/* <p className="text-gray-500 text-center">Please wait while we process your request</p> */}
      </div>
    </div>
  );
};

export default LoadingSpinner;