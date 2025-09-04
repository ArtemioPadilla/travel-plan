// Inicialización del mapa
var map;
var cityLayers = {};
var currentView = 'all';

// Coordenadas de las ciudades principales
var cities = {
    cdmx: { coords: [19.4326, -99.1332], name: 'Ciudad de México' },
    amsterdam: { coords: [52.3676, 4.9041], name: 'Ámsterdam' },
    lisboa: { coords: [38.7223, -9.1393], name: 'Lisboa' },
    madrid: { coords: [40.4168, -3.7038], name: 'Madrid' },
    lyon: { coords: [45.7640, 4.8357], name: 'Lyon' },
    chamonix: { coords: [45.9237, 6.8694], name: 'Chamonix' },
    bruselas: { coords: [50.8503, 4.3517], name: 'Bruselas' },
    ginebra: { coords: [46.2044, 6.1432], name: 'Ginebra' }
};

// Lugares específicos en cada ciudad
var locations = {
    // Ámsterdam
    amsterdamCentral: [52.3791, 4.9003],
    flyingPig: [52.3780, 4.8985],
    zaanseSchans: [52.4737, 4.8205],
    zaandam: [52.4380, 4.8136],
    
    // Lisboa
    lisboaAirport: [38.7813, -9.1359],
    lisboaAccommodation: [38.7250, -9.1500],
    sintra: [38.7984, -9.3878],
    belem: [38.6967, -9.2159],
    oriente: [38.7678, -9.0990],
    
    // Madrid
    madridAirport: [40.4893, -3.5668],
    madridAccommodation: [40.4070, -3.6931],
    prado: [40.4138, -3.6921],
    retiro: [40.4153, -3.6838],
    
    // Lyon
    lyonAirport: [45.7256, 5.0811],
    lyonAccommodation: [45.7697, 4.8628],
    vieuxLyon: [45.7640, 4.8280],
    fourviere: [45.7623, 4.8223],
    
    // Chamonix
    chamonixSud: [45.9190, 6.8705],
    chamonixAccommodation: [45.9242, 6.8736],
    aiguilleStation: [45.9237, 6.8873],
    aiguilleSommet: [45.8786, 6.8873],
    merDeGlace: [45.9297, 6.9245],
    brevent: [45.9362, 6.8265],
    
    // Bruselas
    bruselasAirport: [50.9014, 4.4844],
    bruselasAccommodation: [50.8476, 4.3572],
    grandPlace: [50.8466, 4.3528],
    atomium: [50.8948, 4.3417],
    brujas: [51.2093, 3.2247]
};

// Iconos personalizados
var icons = {
    flight: L.divIcon({
        html: '<div style="background: #3498db; color: white; border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.3); font-size: 18px;">✈️</div>',
        iconSize: [35, 35],
        className: 'custom-div-icon'
    }),
    bus: L.divIcon({
        html: '<div style="background: #e74c3c; color: white; border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.3); font-size: 18px;">🚌</div>',
        iconSize: [35, 35],
        className: 'custom-div-icon'
    }),
    train: L.divIcon({
        html: '<div style="background: #2ecc71; color: white; border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.3); font-size: 18px;">🚂</div>',
        iconSize: [35, 35],
        className: 'custom-div-icon'
    }),
    city: L.divIcon({
        html: '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.4); font-size: 20px;">📍</div>',
        iconSize: [40, 40],
        className: 'custom-div-icon'
    }),
    attraction: L.divIcon({
        html: '<div style="background: #f39c12; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); font-size: 16px;">⭐</div>',
        iconSize: [30, 30],
        className: 'custom-div-icon'
    })
};

// Función para generar URL de Google Street View
function getStreetViewUrl(lat, lng) {
    return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;
}

// Función para obtener imagen de lugar
function getPlaceImage(title) {
    // Mapa de imágenes específicas para cada lugar
    const placeImages = {
        'Zaanse Schans': 'windmill',
        'Sintra': 'palace',
        'Belém': 'tower',
        'Museo del Prado': 'museum',
        'Parque del Retiro': 'park',
        'Aiguille du Midi': 'mountain',
        'Mer de Glace': 'glacier',
        'Brujas': 'bruges',
        'Atomium': 'brussels',
        'Ciudad de México': 'mexico-city',
        'Ámsterdam': 'amsterdam',
        'Lisboa': 'lisbon',
        'Madrid': 'madrid',
        'Lyon': 'lyon',
        'Chamonix': 'chamonix',
        'Bruselas': 'brussels'
    };
    
    const imageKey = placeImages[title] || 'travel';
    return `https://source.unsplash.com/200x120/?${imageKey}`;
}

// Función para crear popup con Street View y foto
function createEnhancedPopup(title, description, coords, includeImage = true) {
    const streetViewUrl = getStreetViewUrl(coords[0], coords[1]);
    const imageHtml = includeImage ? `<img src="${getPlaceImage(title)}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;">` : '';
    
    return `
        <div style="min-width: 200px; max-width: 250px;">
            ${imageHtml}
            <b style="font-size: 14px;">${title}</b><br>
            <span style="font-size: 12px; color: #666;">${description}</span><br>
            <div style="margin-top: 8px; display: flex; gap: 5px;">
                <a href="${streetViewUrl}" target="_blank" style="flex: 1; padding: 5px 10px; background: #4285f4; color: white; text-decoration: none; border-radius: 4px; font-size: 11px; text-align: center;">
                    📍 Street View
                </a>
                <a href="https://www.google.com/maps/search/${encodeURIComponent(title)}/@${coords[0]},${coords[1]},15z" target="_blank" style="flex: 1; padding: 5px 10px; background: #34a853; color: white; text-decoration: none; border-radius: 4px; font-size: 11px; text-align: center;">
                    🗺️ Ver en Maps
                </a>
            </div>
        </div>
    `;
}

// Función para crear rutas curvas (simulando vuelos)
function createCurvedPath(start, end, color, dashArray = null) {
    var latlngs = [];
    var offsetLat = (end[0] - start[0]) / 4;
    var midLat = (start[0] + end[0]) / 2 + offsetLat;
    var midLng = (start[1] + end[1]) / 2;
    
    // Crear puntos para una curva suave
    for (var i = 0; i <= 100; i++) {
        var t = i / 100;
        var lat = start[0] * (1 - t) * (1 - t) + 2 * midLat * (1 - t) * t + end[0] * t * t;
        var lng = start[1] * (1 - t) + end[1] * t;
        latlngs.push([lat, lng]);
    }
    
    var options = { color: color, weight: 3, opacity: 0.8 };
    if (dashArray) options.dashArray = dashArray;
    
    return L.polyline(latlngs, options);
}

// Inicializar el mapa
function initMap() {
    map = L.map('map').setView([48.8566, 2.3522], 5);
    
    // Agregar capa de mapa con estilo más atractivo
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO',
        maxZoom: 18
    }).addTo(map);
    
    // Crear capas para cada ciudad
    cityLayers.all = L.layerGroup();
    cityLayers.amsterdam = L.layerGroup();
    cityLayers.lisboa = L.layerGroup();
    cityLayers.madrid = L.layerGroup();
    cityLayers.lyon = L.layerGroup();
    cityLayers.chamonix = L.layerGroup();
    cityLayers.bruselas = L.layerGroup();
    
    addAllRoutes();
    addCityMarkers();
    generateTimeline('all');
    
    // Mostrar vista inicial
    showCity('all');
}

