import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  private logEndpoint = '/api/logs'; // Backend endpoint

  constructor(private http: HttpClient) {}

  logInfo(message: string, data?: any) {
    this.sendLog('INFO', message, data);
  }

  logWarn(message: string, data?: any) {
    this.sendLog('WARN', message, data);
  }

  logError(message: string, data?: any) {
    this.sendLog('ERROR', message, data);
  }

  private sendLog(level: string, message: string, data?: any) {
    this.http.post(this.logEndpoint, { level, message, data }).subscribe({
      error: err => console.error('Logging failed', err)
    });
  }
}
