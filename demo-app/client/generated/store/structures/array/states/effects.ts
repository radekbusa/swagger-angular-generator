/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {of} from 'rxjs/observable/of';

import {catchError, map, switchMap} from 'rxjs/operators';
import {StructuresService} from '../../../../controllers/Structures';
import * as actions from './actions';

@Injectable()
export class ArrayEffects {
  @Effect()
  Array = this.storeActions.ofType<actions.Start>(actions.Actions.START).pipe(
    switchMap((action: actions.Start) => this.structuresService.array(action.payload)
      .pipe(
        map(result => new actions.Success(result)),
        catchError((error: HttpErrorResponse) => of(new actions.Error(error))),
      ),
    ),
  );

  constructor(
    private storeActions: Actions,
    private structuresService: StructuresService,
  ) {}
}