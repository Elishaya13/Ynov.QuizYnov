import { HttpInterceptorFn } from "@angular/common/http";

export const cookieInterceptor: HttpInterceptorFn = (request, next) => {
  console.log('Cookie interceptor');
  // On n'autorise les requêtes que vers notre serveur
  // TODO : utiliser les environnements Angular : https://angular.dev/tools/cli/environments
  if (request.url.startsWith('http://localhost:5000/')) {
    const newRequest = request.clone({
      withCredentials: true,
    });

    return next(newRequest);
  }
  return next(request);
};
