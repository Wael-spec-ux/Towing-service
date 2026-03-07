import React, { useState } from "react";
import { useNavigate } from "react-router";
import { showErrorToast } from "../utils/toast";
import { showToast } from "../utils/toast";
import { 
  ArrowLeft, 
  Car, 
  MapPin, 
  Calendar,
  AlertTriangle,
  Truck,
  CheckCircle,
  XCircle
} from "lucide-react";

const ReservationForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    carType: "",
    serviceType: "panne", // "panne" or "transport"
    problemDescription: "",
    carLocation: "",
    transportFrom: "",
    transportTo: "",
    transportTime: "",
    specialInstructions: "",
    status: "En attente", 
    assignedDriver: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Car types
  const carTypes = [
    "Sedan",
    "SUV",
    "Truck",
    "Van",
    "Motorcycle",
    "Sports Car",
    "Electric Vehicle",
    "Luxury Car",
    "Other"
  ];

  // Service types
  const serviceTypes = [
    { id: "panne", label: "Car Breakdown", icon: <AlertTriangle className="w-5 h-5" /> },
    { id: "transport", label: "Car Transport", icon: <Truck className="w-5 h-5" /> }
  ];

  // Problem types for breakdown service
  const problemTypes = [
    "Engine Failure",
    "Flat Tire",
    "Battery Dead",
    "Accident",
    "Out of Fuel",
    "Locked Out",
    "Mechanical Issue",
    "Electrical Problem",
    "Other"
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle service type selection
  const handleServiceTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      serviceType: type,
      // Clear transport fields if switching to panne
      ...(type === "panne" && { 
        transportFrom: "", 
        transportTo: "", 
        transportTime: "" 
      }),
      // Clear panne fields if switching to transport
      ...(type === "transport" && { 
        problemDescription: "", 
        carLocation: "" 
      })
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Basic info validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.carType) newErrors.carType = "Car type is required";

    // Service-specific validation
    if (formData.serviceType === "panne") {
      if (!formData.problemDescription) newErrors.problemDescription = "Please describe the problem";
      if (!formData.carLocation) newErrors.carLocation = "Current car location is required";
    } else {
      if (!formData.transportFrom) newErrors.transportFrom = "Pickup location is required";
      if (!formData.transportTo) newErrors.transportTo = "Destination is required";
      if (!formData.transportTime) newErrors.transportTime = "Preferred delivery time is required";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
       try {
    setIsSubmitting(true);
     const response = await fetch('http://localhost:3000/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    showToast('🎉 Reservation submitted successfully!');
    navigate('/');
  } catch (error) {
    showErrorToast(error.message || 'Failed to submit reservation. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
    } else {
      setErrors(validationErrors);
      // Scroll to first error
      const firstError = Object.keys(validationErrors)[0];
      document.getElementsByName(firstError)[0]?.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      });
    }
  };

  // Handle cancel
  const handleCancel = () => {
      navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Emergency Assistance Request
              </h1>
              <p className="text-gray-400">
                Fill in the details below and we'll dispatch help immediately
              </p>
            </div>
            <div className="hidden md:block px-4 py-2 bg-blue-900/30 rounded-full">
              <div className="flex items-center text-blue-400">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="font-semibold">24/7 Response</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Information Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-900 border ${errors.firstName ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-900 border ${errors.lastName ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        +1
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 bg-gray-900 border ${errors.phone ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-900 border ${errors.email ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Vehicle Information Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
                  Vehicle Information
                </h2>
                
                <div className="space-y-6">
                  {/* Car Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Car Type *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {carTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleChange({ target: { name: "carType", value: type } })}
                          className={`px-4 py-3 rounded-lg border transition-all ${formData.carType === type 
                            ? "bg-blue-600 border-blue-500 text-white" 
                            : "bg-gray-900 border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-400"
                          }`}
                        >
                          <Car className="w-5 h-5 inline-block mr-2" />
                          {type}
                        </button>
                      ))}
                    </div>
                    {errors.carType && (
                      <p className="mt-1 text-sm text-red-400">{errors.carType}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Service Type Selection */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
                  Type of Service Needed
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceTypeChange(service.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${formData.serviceType === service.id 
                        ? "bg-blue-900/30 border-blue-500 text-blue-400" 
                        : "bg-gray-900 border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-400"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${formData.serviceType === service.id ? "bg-blue-500/20" : "bg-gray-800"}`}>
                          {service.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{service.label}</div>
                          <div className="text-sm opacity-75">
                            {service.id === "panne" ? "Breakdown assistance" : "Vehicle transport"}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Conditional Fields Based on Service Type */}
                {formData.serviceType === "panne" ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Problem Type *
                      </label>
                      <select
                        name="problemDescription"
                        value={formData.problemDescription}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-900 border ${errors.problemDescription ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      >
                        <option value="">Select the problem</option>
                        {problemTypes.map((problem) => (
                          <option key={problem} value={problem}>{problem}</option>
                        ))}
                      </select>
                      {errors.problemDescription && (
                        <p className="mt-1 text-sm text-red-400">{errors.problemDescription}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Car Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="carLocation"
                          value={formData.carLocation}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 bg-gray-900 border ${errors.carLocation ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                          placeholder="Enter exact location or address"
                        />
                      </div>
                      {errors.carLocation && (
                        <p className="mt-1 text-sm text-red-400">{errors.carLocation}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Pickup Location *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="transportFrom"
                            value={formData.transportFrom}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-4 py-3 bg-gray-900 border ${errors.transportFrom ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            placeholder="Starting point address"
                          />
                        </div>
                        {errors.transportFrom && (
                          <p className="mt-1 text-sm text-red-400">{errors.transportFrom}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Destination *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="transportTo"
                            value={formData.transportTo}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-4 py-3 bg-gray-900 border ${errors.transportTo ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            placeholder="Delivery address"
                          />
                        </div>
                        {errors.transportTo && (
                          <p className="mt-1 text-sm text-red-400">{errors.transportTo}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Delivery Time *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="datetime-local"
                          name="transportTime"
                          value={formData.transportTime}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 bg-gray-900 border ${errors.transportTime ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        />
                      </div>
                      {errors.transportTime && (
                        <p className="mt-1 text-sm text-red-400">{errors.transportTime}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Instructions */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
                  Additional Instructions (Optional)
                </h2>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Any special requirements, access codes, vehicle conditions, or additional information..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-blue-500/20 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6 mr-3" />
                      Confirm Reservation
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-400 transition-all duration-300 flex items-center justify-center"
                >
                  <XCircle className="w-6 h-6 mr-3" />
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar - Summary & Info */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Request Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                  <span className="text-gray-400">Service Type:</span>
                  <span className="text-blue-400 font-semibold">
                    {formData.serviceType === "panne" ? "Breakdown Assistance" : "Car Transport"}
                  </span>
                </div>
                
                {formData.carType && (
                  <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                    <span className="text-gray-400">Vehicle:</span>
                    <span className="text-white font-medium">{formData.carType}</span>
                  </div>
                )}
                
                {formData.serviceType === "panne" && formData.problemDescription && (
                  <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                    <span className="text-gray-400">Problem:</span>
                    <span className="text-white font-medium">{formData.problemDescription}</span>
                  </div>
                )}
                
                {formData.serviceType === "transport" && formData.transportFrom && (
                  <div className="pb-2 border-b border-gray-700">
                    <div className="text-gray-400 mb-1">Route:</div>
                    <div className="text-white font-medium">
                      {formData.transportFrom} → {formData.transportTo}
                    </div>
                  </div>
                )}
                
                <div className="pt-2">
                  <div className="text-sm text-gray-400 mb-2">Estimated Response:</div>
                  <div className="text-green-400 font-bold">15-30 minutes</div>
                </div>
              </div>
            </div>

            {/* Emergency Info */}
            <div className="bg-gradient-to-br from-blue-900/20 to-gray-900/20 rounded-2xl border border-blue-700/50 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                Emergency Instructions
              </h3>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-3"></div>
                  <span className="text-gray-300">Stay with your vehicle if safe</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-3"></div>
                  <span className="text-gray-300">Turn on hazard lights</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-3"></div>
                  <span className="text-gray-300">Keep documents ready</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-3"></div>
                  <span className="text-gray-300">We'll call to confirm details</span>
                </li>
              </ul>
              
              <div className="mt-6 p-3 bg-blue-900/30 rounded-lg">
                <div className="text-blue-300 font-semibold mb-1">Emergency Hotline</div>
                <div className="text-2xl font-bold text-white">1-800-SOS-CARS</div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Tips</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                • Provide accurate location for faster service<br/>
                • Include landmarks if address is unclear<br/>
                • Have vehicle registration ready<br/>
                • Remove valuables from the vehicle<br/>
                • Our team will wear SOSCars identification
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;