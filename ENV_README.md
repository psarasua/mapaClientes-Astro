# Variables de Entorno

Este proyecto requiere las siguientes variables de entorno para funcionar correctamente:

## Configuración

1. **Copia el archivo de ejemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Edita `.env` con tus valores reales:**

### Variables requeridas:

- `DATABASE_URL`: URL de conexión a PostgreSQL
  - Formato: `postgresql://usuario:contraseña@host:puerto/base_de_datos?sslmode=require`
  - Ejemplo: `postgresql://user:pass@localhost:5432/midb?sslmode=require`

- `JWT_SECRET`: Clave secreta para firmar tokens JWT
  - Debe ser una cadena larga y segura
  - Ejemplo: `mi_clave_super_secreta_para_jwt_2024`

## Seguridad

⚠️ **IMPORTANTE**: 
- **NUNCA** subas el archivo `.env` a GitHub
- **NUNCA** compartas tus credenciales de base de datos
- **CAMBIA** el `JWT_SECRET` en producción
- El archivo `.env` ya está incluido en `.gitignore`

## Desarrollo

Para desarrollo local, puedes usar:
- Base de datos local PostgreSQL
- JWT_SECRET temporal (pero cámbialo en producción)

## Producción

Para producción:
- Usa variables de entorno del servidor/hosting
- Genera un JWT_SECRET único y seguro
- Usa credenciales de base de datos de producción