#!/bin/bash

# Script para actualizar importaciones masivamente
# Este script actualiza las rutas de importación en todos los archivos

echo "🔄 Actualizando importaciones en páginas principales..."

# Actualizar todas las páginas que usan los componentes antiguos
find src/pages -name "*.astro" -exec sed -i 's|from '\''../components/Navigation.astro'\''|from '\''../componentes/layout/Navegacion.astro'\''|g' {} \;
find src/pages -name "*.astro" -exec sed -i 's|from '\''../components/LoadingSpinner.astro'\''|from '\''../componentes/comunes/CargandoGirador.astro'\''|g' {} \;
find src/pages -name "*.astro" -exec sed -i 's|from '\''../components/LoadingSkeleton.astro'\''|from '\''../componentes/comunes/CargandoEsqueleto.astro'\''|g' {} \;
find src/pages -name "*.astro" -exec sed -i 's|from '\''../components/forms/SmartForm.astro'\''|from '\''../componentes/formularios/FormularioInteligente.astro'\''|g' {} \;

# Actualizar también en API endpoints la ruta de database
find src/pages/api -name "*.js" -exec sed -i "s|from '../../../lib/database.js'|from '../../../lib/base-datos/conexion.js'|g" {} \;

echo "✅ Importaciones actualizadas"