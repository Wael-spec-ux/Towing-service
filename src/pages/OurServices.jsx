import { 
  Shield, 
  Clock, 
  MapPin, 
  Users, 
  Award, 
  Phone, 
  CheckCircle,
  TrendingUp,
  Heart,
  Car,
  Truck,
  Star
} from "lucide-react";
import { useEffect } from "react";
import { verifyTokenExistInLocalStorage } from "../components/VerifTokenExist";
function OurServices() {
    useEffect(() => {
      verifyTokenExistInLocalStorage();
    }, []);
    const services = [
    {
      title: "Dépannage 24/7",
      description: "Assistance routière immédiate, jour et nuit",
      icon: <Clock className="w-8 h-8" />
    },
    {
      title: "Remorquage",
      description: "Transport sécurisé de votre véhicule",
      icon: <Truck className="w-8 h-8" />
    },
  ];

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black ">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Nos Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Une gamme complète de services de dépannage pour répondre à tous vos besoins
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {services.map((service, index) => (
              <div 
                key={index} 
                className=" bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                <div className="p-3 bg-blue-500/20 rounded-xl w-fit mb-4">
                  <div className="text-blue-400">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
    
}export default OurServices