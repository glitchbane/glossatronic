

import {Headers} from "@angular/http";

export const config = {
  API_URL:  'http://localhost:3500/api',


  JSON_HEADER: { headers: new Headers({ 'Content-Type': 'application/json'}) }
}
