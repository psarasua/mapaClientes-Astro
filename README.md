# Proyecto Astro con JavaScript y Tailwind CSS

Un proyecto limpio de Astro configurado con JavaScript y Tailwind CSS, listo para desarrollo web moderno.

## ✨ Características

- **Astro.js** - Framework web estático optimizado
- **JavaScript** - Sin TypeScript para máxima simplicidad  
- **Tailwind CSS** - Framework de utilidades CSS
- **Estructura limpia** - Sin contenido por defecto, listo para personalizar

## 📁 Estructura del Proyecto

```text
/
├── public/              # Archivos estáticos
│   └── favicon.svg
├── src/
│   ├── components/      # Componentes Astro reutilizables
│   ├── layouts/         # Layouts base
│   │   └── Layout.astro
│   ├── pages/           # Páginas del sitio (rutas)
│   │   └── index.astro
│   └── styles/          # Estilos globales
│       └── global.css
├── astro.config.mjs     # Configuración de Astro
└── package.json
```

## 🚀 Comandos de Desarrollo

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando             | Acción                                          |
| :------------------ | :---------------------------------------------- |
| `npm install`       | Instala las dependencias                       |
| `npm run dev`       | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`     | Construye el sitio para producción en `./dist/` |
| `npm run preview`   | Previsualiza la construcción localmente        |
| `npm run astro ...` | Ejecuta comandos CLI como `astro add`, `astro check` |

## 🛠️ Desarrollo

1. **Clona o usa este proyecto**
2. **Instala dependencias**: `npm install`
3. **Inicia desarrollo**: `npm run dev`
4. **Visita**: `http://localhost:4321`

## 🎨 Personalización

- **Páginas**: Agrega archivos `.astro` en `src/pages/`
- **Componentes**: Crea componentes reutilizables en `src/components/`
- **Estilos**: Usa clases de Tailwind CSS directamente
- **Assets**: Coloca imágenes y archivos estáticos en `public/`

## 📚 Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Discord de Astro](https://astro.build/chat)
