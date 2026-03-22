import React from "react";
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
const AboutPage = () => {
    useEffect(() => {
      verifyTokenExistInLocalStorage();
    }, []);
  const teamMembers = [
    {
      name: "Mohamed Ali",
      role: "Fondateur & CEO",
      experience: "15+ années d'expérience",
      bio: "Expert en dépannage routier avec une passion pour l'assistance automobile"
    },
    {
      name: "Sami Ben Ammar",
      role: "Directeur des Opérations",
      experience: "12 années d'expérience",
      bio: "Spécialiste en logistique et coordination d'urgence"
    },
    {
      name: "Fatma Bouazizi",
      role: "Responsable Clientèle",
      experience: "8 années d'expérience",
      bio: "Dédiée à l'excellence du service client et à la satisfaction"
    },
    {
      name: "Karim Trabelsi",
      role: "Chef Mécanicien",
      experience: "20+ années d'expérience",
      bio: "Expert technique avec certification internationale"
    }
  ];

  
  const stats = [
    { number: "10,000+", label: "Clients satisfaits" },
    { number: "24/7", label: "Disponibilité" },
    { number: "15min", label: "Temps moyen d'intervention" },
    { number: "98%", label: "Taux de satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-black/50 z-0"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Leader en dépannage à Ben Arous
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Votre Partenaire de Confiance
              <span className="block text-blue-400">Top Dépannage</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
              Depuis 2010, Top Dépannage s'engage à fournir des services de dépannage automobile 
              rapides, fiables et professionnels à Ben Arous et ses environs. Notre mission est 
              de vous remettre sur la route en toute sécurité, 24 heures sur 24, 7 jours sur 7.
            </p>
            
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-blue-400" />
              <span className="text-lg">Basé à Ben Arous - Service dans toute la Tunisie</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
                Notre Histoire
              </h2>
              
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  Fondée en 2010 par Mohamed Ali, Top Dépannage est née d'une simple vision : 
                  fournir un service de dépannage automobile digne de confiance pour les 
                  résidents de Ben Arous.
                </p>
                
                <p className="text-gray-300 leading-relaxed">
                  Ce qui a commencé comme un seul camion de dépannage est rapidement devenu 
                  une flotte moderne équipée des dernières technologies. Aujourd'hui, nous 
                  sommes fiers d'être le service de dépannage le plus recommandé dans la région.
                </p>
                
                <div className="bg-gradient-to-r from-blue-900/20 to-gray-900/20 rounded-2xl border border-blue-700/50 p-6 mt-8">
                  <div className="flex items-start space-x-4">
                    <TrendingUp className="w-8 h-8 text-blue-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Notre Mission</h4>
                      <p className="text-gray-300">
                        Offrir des solutions de dépannage rapides, sécurisées et abordables, 
                        tout en maintenant les plus hauts standards de professionnalisme et 
                        de service client.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 p-8">
              <h3 className="text-2xl font-bold mb-6">Pourquoi Nous Choisir</h3>
              
              <div className="space-y-6">
                {[
                  "Intervention rapide sous 30 minutes maximum",
                  "Équipement moderne et professionnel",
                  "Prix transparents sans surprise",
                  "Personnel certifié et expérimenté",
                  "Assistance 24h/24 et 7j/7",
                  "Couverture nationale"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-blue-900/20 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Heart className="w-6 h-6 text-red-400" />
                  <div>
                    <div className="font-semibold">Engagement Communautaire</div>
                    <div className="text-sm text-gray-400">
                      Soutien actif aux initiatives locales de Ben Arous
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Des professionnels expérimentés dédiés à votre sécurité et satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 text-center hover:border-blue-500 transition-all duration-300"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <div className="text-blue-400 font-medium mb-2">{member.role}</div>
                <div className="text-sm text-gray-400 mb-3">{member.experience}</div>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Nos Valeurs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900/30 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Fiabilité</h3>
                <p className="text-gray-400">
                  Nous honorons nos engagements et maintenons les plus hauts standards 
                  de service à chaque intervention.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900/30 rounded-full mb-4">
                  <Award className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="text-gray-400">
                  Formation continue de notre équipe et investissement dans des équipements 
                  de pointe pour un service optimal.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900/30 rounded-full mb-4">
                  <Heart className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Empathie</h3>
                <p className="text-gray-400">
                  Nous comprenons le stress d'une panne et nous nous engageons à vous 
                  fournir un service compassionnel et rassurant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;