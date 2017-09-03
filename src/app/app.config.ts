

import {Headers} from "@angular/http";

export const config = {
  API_URL:  'http://localhost:3500/api',

  // API_URL: 'http://ec2-35-166-246-196.us-west-2.compute.amazonaws.com:3500/api',
  JSON_HEADER: { headers: new Headers({ 'Content-Type': 'application/json'}) }
}
