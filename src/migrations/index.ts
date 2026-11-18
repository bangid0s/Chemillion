import * as migration_20261104_025313_initial from './20261104_025313_initial';
import * as migration_20261104_090000_company_address from './20261104_090000_company_address';
import * as migration_20261105_093751_remove_catalogue from './20261105_093751_remove_catalogue';
import * as migration_20261105_160136_add_chinese_locale from './20261105_160136_add_chinese_locale';
import * as migration_20261105_160500_translate_navigation from './20261105_160500_translate_navigation';
import * as migration_20261106_032120_solutions from './20261106_032120_solutions';
import * as migration_20261106_033000_website_copy from './20261106_033000_website_copy';
import * as migration_20261115_090000_company_photos from './20261115_090000_company_photos';
import * as migration_20261115_150000_fix_company_photo_files from './20261115_150000_fix_company_photo_files';
import * as migration_20261115_170000_compress_company_photos from './20261115_170000_compress_company_photos';
import * as migration_20261118_090000_updated_company_photos from './20261118_090000_updated_company_photos';

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
    name: '20261105_093751_remove_catalogue',
  },
  {
    up: migration_20261105_160136_add_chinese_locale.up,
    down: migration_20261105_160136_add_chinese_locale.down,
    name: '20261105_160136_add_chinese_locale',
  },
  {
    up: migration_20261105_160500_translate_navigation.up,
    down: migration_20261105_160500_translate_navigation.down,
    name: '20261105_160500_translate_navigation',
  },
  {
    up: migration_20261106_032120_solutions.up,
    down: migration_20261106_032120_solutions.down,
    name: '20261106_032120_solutions'
  },
  {
    up: migration_20261106_033000_website_copy.up,
    down: migration_20261106_033000_website_copy.down,
    name: '20261106_033000_website_copy'
  },
  {
    up: migration_20261115_090000_company_photos.up,
    down: migration_20261115_090000_company_photos.down,
    name: '20261115_090000_company_photos'
  },
  {
    up: migration_20261115_150000_fix_company_photo_files.up,
    down: migration_20261115_150000_fix_company_photo_files.down,
    name: '20261115_150000_fix_company_photo_files'
  },
  {
    up: migration_20261115_170000_compress_company_photos.up,
    down: migration_20261115_170000_compress_company_photos.down,
    name: '20261115_170000_compress_company_photos'
  },
  {
    up: migration_20261118_090000_updated_company_photos.up,
    down: migration_20261118_090000_updated_company_photos.down,
    name: '20261118_090000_updated_company_photos'
  },
];
