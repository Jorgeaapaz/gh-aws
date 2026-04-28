# Retrospectiva de Sesión — 2026-04-28
### Landing page de formación IA + pipeline CI/CD a EC2 con GitHub Actions

---

## Resumen / Overview

Sesión completa de implementación de un proyecto Next.js 16 desde el scaffolding inicial hasta el pipeline de despliegue automático en AWS EC2.

Se partió de un proyecto `create-next-app` vacío. Se refinó el archivo `AGENTS.md` como documento de referencia del proyecto y se implementaron todos los componentes descritos en él:

- Landing page profesional en español para promoción de formación en IA
- Pipeline CI/CD en GitHub Actions (build en runner → rsync standalone → restart systemd)
- Script de bootstrap para la instancia EC2
- Repositorio publicado en GitHub con los tres secrets necesarios

**Estado al cierre de sesión:** pipeline completamente operativo. Bootstrap EC2 ejecutado con éxito, primera Action verde en 27s, aplicación en producción en `http://3.235.47.30:3000`.

---

## Stack técnico / Tech Stack

| Componente | Versión |
|---|---|
| Next.js | 16.2.4 (App Router, `output: standalone`) |
| React | 19.2.4 |
| Tailwind CSS | v4 |
| TypeScript | ^5 |
| Node.js (EC2) | 20 LTS |
| CI/CD | GitHub Actions |
| Hosting | AWS EC2 Ubuntu (`ubuntu@3.235.47.30`) |

---

## Archivos creados o modificados / Files Created or Modified

| Archivo | Acción | Descripción |
|---|---|---|
| `AGENTS.md` | Modificado | Refinado: estructura, tabla de secrets, checklist de tareas |
| `app/globals.css` | Modificado | CSS variables del design system (Neural Dark), reset global |
| `app/layout.tsx` | Modificado | Fuentes Unbounded + Plus Jakarta Sans, metadata en español |
| `app/page.tsx` | Modificado | Landing page completa (8 secciones, `"use client"`) |
| `next.config.ts` | Modificado | Añadido `output: "standalone"` |
| `.github/workflows/deploy.yml` | Creado | Pipeline build → rsync → restart + `workflow_dispatch` |
| `scripts/setup-ec2.sh` | Creado | Bootstrap EC2: Node 20 + systemd service |

---

## Diseño de la landing page / Landing Page Design

**Estética:** "Neural Dark" — fondo `#060612`, acentos teal `#2dd4bf`, violeta `#818cf8`, naranja `#f97316`.

