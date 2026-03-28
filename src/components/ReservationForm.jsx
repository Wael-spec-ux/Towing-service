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
    assignedDriver: "Non assigné"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Service types
  const serviceTypes = [
    { id: "panne", label: "Panne de voiture", icon: <AlertTriangle className="w-5 h-5" /> },
    { id: "transport", label: "Transport de voitures", icon: <Truck className="w-5 h-5" /> }
  ];

  // Problem types for breakdown service
  const problemTypes = [
    "Panne moteur",
    "Pneu crevé",
    "Batterie déchargée",
    "Accident",
    "Panne de carburant",
    "Enfermé dehors",
    "Problème mécanique",
    "Problème électrique",
    "Autre"
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
    if (!formData.carType.trim()) newErrors.carType = "Car type is required";

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
     const response = await fetch('http://localhost:3000/createReservation', {
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
                Demande d'assistance d'urgence
              </h1>
              <p className="text-gray-400">
                Remplissez les champs ci-dessous et nous dépêcherons de l'aide immédiatement.
              </p>
            </div>
            <div className="hidden md:block px-4 py-2 bg-blue-900/30 rounded-full">
              <div className="flex items-center text-blue-400">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="font-semibold">24/7 Réponse</span>
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
                  Informations personnelles
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nom *
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
                      Prenom *
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
                      Numéro de téléphone *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        +216
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 bg-gray-900 border ${errors.phone ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        placeholder=" 56 015 812"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Adresse email *
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
                  Informations sur le véhicule
                </h2>
                
                <div className="space-y-6">
                  {/* Car Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Type de Voiture *
                    </label>
                    <input
                      type="text"
                      name="carType"
                      value={formData.carType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-900 border ${errors.carType ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="Hundai Elantra 2015"
                    />
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
                  Type de service requis
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
                            {service.id === "panne" ? "Assistance dépannage" : "Transport de véhicules"}
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
                        Type de problème *
                      </label>
                      <select
                        name="problemDescription"
                        value={formData.problemDescription}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-900 border ${errors.problemDescription ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      >
                        <option value="">Sélectionnez le problème</option>
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
                        Emplacement actuel du véhicule *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="carLocation"
                          value={formData.carLocation}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 bg-gray-900 border ${errors.carLocation ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                          placeholder="Veuillez saisir l'emplacement exact ou l'adresse"
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
                          Lieu de ramassage *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="transportFrom"
                            value={formData.transportFrom}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-4 py-3 bg-gray-900 border ${errors.transportFrom ? "border-red-500" : "border-gray-700"} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            placeholder="Adresse du point de départ"
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
                            placeholder="Adresse de livraison"
                          />
                        </div>
                        {errors.transportTo && (
                          <p className="mt-1 text-sm text-red-400">{errors.transportTo}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferer temps de livraison *
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
                  Instructions supplémentaires (optionnel)
                </h2>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Exigences particulières, codes d'accès, conditions du véhicule ou informations supplémentaires..."
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
              <h3 className="text-lg font-bold text-white mb-4">Résumé de la demande</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                  <span className="text-gray-400">Type de Service:</span>
                  <span className="text-blue-400 font-semibold">
                    {formData.serviceType === "panne" ? "Assistance dépannage" : "Transport de voitures"}
                  </span>
                </div>
                
                {formData.carType && (
                  <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                    <span className="text-gray-400">Véhicule:</span>
                    <span className="text-white font-medium">{formData.carType}</span>
                  </div>
                )}
                
                {formData.serviceType === "panne" && formData.problemDescription && (
                  <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                    <span className="text-gray-400">Problème:</span>
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
                  <div className="text-sm text-gray-400 mb-2">Réponse estimée :</div>
                  <div className="text-green-400 font-bold">15-30 minutes</div>
                </div>
              </div>
            </div>

            {/* Emergency Info */}
            <div className="bg-gradient-to-br from-blue-900/20 to-gray-900/20 rounded-2xl border border-blue-700/50 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                Instructions d'urgence
              </h3>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-3"></div>
                  <span className="text-gray-300">Restez près de votre véhicule </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-3"></div>
                  <span className="text-gray-300">Allumez les feux de détresse</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-3"></div>
                  <span className="text-gray-300">Préparez les documents</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-3"></div>
                  <span className="text-gray-300">Nous vous appellerons pour confirmer les détails.</span>
                </li>
              </ul>
              
              <div className="mt-6 p-3 bg-blue-900/30 rounded-lg">
                <div className="text-blue-300 font-semibold mb-1">Ligne d'assistance d'urgence</div>
                <div className="text-2xl font-bold text-white">+216 97 354 009</div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Conseils rapides</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                • Fournissez une localisation précise pour un service plus rapide<br/>
                • Indiquez les points de repère si l'adresse est imprécise.<br/>
                • Préparez l'immatriculation du véhicule<br/>
                • Retirez les objets de valeur du véhicule<br/>
                • Notre équipe portera des badges SOSCars.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;