// Agregar todas las rutas de transporte
function addAllRoutes() {
    // CDMX → Ámsterdam (vuelo internacional)
    var flightCDMXAMS = createCurvedPath(cities.cdmx.coords, cities.amsterdam.coords, '#3498db', '10, 10');
    flightCDMXAMS.bindPopup('<b>✈️ Vuelo Internacional</b><br>CDMX → Ámsterdam<br>9-10 Sep<br>Llegada: 06:00');
    cityLayers.all.addLayer(flightCDMXAMS);
    cityLayers.amsterdam.addLayer(flightCDMXAMS.bindPopup('<b>✈️ Llegada a Ámsterdam</b><br>10 Sep - 06:00<br>Aeropuerto Schiphol'));
    
    // Ámsterdam → Lisboa (vuelo)
    var flightAMSLIS = createCurvedPath(cities.amsterdam.coords, cities.lisboa.coords, '#3498db', '10, 10');
    flightAMSLIS.bindPopup('<b>✈️ TAP TP671</b><br>Ámsterdam → Lisboa<br>13 Sep<br>18:10 - 20:00');
    cityLayers.all.addLayer(flightAMSLIS);
    cityLayers.lisboa.addLayer(flightAMSLIS);
    
    // Lisboa → Madrid (vuelo)
    var flightLISMAD = createCurvedPath(cities.lisboa.coords, cities.madrid.coords, '#3498db', '10, 10');
    flightLISMAD.bindPopup('<b>✈️ TAP TP1016</b><br>Lisboa → Madrid<br>16 Sep<br>14:45 - 17:05');
    cityLayers.all.addLayer(flightLISMAD);
    cityLayers.madrid.addLayer(flightLISMAD);
    
    // Madrid → Lyon (vuelo)
    var flightMADLYS = createCurvedPath(cities.madrid.coords, cities.lyon.coords, '#3498db', '10, 10');
    flightMADLYS.bindPopup('<b>✈️ EasyJet U2 4392</b><br>Madrid → Lyon<br>19 Sep<br>14:00 - 15:50');
    cityLayers.all.addLayer(flightMADLYS);
    cityLayers.lyon.addLayer(flightMADLYS);
    
    // Lyon → Chamonix (bus)
    var busRoute = [
        cities.lyon.coords,
        [45.9030, 5.1246], // Ambérieu
        [45.9590, 5.3278], // Bellegarde
        [46.0511, 5.8265], // Bonneville
        cities.chamonix.coords
    ];
    var busLyonChamonix = L.polyline(busRoute, {color: '#e74c3c', weight: 4, opacity: 0.8, dashArray: '8, 8'});
    busLyonChamonix.bindPopup('<b>🚌 FlixBus 1779</b><br>Lyon → Chamonix<br>21 Sep<br>12:20 - 15:50');
    cityLayers.all.addLayer(busLyonChamonix);
    cityLayers.chamonix.addLayer(busLyonChamonix);
    
    // Chamonix → Ginebra → Bruselas
    var busChamonixGeneva = L.polyline([cities.chamonix.coords, cities.ginebra.coords], {color: '#e74c3c', weight: 4, opacity: 0.8});
    busChamonixGeneva.bindPopup('<b>🚌 Swiss Tours</b><br>Chamonix → Ginebra<br>24 Sep<br>08:00 - 09:10');
    cityLayers.all.addLayer(busChamonixGeneva);
    cityLayers.bruselas.addLayer(busChamonixGeneva);
    
    var flightGVABRU = createCurvedPath(cities.ginebra.coords, cities.bruselas.coords, '#3498db', '10, 10');
    flightGVABRU.bindPopup('<b>✈️ Brussels Airlines SN2722</b><br>Ginebra → Bruselas<br>24 Sep<br>17:10 - 18:30');
    cityLayers.all.addLayer(flightGVABRU);
    cityLayers.bruselas.addLayer(flightGVABRU);
    
    // Bruselas → Ámsterdam (bus)
    var busBRUAMS = L.polyline([cities.bruselas.coords, cities.amsterdam.coords], {color: '#e74c3c', weight: 4, opacity: 0.8, dashArray: '8, 8'});
    busBRUAMS.bindPopup('<b>🚌 FlixBus 817</b><br>Bruselas → Ámsterdam<br>27 Sep<br>11:15 - 15:05<br>Llegada directa a Schiphol');
    cityLayers.all.addLayer(busBRUAMS);
    
    // Rutas locales en cada ciudad
    addAmsterdamRoutes();
    addLisboaRoutes();
    addMadridRoutes();
    addChamonixRoutes();
    addBruselasRoutes();
}

// Rutas locales de Ámsterdam
function addAmsterdamRoutes() {
    // Excursión a Zaanse Schans
    var routeZaanse = L.polyline([locations.amsterdamCentral, locations.zaanseSchans], 
        {color: '#2ecc71', weight: 3, opacity: 0.7});
    routeZaanse.bindPopup('<b>🚂 Excursión Zaanse Schans</b><br>12 Sep<br>Molinos, quesos y zuecos');
    cityLayers.amsterdam.addLayer(routeZaanse);
    
    L.marker(locations.zaanseSchans, {icon: icons.attraction})
        .bindPopup(createEnhancedPopup('Zaanse Schans', 'Molinos históricos<br>Taller de zuecos<br>Degustación de quesos', locations.zaanseSchans))
        .addTo(cityLayers.amsterdam);
}

// Rutas locales de Lisboa
function addLisboaRoutes() {
    // Excursión a Sintra
    var routeSintra = L.polyline([cities.lisboa.coords, locations.sintra], 
        {color: '#2ecc71', weight: 3, opacity: 0.7});
    routeSintra.bindPopup('<b>🚂 Excursión a Sintra</b><br>15 Sep<br>Quinta da Regaleira y Palacio da Pena');
    cityLayers.lisboa.addLayer(routeSintra);
    
    L.marker(locations.sintra, {icon: icons.attraction})
        .bindPopup(createEnhancedPopup('Sintra', 'Quinta da Regaleira<br>Palacio da Pena<br>Centro histórico', locations.sintra))
        .addTo(cityLayers.lisboa);
    
    // Belém
    L.marker(locations.belem, {icon: icons.attraction})
        .bindPopup(createEnhancedPopup('Belém', 'Torre de Belém<br>Monumento Descubrimientos<br>Pastéis de nata', locations.belem))
        .addTo(cityLayers.lisboa);
}

// Rutas locales de Madrid
function addMadridRoutes() {
    // Puntos de interés
    L.marker(locations.prado, {icon: icons.attraction})
        .bindPopup(createEnhancedPopup('Museo del Prado', 'Arte clásico español', locations.prado))
        .addTo(cityLayers.madrid);
    
    L.marker(locations.retiro, {icon: icons.attraction})
        .bindPopup(createEnhancedPopup('Parque del Retiro', 'Palacio de Cristal<br>Lago con barcas', locations.retiro))
        .addTo(cityLayers.madrid);
}

// Rutas locales de Chamonix
function addChamonixRoutes() {
    // Aiguille du Midi
    var cableAiguille = L.polyline([locations.aiguilleStation, locations.aiguilleSommet], 
        {color: '#9b59b6', weight: 4, opacity: 0.8});
    cableAiguille.bindPopup('<b>🚡 Aiguille du Midi</b><br>3,842m<br>Paso al Vacío<br>Vistas 360°');
    cityLayers.chamonix.addLayer(cableAiguille);
    
    L.marker(locations.aiguilleSommet, {icon: icons.attraction})
        .bindPopup(createEnhancedPopup('Aiguille du Midi', '3,842m de altura<br>Vistas del Mont Blanc', locations.aiguilleSommet))
        .addTo(cityLayers.chamonix);
    
    // Mer de Glace
    L.marker(locations.merDeGlace, {icon: icons.attraction})
        .bindPopup(createEnhancedPopup('Mer de Glace', 'Glaciar más grande de Francia<br>Gruta de hielo', locations.merDeGlace))
        .addTo(cityLayers.chamonix);
}

// Rutas locales de Bruselas
function addBruselasRoutes() {
    // Excursión a Brujas
    var routeBrujas = L.polyline([cities.bruselas.coords, locations.brujas], 
        {color: '#2ecc71', weight: 3, opacity: 0.7});
    routeBrujas.bindPopup('<b>🚂 Excursión a Brujas</b><br>26 Sep<br>Ciudad medieval<br>Canales y chocolate');
    cityLayers.bruselas.addLayer(routeBrujas);
    
    L.marker(locations.brujas, {icon: icons.attraction})
        .bindPopup(createEnhancedPopup('Brujas', 'Centro histórico<br>Canales<br>Basílica Santa Sangre', locations.brujas))
        .addTo(cityLayers.bruselas);
    
    // Atomium
    L.marker(locations.atomium, {icon: icons.attraction})
        .bindPopup(createEnhancedPopup('Atomium', 'Símbolo de Bruselas<br>Mini-Europe', locations.atomium))
        .addTo(cityLayers.bruselas);
}

