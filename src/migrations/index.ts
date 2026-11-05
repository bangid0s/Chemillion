import * as migration_20261104_025313_initial from './20261104_025313_initial';
import * as migration_20261104_090000_company_address from './20261104_090000_company_address';
import * as migration_20261105_093751_remove_catalogue from './20261105_093751_remove_catalogue';

export const migrations = [
  {
    up: migration_20261104_025313_initial.up,
    down: migration_20261104_025313_initial.down,
    name: '20261104_025313_initial',
  },
  {
    up: migration_20261104_090000_company_address.up,
    down: migration_20261104_090000_company_address.down,
    name: '20261104_090000_company_address',
  },
  {
    up: migration_20261105_093751_remove_catalogue.up,
    down: migration_20261105_093751_remove_catalogue.down,
    name: '20261105_093751_remove_catalogue'
  },
];
