import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Calendar, Hotel, UtensilsCrossed, Bike, Sunrise, Sunset, Waves, Mountain, Palmtree, Sparkles, ChevronRight, Coffee, Leaf, Flame, CheckSquare, Square, ArrowLeft, Plane, Flag, Zap, Camera, Shield, Battery, Eye, Footprints, ExternalLink, AlertCircle, Map as MapIcon, Navigation } from 'lucide-react';

const TravelCommandCenter = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [highlightedLocation, setHighlightedLocation] = useState(null);
  const [mapMode, setMapMode] = useState('aesthetic'); // 'aesthetic' | 'gps'
  const [baliChecklist, setBaliChecklist] = useState({
    passports: false,
    wallet: false,
    drone: false,
    gopro: false,
    sunscreen: false
  });
  const [f1Checklist, setF1Checklist] = useState({
    tickets: false,
    earplugs: false,
    powerbank: false,
    binoculars: false,
    shoes: false
  });

  // Bali locations with coordinates
  const baliLocations = {
    airport: { x: 520, y: 580, name: 'Ngurah Rai Airport' },
    tanahLot: { x: 380, y: 480, name: 'Tanah Lot Temple' },
    ubud: { x: 500, y: 380, name: 'Ubud' },
    tegenungan: { x: 520, y: 420, name: 'Tegenungan Waterfall' },
    kintamani: { x: 550, y: 250, name: 'Kintamani Volcano' },
    tegalalang: { x: 480, y: 340, name: 'Tegalalang Rice Terrace' },
    padangBai: { x: 680, y: 450, name: 'Padang Bai' },
    giliT: { x: 800, y: 350, name: 'Gili Trawangan' },
    kuta: { x: 480, y: 560, name: 'Kuta' },
    tanjungBenoa: { x: 540, y: 580, name: 'Tanjung Benoa' },
    uluwatu: { x: 420, y: 650, name: 'Uluwatu Temple' },
    nusaPenida: { x: 650, y: 700, name: 'Nusa Penida' },
    seminyak: { x: 460, y: 520, name: 'Seminyak' }
  };

  // Suzuka circuit zones (simplified coordinates)
  const suzukaLocations = {
    mainStand: { x: 500, y: 400, name: 'V1-1 Main Stand' },
    sCurves: { x: 600, y: 300, name: 'S-Curves' },
    hairpin: { x: 700, y: 500, name: 'Hairpin' },
    spoon: { x: 400, y: 600, name: 'Spoon Curve' },
    '130r': { x: 300, y: 500, name: '130R' },
    chicane: { x: 400, y: 350, name: 'Chicane' },
    pitLane: { x: 500, y: 450, name: 'Pit Lane' },
    hotel: { x: 200, y: 200, name: 'Gamagori' },
    nagoya: { x: 350, y: 250, name: 'Nagoya' }
  };

  const baliItinerary = [
    {
      day: 1,
      date: 'May 2',
      title: 'Arrival & First Sunset',
      activities: [
        { 
          name: 'Arrival at Ngurah Rai', 
          time: '10:20 AM', 
          icon: Sunrise, 
          location: 'airport', 
          maps: 'Ngurah+Rai+Airport+Bali',
          gps: { lat: -8.7467, lng: 115.1671 },
          aesthetic: { top: '62%', left: '54%' }
        },
        { 
          name: 'Tanah Lot Temple (Sunset)', 
          time: '5:30 PM', 
          icon: Sunset, 
          location: 'tanahLot', 
          maps: 'Tanah+Lot+Temple+Bali',
          gps: { lat: -8.6211, lng: 115.0869 },
          aesthetic: { top: '52%', left: '38%' }
        },
        { 
          name: 'Check-in at Ubud', 
          time: '8:00 PM', 
          icon: Hotel, 
          location: 'ubud', 
          maps: 'Ubud+Bali',
          gps: { lat: -8.5069, lng: 115.2625 },
          aesthetic: { top: '45%', left: '52%' }
        }
      ],
      route: ['airport', 'tanahLot', 'ubud'],
      color: '#06b6d4'
    },
    {
      day: 2,
      date: 'May 3',
      title: 'Ubud Jungle Loop',
      activities: [
        { 
          name: 'Tegenungan Waterfall', 
          time: '8:00 AM', 
          icon: Waves, 
          location: 'tegenungan', 
          maps: 'Tegenungan+Waterfall+Bali',
          gps: { lat: -8.5894, lng: 115.2877 },
          aesthetic: { top: '48%', left: '55%' }
        },
        { 
          name: 'Kintamani Volcano', 
          time: '11:00 AM', 
          icon: Mountain, 
          location: 'kintamani', 
          maps: 'Kintamani+Volcano+Bali',
          gps: { lat: -8.2422, lng: 115.3742 },
          aesthetic: { top: '28%', left: '58%' }
        },
        { 
          name: 'Tegalalang Rice Terrace & Swing', 
          time: '2:00 PM', 
          icon: Palmtree, 
          location: 'tegalalang', 
          maps: 'Tegalalang+Rice+Terrace+Bali',
          gps: { lat: -8.4359, lng: 115.2774 },
          aesthetic: { top: '38%', left: '50%' }
        },
        { 
          name: 'Ubud Market', 
          time: '5:00 PM', 
          icon: Coffee, 
          location: 'ubud', 
          maps: 'Ubud+Market+Bali',
          gps: { lat: -8.5069, lng: 115.2625 },
          aesthetic: { top: '45%', left: '52%' }
        }
      ],
      route: ['ubud', 'tegenungan', 'kintamani', 'tegalalang', 'ubud'],
      color: '#10b981'
    },
    {
      day: 3,
      date: 'May 4',
      title: 'Island Hopping to Gili',
      activities: [
        { 
          name: 'Transfer to Padang Bai', 
          time: '7:00 AM', 
          icon: Bike, 
          location: 'padangBai', 
          maps: 'Padang+Bai+Port+Bali',
          gps: { lat: -8.5375, lng: 115.5092 },
          aesthetic: { top: '46%', left: '72%' }
        },
        { 
          name: 'Fast Boat to Gili Trawangan', 
          time: '9:30 AM', 
          icon: Waves, 
          location: 'giliT', 
          maps: 'Gili+Trawangan+Indonesia',
          gps: { lat: -8.3500, lng: 116.0333 },
          aesthetic: { top: '30%', left: '85%' }
        }
      ],
      route: ['ubud', 'padangBai', 'giliT'],
      color: '#06b6d4'
    },
    {
      day: 4,
      date: 'May 5',
      title: 'ATV Adventure',
      activities: [
        { 
          name: 'Return Boat to Bali', 
          time: '9:00 AM', 
          icon: Waves, 
          location: 'padangBai', 
          maps: 'Padang+Bai+Port+Bali',
          gps: { lat: -8.5375, lng: 115.5092 },
          aesthetic: { top: '46%', left: '72%' }
        },
        { 
          name: 'ATV Tandem Mud Ride', 
          time: '2:00 PM', 
          icon: Bike, 
          location: 'ubud', 
          maps: 'ATV+Ride+Ubud+Bali',
          gps: { lat: -8.5069, lng: 115.2625 },
          aesthetic: { top: '45%', left: '52%' }
        },
        { 
          name: 'Check-in at Kuta', 
          time: '6:00 PM', 
          icon: Hotel, 
          location: 'kuta', 
          maps: 'Kuta+Bali',
          gps: { lat: -8.7184, lng: 115.1689 },
          aesthetic: { top: '60%', left: '50%' }
        }
      ],
      route: ['giliT', 'padangBai', 'ubud', 'kuta'],
      color: '#f97316'
    },
    {
      day: 5,
      date: 'May 6',
      title: 'Watersports & Culture',
      activities: [
        { 
          name: 'Tanjung Benoa Watersports', 
          time: '9:00 AM', 
          icon: Waves, 
          location: 'tanjungBenoa', 
          maps: 'Tanjung+Benoa+Watersports+Bali',
          gps: { lat: -8.7645, lng: 115.2278 },
          aesthetic: { top: '63%', left: '52%' }
        },
        { 
          name: 'Uluwatu Temple & Kecak Dance', 
          time: '5:00 PM', 
          icon: Flame, 
          location: 'uluwatu', 
          maps: 'Uluwatu+Temple+Bali',
          gps: { lat: -8.8290, lng: 115.0848 },
          aesthetic: { top: '72%', left: '42%' }
        }
      ],
      route: ['kuta', 'tanjungBenoa', 'uluwatu', 'kuta'],
      color: '#f97316'
    },
    {
      day: 6,
      date: 'May 7',
      title: 'West Nusa Penida Tour',
      activities: [
        { 
          name: 'Kelingking T-Rex Beach', 
          time: '7:00 AM', 
          icon: Mountain, 
          location: 'nusaPenida', 
          maps: 'Kelingking+Beach+Nusa+Penida',
          gps: { lat: -8.7574, lng: 115.4398 },
          aesthetic: { top: '76%', left: '68%' }
        },
        { 
          name: 'Broken Beach', 
          time: '10:00 AM', 
          icon: Waves, 
          location: 'nusaPenida', 
          maps: 'Broken+Beach+Nusa+Penida',
          gps: { lat: -8.7524, lng: 115.4252 },
          aesthetic: { top: '75%', left: '66%' }
        },
        { 
          name: "Angel's Billabong", 
          time: '11:30 AM', 
          icon: Sparkles, 
          location: 'nusaPenida', 
          maps: 'Angels+Billabong+Nusa+Penida',
          gps: { lat: -8.7519, lng: 115.4246 },
          aesthetic: { top: '75%', left: '66%' }
        }
      ],
      route: ['kuta', 'nusaPenida', 'kuta'],
      color: '#10b981'
    },
    {
      day: 7,
      date: 'May 8',
      title: 'Departure Day',
      activities: [
        { 
          name: 'Departure from Ngurah Rai', 
          time: '11:20 AM', 
          icon: Sunset, 
          location: 'airport', 
          maps: 'Ngurah+Rai+Airport+Bali',
          gps: { lat: -8.7467, lng: 115.1671 },
          aesthetic: { top: '62%', left: '54%' }
        }
      ],
      route: ['kuta', 'airport'],
      color: '#64748b'
    }
  ];

  const suzukaItinerary = [
    {
      day: 1,
      date: 'March 27',
      title: 'Practice Day - Aerodynamics & Transit',
      activities: [
        { name: 'Depart Kikugawa Stn (JR Tokaido)', time: '06:30 AM', icon: Zap, location: 'hotel', maps: 'Kikugawa+Station', gps: { lat: 34.7267, lng: 138.0842 }, aesthetic: { top: '85%', left: '90%' } },
        { name: 'Arrive Kakegawa Stn (Transfer)', time: '06:50 AM', icon: Zap, location: 'nagoya', maps: 'Kakegawa+Station', gps: { lat: 34.7710, lng: 138.0140 }, aesthetic: { top: '80%', left: '80%' } },
        { name: 'Shinkansen Kodama to Nagoya', time: '07:00 AM', icon: Zap, location: 'nagoya', maps: 'Nagoya+Station', gps: { lat: 35.1706, lng: 136.8816 }, aesthetic: { top: '56%', left: '60%' } },
        { name: 'Arrive Nagoya Stn', time: '07:50 AM', icon: Coffee, location: 'nagoya', maps: 'Nagoya+Station', gps: { lat: 35.1706, lng: 136.8816 }, aesthetic: { top: '50%', left: '50%' } },
        { name: 'Kintetsu Limited Express', time: '08:00 AM', icon: Zap, location: 'nagoya', maps: 'Nagoya+Station', gps: { lat: 35.1706, lng: 136.8816 }, aesthetic: { top: '55%', left: '42%' } },
        { name: 'Arrive Shiroko Stn → Circuit Shuttle', time: '08:40 AM', icon: Zap, location: 'mainStand', maps: 'Shiroko+Station', gps: { lat: 34.8779, lng: 136.5821 }, aesthetic: { top: '60%', left: '36%' } },
        { name: 'FP1 at S-Curves (Aero Load Analysis)', time: '11:30 AM', icon: Flag, location: 'sCurves', maps: 'Suzuka+Circuit+S+Curves', gps: { lat: 34.8431, lng: 136.5330 }, aesthetic: { top: '68%', left: '10%' } },
        { name: 'Honda Racing Gallery Visit', time: '02:00 PM', icon: Camera, location: 'mainStand', maps: 'Suzuka+Circuit+Honda+Gallery', gps: { lat: 34.8431, lng: 136.5330 }, aesthetic: { top: '75%', left: '12%' } },
        { name: 'FP2 at Hairpin (Traction Control)', time: '03:00 PM', icon: Flag, location: 'hairpin', maps: 'Suzuka+Circuit+Hairpin', gps: { lat: 34.8431, lng: 136.5330 }, aesthetic: { top: '72%', left: '20%' } },
        { name: 'Return to Nagoya Station', time: '06:30 PM', icon: Zap, location: 'nagoya', maps: 'Nagoya+Station', gps: { lat: 35.1706, lng: 136.8816 }, aesthetic: { top: '50%', left: '50%' } },
        { name: 'Dinner at Nagoya Station', time: '07:30 PM', icon: UtensilsCrossed, location: 'nagoya', maps: 'Nagoya+Station+restaurants', gps: { lat: 35.1706, lng: 136.8816 }, aesthetic: { top: '50%', left: '50%' } },
        { name: 'JR to Gamagori → Hotel Minato', time: '09:00 PM', icon: Hotel, location: 'hotel', maps: 'Gamagori+Station', gps: { lat: 34.8279, lng: 137.2205 }, aesthetic: { top: '86%', left: '55%' } }
      ],
      route: ['hotel', 'nagoya', 'mainStand', 'sCurves', 'hairpin', 'nagoya', 'hotel'],
      color: '#ef4444'
    },
    {
      day: 2,
      date: 'March 28',
      title: 'Qualifying Day',
      activities: [
        { name: 'Depart Gamagori Stn (JR Special Rapid)', time: '07:00 AM', icon: Zap, location: 'hotel', maps: 'Gamagori+Station', gps: { lat: 34.8279, lng: 137.2205 }, aesthetic: { top: '75%', left: '64%' } },
        { name: 'Arrive Nagoya → Kintetsu Express', time: '07:45 AM', icon: Zap, location: 'nagoya', maps: 'Nagoya+Station', gps: { lat: 35.1706, lng: 136.8816 }, aesthetic: { top: '50%', left: '50%' } },
        { name: 'Arrive Shiroko → Circuit Shuttle', time: '08:30 AM', icon: Zap, location: 'mainStand', maps: 'Shiroko+Station', gps: { lat: 34.8779, lng: 136.5821 }, aesthetic: { top: '60%', left: '36%' } },
        { name: 'Duel GP Roller Coaster', time: '10:00 AM', icon: Zap, location: 'mainStand', maps: 'Suzuka+Circuit+Duel+GP', gps: { lat: 34.8431, lng: 136.5330 }, aesthetic: { top: '55%', left: '20%' } },
        { name: 'FP3 at V1 Main Stand (Binoculars: Pit Crews)', time: '12:00 PM', icon: Eye, location: 'mainStand', maps: 'Suzuka+Circuit+Main+Stand', gps: { lat: 34.8431, lng: 136.5330 }, aesthetic: { top: '63%', left: '15%' } },
        { name: 'QUALIFYING at V1 (DRS Flap Watch)', time: '03:00 PM', icon: Flag, location: 'mainStand', maps: 'Suzuka+Circuit+Main+Stand', gps: { lat: 34.8431, lng: 136.5330 }, aesthetic: { top: '63%', left: '15%' } },
        { name: 'Eve Festival on Main Straight', time: '04:30 PM', icon: Sparkles, location: 'mainStand', maps: 'Suzuka+Circuit+Main+Straight', gps: { lat: 34.8431, lng: 136.5330 }, aesthetic: { top: '68%', left: '18%' } },
        { name: 'Return to Nagoya Station', time: '06:30 PM', icon: Zap, location: 'nagoya', maps: 'Nagoya+Station', gps: { lat: 35.1706, lng: 136.8816 }, aesthetic: { top: '50%', left: '50%' } },
        { name: 'Dinner & Return to Gamagori', time: '08:00 PM', icon: Hotel, location: 'hotel', maps: 'Gamagori+Station', gps: { lat: 34.8279, lng: 137.2205 }, aesthetic: { top: '86%', left: '55%' } }
      ],
      route: ['hotel', 'nagoya', 'mainStand', 'pitLane', 'mainStand', 'nagoya', 'hotel'],
      color: '#ef4444'
    },
    {
      day: 3,
      date: 'March 29',
      title: 'Race Day - Grand Prix',
      activities: [
        { name: 'URGENT: Depart Gamagori (Early!)', time: '06:00 AM', icon: Zap, location: 'hotel', maps: 'Gamagori+Station', gps: { lat: 34.8279, lng: 137.2205 }, aesthetic: { top: '86%', left: '55%' } },
        { name: 'Arrive Nagoya → Kintetsu Express', time: '06:45 AM', icon: Zap, location: 'nagoya', maps: 'Nagoya+Station', gps: { lat: 35.1706, lng: 136.8816 }, aesthetic: { top: '50%', left: '50%' } },
        { name: 'Arrive Shiroko → Circuit (Expect Crowds)', time: '07:30 AM', icon: Zap, location: 'mainStand', maps: 'Shiroko+Station', gps: { lat: 34.8779, lng: 136.5821 }, aesthetic: { top: '60%', left: '36%' } },
        { name: 'Drivers Parade', time: '10:00 AM', icon: Flag, location: 'mainStand', maps: 'Suzuka+Circuit+Main+Straight', gps: { lat: 34.8431, lng: 136.5330 }, aesthetic: { top: '68%', left: '18%' } },
        { name: 'Grid Formation at V1 (Watch Mechanics Bleed Brakes)', time: '12:30 PM', icon: Shield, location: 'mainStand', maps: 'Suzuka+Circuit+Grid', gps: { lat: 34.8431, lng: 136.5330 }, aesthetic: { top: '63%', left: '15%' } },
        { name: 'JAPANESE GRAND PRIX (53 Laps) - V1 Seats', time: '02:00 PM', icon: Zap, location: 'mainStand', maps: 'Suzuka+Circuit', gps: { lat: 34.8431, lng: 136.5330 }, aesthetic: { top: '63%', left: '15%' } },
        { name: 'Post-Race Track Walk (Collect Tyre Marbles)', time: '04:30 PM', icon: Footprints, location: 'mainStand', maps: 'Suzuka+Circuit+Track', gps: { lat: 34.8431, lng: 136.5330 }, aesthetic: { top: '70%', left: '15%' } },
        { name: 'Circuit Exit (1.5hr Bus Queue Expected)', time: '06:30 PM', icon: Zap, location: 'mainStand', maps: 'Shiroko+Station', gps: { lat: 34.8779, lng: 136.5821 }, aesthetic: { top: '60%', left: '36%' } },
        { name: 'Shiroko → Nagoya Station', time: '08:00 PM', icon: Zap, location: 'nagoya', maps: 'Nagoya+Station', gps: { lat: 35.1706, lng: 136.8816 }, aesthetic: { top: '50%', left: '50%' } },
        { name: 'Shinkansen Kodama to Kakegawa', time: '09:00 PM', icon: Zap, location: 'nagoya', maps: 'Kakegawa+Station', gps: { lat: 34.7710, lng: 138.0140 }, aesthetic: { top: '80%', left: '80%' } },
        { name: 'JR Local to Kikugawa - Trip Complete!', time: '10:50 PM', icon: Flag, location: 'hotel', maps: 'Kikugawa+Station', gps: { lat: 34.7267, lng: 138.0842 }, aesthetic: { top: '85%', left: '90%' } }
      ],
      route: ['hotel', 'nagoya', 'mainStand'],
      color: '#ef4444'
    }
  ];
  const baliHotels = [
    { name: 'Ashoka Tree Resort', location: 'Ubud', days: 'Days 1-2', type: '1 BR Pool Villa', coords: 'ubud', color: '#10b981', icon: Palmtree },
    { name: 'Aston Gili Trawangan', location: 'Gili Trawangan', days: 'Day 3', type: 'Deluxe Garden View', coords: 'giliT', color: '#06b6d4', icon: Waves },
    { name: 'Bali Rani Hotel', location: 'Kuta', days: 'Days 4-6', type: 'Superior Room', coords: 'kuta', color: '#f97316', icon: Sunset }
  ];

  const suzukaHotels = [
    { name: 'Business Hotel Minato', location: 'Gamagori', days: 'All 3 Nights', type: 'Single Room', coords: 'hotel', color: '#ef4444', icon: Hotel }
  ];

  const baliFood = {
    local: [
      { name: 'Nasi Goreng Telur', desc: 'Fried rice with egg', icon: Flame },
      { name: 'Gado-Gado', desc: 'Veggie & egg salad with peanut sauce', icon: Leaf },
      { name: 'Martabak Telur', desc: 'Savory egg pancake', icon: Coffee }
    ],
    indian: [
      { name: "Queen's Tandoor", location: 'Seminyak', icon: Flame },
      { name: "Queen's of India", location: 'Kuta', icon: Flame },
      { name: 'Sattvik By Nature', location: 'Seminyak', icon: Leaf }
    ]
  };

  const suzukaFood = {
    local: [
      { name: 'Miso Nikomi Udon', desc: 'Verify no fish stock (dashi)', icon: UtensilsCrossed },
      { name: 'Vegetable Tempura', desc: 'Light battered veggies', icon: Leaf },
      { name: 'Onigiri (Veggie)', desc: 'Rice balls with pickled plum', icon: Coffee }
    ],
    stations: [
      { name: 'Nagoya Station Food Court', location: 'Multiple options', icon: UtensilsCrossed },
      { name: 'Circuit Food Stalls', location: 'Inside Suzuka', icon: Flame }
    ]
  };

  const baliChecklistItems = [
    { id: 'passports', label: 'Passports & Travel Docs', icon: Plane },
    { id: 'wallet', label: 'Wallet & Cards', icon: CheckSquare },
    { id: 'drone', label: 'Drone (for Ubud/Penida)', icon: Camera },
    { id: 'gopro', label: 'GoPro & Waterproof Bag', icon: Camera },
    { id: 'sunscreen', label: 'Sunscreen & Beach Gear', icon: Sunset }
  ];

  const f1ChecklistItems = [
    { id: 'tickets', label: 'V1-1 Physical Tickets/Lanyard', icon: Flag },
    { id: 'earplugs', label: 'Ear Protection/Earplugs', icon: Shield },
    { id: 'powerbank', label: 'Power Banks (Live Timing)', icon: Battery },
    { id: 'binoculars', label: 'Binoculars', icon: Eye },
    { id: 'shoes', label: 'Comfortable Walking Shoes', icon: Footprints }
  ];

  const toggleBaliChecklist = (id) => {
    setBaliChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleF1Checklist = (id) => {
    setF1Checklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Leaflet Map Updater Component
  const MapUpdater = ({ center, zoom }) => {
    const map = useMap();
    
    useEffect(() => {
      if (center) {
        map.flyTo(center, zoom || 13, {
          duration: 1.5
        });
      }
    }, [center, zoom, map]);
    
    return null;
  };

  // Hub View
  if (!selectedTrip) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-y-auto font-sans">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
          
          .font-display {
            font-family: 'Orbitron', sans-serif;
          }
          
          .font-body {
            font-family: 'Inter', sans-serif;
          }
          
          .trip-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .trip-card:hover {
            transform: translateY(-8px) scale(1.02);
          }
        `}</style>

        <div className="min-h-screen flex flex-col items-center justify-center p-8 py-16">
          <div className="text-center mb-12">
            <h1 className="font-display text-6xl font-black tracking-tight mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
                TRAVEL
              </span>
            </h1>
            <h2 className="font-display text-5xl font-black tracking-tight mb-4">
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 text-transparent bg-clip-text">
                COMMAND CENTER
              </span>
            </h2>
            <p className="text-slate-400 text-lg mt-4 font-body">Select your destination</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full mb-16">
            {/* Bali Card */}
            <div
              onClick={() => {
                setSelectedTrip('bali');
                setActiveTab('itinerary');
                setSelectedDay(null);
                setSelectedActivityIndex(null);
                setSelectedHotel(null);
                setHighlightedLocation(null);
              }}
              className="trip-card cursor-pointer relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/30 backdrop-blur-xl"
              style={{ minHeight: '400px' }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <Palmtree className="w-16 h-16 text-emerald-400" />
                  <div className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-body font-semibold">
                    May 2 - 8
                  </div>
                </div>
                <h3 className="font-display text-4xl font-black text-white mb-3">
                  BALI
                </h3>
                <p className="font-display text-2xl font-bold text-emerald-400 mb-6">
                  Escapade
                </p>
                <div className="space-y-2 text-slate-300 font-body">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    7 Days • 12 Locations
                  </p>
                  <p className="flex items-center gap-2">
                    <Hotel className="w-4 h-4 text-cyan-400" />
                    Ubud • Gili T • Kuta
                  </p>
                  <p className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-cyan-400" />
                    Watersports • ATV • Island Hopping
                  </p>
                </div>
                <div className="mt-8 flex items-center text-emerald-400 font-body font-semibold">
                  <span>Launch Trip</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent" />
            </div>

            {/* F1 Suzuka Card */}
            <div
              onClick={() => {
                setSelectedTrip('f1');
                setActiveTab('itinerary');
                setSelectedDay(null);
                setSelectedActivityIndex(null);
                setSelectedHotel(null);
                setHighlightedLocation(null);
              }}
              className="trip-card cursor-pointer relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/30 backdrop-blur-xl"
              style={{ minHeight: '400px' }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <Flag className="w-16 h-16 text-red-400" />
                  <div className="px-4 py-2 rounded-full bg-red-500/20 text-red-300 text-sm font-body font-semibold">
                    March 27 - 29
                  </div>
                </div>
                <h3 className="font-display text-4xl font-black text-white mb-3">
                  SUZUKA
                </h3>
                <p className="font-display text-2xl font-bold text-red-400 mb-6">
                  F1 Grand Prix
                </p>
                <div className="space-y-2 text-slate-300 font-body">
                  <p className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-400" />
                    3 Days • V1-1 Front Row
                  </p>
                  <p className="flex items-center gap-2">
                    <Hotel className="w-4 h-4 text-orange-400" />
                    Gamagori Base
                  </p>
                  <p className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-orange-400" />
                    Practice • Quali • Race
                  </p>
                </div>
                <div className="mt-8 flex items-center text-red-400 font-body font-semibold">
                  <span>Launch Trip</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Trip-specific styling
  const isBali = selectedTrip === 'bali';
  const itinerary = isBali ? baliItinerary : suzukaItinerary;
  const hotels = isBali ? baliHotels : suzukaHotels;
  const food = isBali ? baliFood : suzukaFood;
  const locations = isBali ? baliLocations : suzukaLocations;
  const checklist = isBali ? baliChecklist : f1Checklist;
  const checklistItems = isBali ? baliChecklistItems : f1ChecklistItems;
  const toggleChecklist = isBali ? toggleBaliChecklist : toggleF1Checklist;

  const theme = isBali ? {
    bg: 'bg-gradient-to-br from-orange-50 via-amber-50 to-cyan-100',
    text: 'text-emerald-900',
    glass: 'glass-light',
    accent: 'emerald',
    tabBorder: 'border-emerald-200/50',
    tabActive: 'text-emerald-600',
    tabInactive: 'text-emerald-800/60 hover:text-emerald-800',
    tabIndicator: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'
  } : {
    bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
    text: 'text-white',
    glass: 'glass-dark',
    accent: 'red',
    tabBorder: 'border-slate-700/50',
    tabActive: 'text-red-400',
    tabInactive: 'text-slate-400 hover:text-slate-200',
    tabIndicator: 'bg-gradient-to-r from-red-500 via-orange-500 to-red-500'
  };

  // Get current selected activity (Defaults to the 1st activity if the day is just opened)
  const activeDayData = selectedDay !== null ? itinerary.find(d => d.day === selectedDay) : null;
  const currentActivity = activeDayData 
    ? activeDayData.activities[selectedActivityIndex !== null ? selectedActivityIndex : 0]
    : null;

  return (
    <div className={`h-screen w-full ${theme.bg} ${theme.text} overflow-hidden font-sans`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@300;400;500;600;700&family=Roboto+Mono:wght@400;500;600;700&display=swap');
        
        .font-display {
          font-family: ${isBali ? "'Orbitron', sans-serif" : "'Roboto Mono', monospace"};
        }
        
        .font-body {
          font-family: 'Inter', sans-serif;
        }
        
        .glass-light {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }
        
        .glass-dark {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.1);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: ${isBali ? '0 12px 40px rgba(6, 182, 212, 0.15)' : '0 12px 40px rgba(239, 68, 68, 0.25)'};
        }
      `}</style>

      {/* Header */}
      <div className={`absolute top-0 left-0 right-0 z-30 p-6 pb-8 ${isBali ? 'bg-gradient-to-b from-orange-50/95 via-amber-50/80 to-transparent' : 'bg-gradient-to-b from-slate-950/90 to-transparent'} backdrop-blur-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedTrip(null);
                setActiveTab('itinerary');
                setSelectedDay(null);
                setSelectedActivityIndex(null);
                setSelectedHotel(null);
                setHighlightedLocation(null);
              }}
              className={`p-2 rounded-lg ${isBali ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'} transition-all`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-display text-4xl font-black tracking-tight">
                {isBali ? (
                  <>
                    <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 text-transparent bg-clip-text">
                      BALI
                    </span>
                    <span className={`${isBali ? 'text-orange-600' : 'text-red-500'} ml-2`}>2026</span>
                  </>
                ) : (
                  <>
                    <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-transparent bg-clip-text">
                      SUZUKA
                    </span>
                    <span className="text-cyan-400 ml-2">F1</span>
                  </>
                )}
              </h1>
              <p className={`${isBali ? 'text-emerald-700' : 'text-slate-400'} text-sm mt-1 font-body tracking-wide`}>
                {isBali ? 'May 2 - May 8 • 7 Days of Paradise' : 'March 27 - 29 • Japanese Grand Prix'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-body">
            <div className={`px-3 py-1.5 rounded-full ${isBali ? 'bg-cyan-100 text-cyan-700 border border-cyan-200' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
              <MapPin className="inline w-3 h-3 mr-1" />
              {isBali ? '12 Locations' : 'V1-1 Seats'}
            </div>
            <div className={`px-3 py-1.5 rounded-full ${isBali ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
              <Hotel className="inline w-3 h-3 mr-1" />
              {isBali ? '3 Hotels' : 'Gamagori'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full pt-24">
        {/* Left: Dual-Mode Map Display */}
        <div className="flex-1 relative">
          {/* Mode Toggle Button Group */}
          <div className="absolute top-6 right-6 z-40 flex gap-2">
            <button
              onClick={() => setMapMode('aesthetic')}
              className={`px-4 py-2 rounded-lg font-body text-sm font-semibold transition-all ${
                mapMode === 'aesthetic'
                  ? isBali
                    ? 'bg-emerald-500/90 text-white shadow-lg'
                    : 'bg-red-500/90 text-white shadow-lg'
                  : isBali
                  ? 'bg-white/70 text-emerald-800 hover:bg-white/90'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800/90'
              } backdrop-blur-md border ${
                mapMode === 'aesthetic'
                  ? isBali
                    ? 'border-emerald-400'
                    : 'border-red-400'
                  : isBali
                  ? 'border-white/40'
                  : 'border-slate-700'
              }`}
            >
              <MapIcon className="w-4 h-4 inline mr-2" />
              Vibe Map
            </button>
            <button
              onClick={() => setMapMode('gps')}
              className={`px-4 py-2 rounded-lg font-body text-sm font-semibold transition-all ${
                mapMode === 'gps'
                  ? isBali
                    ? 'bg-cyan-500/90 text-white shadow-lg'
                    : 'bg-orange-500/90 text-white shadow-lg'
                  : isBali
                  ? 'bg-white/70 text-emerald-800 hover:bg-white/90'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800/90'
              } backdrop-blur-md border ${
                mapMode === 'gps'
                  ? isBali
                    ? 'border-cyan-400'
                    : 'border-orange-400'
                  : isBali
                  ? 'border-white/40'
                  : 'border-slate-700'
              }`}
            >
              <Navigation className="w-4 h-4 inline mr-2" />
              GPS Map
            </button>
          </div>

          {/* Mode A: Aesthetic Map */}
          {mapMode === 'aesthetic' && (
            <>
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${isBali ? '/bali-map.jpg' : '/suzuka-map.jpg'})`
                }}
              >
                {/* Overlay gradient */}
                <div className={`absolute inset-0 ${isBali ? 'bg-gradient-to-br from-orange-50/20 to-cyan-100/20' : 'bg-gradient-to-br from-slate-950/30 to-red-950/30'}`} />
                
                {/* Animated Activity Marker */}
                {currentActivity && currentActivity.aesthetic && (
                  <div
                    className="absolute w-8 h-8 -ml-4 -mt-4 animate-pulse"
                    style={{
                      top: currentActivity.aesthetic.top,
                      left: currentActivity.aesthetic.left
                    }}
                  >
                    {/* Outer glow ring */}
                    <div 
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        backgroundColor: itinerary.find(d => d.day === selectedDay)?.color || '#06b6d4',
                        opacity: 0.4
                      }}
                    />
                    {/* Middle ring */}
                    <div 
                      className="absolute inset-2 rounded-full"
                      style={{
                        backgroundColor: itinerary.find(d => d.day === selectedDay)?.color || '#06b6d4',
                        opacity: 0.6,
                        boxShadow: `0 0 20px ${itinerary.find(d => d.day === selectedDay)?.color || '#06b6d4'}`
                      }}
                    />
                    {/* Inner dot */}
                    <div 
                      className="absolute inset-3 rounded-full bg-white"
                      style={{
                        boxShadow: `0 0 15px ${itinerary.find(d => d.day === selectedDay)?.color || '#06b6d4'}`
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Info Overlay */}
              {currentActivity && (
                <div className={`absolute bottom-8 left-8 ${theme.glass} rounded-xl p-5 max-w-md animate-in slide-in-from-left shadow-2xl z-30`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full animate-pulse shadow-lg"
                      style={{ backgroundColor: itinerary.find(d => d.day === selectedDay).color }}
                    />
                    <h3 className={`font-display text-xl font-bold ${theme.text}`}>Day {selectedDay}</h3>
                  </div>
                  <p className={`${isBali ? 'text-emerald-900' : 'text-slate-100'} text-base font-body font-bold mb-1`}>
                    {currentActivity.name}
                  </p>
                  <p className={`${isBali ? 'text-emerald-700' : 'text-slate-300'} text-sm font-body`}>
                    {currentActivity.time}
                  </p>
                </div>
              )}

              {selectedHotel && (
                <div className={`absolute bottom-8 left-8 ${theme.glass} rounded-xl p-5 max-w-md animate-in slide-in-from-left shadow-2xl z-30`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Hotel className={`w-5 h-5 ${isBali ? 'text-orange-600' : 'text-red-400'}`} />
                    <h3 className={`font-display text-lg font-bold ${theme.text}`}>Hotel Selected</h3>
                  </div>
                  <p className={`${isBali ? 'text-emerald-800' : 'text-slate-200'} text-base font-body font-semibold`}>
                    {hotels.find(h => h.coords === selectedHotel)?.name}
                  </p>
                  <p className={`${isBali ? 'text-emerald-700/80' : 'text-slate-400'} text-sm font-body mt-1`}>
                    {hotels.find(h => h.coords === selectedHotel)?.location}
                  </p>
                </div>
              )}

              {!currentActivity && !selectedHotel && (
                <div className={`absolute bottom-8 left-8 ${theme.glass} rounded-xl p-4 max-w-sm shadow-2xl z-30`}>
                  <p className={`${isBali ? 'text-emerald-800' : 'text-slate-300'} text-sm font-body`}>
                    {isBali 
                      ? '📍 Select a day, then click activities to see locations' 
                      : '🏁 Select a day, then click activities to see locations'}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Mode B: Live GPS Map */}
          {mapMode === 'gps' && (
            <div className="absolute inset-0 z-10">
              <MapContainer
                center={
                  currentActivity && currentActivity.gps
                    ? [currentActivity.gps.lat, currentActivity.gps.lng]
                    : isBali
                    ? [-8.5069, 115.2625]
                    : [34.8431, 136.5330]
                }
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                className="z-10"
              >
                <TileLayer
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url={isBali 
                    ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  }
                />
                
                {/* Dynamic Map Updater */}
                {currentActivity && currentActivity.gps && (
                  <MapUpdater
                    center={[currentActivity.gps.lat, currentActivity.gps.lng]}
                    zoom={13}
                  />
                )}
                
                {/* Marker for selected activity */}
                {currentActivity && currentActivity.gps && (
                  <Marker
                    position={[currentActivity.gps.lat, currentActivity.gps.lng]}
                  >
                    <Popup>
                      <div className="font-body">
                        <strong className="font-display">Day {selectedDay}</strong>
                        <br />
                        {currentActivity.name}
                        <br />
                        <span className="text-xs text-gray-600">
                          {currentActivity.time}
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>

              {/* Overlay Info Card for GPS Mode */}
              {currentActivity && (
                <div className={`absolute bottom-8 left-8 ${theme.glass} rounded-xl p-4 max-w-sm shadow-2xl z-[1000]`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className={`w-4 h-4 ${isBali ? 'text-cyan-600' : 'text-orange-400'}`} />
                    <h3 className={`font-display text-base font-bold ${theme.text}`}>Day {selectedDay}</h3>
                  </div>
                  <p className={`${isBali ? 'text-emerald-900' : 'text-slate-100'} text-sm font-body font-bold`}>
                    {currentActivity.name}
                  </p>
                  <p className={`${isBali ? 'text-emerald-700/70' : 'text-slate-400'} text-xs font-body mt-1`}>
                    {currentActivity.time}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Control Panel */}
        <div className={`w-[480px] ${theme.glass} ${isBali ? 'border-l border-white/40 shadow-2xl' : 'border-l border-slate-700/50'} flex flex-col relative z-40`}>
          {/* Tabs - FIXED Z-INDEX WITH SOLID BACKGROUND */}
          <div className={`flex border-b ${theme.tabBorder} px-4 ${isBali ? 'bg-white' : 'bg-slate-900'} z-[100] relative`}>
            {[
              { id: 'itinerary', label: 'Itinerary', icon: Calendar },
              { id: 'hotels', label: 'Hotels', icon: Hotel },
              { id: 'food', label: 'Food', icon: UtensilsCrossed },
              { id: 'checklist', label: 'Checklist', icon: CheckSquare }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedDay(null);
                    setSelectedActivityIndex(null);
                    setSelectedHotel(null);
                    setHighlightedLocation(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-4 font-body font-medium text-sm transition-all relative ${
                    activeTab === tab.id ? theme.tabActive : theme.tabInactive
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme.tabIndicator}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* F1 Logistics Section */}
            {activeTab === 'itinerary' && !isBali && (
              <div className={`${theme.glass} rounded-xl p-5 border border-orange-500/40 shadow-lg`}>
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-base font-bold text-orange-400 mb-2">Pre-Trip Logistics</h3>
                    <div className="space-y-2 text-sm text-slate-300 font-body">
                      <p className="flex items-start gap-2">
                        <span className="text-orange-400 font-bold">💳</span>
                        <span>Load IC Card (Suica/Pasmo) with <strong className="text-white">¥15,000</strong></span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">🚄</span>
                        <span>Book <strong className="text-white">Kintetsu Limited Express</strong> & <strong className="text-white">Shinkansen</strong> tickets <strong className="text-red-400">1 month in advance</strong></span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-green-400 font-bold">🍱</span>
                        <span>Buy <strong className="text-white">Tamago Sandos</strong> & <strong className="text-white">Onigiri</strong> at station konbinis</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Itinerary Tab */}
            {activeTab === 'itinerary' && itinerary.map(day => (
              <div
                key={day.day}
                className={`${theme.glass} rounded-xl p-5 border transition-all ${
                  selectedDay === day.day ? (isBali ? 'border-emerald-400/60' : 'border-red-500/60') : (isBali ? 'border-white/30' : 'border-transparent')
                }`}
                style={selectedDay === day.day ? { boxShadow: `0 4px 20px ${day.color}30` } : {}}
              >
                <div 
                  className="flex items-start justify-between mb-3 cursor-pointer"
                  onClick={() => {
                    if (selectedDay === day.day) {
                      setSelectedDay(null);
                      setSelectedActivityIndex(null);
                    } else {
                      setSelectedDay(day.day);
                      setSelectedActivityIndex(null);
                    }
                  }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: day.color }}
                      />
                      <span className={`font-display text-xs ${isBali ? 'text-emerald-600' : 'text-red-400'} font-bold`}>DAY {day.day}</span>
                      <span className={`${isBali ? 'text-emerald-700/70' : 'text-slate-400'} text-xs font-body`}>• {day.date}</span>
                    </div>
                    <h3 className={`font-body ${theme.text} font-semibold text-base`}>{day.title}</h3>
                  </div>
                  <ChevronRight 
                    className={`w-5 h-5 ${isBali ? 'text-emerald-600' : 'text-slate-400'} transition-transform ${
                      selectedDay === day.day ? 'rotate-90' : ''
                    }`}
                  />
                </div>
                
                {selectedDay === day.day && (
                  <div className="space-y-2 mt-4 animate-in slide-in-from-top">
                    {day.activities.map((activity, idx) => {
                      const Icon = activity.icon;
                      const isActiveActivity = selectedActivityIndex === idx || (selectedActivityIndex === null && idx === 0);
                      return (
                        <div 
                          key={idx} 
                          className={`flex items-start gap-3 text-sm p-2 rounded-lg cursor-pointer transition-all ${
                            isActiveActivity 
                              ? isBali 
                                ? 'bg-emerald-100/60' 
                                : 'bg-red-500/20'
                              : isBali
                              ? 'hover:bg-emerald-50/50'
                              : 'hover:bg-slate-800/30'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedActivityIndex(idx);
                          }}
                        >
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${day.color}20`, color: day.color }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 justify-between">
                              <p className={`${isBali ? 'text-emerald-900' : 'text-slate-200'} font-medium font-body`}>{activity.name}</p>
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${activity.maps}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${isBali ? 'text-cyan-600 hover:text-cyan-700' : 'text-red-400 hover:text-red-300'} transition-colors`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                            <p className={`${isBali ? 'text-emerald-700/60' : 'text-slate-500'} text-xs mt-0.5 font-body`}>{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Hotels Tab */}
            {activeTab === 'hotels' && hotels.map((hotel, idx) => {
              const Icon = hotel.icon;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedHotel(selectedHotel === hotel.coords ? null : hotel.coords)}
                  className={`${theme.glass} rounded-xl p-5 cursor-pointer hover-lift border transition-all ${
                    selectedHotel === hotel.coords ? (isBali ? 'border-orange-400/60' : 'border-red-500/60') : (isBali ? 'border-white/30' : 'border-transparent')
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${hotel.color}20`, color: hotel.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-body ${theme.text} font-semibold text-base mb-1`}>{hotel.name}</h3>
                      <p className={`${isBali ? 'text-emerald-700' : 'text-slate-400'} text-sm font-body mb-2`}>{hotel.location}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className={`px-2 py-1 rounded-md ${isBali ? 'bg-emerald-100/80 text-emerald-700' : 'bg-slate-800/50 text-slate-300'} font-body font-medium`}>
                          {hotel.days}
                        </span>
                        <span className={`${isBali ? 'text-emerald-600/80' : 'text-slate-500'} font-body`}>{hotel.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Food Tab */}
            {activeTab === 'food' && (
              <>
                <div className={`${theme.glass} rounded-xl p-5 border ${isBali ? 'border-emerald-300/40' : 'border-red-500/30'}`}>
                  <h3 className={`font-display text-lg font-bold ${isBali ? 'text-emerald-600' : 'text-red-400'} mb-4 flex items-center gap-2`}>
                    <Leaf className="w-5 h-5" />
                    {isBali ? 'Local Eats' : 'Local Options'}
                  </h3>
                  <div className="space-y-3">
                    {food.local.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg ${isBali ? 'bg-emerald-100/80' : 'bg-red-500/20'} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-4 h-4 ${isBali ? 'text-emerald-600' : 'text-red-400'}`} />
                          </div>
                          <div>
                            <p className={`${theme.text} font-medium text-sm font-body`}>{item.name}</p>
                            <p className={`${isBali ? 'text-emerald-700/70' : 'text-slate-400'} text-xs mt-0.5 font-body`}>{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={`${theme.glass} rounded-xl p-5 border ${isBali ? 'border-orange-300/40' : 'border-orange-500/30'}`}>
                  <h3 className={`font-display text-lg font-bold ${isBali ? 'text-orange-600' : 'text-orange-400'} mb-4 flex items-center gap-2`}>
                    <Flame className="w-5 h-5" />
                    {isBali ? 'Indian Restaurants' : 'Food Stations'}
                  </h3>
                  <div className="space-y-3">
                    {(isBali ? food.indian : food.stations).map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div 
                          key={idx} 
                          className="flex items-start gap-3 cursor-pointer hover-lift"
                          onClick={() => {
                            if (isBali) {
                              if (item.location === 'Seminyak') {
                                setHighlightedLocation('seminyak');
                              } else {
                                setHighlightedLocation('kuta');
                              }
                            }
                          }}
                        >
                          <div className={`w-8 h-8 rounded-lg ${isBali ? 'bg-orange-100/80' : 'bg-orange-500/20'} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-4 h-4 ${isBali ? 'text-orange-600' : 'text-orange-400'}`} />
                          </div>
                          <div>
                            <p className={`${theme.text} font-medium text-sm font-body`}>{item.name}</p>
                            <p className={`${isBali ? 'text-emerald-700/70' : 'text-slate-400'} text-xs mt-0.5 font-body flex items-center gap-1`}>
                              {isBali && <MapPin className="w-3 h-3" />}
                              {item.location}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Checklist Tab */}
            {activeTab === 'checklist' && (
              <div className={`${theme.glass} rounded-xl p-5 border ${isBali ? 'border-cyan-300/40' : 'border-red-500/30'}`}>
                <h3 className={`font-display text-lg font-bold ${isBali ? 'text-cyan-600' : 'text-red-400'} mb-4 flex items-center gap-2`}>
                  <CheckSquare className="w-5 h-5" />
                  Pre-Trip Checklist
                </h3>
                <div className="space-y-3">
                  {checklistItems.map((item) => {
                    const Icon = item.icon;
                    const isChecked = checklist[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklist(item.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                          isChecked 
                            ? (isBali ? 'bg-emerald-100/60' : 'bg-green-500/20') 
                            : (isBali ? 'bg-white/40 hover:bg-white/60' : 'bg-slate-800/30 hover:bg-slate-800/50')
                        }`}
                      >
                        <div className={`flex-shrink-0 ${isChecked ? 'text-green-600' : (isBali ? 'text-emerald-700' : 'text-slate-400')}`}>
                          {isChecked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                        </div>
                        <Icon className={`w-5 h-5 flex-shrink-0 ${isChecked ? 'text-green-600' : (isBali ? 'text-cyan-600' : 'text-red-400')}`} />
                        <span className={`flex-1 font-body font-medium text-sm ${
                          isChecked 
                            ? 'line-through text-green-600' 
                            : theme.text
                        }`}>
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCommandCenter;