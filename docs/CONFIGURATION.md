# LifeOS Configuration Guide

Complete configuration reference for LifeOS. 

## Environment Variables

### Application

- `NODE_ENV` - Environment (development, staging, production, test)
- `APP_NAME` - Application name
- `APP_VERSION` - Application version
- `PORT` - Server port
- `HOST` - Server host

### Database

- `DATABASE_TYPE` - Database type (postgres, mysql, sqlite)
- `DATABASE_HOST` - Database host
- `DATABASE_PORT` - Database port
- `DATABASE_NAME` - Database name
- `DATABASE_USER` - Database username
- `DATABASE_PASSWORD` - Database password

### Redis

- `REDIS_HOST` - Redis host
- `REDIS_PORT` - Redis port
- `REDIS_PASSWORD` - Redis password (optional)

### API

- `API_PREFIX` - API prefix (default: /api/v1)
- `CORS_ORIGIN` - CORS origin
- `JWT_SECRET` - JWT secret key

### Recovery Settings

- `RECOVERY_THRESHOLD` - Health threshold to trigger recovery (0-100)
- `OPTIMIZATION_THRESHOLD` - Health threshold for optimizations (0-100)

### Feature Flags

- `FEATURE_AUTO_RECOVERY` - Enable auto recovery (true/false)
- `FEATURE_OPTIMIZATION` - Enable optimizations (true/false)
- `FEATURE_LEARNING` - Enable learning (true/false)
- `FEATURE_REPORTING` - Enable reporting (true/false)

## Configuration Examples

### Development

```bash
NODE_ENV=development
DATABASE_HOST=localhost
DATABASE_NAME=lifeos_dev
RECOVERY_THRESHOLD=70
```

### Production

```bash
NODE_ENV=production
DATABASE_HOST=prod-db.example.com
DATABASE_NAME=lifeos_prod
RECOVERY_THRESHOLD=50
ENABLE_HTTPS=true
```

## Performance Tuning

### Database Pool Size

Increase `DATABASE_POOL_SIZE` for high-concurrency scenarios:

```bash
DATABASE_POOL_SIZE=20  # Default:  10
```

### Cache TTL

Adjust `REDIS_TTL` for cache persistence:

```bash
REDIS_TTL=7200  # 2 hours (default: 1 hour)
```

### Health Check Intervals

Modify checking frequency:

```bash
HEALTH_CHECK_INTERVAL=15000  # 15 seconds (default: 30 seconds)
```

---

See [README.md](./README.md) for quick start guide. 