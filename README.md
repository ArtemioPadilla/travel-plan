# 🌍 Itinerario Europa 2025 - PWA Interactiva

Una Progressive Web App (PWA) completa que muestra el itinerario detallado de un viaje por Europa del 9 al 27 de septiembre de 2025, con mapas interactivos, información gastronómica, presupuesto y más.

## 🚀 Demo en Vivo

Visita el sitio en: [https://artemiopadilla.github.io/travel-plan/](https://artemiopadilla.github.io/travel-plan/)

## ✨ Características Principales

### 🗺️ Mapa Interactivo
- Rutas reales de transporte (no líneas rectas)
- Marcadores detallados con fotos y Street View
- Control de capas para filtrar por categorías
- Zoom automático por ciudad

### 📱 Progressive Web App (PWA)
- **Instalable** en dispositivos móviles y desktop
- **Funciona offline** con Service Worker
- **Responsive** - Optimizado para móviles
- **Modo oscuro** con persistencia

### 📅 Múltiples Vistas
- **Timeline** - Itinerario día por día con horarios
- **Calendario** - Vista mensual de septiembre 2025
- **Gastronomía** - Platos típicos y restaurantes
- **Presupuesto** - Calculadora interactiva
- **Tips** - Consejos prácticos por categoría
- **Checklist** - Lista de preparativos con persistencia

### 🔍 Funcionalidades Avanzadas
- **Búsqueda global** - Encuentra ciudades, actividades, restaurantes
- **Street View** - Enlaces directos a Google Street View
- **Contador regresivo** - Tiempo hasta el viaje
- **Impresión optimizada** - CSS especial para imprimir
- **Loading states** - Animaciones y transiciones suaves

## 🗓️ Itinerario del Viaje

### Ruta General
**CDMX → Ámsterdam → Lisboa → Madrid → Lyon → Chamonix → Bruselas → CDMX**

### Ciudades y Fechas
- 🇳🇱 **Ámsterdam** (10-13 Sep) - Flying Pig Hostel
- 🇵🇹 **Lisboa** (13-16 Sep) - Goodmorning Solo Traveller's Hostel
- 🇪🇸 **Madrid** (16-19 Sep) - Sungate One
- 🇫🇷 **Lyon** (19-21 Sep) - HO36 Hostel
- 🏔️ **Chamonix** (21-24 Sep) - Airbnb con amigo
- 🇧🇪 **Bruselas** (24-27 Sep) - The Scott's Hotel

### Transportes
- ✈️ **5 vuelos** - CDMX-AMS, AMS-LIS, LIS-MAD, MAD-LYS, GVA-BRU
- 🚌 **3 buses** - Lyon-Chamonix, Chamonix-Ginebra, Bruselas-Ámsterdam
- 🚂 **Múltiples trenes locales** - Excursiones y transporte urbano

## 🛠️ Stack Tecnológico

- **Frontend**: HTML5, CSS3 (Grid, Flexbox), JavaScript ES6+
- **Mapas**: Leaflet.js + OpenStreetMap
- **PWA**: Service Worker, Web App Manifest
- **Optimización**: Lazy loading, Cache API
- **Diseño**: Mobile-first, Dark mode, Print styles

## 📦 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/artemiopadilla/travel-plan.git

# Navegar al directorio
cd travel-plan

# Instalar dependencias (solo para desarrollo)
npm install

# Generar iconos (opcional)
npm run generate-icons

# Servir localmente
python -m http.server 8000
# O usar cualquier servidor HTTP local
```

## 🚀 Despliegue en GitHub Pages

1. Fork este repositorio
2. Ve a Settings → Pages
3. Selecciona Source: Deploy from branch
4. Selecciona Branch: main (o master)
5. Selecciona Folder: / (root)
6. Guarda y espera el despliegue

## 📱 Instalación como PWA

### En móviles:
1. Abre el sitio en Chrome/Safari
2. Toca el menú (⋮ o compartir)
3. Selecciona "Agregar a pantalla de inicio"

### En desktop:
1. Abre el sitio en Chrome/Edge
2. Click en el icono de instalación en la barra de direcciones
3. O ve a Menú → Instalar app

## 🎨 Personalización

### Cambiar colores:
Edita las variables en `styles.css`:
```css
/* Colores principales */
--primary: #667eea;
--secondary: #764ba2;
```

### Actualizar itinerario:
Modifica `data.js` con tu información:
```javascript
const itineraryData = {
    cities: {
        // Tu información aquí
    }
};
```

### Agregar ciudades al mapa:
En `script.js`:
```javascript
var cities = {
    tuCiudad: { coords: [lat, lng], name: 'Nombre' }
};
```

## 📁 Estructura del Proyecto

```
travel-plan/
├── index.html          # Estructura principal
├── styles.css          # Estilos generales
├── mobile.css          # Estilos móviles
├── print.css           # Estilos de impresión
├── script.js           # Lógica principal
├── data.js             # Datos del itinerario
├── manifest.json       # PWA manifest
├── service-worker.js   # Offline functionality
├── icons/              # Iconos PWA
├── generate-icons.js   # Script generador de iconos
├── robots.txt          # SEO
├── sitemap.xml         # SEO
└── README.md           # Documentación

```

## 🌟 Características por Implementar

- [ ] Integración con Google Calendar
- [ ] Compartir itinerario por WhatsApp
- [ ] Modo colaborativo para viajes en grupo
- [ ] Tracking de gastos en tiempo real
- [ ] Integración con APIs de clima
- [ ] Notificaciones push para recordatorios

## 📝 Licencia

MIT License - Siéntete libre de usar este proyecto para tu propio viaje

## 🤝 Contribuciones

Las contribuciones son bienvenidas:
1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la branch (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📧 Contacto

Artemio Padilla - [@artemiopadilla](https://github.com/artemiopadilla)

---

Hecho con ❤️ para el viaje Europa 2025