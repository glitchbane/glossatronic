import { Component, OnInit } from '@angular/core';
import {State} from '../../../store/reducer.index';
import {Store} from '@ngrx/store';
import {LocalDataSource, Ng2SmartTableModule} from 'ng2-smart-table';

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

    source: LocalDataSource;

  constructor(private store: Store<State>) {

  }


  ngOnInit() {
      // TODO: all this should/will be done in the store modules related to the data; this is poc for the ng-table

      const allTranslations = translationJson.termTranslations.translations;

      const uniqueTerms = _.uniqBy(allTranslations, "term");

      const uniqueLanguages = _.uniqBy(allTranslations, "language_name");

      let columns = {
          English: {
              title: 'English',
              editable: false,
              filter: false
          }
      };

      for (let c = 0; c < uniqueLanguages.length; c++) {

          const newColumn = {
              title: uniqueLanguages[c].language_name,
              editable: false,
              filter: false
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

          let row = {English: term};

          for (let t = 0; t < termTranslations.length; t++) {
              const translation = {
                  [termTranslations[t].language_name]: termTranslations[t].term_translation
              };

              Object.assign(row, translation);
          }

          rows.push(row);
      }
      this.data = rows;
      this.source = new LocalDataSource(this.data);
  }

    onSearch(query: string = '') {
        if (query === '') {

            this.source.setFilter([]);

        } else {
            console.log('query');
            this.source.setFilter([
                                      // fields we want to include in the search
                                      {
                                          field : 'English',
                                          search: query
                                      },
                                      {
                                          field : 'French',
                                          search: query
                                      },
                                      {
                                          field : 'German',
                                          search: query
                                      },
                                      {
                                          field : 'Italian',
                                          search: query
                                      },
                                      {
                                          field : 'Spanish',
                                          search: query
                                      }
                                  ], false);
        }
    }
}
