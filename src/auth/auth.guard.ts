import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
  
    console.log('Received token:', token);
  
    if (!token) {
      console.log('Token not found.');
      return false;
    }

    
    try {
      
      const decoded = this.jwtService.verify(token, { secret: 'testing-api-backend' });
      console.log('Token verified:', decoded);
      request.user = decoded;
      return true;
    } catch (error) {
      console.error('Error verifying token:', error.message);
      return false;
    }
    
  }
}
