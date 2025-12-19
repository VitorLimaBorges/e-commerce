#!/bin/bash

# 🚀 Quick Start Script for E-Commerce Frontend
# Execute: ./quickstart.sh

echo "================================"
echo "🛒 E-Commerce Frontend Setup"
echo "================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale em: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node -v)"
echo "✅ npm $(npm -v)"
echo ""

# Install dependencies
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✅ Dependências instaladas"
echo ""

# Build check
echo "🔨 Verificando build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build"
    exit 1
fi

echo "✅ Build bem-sucedido"
echo ""

# Start development
echo "🚀 Iniciando servidor de desenvolvimento..."
echo "📍 Abra: http://localhost:3000"
echo ""

npm run dev
