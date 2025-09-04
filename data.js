// Datos completos del itinerario Europa 2025
const itineraryData = {
    // Información general del viaje
    general: {
        title: "Itinerario Europa - Septiembre 2025",
        duration: "19 días",
        startDate: "2025-09-09",
        endDate: "2025-09-27",
        route: "CDMX → Ámsterdam → Lisboa → Madrid → Lyon → Chamonix → Bruselas → CDMX"
    },

    // Transporte principal entre ciudades
    mainTransport: [
        {
            id: "cdmx-ams",
            from: "CDMX",
            to: "Ámsterdam",
            date: "09-10 Sep",
            type: "flight",
            details: "Vuelo internacional",
            arrival: "10 Sep 06:00",
            airport: "Schiphol (AMS)"
        },
        {
            id: "ams-lis",
            from: "Ámsterdam",
            to: "Lisboa",
            date: "13 Sep",
            type: "flight",
            airline: "TAP",
            flight: "TP671",
            time: "18:10-20:00",
            checkIn: "15:45",
            luggage: "1 maleta 23kg incluida"
        },
        {
            id: "lis-mad",
            from: "Lisboa",
            to: "Madrid",
            date: "16 Sep",
            type: "flight",
            airline: "TAP",
            flight: "TP1016",
            time: "14:45-17:05",
            checkIn: "12:30"
        },
        {
            id: "mad-lys",
            from: "Madrid",
            to: "Lyon",
            date: "19 Sep",
            type: "flight",
            airline: "EasyJet",
            flight: "U2 4392",
            time: "14:00-15:50",
            checkIn: "12:00"
        },
        {
            id: "lys-cha",
            from: "Lyon",
            to: "Chamonix",
            date: "21 Sep",
            type: "bus",
            company: "FlixBus",
            route: "1779",
            time: "12:20-15:50",
            arrival: "Chamonix Sud",
            price: "€25"
        },
        {
            id: "cha-gva",
            from: "Chamonix",
            to: "Ginebra",
            date: "24 Sep",
            type: "bus",
            company: "Swiss Tours",
            time: "08:00-09:10",
            arrival: "Place Dorcière",
            price: "€20"
        },
        {
            id: "gva-bru",
            from: "Ginebra",
            to: "Bruselas",
            date: "24 Sep",
            type: "flight",
            airline: "Brussels Airlines",
            flight: "SN2722",
            time: "17:10-18:30",
            checkIn: "14:30"
        },
        {
            id: "bru-ams",
            from: "Bruselas",
            to: "Ámsterdam Schiphol",
            date: "27 Sep",
            type: "bus",
            company: "FlixBus",
            route: "817",
            time: "11:15-15:05",
            arrival: "Directo a Schiphol"
        }
    ],

    // Información detallada por ciudad
    cities: {
        amsterdam: {
            name: "Ámsterdam",
            country: "Países Bajos",
            dates: "10-12 Septiembre",
            nights: 3,
            accommodation: {
                name: "Flying Pig Downtown",
                address: "Cerca de Estación Central",
                type: "Hostal"
            },
            food: {
                typical: ["Stroopwafel", "Gouda", "Arenque", "Pannenkoeken"],
                restaurants: [
                    { name: "De Kraai", type: "Pannenkoeken", price: "€12-15", location: "Zaanse Schans" },
                    { name: "Centro", type: "Almuerzo", price: "€15", location: "Centro histórico" }
                ]
            },
            activities: [
                {
                    day: 1,
                    date: "10 Sep",
                    items: [
                        { time: "18:00", activity: "Llegada a AMS Schiphol" },
                        { time: "18:30-19:00", activity: "Tren NS a Estación Central", price: "€5", duration: "17 min" },
                        { time: "19:15", activity: "Caminata al hostal", distance: "5 min" },
                        { time: "20:00", activity: "Check-in / guardar maletas" },
                        { time: "20:30", activity: "Cena ligera cerca del alojamiento" }
                    ],
                    walking: "2 km"
                },
                {
                    day: 2,
                    date: "11 Sep",
                    items: [
                        { time: "08:30", activity: "Desayuno en el hostal" },
                        { time: "10:00-12:00", activity: "Free Walking Tour", description: "Damrak, Plaza Dam, Barrio Rojo", price: "Propina €10" },
                        { time: "12:30-14:00", activity: "Almuerzo en el centro", price: "€15" },
                        { time: "14:00-15:30", activity: "Paseo y compras", location: "De Negen Straatjes" },
                        { time: "15:30", activity: "Ferry a Amsterdam Norte" },
                        { time: "16:30", activity: "Nxt Museum", optional: true },
                        { time: "18:30", activity: "Lookout A'DAM + columpio", price: "€13.50", optional: true }
                    ],
                    walking: "5-6 km"
                },
                {
                    day: 3,
                    date: "12 Sep",
                    items: [
                        { time: "08:30", activity: "Desayuno en el hostal" },
                        { time: "09:30", activity: "Tren a Zaandijk Zaanse Schans", price: "€5", duration: "20 min" },
                        { time: "10:10-14:30", activity: "Zaanse Schans", description: "Molinos (€5 c/u), taller de zuecos (gratis), quesos, museo (€12.50)" },
                        { time: "14:30-15:30", activity: "Almuerzo en De Kraai", price: "€12-15", type: "Pannenkoeken" },
                        { time: "15:45-18:30", activity: "Paseo en Zaandam", description: "Inntel Hotel, centro histórico, casas verdes" },
                        { time: "18:15", activity: "Regreso a Ámsterdam" }
                    ],
                    walking: "6-7 km"
                },
                {
                    day: 4,
                    date: "13 Sep",
                    items: [
                        { time: "08:30", activity: "Desayuno y check-out" },
                        { time: "09:00", activity: "Guardar maletas en consigna" },
                        { time: "09:30-13:30", activity: "Última visita", options: ["Barrio Chino", "Museo de la Prostitución (€12)", "Plaza Dam"] },
                        { time: "13:30-14:30", activity: "Almuerzo ligero" },
                        { time: "15:00", activity: "Traslado a Schiphol", duration: "20 min" },
                        { time: "15:45", activity: "Check-in TAP" },
                        { time: "18:10", activity: "Vuelo a Lisboa" }
                    ],
                    walking: "4-5 km"
                }
            ],
            optionalActivities: [
                { name: "Museo Ana Frank", price: "€14" },
                { name: "Excursión a Róterdam", price: "Tren €10" },
                { name: "Micropia", price: "€17" },
                { name: "Hortus Botanicus", price: "€10" },
                { name: "Barrio Rojo", price: "Gratis" }
            ],
            localTransport: {
                airport: { method: "Tren NS", price: "€5", duration: "17 min", line: "Directa" },
                dayPass: { name: "GVB Day Pass", price: "€9" },
                singleTicket: { price: "€3.40" }
            }
        },

        lisboa: {
            name: "Lisboa",
            country: "Portugal",
            dates: "13-15 Septiembre",
            nights: 3,
            accommodation: {
                name: "Airbnb",
                address: "Rua Cecílio de Sousa 81, 1200-100 Lisboa",
                type: "Apartamento"
            },
            food: {
                typical: ["Bacalao à brás", "Pastéis de nata", "Sardinas asadas", "Caldo verde"],
                restaurants: [
                    { name: "Casa con Fado", type: "Cena tradicional", price: "€25-30", location: "Centro" },
                    { name: "Tascantiga", type: "Tapas portuguesas", location: "Sintra" },
                    { name: "Cantinho Gourmet", type: "Tradicional", price: "€15-20", location: "Sintra" },
                    { name: "Casa Piriquita", type: "Travesseiros de Sintra", location: "Sintra" }
                ]
            },
            activities: [
                {
                    day: 1,
                    date: "13 Sep",
                    items: [
                        { time: "20:00", activity: "Llegada vuelo TAP TP671" },
                        { time: "20:30-21:00", activity: "Metro al alojamiento", description: "Línea Roja → Amarilla (Rato)", price: "€2", duration: "38 min" },
                        { time: "21:30", activity: "Cena ligera / descanso" }
                    ],
                    walking: "1 km"
                },
                {
                    day: 2,
                    date: "14 Sep",
                    items: [
                        { time: "10:00-13:00", activity: "Free Walking Tour", location: "Baixa/Chiado/Alfama", price: "Propina €10" },
                        { time: "13:00-15:30", activity: "Comida" },
                        { time: "16:00-18:00", activity: "Oceanário", price: "€22", location: "Parque das Nações" },
                        { time: "18:00-20:00", activity: "Torre de Belém + Monumento", price: "€10", optional: true },
                        { time: "20:30", activity: "Cena con fado", price: "€25-30" }
                    ],
                    walking: "6-7 km"
                },
                {
                    day: 3,
                    date: "15 Sep",
                    items: [
                        { time: "08:00", activity: "Desayuno en Airbnb" },
                        { time: "08:30", activity: "Tren Rossio → Sintra", price: "€5 ida/vuelta", duration: "40 min" },
                        { time: "09:30-11:30", activity: "Quinta da Regaleira", price: "€15", description: "Pozo Iniciático, jardines" },
                        { time: "12:00-13:30", activity: "Almuerzo centro histórico", price: "€15-20" },
                        { time: "14:00-16:30", activity: "Palacio da Pena", price: "€14 + bus €7.60" },
                        { time: "18:30", activity: "Regreso a Lisboa" }
                    ],
                    walking: "7-8 km con subidas"
                }
            ],
            optionalActivities: [
                { name: "Jardín Botánico de Ajuda", price: "€2" },
                { name: "Elevador de Santa Justa", price: "€5.30" },
                { name: "Mercado da Ribeira", price: "Gratis" },
                { name: "Mirador da Senhora do Monte", price: "Gratis" }
            ],
            localTransport: {
                airport: { 
                    method: "Metro", 
                    price: "€2-3", 
                    duration: "38 min",
                    route: "Línea Roja (Aeroporto → Saldanha) → Línea Amarilla (Saldanha → Rato)"
                },
                sintra: { method: "Tren desde Rossio", price: "€5 ida/vuelta", duration: "40 min" }
            }
        },

        madrid: {
            name: "Madrid",
            country: "España",
            dates: "16-18 Septiembre",
            nights: 3,
            accommodation: {
                name: "Airbnb",
                address: "Calle del Duque de Rivas 8, 28012 Madrid",
                type: "Apartamento"
            },
            food: {
                typical: ["Tortilla española", "Callos", "Bocadillo de calamares", "Churros con chocolate"],
                restaurants: [
                    { name: "La Latina", type: "Tapas", price: "€15-20", location: "Barrio La Latina" },
                    { name: "Mercado de San Miguel", type: "Variado", price: "€15-20" },
                    { name: "Museo del Jamón", type: "Tradicional", price: "€10-15" }
                ]
            },
            activities: [
                {
                    day: 1,
                    date: "16 Sep",
                    items: [
                        { time: "17:05", activity: "Llegada vuelo TAP TP1016 T2" },
                        { time: "18:00", activity: "Metro a Tirso de Molina", price: "€5", duration: "45 min" },
                        { time: "20:00", activity: "Cena en La Latina", price: "€15-20" }
                    ],
                    walking: "2 km"
                },
                {
                    day: 2,
                    date: "17 Sep",
                    items: [
                        { time: "10:00-12:30", activity: "Free Walking Tour", location: "Sol, Plaza Mayor, Catedral", price: "Propina €10" },
                        { time: "13:30-15:00", activity: "Mercado de San Miguel", price: "€15-20" },
                        { time: "15:30-17:30", activity: "Museo del Prado", price: "€15", alternative: "Parque Retiro (gratis)" },
                        { time: "17:30-20:00", activity: "Paseo Gran Vía + Primark" }
                    ],
                    walking: "6-7 km"
                },
                {
                    day: 3,
                    date: "18 Sep",
                    items: [
                        { time: "10:00-12:00", activity: "Reina Sofía o Thyssen", price: "€10-13" },
                        { time: "14:00-15:00", activity: "Comida Museo del Jamón" },
                        { time: "15:00-17:00", activity: "Palacio Real", price: "€12", alternative: "Barrio de las Letras" },
                        { time: "18:00-19:30", activity: "Templo de Debod", price: "Gratis" }
                    ],
                    walking: "5 km"
                }
            ],
            optionalActivities: [
                { name: "Real Jardín Botánico", price: "€6" },
                { name: "Museo Nacional de Ciencias Naturales", price: "€7" },
                { name: "Museo Sorolla", price: "€3" },
                { name: "Museo del Ferrocarril", price: "€6" },
                { name: "CaixaForum Madrid", price: "€6" }
            ],
            localTransport: {
                airport: {
                    method: "Metro",
                    price: "€5 (incluye suplemento)",
                    duration: "45 min",
                    route: "Línea 8 → Línea 10 → Línea 1 (Tirso de Molina)"
                },
                dayPass: { name: "Abono turístico Zona A", price: "€8.40/día" }
            }
        },

        lyon: {
            name: "Lyon",
            country: "Francia",
            dates: "19-20 Septiembre",
            nights: 2,
            accommodation: {
                name: "Airbnb",
                address: "54 Rue Racine, Villeurbanne",
                type: "Apartamento"
            },
            food: {
                typical: ["Bouchons lyonnais", "Quesos", "Embutidos", "Quenelles", "Andouillette", "Salade lyonnaise"],
                restaurants: [
                    { name: "Bouchon tradicional", type: "Cena", price: "€25", location: "Centro" },
                    { name: "Les Halles Paul Bocuse", type: "Mercado gourmet", price: "€20" }
                ]
            },
            activities: [
                {
                    day: 1,
                    date: "19 Sep",
                    items: [
                        { time: "15:50", activity: "Llegada vuelo EasyJet" },
                        { time: "16:30", activity: "Rhônexpress → Part-Dieu", price: "€17", duration: "30 min", alternative: "Taxi €50" },
                        { time: "17:15", activity: "Metro B → Charpennes + caminata", duration: "5 min + 7 min" },
                        { time: "20:00", activity: "Cena en bouchon", price: "€25" }
                    ],
                    walking: "2 km"
                },
                {
                    day: 2,
                    date: "20 Sep",
                    items: [
                        { time: "10:00-12:30", activity: "Free Walking Tour Vieux Lyon", price: "Propina €10" },
                        { time: "12:30-14:00", activity: "Les Halles Paul Bocuse", price: "€20" },
                        { time: "15:30-17:30", activity: "Basílica Fourvière + Teatro", description: "Funicular €2.50" }
                    ],
                    walking: "5 km"
                }
            ],
            optionalActivities: [
                { name: "Vieux-Lyon + traboules", price: "Gratis" },
                { name: "Museo Galo-Romano", price: "€10" },
                { name: "Musée des Beaux-Arts", price: "€12" },
                { name: "Musée des Confluences", price: "€9" },
                { name: "Paseo ribera del Ródano", price: "Gratis" }
            ],
            localTransport: {
                airport: { method: "Rhônexpress", price: "€17", duration: "30 min", alternative: "Taxi €50" },
                metro: { price: "€2", dayPass: "€6.50" }
            }
        },

        chamonix: {
            name: "Chamonix",
            country: "Francia",
            dates: "21-23 Septiembre",
            nights: 3,
            accommodation: {
                name: "Airbnb",
                address: "238 Rue Helbronner, 74400 Chamonix",
                type: "Apartamento"
            },
            food: {
                typical: [
                    "Fondue de queso (Comté, Beaufort, Reblochon)",
                    "Raclette",
                    "Tartiflette",
                    "Farçon",
                    "Charcutería local",
                    "Fish de lago"
                ],
                restaurants: [
                    { name: "La Calèche", type: "Fondue savoyarde", location: "Centro" },
                    { name: "Le Bistrot", type: "Cocina montañesa", location: "Centro" },
                    { name: "Joséphine", type: "Tradicional", location: "Centro" },
                    { name: "L'Atmosphère", type: "Regional", location: "Centro" }
                ]
            },
            multipass: {
                name: "MultiPass 2 días",
                price: "€100.60",
                includes: [
                    "Aiguille du Midi",
                    "Montenvers - Mer de Glace",
                    "Tramway du Mont-Blanc",
                    "Le Brévent",
                    "La Flégère",
                    "Buses locales"
                ]
            },
            activities: [
                {
                    day: 1,
                    date: "21 Sep",
                    items: [
                        { time: "12:20-15:50", activity: "FlixBus desde Lyon", price: "€25" },
                        { time: "16:15", activity: "Check-in Airbnb" },
                        { time: "17:00", activity: "Recoger MultiPass" },
                        { time: "17:30", activity: "Paseo centro" },
                        { time: "19:00", activity: "Cena ligera" }
                    ],
                    walking: "2-3 km"
                },
                {
                    day: 2,
                    date: "22 Sep",
                    items: [
                        { time: "08:40-11:30", activity: "Aiguille du Midi", description: "3,842m, Paso al Vacío", included: "MultiPass" },
                        { time: "12:15", activity: "Almuerzo en Chamonix" },
                        { time: "14:00-17:00", activity: "Montenvers + Mer de Glace", description: "Glaciar, gruta, museo", included: "MultiPass" },
                        { time: "19:30", activity: "Cena" },
                        { time: "21:00", activity: "Paseo nocturno por el río" }
                    ],
                    walking: "6 km"
                },
                {
                    day: 3,
                    date: "23 Sep",
                    items: [
                        { time: "09:21-09:51", activity: "Tren a Le Fayet", included: "MultiPass" },
                        { time: "11:00-11:54", activity: "Tramway du Mont-Blanc", description: "Nid d'Aigle 2,372m", included: "MultiPass" },
                        { time: "14:21-14:51", activity: "Tren regreso a Chamonix" },
                        { time: "16:15-18:00", activity: "Le Brévent", description: "2,525m, vista Mont Blanc", included: "MultiPass" },
                        { time: "18:15-19:30", activity: "La Flégère", description: "Atardecer dorado", included: "MultiPass" },
                        { time: "20:15", activity: "Cena despedida La Calèche", type: "Fondue savoyarde" }
                    ],
                    walking: "6 km"
                }
            ],
            optionalActivities: [
                { name: "Parapente", price: "€100-150" },
                { name: "Spa/Termas", price: "€30-50" },
                { name: "Museo Alpino", price: "€8" }
            ],
            localTransport: {
                buses: "Incluidos con MultiPass",
                parking: "€15-20/día si alquilas coche"
            }
        },

        bruselas: {
            name: "Bruselas",
            country: "Bélgica",
            dates: "24-26 Septiembre",
            nights: 3,
            accommodation: {
                name: "Airbnb",
                address: "Rue des Quatre Fils Aymon 7, 1000 Bruselas",
                type: "Apartamento"
            },
            food: {
                typical: ["Papas fritas belgas", "Waffles", "Moules-frites", "Chocolate"],
                restaurants: [
                    { name: "Chez Alber", type: "Waffles", location: "Brujas" },
                    { name: "Centro histórico", type: "Cena + cerveza", price: "€20" }
                ]
            },
            activities: [
                {
                    day: 1,
                    date: "24 Sep",
                    items: [
                        { time: "08:00-09:10", activity: "Bus a Ginebra", price: "€20", company: "Swiss Tours" },
                        { time: "09:30", activity: "Consigna Cornavin", price: "CHF 10" },
                        { time: "10:00-12:00", activity: "Centro histórico Ginebra" },
                        { time: "12:15-13:15", activity: "Lago Léman", description: "Jet d'Eau, Jardin Anglais" },
                        { time: "13:45-14:00", activity: "Tren al aeropuerto", price: "CHF 3", duration: "7 min" },
                        { time: "17:10-18:30", activity: "Vuelo SN2722 a Bruselas" },
                        { time: "19:00", activity: "Llegada Airbnb" },
                        { time: "20:30", activity: "Grand Place iluminada" }
                    ],
                    walking: "2 km + 5-6 km en Ginebra"
                },
                {
                    day: 2,
                    date: "25 Sep",
                    items: [
                        { time: "10:00-12:30", activity: "Free Walking Tour", price: "Propina €10" },
                        { time: "13:00-15:00", activity: "Atomium + Mini-Europe", price: "€16 + €17" },
                        { time: "16:30", activity: "Parque de Bruselas / chocolaterías" },
                        { time: "20:00", activity: "Cena + cerveza belga", price: "€20" }
                    ],
                    walking: "6-7 km"
                },
                {
                    day: 3,
                    date: "26 Sep",
                    items: [
                        { time: "09:00", activity: "Tren a Brujas", price: "€16 ida", duration: "1h" },
                        { time: "10:15-17:00", activity: "Brujas", description: "Grote Markt, canales, Basílica" },
                        { time: "17:30", activity: "Tren regreso" },
                        { time: "19:00", activity: "Cena en Bruselas" }
                    ],
                    walking: "7-8 km"
                }
            ],
            optionalActivities: [
                { name: "Museo de Ciencias Naturales", price: "€10" },
                { name: "Museo Magritte", price: "€10" },
                { name: "Museos de patatas fritas/chocolate/cerveza", price: "€5-10 c/u" },
                { name: "Historium Brujas", price: "€14" }
            ],
            localTransport: {
                airport: { method: "Tren", price: "€10", duration: "20 min" },
                brujas: { method: "Tren IC", price: "€16 ida", duration: "1h" },
                metro: { singleTicket: "€2.50", dayPass: "€8" }
            },
            ginebra: {
                activities: [
                    "Casco antiguo",
                    "Catedral St. Pierre",
                    "Plaza Bourg-de-Four",
                    "Jet d'Eau",
                    "Jardin Anglais",
                    "Reloj de Flores"
                ],
                walking: "5-6 km"
            }
        }
    },

    // Resumen de costos
    budget: {
        transport: {
            flights: "Variable según temporada",
            buses: { 
                lyonChamonix: 25,
                chamonixGeneva: 20,
                brusselsAmsterdam: "~40"
            },
            localTransport: {
                amsterdam: { daily: 9, single: 3.40 },
                lisboa: { metro: 2, sintraTrain: 5 },
                madrid: { metro: 5, dayPass: 8.40 },
                lyon: { airport: 17, metro: 2 },
                chamonix: { multipass: 100.60 },
                bruselas: { metro: 2.50, brujasTrain: 16 }
            }
        },
        accommodation: {
            averagePerNight: "€30-50 por persona en hostales/Airbnb compartido"
        },
        food: {
            breakfast: "€5-8",
            lunch: "€10-15",
            dinner: "€15-25",
            special: "€25-30 (cenas con espectáculo)"
        },
        activities: {
            freeWalkingTours: "€10 propina",
            museums: "€10-15",
            attractions: "€15-25",
            chamonixMultipass: "€100.60 (2 días)"
        },
        estimatedTotal: {
            perPerson: "€1500-2000 (sin vuelos internacionales)",
            includes: "Alojamiento, comida, transporte local, actividades principales"
        }
    },

    // Estadísticas del viaje
    statistics: {
        totalDays: 19,
        totalNights: 17,
        countriesVisited: 6,
        citiesVisited: 7,
        totalWalking: "~100 km",
        averageWalkingPerDay: "5-6 km",
        flights: 5,
        busRides: 3,
        trainRides: "Múltiples locales"
    }
};

// Exportar para uso en otros scripts
window.itineraryData = itineraryData;