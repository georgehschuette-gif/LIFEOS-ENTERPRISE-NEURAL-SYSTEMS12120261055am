# LifeOS Security Guide

Security best practices and guidelines for LifeOS. 

## Authentication

### JWT Configuration

Set strong JWT secret:

```bash
JWT_SECRET=your_very_long_random_secret_key_min_32_chars
JWT_EXPIRY=24h
```

### Token Validation

All API requests (except `/health`) require valid JWT token:

```bash
Authorization: Bearer <token>
```

## Authorization

### User Roles

- `admin` - Full system access
- `operator` - Recovery and monitoring
- `viewer` - Read-only access
- `api` - API access only

### Permissions

- `system:read` - Read system state
- `system:write` - Modify system
- `recovery:execute` - Execute recoveries
- `admin:full` - Full access

## Rate Limiting

Configure rate limits:

```bash
RATE_LIMIT_WINDOW_MS=900000     # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100     # 100 requests per window
```

## HTTPS

Enable HTTPS in production:

```bash
ENABLE_HTTPS=true
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/key.pem
```

## Database Security

- Use strong passwords
- Enable PostgreSQL SSL
- Restrict network access
- Regular backups

## API Security

- Use HTTPS only
- Validate all inputs
- Implement rate limiting
- Monitor for suspicious activity

## Encryption

Sensitive data encrypted with: 

```bash
ENCRYPTION_KEY=your_32_character_encryption_key
```

---

See [README.md](./README.md) for quick start guide. 