**Fuentes:**
- Display: [Unbounded](https://fonts.google.com/specimen/Unbounded) (peso 400 / 700 / 900)
- Body: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (peso 400–800)

**Secciones en orden:**
1. Nav fijo con glassmorphism
2. Hero — titular grande animado + stats clave
3. Features — 6 tarjetas con stat y descripción
4. Curriculum — acordeón interactivo (6 módulos, 22 semanas)
5. Instructor — bio + métricas
6. Pricing — 3 planes (Esencial €497 / Pro €997 / Elite €1.997)
7. Testimonios — 3 testimonios con avatar inicial
8. CTA final + Footer

---

## Comandos ejecutados / Commands Run

```bash
# Ver estado del repo al inicio
git remote -v
git status

# Añadir remote de GitHub
git remote add origin https://github.com/Jorgeaapaz/gh-aws.git

# Crear repo en GitHub (el remote ya existía → error controlado)
gh repo create Jorgeaapaz/gh-aws --public --push --source .

# Renombrar rama y hacer push
git branch -M main
git push -u origin main

# Configurar secrets en GitHub
gh secret set EC2_SSH_KEY < "C:/ubuntuiso/.ssh/vboxuser"
gh secret set EC2_HOST --body "3.235.47.30"
gh secret set EC2_USER --body "ubuntu"

# Verificar secrets
gh secret list
```

---

## Proceso de despliegue / Deployment Process

### Flujo automático (cada push a `main`)

El workflow `.github/workflows/deploy.yml` realiza los siguientes pasos:

```
push a main
  └─ ubuntu-latest runner
       ├─ actions/checkout@v4
       ├─ actions/setup-node@v4  (Node 20, caché npm)
       ├─ npm ci
       ├─ npm run build           ← genera .next/standalone/
       ├─ cp public/ y .next/static/ dentro del bundle standalone
       ├─ rsync .next/standalone/ → ubuntu@3.235.47.30:/var/www/gh-aws/
       └─ ssh → sudo systemctl restart gh-aws
```

### Bootstrap EC2 (una sola vez — ✅ COMPLETADO 2026-04-28)

```bash
ssh -i C:/ubuntuiso/.ssh/vboxuser ubuntu@3.235.47.30
bash <(curl -s https://raw.githubusercontent.com/Jorgeaapaz/gh-aws/main/scripts/setup-ec2.sh)
```

O copiando el script manualmente:

```bash
scp -i C:/ubuntuiso/.ssh/vboxuser \
  scripts/setup-ec2.sh \
  ubuntu@3.235.47.30:/home/ubuntu/setup-ec2.sh

ssh -i C:/ubuntuiso/.ssh/vboxuser ubuntu@3.235.47.30 "bash setup-ec2.sh"
```

---

## Levantar y detener la aplicación / Running & Stopping

### En local (desarrollo)

```bash
cd D:/Master-IA-Dev/05-Bloque5/1-5-40-nextjs-gh-aws
npm run dev
# → http://localhost:3000
```

### En EC2 (producción)

```bash
# Iniciar
sudo systemctl start gh-aws

# Detener
sudo systemctl stop gh-aws

# Reiniciar
sudo systemctl restart gh-aws

# Ver estado
sudo systemctl status gh-aws

# Seguir logs en tiempo real
sudo journalctl -u gh-aws -f
```

---

## Configuración de red / Network Configuration

La aplicación escucha en el **puerto 3000** de la instancia EC2 pública (`3.235.47.30`). No hay VirtualBox involucrado en el lado servidor — es una instancia AWS real con IP pública.

Para exponer el puerto 80 opcionalmente con nginx como reverse proxy (ver `scripts/setup-ec2.sh` para el bloque de configuración completo):

```nginx
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

> **Nota VirtualBox (desarrollo local):** Si se prueba la landing desde una VM con adaptador NAT, añadir en `C:\Windows\System32\drivers\etc\hosts` (como Administrador):
> ```
> 127.0.0.1   localhost
> ```
> y configurar port forwarding `Host 3000 → Guest 3000`.

---

## URLs / Test URLs

| Entorno | URL |
|---|---|
| Desarrollo local | `http://localhost:3000` |
| Producción (puerto directo) | `http://3.235.47.30:3000` |
| Producción (nginx, tras bootstrap) | `http://3.235.47.30` |

---

## GitHub secrets configurados / GitHub Secrets

| Secret | Valor |
|---|---|
| `EC2_SSH_KEY` | Contenido de `C:/ubuntuiso/.ssh/vboxuser` |
| `EC2_HOST` | `3.235.47.30` |
| `EC2_USER` | `ubuntu` |

Verificar en: `https://github.com/Jorgeaapaz/gh-aws/settings/secrets/actions`

---

## Problemas encontrados / Problems & Solutions

| Problema | Solución |
|---|---|
| `gh repo create --push` falló porque el remote `origin` ya había sido añadido manualmente | El repo sí se creó en GitHub; se ejecutó `git push -u origin main` por separado |
| Next.js 16.2.4 usa APIs distintas a versiones anteriores | Se consultaron los docs en `node_modules/next/dist/docs/` antes de escribir código |
| Las 3 primeras Actions fallaron con `rsync: mkdir "/var/www/gh-aws" failed: Permission denied (13)` | El directorio no existía aún porque el bootstrap EC2 se hizo después de los primeros pushes. Solución: ejecutar `setup-ec2.sh` primero (crea el dir con `chown ubuntu:ubuntu`), luego re-disparar la Action |
| El workflow no tenía `workflow_dispatch`, imposible re-dispararlo manualmente vía `gh workflow run` | Se añadió el trigger `workflow_dispatch` al YAML y se hizo push — la Action siguiente fue verde en 27s |
| Warning en runner: _"Node.js 20 actions are deprecated"_ (actions/checkout@v4, actions/setup-node@v4) | Cosmético por ahora. Antes del **2 de junio de 2026** actualizar a versiones con soporte Node 24, o añadir `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` al workflow |

---

## Tareas pendientes / Pending Tasks

- [ ] Actualizar `actions/checkout` y `actions/setup-node` a versiones con soporte Node 24 antes del 2-jun-2026
- [x] Ejecutar `scripts/setup-ec2.sh` en `ubuntu@3.235.47.30`
- [x] Verificar que la GitHub Action despliega correctamente (✅ run #25070841622, 27s)
- [ ] (Opcional) Configurar nginx como reverse proxy en EC2 para acceso por puerto 80
- [ ] (Opcional) Añadir dominio personalizado y certificado SSL (Let's Encrypt / Certbot)

---

## Resultados y conclusiones / Results & Conclusions

- Pipeline completo implementado y verificado en una sola sesión: desde scaffolding hasta primera Action verde en producción.
- **Lección clave:** el bootstrap EC2 (`setup-ec2.sh`) debe ejecutarse **antes** del primer push a `main`; de lo contrario rsync falla porque `/var/www/gh-aws` no existe todavía.
- El uso de `output: standalone` en Next.js elimina `npm install` en el servidor — solo se transfiere el bundle mínimo vía rsync.
- Añadir `workflow_dispatch` al workflow desde el inicio evita tener que hacer pushes vacíos para re-disparar manualmente.
- El diseño "Neural Dark" es completamente auto-contenido en `app/page.tsx` — sin dependencias de UI externas.
- Aplicación accesible en producción: `http://3.235.47.30:3000`
