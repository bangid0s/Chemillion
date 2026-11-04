import * as migration_20261104_025313_initial from './20261104_025313_initial';

export const migrations = [
  {
    up: migration_20261104_025313_initial.up,
    down: migration_20261104_025313_initial.down,
    name: '20261104_025313_initial'
  },
];
