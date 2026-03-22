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
function ContactUs() {
    useEffect(() => {
      verifyTokenExistInLocalStorage();
    }, []);
    return (
        <div>
                  {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-900/30 to-gray-900/30 rounded-3xl border border-blue-700/50 p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Besoin d'Assistance ?
              </h2>
              
              <p className="text-gray-300 mb-8 text-lg">
                Notre équipe est disponible 24h/24 pour vous aider. 
                Appelez-nous pour une intervention rapide à Ben Arous et dans toute la Tunisie.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center space-x-3 bg-gray-800/50 px-6 py-4 rounded-xl">
                  <Phone className="w-6 h-6 text-blue-400" />
                  <div className="text-left">
                    <div className="text-sm text-gray-400">Appel d'urgence</div>
                    <div className="text-2xl font-bold text-white">71 234 567</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-gray-800/50 px-6 py-4 rounded-xl">
                  <MapPin className="w-6 h-6 text-blue-400" />
                  <div className="text-left">
                    <div className="text-sm text-gray-400">Notre siège</div>
                    <div className="font-medium text-white">Ben Arous, Tunisie</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-gray-400 text-sm">
                <p>© 2010-2024 Top Dépannage. Tous droits réservés.</p>
                <p className="mt-2">Agrément professionnel N° 12345/MP/2020</p>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    )
    
} export default ContactUs