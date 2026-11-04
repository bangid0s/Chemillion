import * as migration_20261104_025313_initial from './20261104_025313_initial';
import * as migration_20261104_090000_company_address from './20261104_090000_company_address';

export const migrations = [
  {
    up: migration_20261104_025313_initial.up,
    down: migration_20261104_025313_initial.down,
    name: '20261104_025313_initial'
  },
  {
    up: migration_20261104_090000_company_address.up,
    down: migration_20261104_090000_company_address.down,
    name: '20261104_090000_company_address'
  },
];
