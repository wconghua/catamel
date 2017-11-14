import {Action} from '@ngrx/store';
import * as lb from 'shared/sdk/models';
import * as dsa from 'state-management/actions/datasets.actions';
import {DatasetState, initialDatasetState} from 'state-management/state/datasets.store';

export function datasetsReducer(state = initialDatasetState, action: Action) {
  if (action.type.indexOf('[Dataset]') !== -1) {
    console.log('Action came in! ' + action.type);
  }

  switch (action.type) {
    case dsa.FILTER_UPDATE: {
      const f = action['payload'];
      if (f['groups'] && !Array.isArray(f['groups']) && f['groups'].length > 0) {
        f['groups'] = [f['groups']];
      }
      const newState = Object.assign({}, state, { activeFilters: f, loading: true, selectedSets: [] });
      return newState;
    }

    case dsa.FILTER_VALUE_UPDATE: {
      const f = action['payload'];
      console.log(f);
      return Object.assign({}, state, { filterValues: f });
    }

    case dsa.SELECT_CURRENT: {
      const s = Object.assign({}, state, {currentSet:  action['payload']});
      return s;
    }


    case dsa.SEARCH_COMPLETE: {
      const d = <lb.RawDataset[]>action['payload'];
      return Object.assign({}, state, { datasets: d, loading: false });
    }

    case dsa.ADD_GROUPS_COMPLETE: {
      const g = action['payload'];
      const a = state.activeFilters;
      a['groups'] = g;
      return Object.assign({}, state, a);
    }

    case dsa.FILTER_UPDATE_COMPLETE: {
      const values = action['payload'];
      const s = Object.assign({}, state, { filterValues: values });
      return s;
    }

    case dsa.SEARCH_ID_COMPLETE: {
      const d = <lb.RawDataset>action['payload'];
      return Object.assign({}, state, { currentSet: d });
    }

    case dsa.SELECTED_UPDATE: {
      const s = <lb.RawDataset[]>action['payload'];
      return Object.assign({}, state, {selectedSets: s});
    }

    case dsa.TOTAL_UPDATE: {
      const s = <number>action['payload'];
      return Object.assign({}, state, {totalSets: s});
    }

    // TODO handle failed actions
    default: {
      return state;
    }
  }
}

export const getDatasets = (state: DatasetState) => state.datasets;
export const getActiveFilters = (state: DatasetState) => state.activeFilters;
export const getFilterValues = (state: DatasetState) => state.filterValues;
export const getCurrentSet = (state: DatasetState) => state.currentSet;