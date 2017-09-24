import { Component, OnInit } from '@angular/core';
import {State} from '../../../store/reducer.index';
import {Store} from '@ngrx/store';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import * as translationJson from './data';
import * as _ from 'lodash';

@Component({
  selector: 'gt-glossary-container',
  templateUrl: './glossary-container.component.html',
  styleUrls: ['./glossary-container.component.css']
})
export class GlossaryContainerComponent implements OnInit {
    settings = {
          columns: {},
          actions: {
              add: false,
              edit: false,
              delete: false
            }
    };

    data = [];

  constructor(private store: Store<State>) { }


  ngOnInit() {
      // TODO: all this should/will be done in the store modules related to the data; this is poc for the ng-table

      const allTranslations = translationJson.termTranslations.translations;
        console.log(allTranslations);

      const uniqueTerms = _.uniqBy(allTranslations, "term");

      const uniqueLanguages = _.uniqBy(allTranslations, "language_name");

      let columns = {
          term: {
              title: 'term',
              editable: false
          }
      };

      for (let c = 0; c < uniqueLanguages.length; c++) {

          const newColumn = {
              title: uniqueLanguages[c].language_name,
              editable: false
          };

          const languageColumn = {
              [uniqueLanguages[c].language_name]: newColumn
          };

          Object.assign(columns, languageColumn)
      }

      this.settings.columns = columns;

      let rows = [];

      for (let j = 0; j < uniqueTerms.length; j++) {

          const term = uniqueTerms[j].term;

          const termTranslations = _.filter(allTranslations, function(data){
              return data.term == term;
          });

          let row = {term: term};

          for (let t = 0; t < termTranslations.length; t++) {
              const translation = {
                  [termTranslations[t].language_name]: termTranslations[t].term_translation
              };

              Object.assign(row, translation);
          }

          rows.push(row);
      }
      this.data = rows;
  }
}
