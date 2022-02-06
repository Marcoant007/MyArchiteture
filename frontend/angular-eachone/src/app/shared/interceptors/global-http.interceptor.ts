import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { LoadingService } from '../ui/loading/loading/loading.service';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {

    constructor(private profileService: ProfileService,
        private loadingService: LoadingService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!request.params.get('disableLoading')) {
            this.loadingService.showLoading(true);
        }

        request = request.clone(this.setHeaders());

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error?.error?.token) {
                    this.profileService.setToken(error.error.token);
                    request = request.clone(this.setHeaders());
                    return next.handle(request).pipe(finalize(() => this.loadingService.showLoading(false)));
                }
                return throwError(error);
            }),
            finalize(() => this.loadingService.showLoading(false))
        );
    }

    setHeaders() {
        const profile = this.profileService.get();
        const token = profile?.token ? profile.token : '';

        return {
            setHeaders: {
                'Token': token,
                'authDevice': this.getDevice(),
                'os': this.getOS()
            }
        }
    }

    public getOS() {
        var os = undefined;
        var nAgt = navigator.userAgent;
        var nVer = navigator.appVersion;

        var clientStrings = [
            { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
            { s: 'Windows Vista', r: /Windows NT 6.0/ },
            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
            { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
            { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
            { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
            { s: 'Windows CE', r: /Windows CE/ },
            { s: 'Windows 3.11', r: /Win16/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Chrome OS', r: /CrOS/ },
            { s: 'Linux', r: /(Linux|X11(?!.*CrOS))/ },
            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'BeOS', r: /BeOS/ },
            { s: 'OS/2', r: /OS\/2/ },
            { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
        ];

        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = undefined;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS':
            case 'Mac OS X':
            case 'Android':
                osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }

        return os + ' ' + osVersion;
    }

    public getDevice(): string {
        let authDevice = "Dispositivo: ";
        // Verificação de tipo de dispositivo
        if (this.isMobile()) {
            authDevice = authDevice + "Smartphone. ";
        } else {
            authDevice = authDevice + "PC. ";
        }
        // Verificação de qual navegador
        authDevice = authDevice + "Navegador: " + this.getBrowser().name + ".";
        return authDevice;
    }

    public isMobile(): boolean {
        const userAgent = navigator.userAgent.toLowerCase();
        // tslint:disable-next-line:max-line-length
        if (
            userAgent.search(
                /(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i
            ) !== -1
        ) {
            return true;
        }
        return false;
    }

    public getBrowser(): any {
        // tslint:disable-next-line:prefer-const
        let ua = navigator.userAgent;
        let tem;
        let M =
            ua.match(
                /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
            ) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: "IE", version: tem[1] || "" };
        }
        if (M[1] === "Chrome") {
            tem = ua.match(/\Edge\/(\d+)/);
            if (tem != null) {
                {
                    return { name: "Edge", version: tem[1] };
                }
            }
            tem = ua.match(/\bOPR\/(\d+)/);
            if (tem != null) {
                {
                    return { name: "Opera", version: tem[1] };
                }
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
        tem = ua.match(/version\/(\d+)/i);
        if (tem != null) {
            M.splice(1, 1, tem[1]);
        }
        return {
            name: M[0],
            version: M[1]
        };
    }

}