// Agregar marcadores de ciudades
function addCityMarkers() {
    Object.keys(cities).forEach(function(key) {
        if (key !== 'cdmx' && key !== 'ginebra') {
            var marker = L.marker(cities[key].coords, {icon: icons.city})
                .bindPopup(createEnhancedPopup(cities[key].name, 'Click para ver detalles', cities[key].coords));
            
            cityLayers.all.addLayer(marker);
            if (cityLayers[key]) {
                cityLayers[key].addLayer(marker);
            }
        }
    });
    
    // Marcador especial para CDMX (origen)
    L.marker(cities.cdmx.coords, {icon: icons.flight})
        .bindPopup(createEnhancedPopup('Ciudad de México', '🏠 Punto de partida<br>9 Sep', cities.cdmx.coords))
        .addTo(cityLayers.all);
}

// Función para mostrar ciudad específica
function showCity(city, event) {
    // Limpiar todas las capas
    Object.values(cityLayers).forEach(layer => map.removeLayer(layer));
    
    // Actualizar botones solo si viene de un evento click
    if (event && event.target) {
        document.querySelectorAll('.city-btn').forEach(btn => btn.classList.remove('active'));
        const cityBtn = event.target.closest('.city-btn');
        if (cityBtn) {
            cityBtn.classList.add('active');
        }
    } else {
        // Si no hay evento, actualizar botones por data-city
        document.querySelectorAll('.city-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${city}'`)) {
                btn.classList.add('active');
            }
        });
    }
    
    currentView = city;
    generateTimeline(city);
    
    // Mostrar capa y ajustar vista
    switch(city) {
        case 'all':
            cityLayers.all.addTo(map);
            map.fitBounds([cities.cdmx.coords, cities.bruselas.coords], {padding: [50, 50]});
            break;
        case 'amsterdam':
            cityLayers.amsterdam.addTo(map);
            map.setView(cities.amsterdam.coords, 11);
            break;
        case 'lisboa':
            cityLayers.lisboa.addTo(map);
            map.setView(cities.lisboa.coords, 11);
            break;
        case 'madrid':
            cityLayers.madrid.addTo(map);
            map.setView(cities.madrid.coords, 12);
            break;
        case 'lyon':
            cityLayers.lyon.addTo(map);
            map.setView(cities.lyon.coords, 12);
            break;
        case 'chamonix':
            cityLayers.chamonix.addTo(map);
            map.setView(cities.chamonix.coords, 12);
            break;
        case 'bruselas':
            cityLayers.bruselas.addTo(map);
            map.setView(cities.bruselas.coords, 10);
            break;
    }
}

// Generar timeline dinámico
function generateTimeline(city) {
    var timeline = document.getElementById('timeline');
    var content = '';
    
    if (city === 'all') {
        content = generateFullTimeline();
    } else {
        content = generateCityTimeline(city);
    }
    
    timeline.innerHTML = content;
}

// Timeline completo
function generateFullTimeline() {
    const year = new Date(itineraryData.general.startDate).getFullYear();
    const startDate = new Date(itineraryData.general.startDate);
    const monthMap = { 'Jan':0,'Feb':1,'Mar':2,'Apr':3,'May':4,'Jun':5,'Jul':6,'Aug':7,'Sep':8,'Oct':9,'Nov':10,'Dec':11,
                       'Ene':0,'Feb':1,'Mar':2,'Abr':3,'May':4,'Jun':5,'Jul':6,'Ago':7,'Sep':8,'Oct':9,'Nov':10,'Dic':11 };
    const parseDayDate = (d) => {
        // d like "10 Sep" or "09 Sep" (Spanish month works via map)
        if (!d) return null;
        const parts = d.trim().split(/\s+/); // [DD, Mon]
        if (parts.length < 2) return null;
        const dd = parseInt(parts[0].replace(/\D/g,''), 10);
        const mon = monthMap[parts[1]] ?? 8; // default Sep
        return new Date(year, mon, dd);
    };
    const parseStartTime = (t) => {
        if (!t) return 9999;
        // "HH:MM" or "HH:MM-HH:MM"
        const m = String(t).match(/(\d{1,2}):(\d{2})/);
        if (!m) return 9999;
        return parseInt(m[1],10) * 60 + parseInt(m[2],10);
    };
    const fmtHeader = (dateObj) => {
        const day = String(dateObj.getDate()).padStart(2,'0');
        const monthNames = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        const mon = monthNames[dateObj.getMonth()];
        const diffDays = Math.floor((dateObj - startDate) / (1000*60*60*24)) + 1;
        return `Día ${diffDays} — ${day} ${mon} ${dateObj.getFullYear()}`;
    };
    const mapsLink = (q) => `https://www.google.com/maps/search/${encodeURIComponent(q)}`;
    const infoBadge = (label) => `<span class="info-badge">${label}</span>`;
    const parseWalkingKm = (text) => {
        if (!text) return 0;
        const nums = (text.match(/\d+(?:[\.,]\d+)?/g) || []).map(n => parseFloat(n.replace(',', '.')));
        if (nums.length === 0) return 0;
        // Si es rango, promediar; si es único, usar único
        const avg = nums.reduce((a,b)=>a+b,0) / nums.length;
        return isFinite(avg) ? avg : 0;
    };

    // Reunir eventos de actividades por ciudad (cronológico)
    const events = [];
    const dayWalkingSum = new Map(); // key: ISO date, value: km number
    const dayActivityCount = new Map();
    const dayActivityCost = new Map();
    const addCost = (iso, amount) => {
        if (!amount || isNaN(amount)) return;
        dayActivityCost.set(iso, (dayActivityCost.get(iso) || 0) + amount);
    };
    const parseEuro = (text) => {
        if (!text) return 0;
        const m = String(text).match(/€\s*(\d+)/);
        return m ? parseInt(m[1], 10) : 0;
    };
    Object.keys(itineraryData.cities).forEach(cityKey => {
        const city = itineraryData.cities[cityKey];
        (city.activities || []).forEach(day => {
            const d = parseDayDate(day.date);
            if (!d) return;
            const iso = d.toISOString().slice(0,10);
            const km = parseWalkingKm(day.walking);
            if (km > 0) {
                dayWalkingSum.set(iso, (dayWalkingSum.get(iso) || 0) + km);
            }
            // contar actividades del día y sumar costos de items
            dayActivityCount.set(iso, (dayActivityCount.get(iso) || 0) + (day.items ? day.items.length : 0));
            (day.items || []).forEach(item => {
                const itemCost = parseEuro(item.price);
                addCost(iso, itemCost);
                const href = buildMapsLink(cityKey, city, item);
                const price = item.price ? `<span class="transport-badge">${item.price}</span>` : '';
                const distance = item.distance ? infoBadge(`🚶 ${item.distance}`) : '';
                const duration = item.duration ? infoBadge(`⏱️ ${item.duration}`) : '';
                const included = item.included ? infoBadge(`✅ ${item.included}`) : '';
                const optional = item.optional ? infoBadge('Opcional') : '';
                const timeStr = item.time || '';
                const html = `
                    <div class="timeline-item">
                        <div class="timeline-time">${timeStr}</div>
                        <div class="timeline-title">
                            <a class="maps-link" href="${href}" target="_blank" rel="noopener">${item.activity} — ${city.name}</a>
                            ${price}${distance}${duration}${included}${optional}
                        </div>
                        ${item.description ? `<div class=\"timeline-description\">${item.description}</div>` : ''}
                    </div>`;
                events.push({ date: d, sort: parseStartTime(timeStr), html });
            });
        });
    });

    // Agregar eventos de transporte principal
    (itineraryData.mainTransport || []).forEach(t => {
        let d = null;
        if (/\d{1,2}\s+[A-Za-zÁÉÍÓÚáéíóú]{3,}/.test(t.date)) {
            d = parseDayDate(t.date);
        } else if (/\d{1,2}-\d{1,2}\s+[A-Za-zÁÉÍÓÚáéíóú]{3,}/.test(t.date)) {
            const [range, mon] = t.date.split(/\s+/);
            const startDay = range.split('-')[0];
            d = parseDayDate(`${startDay} ${mon}`);
        }
        if (!d) return;
        const emoji = t.type === 'flight' ? '✈️' : (t.type === 'bus' ? '🚌' : '🚆');
        const time = t.time || '';
        const title = `${emoji} ${t.from} → ${t.to}`;
        const desc = [t.airline ? `${t.airline} ${t.flight || ''}`.trim() : '', t.company, t.route, t.arrival ? `Llegada: ${t.arrival}` : '', t.checkIn ? `Check-in: ${t.checkIn}` : '', t.price ? `Precio: ${t.price}` : '']
            .filter(Boolean).join(' · ');
        const html = `
            <div class="timeline-item">
                <div class="timeline-time">${time || 'Horario'}</div>
                <div class="timeline-title">${title} ${t.price ? `<span class=\"transport-badge\">${t.price}</span>` : ''}</div>
                ${desc ? `<div class=\"timeline-description\">${desc}</div>` : ''}
            </div>`;
        events.push({ date: d, sort: parseStartTime(time), html });
        // sumamos costo de transporte al total del día (opcional pero útil)
        const iso = d.toISOString().slice(0,10);
        addCost(iso, parseEuro(t.price));
    });

    // Agrupar por día
    const byDay = new Map();
    events.sort((a,b) => a.date - b.date || a.sort - b.sort).forEach(ev => {
        const key = ev.date.toISOString().slice(0,10);
        if (!byDay.has(key)) byDay.set(key, { date: ev.date, items: [] });
        byDay.get(key).items.push(ev.html);
    });

    let html = '';
    Array.from(byDay.values()).forEach(group => {
        const iso = group.date.toISOString().slice(0,10);
        const walk = dayWalkingSum.get(iso);
        const walkTxt = walk && walk > 0 ? ` · Caminata: ~${walk.toFixed(1)} km` : '';
        const cnt = dayActivityCount.get(iso) || 0;
        const cntTxt = cnt > 0 ? ` · Actividades: ${cnt}` : '';
        const cost = dayActivityCost.get(iso) || 0;
        const costTxt = cost > 0 ? ` · Costo: €${cost}` : '';
        html += `<div class="timeline-day">${fmtHeader(group.date)}${walkTxt}${cntTxt}${costTxt}</div>`;
        html += group.items.join('');
    });

    return html || '<div class="timeline-item"><div class="timeline-title">Sin datos para mostrar</div></div>';
}

// Timeline por ciudad (versión estática antigua)
function generateCityTimelineStatic(city) {
    var timelines = {
        amsterdam: `
            <div class="timeline-day">🇳🇱 Ámsterdam - 10-12 Septiembre</div>
            <div class="timeline-item">
                <div class="timeline-time">10 Sep - 18:00</div>
                <div class="timeline-title">Llegada a Schiphol</div>
                <div class="timeline-description">Tren a Estación Central (€5). Check-in en Flying Pig Downtown.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">11 Sep - 10:00</div>
                <div class="timeline-title">Free Walking Tour</div>
                <div class="timeline-description">Damrak, Plaza Dam, Barrio Rojo, canales principales. Propina: €10.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">11 Sep - 15:30</div>
                <div class="timeline-title">Exploración del centro</div>
                <div class="timeline-description">De Negen Straatjes para compras. Ferry a Amsterdam Noord. Opcional: Nxt Museum.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">12 Sep - 09:30</div>
                <div class="timeline-title">Excursión Zaanse Schans</div>
                <div class="timeline-description">Tren desde Central (€5). Molinos históricos, taller de zuecos, degustación de quesos.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">12 Sep - 15:45</div>
                <div class="timeline-title">Zaandam</div>
                <div class="timeline-description">Casas verdes tipo LEGO, Inntel Hotel, centro histórico.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">13 Sep - 09:30</div>
                <div class="timeline-title">Última mañana</div>
                <div class="timeline-description">Barrio Chino, Museo de la Prostitución opcional, últimas compras.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">13 Sep - 18:10</div>
                <div class="timeline-title">Vuelo a Lisboa</div>
                <div class="timeline-description">TAP TP671 a Lisboa. Check-in desde 15:45.</div>
            </div>
        `,
        lisboa: `
            <div class="timeline-day">🇵🇹 Lisboa - 13-15 Septiembre</div>
            <div class="timeline-item">
                <div class="timeline-time">13 Sep - 20:00</div>
                <div class="timeline-title">Llegada a Lisboa</div>
                <div class="timeline-description">Metro a Rato (€2). Check-in en Rua Cecílio de Sousa 81.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">14 Sep - 10:00</div>
                <div class="timeline-title">Free Walking Tour</div>
                <div class="timeline-description">Baixa, Chiado, Alfama. Propina: €10.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">14 Sep - 16:00</div>
                <div class="timeline-title">Oceanário</div>
                <div class="timeline-description">Parque das Nações. Entrada: €22.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">14 Sep - 18:00</div>
                <div class="timeline-title">Belém (Opcional)</div>
                <div class="timeline-description">Torre de Belém, Monumento Descubrimientos.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">14 Sep - 20:30</div>
                <div class="timeline-title">Cena con Fado</div>
                <div class="timeline-description">Música tradicional portuguesa. Menú: €25-30.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">15 Sep - 08:30</div>
                <div class="timeline-title">Excursión a Sintra</div>
                <div class="timeline-description">Tren desde Rossio (€5 ida/vuelta).</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">15 Sep - 09:30</div>
                <div class="timeline-title">Quinta da Regaleira</div>
                <div class="timeline-description">Pozo Iniciático, jardines, palacio. Entrada: €15.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">15 Sep - 14:00</div>
                <div class="timeline-title">Palacio da Pena</div>
                <div class="timeline-description">Bus 434 (€7.60). Entrada: €14. Vistas espectaculares.</div>
            </div>
        `,
        madrid: `
            <div class="timeline-day">🇪🇸 Madrid - 16-18 Septiembre</div>
            <div class="timeline-item">
                <div class="timeline-time">16 Sep - 17:05</div>
                <div class="timeline-title">Llegada a Madrid</div>
                <div class="timeline-description">Metro del aeropuerto T2 a Tirso de Molina (€5).</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">16 Sep - 20:00</div>
                <div class="timeline-title">Cena en La Latina</div>
                <div class="timeline-description">Tapas tradicionales. €15-20.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">17 Sep - 10:00</div>
                <div class="timeline-title">Free Walking Tour</div>
                <div class="timeline-description">Puerta del Sol, Plaza Mayor, Catedral, Palacio Real (exterior).</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">17 Sep - 13:30</div>
                <div class="timeline-title">Mercado de San Miguel</div>
                <div class="timeline-description">Comida variada. €15-20.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">17 Sep - 15:30</div>
                <div class="timeline-title">Museo del Prado</div>
                <div class="timeline-description">Arte clásico español. Entrada: €15.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">17 Sep - 17:30</div>
                <div class="timeline-title">Gran Vía</div>
                <div class="timeline-description">Paseo y compras. Visita a Primark.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">18 Sep - 10:00</div>
                <div class="timeline-title">Reina Sofía o Thyssen</div>
                <div class="timeline-description">Museos de arte. €10-13.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">18 Sep - 15:00</div>
                <div class="timeline-title">Palacio Real</div>
                <div class="timeline-description">Visita interior. Entrada: €12.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">18 Sep - 18:00</div>
                <div class="timeline-title">Templo de Debod</div>
                <div class="timeline-description">Templo egipcio. Entrada gratuita. Atardecer.</div>
            </div>
        `,
        lyon: `
            <div class="timeline-day">🇫🇷 Lyon - 19-20 Septiembre</div>
            <div class="timeline-item">
                <div class="timeline-time">19 Sep - 15:50</div>
                <div class="timeline-title">Llegada a Lyon</div>
                <div class="timeline-description">Rhônexpress a Part-Dieu (€17). Metro B a Charpennes.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">19 Sep - 20:00</div>
                <div class="timeline-title">Cena en Bouchon</div>
                <div class="timeline-description">Cocina tradicional lyonesa. €25.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">20 Sep - 10:00</div>
                <div class="timeline-title">Free Walking Tour</div>
                <div class="timeline-description">Vieux Lyon, traboules. Propina: €10.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">20 Sep - 12:30</div>
                <div class="timeline-title">Les Halles Paul Bocuse</div>
                <div class="timeline-description">Mercado gourmet para almorzar. €20.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">20 Sep - 15:30</div>
                <div class="timeline-title">Basílica de Fourvière</div>
                <div class="timeline-description">Funicular (€2.50). Teatro Romano. Vistas panorámicas.</div>
            </div>
        `,
        chamonix: `
            <div class="timeline-day">🏔️ Chamonix - 21-23 Septiembre</div>
            <div class="timeline-item">
                <div class="timeline-time">21 Sep - 15:50</div>
                <div class="timeline-title">Llegada a Chamonix</div>
                <div class="timeline-description">FlixBus desde Lyon. Check-in en 238 Rue Helbronner.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">21 Sep - 17:00</div>
                <div class="timeline-title">Recoger MultiPass</div>
                <div class="timeline-description">2 días de acceso ilimitado. €100.60.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">22 Sep - 08:40</div>
                <div class="timeline-title">Aiguille du Midi</div>
                <div class="timeline-description">Teleférico a 3,842m. Paso al Vacío. Vistas 360°.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">22 Sep - 14:00</div>
                <div class="timeline-title">Montenvers - Mer de Glace</div>
                <div class="timeline-description">Tren cremallera. Glaciar, gruta de hielo, museo Glaciorium.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">23 Sep - 09:21</div>
                <div class="timeline-title">Tramway du Mont-Blanc</div>
                <div class="timeline-description">Tren a Le Fayet. Subida a Nid d'Aigle (2,372m).</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">23 Sep - 16:15</div>
                <div class="timeline-title">Le Brévent</div>
                <div class="timeline-description">Teleférico a 2,525m. Mejor vista del Mont Blanc.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">23 Sep - 18:15</div>
                <div class="timeline-title">La Flégère</div>
                <div class="timeline-description">Atardecer dorado. Terraza panorámica.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">23 Sep - 20:15</div>
                <div class="timeline-title">Cena de despedida</div>
                <div class="timeline-description">La Calèche. Fondue savoyarde.</div>
            </div>
        `,
        bruselas: `
            <div class="timeline-day">🇧🇪 Bruselas - 24-26 Septiembre</div>
            <div class="timeline-item">
                <div class="timeline-time">24 Sep - 08:00</div>
                <div class="timeline-title">Bus a Ginebra</div>
                <div class="timeline-description">Swiss Tours desde Chamonix Sud. 1h 10min.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">24 Sep - 10:00</div>
                <div class="timeline-title">Ginebra - Centro</div>
                <div class="timeline-description">Casco antiguo, Lago Léman, Jet d'Eau.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">24 Sep - 17:10</div>
                <div class="timeline-title">Vuelo a Bruselas</div>
                <div class="timeline-description">Brussels Airlines SN2722. Llegada 18:30.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">24 Sep - 20:30</div>
                <div class="timeline-title">Grand Place iluminada</div>
                <div class="timeline-description">Paseo nocturno por el centro histórico.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">25 Sep - 10:00</div>
                <div class="timeline-title">Free Walking Tour</div>
                <div class="timeline-description">Grand Place, Manneken Pis. Propina: €10.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">25 Sep - 13:00</div>
                <div class="timeline-title">Atomium</div>
                <div class="timeline-description">Símbolo de Bruselas. Entrada: €16.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">25 Sep - 15:00</div>
                <div class="timeline-title">Mini-Europe</div>
                <div class="timeline-description">Monumentos europeos en miniatura. €17.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">26 Sep - 09:00</div>
                <div class="timeline-title">Excursión a Brujas</div>
                <div class="timeline-description">Tren IC (1h, €16). Ciudad medieval, canales, chocolate.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-time">27 Sep - 11:15</div>
                <div class="timeline-title">Bus a Ámsterdam</div>
                <div class="timeline-description">FlixBus 817 directo a Schiphol. Vuelo de regreso.</div>
            </div>
        `
    };
    
    return timelines[city] || '';
}

// Función para cambiar tabs
function switchTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar tab seleccionado
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
    
    // Cargar contenido específico del tab
    if (tabName === 'gastronomy') {
        loadGastronomyContent();
    } else if (tabName === 'budget') {
        calculateBudget();
    } else if (tabName === 'tips') {
        loadTipsContent();
    }
}

// Cargar contenido de gastronomía
function loadGastronomyContent() {
    const foodGrid = document.getElementById('food-grid');
    let html = '';
    
    Object.keys(itineraryData.cities).forEach(cityKey => {
        const city = itineraryData.cities[cityKey];
        const mapsLink = (q) => `https://www.google.com/maps/search/${encodeURIComponent(q)}`;
        html += `
            <div class="food-card">
                <h4>${city.name}</h4>
                <div class="typical-foods">
                    <strong>Comida típica:</strong><br>
                    ${city.food.typical.map(item => `<a class="food-item maps-link" href="${mapsLink(item + ', ' + city.name)}" target="_blank" rel="noopener">${item}</a>`).join('')}
                </div>
                <div class="restaurants-list">
                    <strong>Restaurantes recomendados:</strong>
                    ${city.food.restaurants.map(r => `
                        <div class="restaurant-item">
                            <div>
                                <div class="restaurant-name"><a class="maps-link" href="${mapsLink((r.name || r.type) + ', ' + (r.location || city.name))}" target="_blank" rel="noopener">${r.name}</a></div>
                                <small>${r.type} - ${r.location || ''}</small>
                            </div>
                            ${r.price ? `<span class="restaurant-price">${r.price}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    foodGrid.innerHTML = html;
}

// Cargar contenido de tips
function loadTipsContent() {
    const tipsGrid = document.getElementById('tips-grid');
    
    const tips = [
        {
            title: "🚂 Transporte Local",
            content: "En Ámsterdam considera el GVB Day Pass (€9). En Lisboa usa la tarjeta Viva Viagem. En Madrid el abono turístico Zona A (€8.40/día). El MultiPass de Chamonix (€100.60) incluye todos los teleféricos y buses."
        },
        {
            title: "💶 Dinero",
            content: "Lleva efectivo para propinas en Free Walking Tours (€10 pp). Muchos mercados y lugares pequeños no aceptan tarjeta. Los cajeros cobran comisión, retira cantidades grandes."
        },
        {
            title: "🏨 Check-in",
            content: "Guarda las direcciones offline. Avisa tu hora de llegada. En hostales guarda candado para lockers. Algunos Airbnb tienen check-in automático con códigos."
        },
        {
            title: "✈️ Vuelos",
            content: "Check-in online 24h antes. TAP incluye 1 maleta 23kg. EasyJet cobra por equipaje facturado. Llega 2h antes para vuelos internacionales, 1.5h para europeos."
        },
        {
            title: "🎫 Reservas",
            content: "Reserva con anticipación: Aiguille du Midi (hora específica), tours de comida, restaurantes con espectáculo. Los Free Walking Tours no requieren reserva."
        },
        {
            title: "📱 Conectividad",
            content: "Considera eSIM europea o roaming. WiFi gratis en cafés y alojamientos. Descarga mapas offline de Google Maps o Maps.me para cada ciudad."
        },
        {
            title: "🌡️ Clima Sept",
            content: "Ámsterdam: 15-20°C, posible lluvia. Lisboa: 20-25°C, soleado. Madrid: 18-25°C. Lyon: 15-22°C. Chamonix: 10-18°C, frío en altura. Lleva capas de ropa."
        },
        {
            title: "🚶 Caminatas",
            content: "Promedio 5-6 km/día. Máximo en Sintra y Chamonix (7-8 km con subidas). Lleva calzado cómodo ya usado. Considera descansos en cafés."
        }
    ];
    
    tipsGrid.innerHTML = tips.map(tip => `
        <div class="tip-card">
            <h4>${tip.title}</h4>
            <div class="tip-content">${tip.content}</div>
        </div>
    `).join('');
}

// Calcular presupuesto
function calculateBudget() {
    // Costos de transporte
    const transportHTML = `
        <div class="activity-cost-item">
            <span>FlixBus Lyon-Chamonix</span>
            <span>€25</span>
        </div>
        <div class="activity-cost-item">
            <span>Bus Chamonix-Ginebra</span>
            <span>€20</span>
        </div>
        <div class="activity-cost-item">
            <span>FlixBus Bruselas-AMS</span>
            <span>€40</span>
        </div>
        <div class="activity-cost-item">
            <span>Transportes locales (estimado)</span>
            <span>€150</span>
        </div>
    `;
    document.getElementById('transport-costs').innerHTML = transportHTML;
    
    // Costos de actividades
    const activitiesHTML = `
        <div class="activity-cost-item">
            <span>Free Walking Tours (6x)</span>
            <span>€60</span>
        </div>
        <div class="activity-cost-item">
            <span>MultiPass Chamonix</span>
            <span>€101</span>
        </div>
        <div class="activity-cost-item">
            <span>Museos principales</span>
            <span>€120</span>
        </div>
        <div class="activity-cost-item">
            <span>Excursiones (Sintra, Brujas)</span>
            <span>€50</span>
        </div>
    `;
    document.getElementById('activities-costs').innerHTML = activitiesHTML;
    
    updateBudgetTotals();
}

// Actualizar totales del presupuesto
function updateBudgetTotals() {
    const accommodation = parseFloat(document.getElementById('accommodation-cost').value) || 40;
    const breakfast = parseFloat(document.getElementById('breakfast').value) || 7;
    const lunch = parseFloat(document.getElementById('lunch').value) || 13;
    const dinner = parseFloat(document.getElementById('dinner').value) || 20;
    
    const accommodationTotal = accommodation * 17;
    const dailyFood = breakfast + lunch + dinner;
    const foodTotal = dailyFood * 19;
    
    document.getElementById('accommodation-total').textContent = accommodationTotal;
    document.getElementById('daily-food').textContent = dailyFood;
    document.getElementById('food-total').textContent = foodTotal;
    
    // Calcular total general
    const transportTotal = 235; // Buses
    const localTransport = 150; // Estimado
    const activitiesTotal = 331; // Tours + MultiPass + Museos
    
    const grandTotal = accommodationTotal + foodTotal + transportTotal + localTransport + activitiesTotal;
    document.getElementById('grand-total').textContent = grandTotal.toFixed(0);
}

// Guardar checklist en localStorage
function saveChecklist() {
    const checkboxes = document.querySelectorAll('#checklist-tab input[type="checkbox"]');
    const checkedItems = [];
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            checkedItems.push(index);
        }
    });
    
    localStorage.setItem('europeChecklit', JSON.stringify(checkedItems));
    alert('✅ Checklist guardada!');
}

// Cargar checklist guardada
function loadChecklist() {
    const saved = localStorage.getItem('europeChecklit');
    if (saved) {
        const checkedItems = JSON.parse(saved);
        const checkboxes = document.querySelectorAll('#checklist-tab input[type="checkbox"]');
        
        checkedItems.forEach(index => {
            if (checkboxes[index]) {
                checkboxes[index].checked = true;
            }
        });
    }
}

// Utilidad: construir consulta de Google Maps más precisa
function buildMapsQuery(cityData, item) {
    const cityName = cityData.name || '';
    const country = cityData.country ? `, ${cityData.country}` : '';
    if (!item || !cityData) return cityName + country;
    if (item.mapsQuery) return `${item.mapsQuery}`;
    if (item.location && item.location.trim()) return `${item.location}, ${cityName}${country}`;

    const act = (item.activity || '').trim();
    const desc = (item.description || '').trim();
    const text = `${act} ${desc}`;

    // 1) Flecha → destino
    let m = text.match(/→\s*([A-Za-zÁÉÍÓÚáéíóúñçÇ'’`\-\s]+)/);
    if (m && m[1]) return `${m[1].trim()}, ${cityName}${country}`;

    // 2) "a X" después de medio de transporte o acción común
    m = text.match(/\b(Tren|Bus|Vuelo|Metro|Ferry|Caminata|Taxi|Tranvía|Regreso|Excursión)\s*(?:a|hacia)\s*([A-Za-zÁÉÍÓÚáéíóúñçÇ'’`\-\s]+)/i);
    if (m && m[2]) return `${m[2].trim()}, ${cityName}${country}`;

    // 3) Patrones de alojamiento
    if (/alojamiento|hostal|check\-?in|airbnb|consigna|guardar maletas/i.test(text)) {
        const acc = cityData.accommodation || {};
        const accQ = acc.address || acc.name;
        if (accQ) return `${accQ}, ${cityName}${country}`;
    }

    // 4) Nombres icónicos tal cual
    if (act) return `${act}, ${cityName}${country}`;
    return `${cityName}${country}`;
}

// Lugares base por ciudad para mejorar rutas
const cityRouting = {
    amsterdam: {
        airport: 'Amsterdam Airport Schiphol',
        central: 'Amsterdam Centraal',
        noord: 'Amsterdam Noord'
    },
    lisboa: {
        airport: 'Aeroporto Humberto Delgado (LIS)',
        central: 'Rossio Station',
        rato: 'Rato Metro Station'
    },
    madrid: {
        airport: 'Adolfo Suárez Madrid–Barajas T2',
        tirso: 'Tirso de Molina'
    },
    lyon: {
        airport: 'Lyon–Saint-Exupéry Airport'
    },
    chamonix: {
        bus: 'Chamonix Sud'
    },
    bruselas: {
        central: 'Bruxelles-Central'
    },
    ginebra: {
        bus: 'Place Dorcière'
    }
};

function mapsSearchLink(q) {
    return `https://www.google.com/maps/search/${encodeURIComponent(q)}`;
}

function mapsDirLink(origin, destination, mode = 'transit') {
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${encodeURIComponent(mode)}`;
}

// Construir un enlace de Google Maps (búsqueda o ruta) según el tipo de actividad
function buildMapsLink(cityKey, cityData, item) {
    const places = cityRouting[cityKey] || {};
    const title = (item.activity || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();

    // Llegadas: enlazar al aeropuerto
    if (/\bllegada\b/.test(title) || /\bllegada\b/.test(desc)) {
        if (places.airport) return mapsSearchLink(places.airport);
    }

    // Traslado a aeropuerto (ej. Schiphol)
    if ((/schiphol|aeropuerto|airport/.test(title + ' ' + desc)) && /(traslado|salida|vuelo|check\-in|tren|bus)/.test(title + ' ' + desc)) {
        if (places.airport) {
            const origin = places.central || cityData.name;
            return mapsDirLink(origin, places.airport, 'transit');
        }
    }

    // Patrones de tren
    if (/\btren\b/.test(title) || /\btren\b/.test(desc)) {
        // Estación Central
        if (/estación\s*central/i.test(title + ' ' + desc)) {
            const origin = places.airport || cityData.name;
            const dest = places.central || 'Central Station';
            return mapsDirLink(origin, dest, 'transit');
        }
        // Zaanse Schans (AMS)
        if (cityKey === 'amsterdam' && /(zaandijk|zaanse\s*schans)/i.test(title + ' ' + desc)) {
            const origin = places.central || cityData.name;
            return mapsDirLink(origin, 'Zaandijk Zaanse Schans', 'transit');
        }
        // Rossio → Sintra (Lisboa)
        if (cityKey === 'lisboa' && /(rossio).*?(sintra)/i.test(title + ' ' + desc)) {
            return mapsDirLink('Rossio Station', 'Sintra Station', 'transit');
        }
    }

    // Metro (Lisboa Rato, Madrid Tirso)
    if (/\bmetro\b/.test(title) || /\bmetro\b/.test(desc)) {
        if (cityKey === 'lisboa' && /rato/i.test(title + ' ' + desc)) {
            return mapsDirLink(places.airport || cityData.name, places.rato || 'Rato Metro Station', 'transit');
        }
        if (cityKey === 'madrid' && (/tirso/i.test(title + ' ' + desc))) {
            return mapsDirLink(places.airport || cityData.name, places.tirso || 'Tirso de Molina', 'transit');
        }
    }

    // Ferry a Amsterdam Norte
    if (cityKey === 'amsterdam' && /ferry/i.test(title + ' ' + desc) && /(noord|norte)/i.test(title + ' ' + desc)) {
        return mapsDirLink(places.central || cityData.name, places.noord || 'Amsterdam Noord', 'transit');
    }

    // Alojamiento: check-in / consigna / caminar al hostal
    if (/alojamiento|hostal|check\-?in|airbnb|consigna|guardar maletas/i.test(title + ' ' + desc)) {
        const acc = cityData.accommodation || {};
        const accQ = acc.address || acc.name;
        if (accQ) return mapsSearchLink(`${accQ}, ${cityData.name}${cityData.country ? ', ' + cityData.country : ''}`);
    }

    // Fallback a búsqueda precisa
    const q = buildMapsQuery(cityData, item);
    return mapsSearchLink(q);
}

// Mejorar timeline con datos del data.js
function generateCityTimeline(city) {
    const cityData = itineraryData.cities[city];
    if (!cityData) return '';

    const mapsLink = (query) => `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
    const infoBadge = (label) => `<span class="info-badge">${label}</span>`;

    let html = `<div class="timeline-day">${cityData.name} - ${cityData.dates}</div>`;

    cityData.activities.forEach(day => {
        // Encabezado por día con fecha y caminata estimada
        const walk = day.walking ? ` · Caminata: ${day.walking}` : '';
        html += `<div class="timeline-subday">Día ${day.day} — ${day.date}${walk}</div>`;

        day.items.forEach(item => {
            const title = item.activity;
            const href = buildMapsLink(city, cityData, item);
            const distance = item.distance ? infoBadge(`🚶 ${item.distance}`) : '';
            const duration = item.duration ? infoBadge(`⏱️ ${item.duration}`) : '';
            const included = item.included ? infoBadge(`✅ ${item.included}`) : '';
            const options = item.options && item.options.length ? infoBadge('Opcional') : (item.optional ? infoBadge('Opcional') : '');
            const price = item.price ? `<span class="transport-badge">${item.price}</span>` : '';

            html += `
                <div class="timeline-item">
                    <div class="timeline-time">${item.time || ''}</div>
                    <div class="timeline-title">
                        <a class="maps-link" href="${href}" target="_blank" rel="noopener">${title}</a>
                        ${price}
                        ${distance}${duration}${included}${options}
                    </div>
                    ${item.description ? `<div class="timeline-description">${item.description}</div>` : ''}
                </div>
            `;
        });

        // Actualizar estadísticas del día si está visible
        if (currentView === city) {
            document.getElementById('daily-walking').textContent = day.walking || '-';
            document.getElementById('daily-activities').textContent = day.items.length + ' actividades';

            let dailyCost = 0;
            day.items.forEach(item => {
                if (item.price && item.price.includes('€')) {
                    const match = item.price.match(/€(\d+)/);
                    if (match) dailyCost += parseInt(match[1]);
                }
            });
            document.getElementById('daily-cost').textContent = dailyCost > 0 ? `€${dailyCost}` : '-';
        }
    });

    if (cityData.optionalActivities && cityData.optionalActivities.length > 0) {
        html += `<div class="timeline-day">Actividades Opcionales</div>`;
        cityData.optionalActivities.forEach(activity => {
            const query = `${activity.name}, ${cityData.name}${cityData.country ? ', ' + cityData.country : ''}`;
            html += `
                <div class="timeline-item">
                    <div class="timeline-title">
                        <a class="maps-link" href="${mapsLink(query)}" target="_blank" rel="noopener">${activity.name}</a>
                        ${activity.price ? `<span class=\"transport-badge\">${activity.price}</span>` : ''}
                    </div>
                </div>
            `;
        });
    }

    return html;
}

// Agregar más marcadores al mapa con restaurantes y atracciones
function addDetailedMarkers() {
    // Agregar marcadores de restaurantes importantes
    const restaurantIcon = L.divIcon({
        html: '<div style="background: #e67e22; color: white; border-radius: 50%; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); font-size: 14px;">🍴</div>',
        iconSize: [25, 25],
        className: 'custom-div-icon'
    });
    
    // Añadir algunos restaurantes clave
    if (itineraryData.cities.chamonix) {
        L.marker([45.9238, 6.8690], {icon: restaurantIcon})
            .bindPopup('<b>La Calèche</b><br>Fondue savoyarde<br>Cena de despedida')
            .addTo(cityLayers.chamonix);
    }
    
    if (itineraryData.cities.lisboa) {
        L.marker([38.7100, -9.1330], {icon: restaurantIcon})
            .bindPopup('<b>Casa con Fado</b><br>Cena tradicional<br>€25-30')
            .addTo(cityLayers.lisboa);
    }
}

// Toggle menú móvil
function toggleMobileMenu() {
    const selector = document.querySelector('.city-selector');
    selector.classList.toggle('active');
    const btn = document.getElementById('mobileMenuBtn');
    btn.textContent = selector.classList.contains('active') ? '✕ Cerrar' : '☰ Menú';
}

// Función de búsqueda
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        let results = [];
        
        // Buscar en ciudades
        Object.keys(itineraryData.cities).forEach(cityKey => {
            const city = itineraryData.cities[cityKey];
            if (city.name.toLowerCase().includes(query)) {
                results.push({
                    type: 'ciudad',
                    name: city.name,
                    action: () => showCity(cityKey)
                });
            }
            
            // Buscar en actividades
            city.activities.forEach(day => {
                day.items.forEach(item => {
                    if (item.activity.toLowerCase().includes(query)) {
                        results.push({
                            type: 'actividad',
                            name: `${item.activity} - ${city.name}`,
                            action: () => {
                                showCity(cityKey);
                                switchTab('timeline');
                            }
                        });
                    }
                });
            });
            
            // Buscar en restaurantes
            city.food.restaurants.forEach(rest => {
                if (rest.name.toLowerCase().includes(query)) {
                    results.push({
                        type: 'restaurante',
                        name: `${rest.name} - ${city.name}`,
                        action: () => {
                            showCity(cityKey);
                            switchTab('gastronomy');
                        }
                    });
                }
            });
        });
        
        // Mostrar resultados
        if (results.length > 0) {
            searchResults.innerHTML = results.slice(0, 10).map(r => `
                <div class="search-result-item" onclick="executeSearch('${r.name}')">
                    <span class="result-type">${r.type}</span>
                    <span class="result-name">${r.name}</span>
                </div>
            `).join('');
            searchResults.style.display = 'block';
            
            // Guardar acciones en objeto global
            window.searchActions = {};
            results.forEach(r => {
                window.searchActions[r.name] = r.action;
            });
        } else {
            searchResults.innerHTML = '<div class="search-result-item">Sin resultados</div>';
            searchResults.style.display = 'block';
        }
    });
    
    // Cerrar resultados al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Ejecutar búsqueda seleccionada
function executeSearch(name) {
    if (window.searchActions && window.searchActions[name]) {
        window.searchActions[name]();
        document.getElementById('searchResults').style.display = 'none';
        document.getElementById('searchInput').value = '';
    }
}

// Mejorar el mapa con controles de capas
function enhanceMap() {
    // Crear grupos de capas para el control
    const overlayMaps = {
        "🚌 Transporte": L.layerGroup(),
        "🍴 Restaurantes": L.layerGroup(),
        "⭐ Atracciones": L.layerGroup(),
        "🏨 Alojamientos": L.layerGroup()
    };
    
    // Agregar control de capas
    L.control.layers(null, overlayMaps, {
        collapsed: false,
        position: 'topright'
    }).addTo(map);
    
    // Agregar marcadores a las capas correspondientes
    addRestaurantMarkers(overlayMaps["🍴 Restaurantes"]);
    addAttractionMarkers(overlayMaps["⭐ Atracciones"]);
    addAccommodationMarkers(overlayMaps["🏨 Alojamientos"]);
    
    // Activar todas las capas por defecto
    Object.values(overlayMaps).forEach(layer => layer.addTo(map));
}

// Agregar marcadores de restaurantes
function addRestaurantMarkers(layer) {
    const restaurantIcon = L.divIcon({
        html: '<div style="background: #e67e22; color: white; border-radius: 50%; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); font-size: 14px;">🍴</div>',
        iconSize: [25, 25],
        className: 'custom-div-icon'
    });
    
    // Agregar restaurantes de cada ciudad
    const restaurants = {
        amsterdam: [[52.3745, 4.8979], "De Kraai - Zaanse Schans"],
        lisboa: [[38.7100, -9.1330], "Casa con Fado"],
        madrid: [[40.4150, -3.7074], "Mercado de San Miguel"],
        lyon: [[45.7640, 4.8357], "Les Halles Paul Bocuse"],
        chamonix: [[45.9238, 6.8690], "La Calèche"],
        bruselas: [[50.8466, 4.3528], "Grand Place - Waffles"]
    };
    
    Object.entries(restaurants).forEach(([city, [coords, name]]) => {
        const link = `https://www.google.com/maps/search/${encodeURIComponent(name)}`;
        L.marker(coords, {icon: restaurantIcon})
            .bindPopup(`<b>${name}</b><br><a href="${link}" target="_blank">🗺️ Abrir en Google Maps</a>`)
            .addTo(layer);
    });
}

// Agregar marcadores de atracciones
function addAttractionMarkers(layer) {
    const attractionIcon = L.divIcon({
        html: '<div style="background: #f39c12; color: white; border-radius: 50%; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); font-size: 14px;">⭐</div>',
        iconSize: [25, 25],
        className: 'custom-div-icon'
    });
    
    // Más atracciones
    const attractions = {
        amsterdamAnnaFrank: [[52.3752, 4.8840], "Casa de Ana Frank"],
        lisboaTorre: [[38.6916, -9.2159], "Torre de Belém"],
        madridPrado: [[40.4138, -3.6921], "Museo del Prado"],
        madridRetiro: [[40.4153, -3.6838], "Parque del Retiro"],
        lyonFourviere: [[45.7623, 4.8223], "Basílica de Fourvière"],
        chamonixAiguille: [[45.8786, 6.8873], "Aiguille du Midi"],
        bruselasAtomium: [[50.8948, 4.3417], "Atomium"]
    };
    
    Object.entries(attractions).forEach(([key, [coords, name]]) => {
        const link = `https://www.google.com/maps/search/${encodeURIComponent(name)}`;
        L.marker(coords, {icon: attractionIcon})
            .bindPopup(`<b>${name}</b><br><a href="${link}" target="_blank">🗺️ Abrir en Google Maps</a>`)
            .addTo(layer);
    });
}

// Agregar marcadores de alojamientos
function addAccommodationMarkers(layer) {
    const hotelIcon = L.divIcon({
        html: '<div style="background: #8e44ad; color: white; border-radius: 50%; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); font-size: 14px;">🏨</div>',
        iconSize: [25, 25],
        className: 'custom-div-icon'
    });
    
    Object.entries(locations).forEach(([key, coords]) => {
        if (key.includes('Accommodation') || key === 'flyingPig' || key === 'airbnb') {
            const cityName = key.replace('Accommodation', '').replace('flyingPig', 'Amsterdam').replace('airbnb', 'Chamonix');
            const name = `Alojamiento ${cityName}`;
            const link = `https://www.google.com/maps/search/${encodeURIComponent(name)}`;
            L.marker(coords, {icon: hotelIcon})
                .bindPopup(`<b>${name}</b><br><a href="${link}" target="_blank">🗺️ Abrir en Google Maps</a>`)
                .addTo(layer);
        }
    });
}

// Función de imprimir
function printItinerary() {
    window.print();
}

// Agregar botón de imprimir
function addPrintButton() {
    const header = document.querySelector('.header');
    const printBtn = document.createElement('button');
    printBtn.className = 'print-btn';
    printBtn.innerHTML = '🖨️ Imprimir/PDF';
    printBtn.onclick = printItinerary;
    header.appendChild(printBtn);
}

// Función para manejar el modo oscuro
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Verificar preferencia guardada
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
    
    // Toggle del modo oscuro
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('darkMode', null);
            darkModeToggle.textContent = '🌙';
        }
    });
}

// Función para generar la vista de calendario
function generateCalendar() {
    const calendarView = document.getElementById('calendar-view');
    if (!calendarView) return;
    
    // Datos del viaje
    const tripData = {
        9: { city: 'CDMX → ✈️', types: ['flight-day'] },
        10: { city: 'Ámsterdam', types: ['travel-day'] },
        11: { city: 'Ámsterdam', types: ['travel-day'] },
        12: { city: 'Ámsterdam', types: ['travel-day'] },
        13: { city: 'AMS → LIS ✈️', types: ['flight-day'] },
        14: { city: 'Lisboa', types: ['travel-day'] },
        15: { city: 'Lisboa', types: ['travel-day'] },
        16: { city: 'LIS → MAD ✈️', types: ['flight-day'] },
        17: { city: 'Madrid', types: ['travel-day'] },
        18: { city: 'Madrid', types: ['travel-day'] },
        19: { city: 'MAD → LYS ✈️', types: ['flight-day'] },
        20: { city: 'Lyon', types: ['travel-day'] },
        21: { city: 'Lyon → Chamonix 🚌', types: ['bus-day'] },
        22: { city: 'Chamonix', types: ['travel-day'] },
        23: { city: 'Chamonix', types: ['travel-day'] },
        24: { city: 'Chamonix → BRU', types: ['bus-day', 'flight-day'] },
        25: { city: 'Bruselas', types: ['travel-day'] },
        26: { city: 'Bruselas (Brujas)', types: ['travel-day'] },
        27: { city: 'BRU → AMS → ✈️', types: ['bus-day', 'flight-day'] }
    };
    
    // Limpiar calendario
    calendarView.innerHTML = '';
    
    // Agregar encabezados de días
    const dayHeaders = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.textContent = day;
        calendarView.appendChild(header);
    });
    
    // Septiembre 2025 empieza en Lunes (día 1)
    const firstDay = 1; // Lunes
    const daysInMonth = 30;
    
    // Agregar días vacíos antes del día 1
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendarView.appendChild(emptyDay);
    }
    
    // Agregar días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        
        // Agregar número del día
        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = day;
        dayDiv.appendChild(dayNumber);
        
        // Si es un día del viaje, agregar información
        if (tripData[day]) {
            // Agregar cada tipo como clase separada
            tripData[day].types.forEach(type => {
                dayDiv.classList.add(type);
            });
            dayDiv.classList.add('travel-day');
            
            const content = document.createElement('div');
            content.className = 'calendar-day-content';
            
            const citySpan = document.createElement('span');
            citySpan.className = 'calendar-day-city';
            citySpan.textContent = tripData[day].city;
            content.appendChild(citySpan);
            
            dayDiv.appendChild(content);
        }
        
        calendarView.appendChild(dayDiv);
    }
    
    // Agregar leyenda
    const legendHTML = `
        <div class="calendar-legend">
            <div class="calendar-legend-item">
                <div class="calendar-legend-box" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%); border: 2px solid #667eea;"></div>
                <span>Día de viaje</span>
            </div>
            <div class="calendar-legend-item">
                <span>✈️ Vuelo</span>
            </div>
            <div class="calendar-legend-item">
                <span>🚌 Bus</span>
            </div>
        </div>
    `;
    
    const legendDiv = document.createElement('div');
    legendDiv.innerHTML = legendHTML;
    calendarView.parentElement.appendChild(legendDiv.firstElementChild);
}

// Función para ocultar pantalla de carga
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // Ocultar inmediatamente si ya pasó mucho tiempo
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Timeout de seguridad para el loading screen
setTimeout(() => {
    console.log('Forzando cierre de loading screen por timeout');
    hideLoadingScreen();
}, 3000); // Máximo 3 segundos de loading

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - Iniciando aplicación');
    
    try {
        // Inicialización con manejo de errores
        console.log('Inicializando mapa...');
        initMap();
        
        console.log('Mejorando mapa...');
        enhanceMap();
        
        console.log('Agregando marcadores...');
        addDetailedMarkers();
        
        console.log('Cargando checklist...');
        loadChecklist();
        
        console.log('Inicializando búsqueda...');
        initSearch();
        
        console.log('Inicializando modo oscuro...');
        initDarkMode();
        
        console.log('Generando calendario...');
        generateCalendar();
        
        console.log('Agregando botón de impresión...');
        addPrintButton();
        
        // Verificar si hay elementos antes de agregar event listeners
        const accommodationCost = document.getElementById('accommodation-cost');
        if (accommodationCost) {
            accommodationCost.addEventListener('input', updateBudgetTotals);
            const breakfast = document.getElementById('breakfast');
            const lunch = document.getElementById('lunch');
            const dinner = document.getElementById('dinner');
            
            if (breakfast) breakfast.addEventListener('input', updateBudgetTotals);
            if (lunch) lunch.addEventListener('input', updateBudgetTotals);
            if (dinner) dinner.addEventListener('input', updateBudgetTotals);
        }
        
        // Cargar contenido inicial
        console.log('Cargando contenido gastronómico...');
        loadGastronomyContent();
        
        console.log('Cargando tips...');
        loadTipsContent();
        
        console.log('Calculando presupuesto...');
        calculateBudget();
        
        // Detectar si es móvil
        if (window.innerWidth <= 768) {
            const citySelector = document.querySelector('.city-selector');
            if (citySelector) {
                citySelector.classList.remove('active');
            }
        }
        
        console.log('Inicialización completada exitosamente');
        
    } catch (error) {
        console.error('Error durante la inicialización:', error);
        console.error('Stack:', error.stack);
    } finally {
        // Siempre ocultar pantalla de carga
        console.log('Ocultando pantalla de carga...');
        hideLoadingScreen();
    }
});

// Hacer funciones globales
window.showCity = showCity;
window.switchTab = switchTab;
window.saveChecklist = saveChecklist;
window.toggleMobileMenu = toggleMobileMenu;
window.executeSearch = executeSearch;
window.printItinerary = printItinerary;
