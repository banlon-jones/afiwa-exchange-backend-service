import { Injectable, NestMiddleware } from '@nestjs/common';
import * as firestore from 'firebase-admin';
import { FirebaseAppService } from '../../services/firebase-app/firebase-app.service';

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
  private auth: firestore.auth.Auth;

  constructor(private firebaseAppService: FirebaseAppService) {
    this.auth = firebaseAppService.getAuth();
  }
  use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.auth
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          req['user'] = {
            email: decodedToken.email,
            roles: decodedToken.roles || [],
            type: decodedToken.type,
          };
          next();
        })
        .catch(() => {
          PreAuthMiddleware.accessDenied(req.url, res);
        });
    } else {
      PreAuthMiddleware.accessDenied(req.url, res);
    }
  }

  private static accessDenied(url: string, res: Response) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'access denied',
    });
  }
}
