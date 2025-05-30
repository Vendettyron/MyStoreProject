# Documentación de la Arquitectura y Flujo de la Aplicación - Módulo Almacén

## Ubicación del Módulo
La aplicación principal a mostrar se encuentra en:  
`src/apps/almacen`

---

## Estructura General (Clean Architecture)

El módulo almacén está diseñado siguiendo los principios de **Clean Architecture**, dividiendo el código en capas bien definidas para lograr separación de responsabilidades, independencia de frameworks y facilidad de mantenimiento.

Las capas principales son:

- **domain** (Dominio)
- **application** (Casos de uso)
- **infrastructure** (Infraestructura)
- **interfaces** (Interfaces/Adaptadores primarios)
- **shared** (Componentes compartidos)

---

## Descripción de cada carpeta y su propósito

### 1. **domain**
Contiene la lógica central del negocio y las reglas del dominio.  
**Propósito:**  
- Define las entidades principales (por ejemplo, `Producto`, `MateriaPrima`, `OrdenProduccion`).
- Declara las interfaces de los repositorios (contratos que debe cumplir la infraestructura).
- Aquí NO hay dependencias de frameworks ni de la base de datos.

**Ejemplo de contenido:**
- `productoEntity.ts` → Entidad y validaciones de Producto.
- `productoRepository.ts` → Interfaz del repositorio de productos.
- `materiaPrimaEntity.ts`, `ordenProduccionEntity.ts`, etc.

---

### 2. **application**
Contiene los **casos de uso** de la aplicación.  
**Propósito:**  
- Orquesta la lógica de aplicación, coordinando entidades y repositorios.
- Recibe datos de los controladores, los valida y ejecuta la lógica necesaria.
- No depende de frameworks ni de la base de datos, solo de las interfaces del dominio.

**Ejemplo de contenido:**
- `productoUseCases.ts` → Casos de uso para crear, modificar, obtener productos.
- `materiaPrimaUseCases.ts`, `ordenProduccionUseCases.ts`, etc.

---

### 3. **infrastructure**
Contiene las implementaciones concretas de los repositorios y servicios externos.  
**Propósito:**  
- Implementa las interfaces definidas en el dominio usando tecnologías concretas (por ejemplo, Supabase, JWT, etc).
- Incluye middlewares, conexión a la base de datos y adaptadores externos.
- Si se cambia la tecnología de base de datos, solo se modifica aquí.

**Ejemplo de contenido:**
- `productoRepository.ts` → Implementación concreta del repositorio de productos usando Supabase.
- `materiaPrimaRepository.ts`, `ordenProduccionRepository.ts`.
- `middlewares/` → Middlewares de autenticación, autorización, permisos.
- `db/` → Conexión a la base de datos.

---

### 4. **interfaces**
Contiene los adaptadores primarios, es decir, la entrada y salida de la aplicación.  
**Propósito:**  
- Define los controladores HTTP (reciben las peticiones, extraen datos y llaman a los casos de uso).
- Define las rutas HTTP y conecta los controladores con el framework web (Fastify).
- No contiene lógica de negocio, solo orquesta el flujo entre la web y la aplicación.

**Ejemplo de contenido:**
- `controllers/` → Controladores para productos, materia prima, órdenes de producción.
- `routes/` → Definición de rutas HTTP y registro de middlewares.

---

### 5. **shared**
Componentes y utilidades compartidas entre módulos.  
**Propósito:**  
- Diccionarios de estados, roles y permisos.
- Esquemas de validación (TypeBox) para peticiones y respuestas.
- Utilidades comunes como manejo de errores.

**Ejemplo de contenido:**
- `schemas/` → Esquemas de validación para productos, materia prima, etc.
- `dictionaries/` → Diccionarios de estados, roles, permisos.
- `utils/` → Funciones utilitarias como `handleError`, `appError`.

---

## Flujo de una petición típica (ejemplo: Crear Producto)

1. **El cliente realiza una petición HTTP** (por ejemplo, POST `/producto/crear-producto`).
2. **La ruta** en `interfaces/http/routes/producto.routes.ts` recibe la petición, aplica middlewares de autenticación, rol y permisos.
3. **El controlador** en `interfaces/http/controllers/proucto.controller.ts` extrae los datos, valida la autenticación y llama al caso de uso correspondiente.
4. **El caso de uso** en `application/use-cases/producto/productoUseCases.ts` recibe los datos, crea la entidad de dominio y llama al repositorio (a través de la interfaz del dominio).
5. **El repositorio concreto** en `infrastructure/producto/productoRepository.ts` ejecuta la operación en la base de datos (Supabase).
6. **La respuesta** se propaga de vuelta por el mismo flujo hasta el cliente.

---

## Ventajas de esta arquitectura

- **Separación de responsabilidades:** Cada capa tiene un propósito claro y definido.
- **Independencia de frameworks:** El dominio y los casos de uso no dependen de Fastify, Supabase ni ninguna tecnología externa.
- **Facilidad de pruebas:** Se pueden probar los casos de uso y el dominio sin necesidad de infraestructura real.
- **Escalabilidad y mantenibilidad:** Cambios en la base de datos, framework web o reglas de negocio afectan solo a la capa correspondiente.

---

## Resumen visual del flujo
