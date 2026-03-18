#!/bin/bash

# LifeOS Complete Setup Script
# This creates the entire production-ready project structure

PROJECT_NAME="lifeos-neural-platform"
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

# Create directory structure
mkdir -p {src/{config,types,core,modules/{health,anomaly,recovery,optimization,ml,reporting},api/{middleware,routes,handlers},database/{models,migrations,repositories},cache,utils,monitoring,services},python/{ml,pipeline,utils,config,scripts},tests/{unit/{core,modules,api,utils},integration,e2e,fixtures},docs/{api,guides},docker,kubernetes,models,scripts,config,coverage,dist,logs}

# Create package.json
cat > package.json << 'EOF'
{
  "name": "lifeos-neural-platform",
  "version": "1.0.0",
  "description":  "Autonomous Recovery System for Enterprise Infrastructure",
  "main": "dist/index.js",
  "types": "dist/index.d. ts",
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test: coverage": "jest --coverage",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write src",
    "db:migrate": "typeorm migration:run",
    "train-models": "python python/scripts/train. py",
    "docker:build": "docker build -t lifeos: latest .",
    "docker:run": "docker-compose up -d"
  },
  "dependencies":  {
    "@tensorflow/tfjs": "^4.11.0",
    "axios": "^1.6.0",
    "express":  "^4.18.0",
    "typeorm": "^0.3.16",
    "pg": "^8.10.0",
    "redis": "^4.6.0",
    "dotenv": "^16.3.1",
    "winston": "^3.11.0",
    "prom-client": "^15.0.0",
    "joi": "^17.11.0",
    "jsonwebtoken": "^9.1.0",
    "express-rate-limit": "^7.0.0",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.20",
    "@types/jest": "^29.5.8",
    "@types/node":  "^20.9.0",
    "typescript": "^5.2.0",
    "ts-node": "^10.9.1",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.1",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "eslint": "^8.53.0",
    "prettier": "^3.1.0"
  }
}
EOF

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions":  {
    "target": "ES2020",
    "module":  "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir":  "./src",
    "strict":  true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports":  true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "typeRoots": ["./node_modules/@types"]
  },
  "include":  ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
EOF

# Create . env. example
cat > .env.example << 'EOF'
# Application
NODE_ENV=development
APP_NAME=LifeOS
APP_VERSION=1.0.0
PORT=3000
HOST=0.0.0.0

# Database
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=lifeos
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_POOL_SIZE=10

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# API
API_PREFIX=/api/v1
JWT_SECRET=your_jwt_secret_key_change_this
JWT_EXPIRY=24h

# Recovery
RECOVERY_THRESHOLD=70
OPTIMIZATION_THRESHOLD=85
MAX_CONCURRENT_RECOVERIES=5

# Logging
LOG_LEVEL=info
LOG_FORMAT=json

# Features
FEATURE_AUTO_RECOVERY=true
FEATURE_OPTIMIZATION=true
FEATURE_LEARNING=true
EOF

# Create README.md
cat > README.md << 'EOF'
# LifeOS - Autonomous Recovery System

Production-ready autonomous incident recovery platform with ML-powered anomaly detection. 

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Build
npm run build

# Run
npm start
```

## Documentation

See `/docs` for complete documentation. 

## Testing

```bash
npm test
npm run test:coverage
```
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
dist/
coverage/
.env
.env.local
.DS_Store
*. log
logs/
models/*. h5
. idea/
.vscode/
EOF

# Create directory placeholders
touch models/. gitkeep
touch logs/.gitkeep
touch coverage/.gitkeep

echo "✅ LifeOS project structure created successfully!"
echo "📁 Project location: $PROJECT_NAME"
echo "📖 Next steps:"
echo "  1. cd $PROJECT_NAME"
echo "  2. npm install"
echo "  3. cp .env.example .env"
echo "  4. npm run build"
echo "  5. npm start"