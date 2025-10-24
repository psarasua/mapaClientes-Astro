# 🚀 Deployment Guide - Sistema de Repartos en Netlify

## 🎯 **Configuración para mapaclientes.uy**

Tu proyecto está optimizado para **Netlify + Neon PostgreSQL**

### ✅ **Ventajas de esta configuración:**
- 🌐 **CDN global** - Velocidad óptima desde Uruguay
- � **SSL automático** para mapaclientes.uy
- 🚀 **Deploy automático** desde GitHub
- 💰 **Plan gratuito generoso** - 300 build minutes/mes
- 🐘 **Neon PostgreSQL** - Ya configurada externamente

---

## 📦 **Pasos de Deployment**

### **1. Conectar repositorio a Netlify**
1. Ve a [netlify.com](https://netlify.com)
2. **Sign up** con GitHub
3. **New site from Git** → GitHub
4. Selecciona: `psarasua/mapaClientes-Astro`
5. **Deploy site** (Netlify detecta configuración automáticamente)

### **2. Configurar variables de entorno**
En Netlify Dashboard → **Site settings** → **Environment variables**:

```bash
DATABASE_URL=tu_url_completa_de_neon_postgresql
JWT_SECRET=genera_clave_segura_aqui
NODE_VERSION=18
```

**Generar JWT_SECRET seguro:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### **3. Configurar dominio personalizado**
En Netlify Dashboard → **Domain settings**:

1. **Add custom domain** → `mapaclientes.uy`
2. Netlify te dará instrucciones DNS específicas
3. En panel de **Antel**, configurar:

```
CNAME  www    [tu-site].netlify.app
CNAME  @      [tu-site].netlify.app
```

*O la configuración específica que te proporcione Netlify*

---

## � **Configuración DNS en Antel**

### **Panel de Antel** (configuración típica):
1. Accede al panel de Antel
2. Ve a **Gestión DNS** o **Zona DNS**
3. Añade registros según instrucciones de Netlify:

```
Tipo   Nombre   Valor
CNAME  www      [tu-netlify-url]
CNAME  @        [tu-netlify-url]
```

### **Verificación SSL:**
- ✅ Netlify habilita SSL automáticamente
- ✅ `https://mapaclientes.uy` funcionará en ~24h

---

## 🗄️ **Base de Datos Neon**

### **Variables requeridas:**
Tu `DATABASE_URL` de Neon debe tener formato:
```
postgresql://usuario:password@host.neon.tech/database?sslmode=require
```

### **Verificar conexión:**
En Netlify Functions logs, verificar que conecta correctamente a Neon.

---

## 🚀 **Deploy Automático**

### **Cada push a main:**
1. **GitHub** → push código
2. **Netlify** → detecta cambios automáticamente  
3. **Build** → `npm run build`
4. **Deploy** → Actualización automática en mapaclientes.uy

### **Monitoreo:**
- **Netlify Dashboard** → Deploy logs
- **Functions** → API endpoints logs
- **Analytics** → Traffic y performance

---

## � **Troubleshooting**

### **Build errors:**
```bash
# Verificar localmente
npm run build
```

### **Database connection:**
- Verificar `DATABASE_URL` en environment variables
- Confirmar que Neon está accesible
- Revisar logs en Netlify Functions

### **DNS propagation:**
- Usar [dnschecker.org](https://dnschecker.org) 
- Verificar `mapaclientes.uy`
- Puede tomar hasta 48h (típicamente 2-4h)

---

## � **Performance y Monitoreo**

### **Netlify Analytics:**
- Page views y unique visitors
- Core Web Vitals
- Geographic distribution

### **Optimizaciones aplicadas:**
- ✅ Astro SSR optimizado
- ✅ Tailwind CSS optimizado
- ✅ Animaciones GPU-accelerated
- ✅ CDN global de Netlify

---

## 🎯 **Próximos Pasos**

### **Después del deploy:**
1. ✅ Verificar que `mapaclientes.uy` carga correctamente
2. ✅ Probar login y funcionalidades
3. ✅ Configurar monitoreo de uptime
4. ✅ Configurar backups automáticos en Neon

### **Mejoras futuras:**
- 📧 Notificaciones de deploy
- 🔍 Monitoreo de errores (Sentry)
- 📊 Analytics avanzado
- 🚀 Optimizaciones de performance

---

## 🆘 **Soporte**

### **Recursos útiles:**
- [Netlify Docs](https://docs.netlify.com)
- [Astro Netlify Guide](https://docs.astro.build/en/guides/deploy/netlify/)
- [Neon Documentation](https://neon.tech/docs)

### **En caso de problemas:**
1. Revisar **Netlify Deploy logs**
2. Verificar **Environment variables**
3. Confirmar **DNS configuration** en Antel
4. Probar **Database connection** desde Neon dashboard

---

## 🎉 **¡Tu app estará live en mapaclientes.uy!**

Una vez completados estos pasos, tu Sistema de Repartos estará disponible globalmente con:
- ✅ **SSL/HTTPS** automático
- ✅ **Performance** optimizada
- ✅ **Deploy** automático
- ✅ **Dominio personalizado** funcionando

🚀 **¡Lista para producción!**