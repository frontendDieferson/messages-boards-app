import { FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET);
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

export async function authenticate(request: FastifyRequest): Promise<boolean> {
  const authHeader = request.headers.authorization;
  if (!authHeader) return false;

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) return false;

  try {
    request.user = verifyToken(token);
    return true;
  } catch (err) {
    return false;
  }
}
