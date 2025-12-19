@echo off
REM Quick Start Script for E-Commerce Frontend (Windows)
REM Execute: quickstart.bat

echo.
echo ================================
echo.
echo 🛒 E-Commerce Frontend Setup
echo.
echo ================================
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js não encontrado. Instale em: https://nodejs.org
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js %NODE_VERSION%
echo ✅ npm %NPM_VERSION%
echo.

REM Install dependencies
echo 📦 Instalando dependências...
call npm install

if errorlevel 1 (
    echo ❌ Erro ao instalar dependências
    exit /b 1
)

echo ✅ Dependências instaladas
echo.

REM Build check
echo 🔨 Verificando build...
call npm run build

if errorlevel 1 (
    echo ❌ Erro no build
    exit /b 1
)

echo ✅ Build bem-sucedido
echo.

REM Start development
echo 🚀 Iniciando servidor de desenvolvimento...
echo 📍 Abra: http://localhost:3000
echo.

call npm run dev
