

import {Headers} from "@angular/http";

export const config = {
  LOCAL_API_URL:  'https://3n9x3w6nrg.execute-api.us-east-1.amazonaws.com/test',
  API_URL: 'https://api.glossatronic.materialthoughts.com/dev/v1',

  JSON_HEADER: { headers: new Headers({ 'Content-Type': 'application/json'}) }
}
