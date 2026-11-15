import path from 'path'
import type { Payload } from 'payload'
import { LOCALES, type Locale, type PerLocale, type Req, writeGlobal } from './websiteCopy'

/**
 * Real photos of PT Kencana Chemillion Indonesia's warehouse and office in Semarang, replacing the placeholder crops
 * of the design mockup. The files live in src/content/photos with descriptive names (search engines read them) and
 * `applyCompanyPhotos` uploads them to the Media Library, with alt text in all three languages, and places them on
 * the pages. After that the dashboard is the place to swap them.
 *
 * Three photos show other companies' brand names on drums (TotalEnergies, Mobil, Q8 Oils). They go into the Media
 * Library but on no page, so the site does not look like it speaks for those brands.
 */

type Alt = Record<Locale, string>
type Photo = { file: string; alt: Alt; focalX?: number; focalY?: number }

const PHOTOS = {
  building: {
    file: 'chemillion-office-warehouse-semarang.webp',
    alt: {
      en: 'Chemillion office and warehouse building in Kawasan Industri Candi, Semarang, with a delivery truck at the front',
      id: 'Gedung kantor dan gudang Chemillion di Kawasan Industri Candi, Semarang, dengan truk pengiriman di depan',
      zh: 'Chemillion 位于三宝垄 Candi 工业区的办公楼与仓库，门前停有送货卡车',
    },
  },
  reception: {
    file: 'chemillion-office-reception-semarang.webp',
    alt: {
      en: 'Reception corner of the Chemillion office in Semarang',
      id: 'Sudut resepsionis kantor Chemillion di Semarang',
      zh: 'Chemillion 三宝垄办公室的接待区',
    },
  },
  hazardStorage: {
    file: 'solvent-drum-storage-hazard-labels.webp',
    alt: {
      en: 'Solvent drums with hazard labels stored inside yellow-marked zones in the Chemillion warehouse',
      id: 'Drum pelarut berlabel bahaya tersimpan di zona bergaris kuning gudang Chemillion',
      zh: 'Chemillion 仓库中贴有危险标识的溶剂桶，存放于黄线标记区域内',
    },
  },
  warehouseForklift: {
    file: 'chemical-drum-warehouse-forklift.webp',
    alt: {
      en: 'Chemical drums on pallets along the main aisle of the Chemillion warehouse, with a forklift',
      id: 'Drum bahan kimia di atas palet sepanjang lorong utama gudang Chemillion, dengan forklift',
      zh: 'Chemillion 仓库主通道两侧托盘上的化学品桶及叉车',
    },
  },
  staff: {
    file: 'warehouse-staff-handling-solvent-drum.webp',
    alt: {
      en: 'Chemillion warehouse staff moving a solvent drum, with a forklift ready behind',
      id: 'Staf gudang Chemillion memindahkan drum pelarut, dengan forklift siap di belakang',
      zh: 'Chemillion 仓库员工搬运溶剂桶，身后叉车待命',
    },
    focalX: 38,
  },
  indoorStorage: {
    file: 'technical-grade-chemical-drums-jerrycans-storage.webp',
    alt: {
      en: 'Technical grade chemicals in steel drums and jerrycans in an indoor storage room',
      id: 'Bahan kimia technical grade dalam drum baja dan jeriken di ruang penyimpanan dalam',
      zh: '室内仓储间中以钢桶和塑料桶存放的工业级化学品',
    },
  },
  aisle: {
    file: 'industrial-solvent-warehouse-aisle.webp',
    alt: {
      en: 'Long aisle of the industrial solvent warehouse with drums stored on both sides',
      id: 'Lorong panjang gudang pelarut industri dengan drum tersimpan di kedua sisi',
      zh: '工业溶剂仓库长通道，两侧整齐存放溶剂桶',
    },
  },
  warehouse: {
    file: 'industrial-solvent-chemical-warehouse-semarang.webp',
    alt: {
      en: 'Industrial solvent and chemical warehouse of Chemillion in Semarang, with drums stored in marked zones',
      id: 'Gudang pelarut dan bahan kimia industri Chemillion di Semarang, dengan drum tersimpan di zona bertanda',
      zh: 'Chemillion 位于三宝垄的工业溶剂与化学品仓库，桶装货物分区存放',
    },
  },
  office: {
    file: 'chemillion-office-interior.webp',
    alt: {
      en: 'Inside the Chemillion office, where the sales and administration team work',
      id: 'Bagian dalam kantor Chemillion, tempat tim penjualan dan administrasi bekerja',
      zh: 'Chemillion 办公室内部，销售与行政团队的工作区',
    },
  },
  forklift: {
    file: 'forklift-moving-chemical-drum.webp',
    alt: {
      en: 'Forklift carrying a chemical drum across the Chemillion warehouse floor',
      id: 'Forklift mengangkut drum bahan kimia di lantai gudang Chemillion',
      zh: '叉车在 Chemillion 仓库内搬运化学品桶',
    },
    focalX: 45,
  },
  stackedDrums: {
    file: 'stacked-solvent-drums-on-pallets.webp',
    alt: {
      en: 'Solvent drums of several colours stacked on wooden pallets',
      id: 'Drum pelarut berbagai warna tersusun di atas palet kayu',
      zh: '多种颜色的溶剂桶堆放在木托盘上',
    },
  },
  palletisedDrums: {
    file: 'palletised-solvent-drum-storage.webp',
    alt: {
      en: 'Solvent drums stored two high on wooden pallets',
      id: 'Drum pelarut tersimpan dua tingkat di atas palet kayu',
      zh: '双层码放在木托盘上的溶剂桶',
    },
  },
  staging: {
    file: 'drum-and-pallet-staging-area.webp',
    alt: {
      en: 'Drum and pallet staging area in the Chemillion warehouse, below the office windows',
      id: 'Area persiapan drum dan palet di gudang Chemillion, di bawah jendela kantor',
      zh: 'Chemillion 仓库内办公室窗下的桶装货物与托盘备货区',
    },
  },
  ghsDrums: {
    file: 'hazardous-chemical-drums-ghs-labels.webp',
    alt: {
      en: 'Chemical drums with GHS hazard labels in covered storage',
      id: 'Drum bahan kimia berlabel bahaya GHS di area penyimpanan beratap',
      zh: '有顶棚仓储区内贴有 GHS 危险标识的化学品桶',
    },
  },
  loadingArea: {
    file: 'chemillion-warehouse-building-loading-area.webp',
    alt: {
      en: 'Front of the Chemillion warehouse with its paved loading area',
      id: 'Bagian depan gudang Chemillion dengan area muat berpaving',
      zh: 'Chemillion 仓库正面及铺装装卸区',
    },
  },
  coveredStorage: {
    file: 'industrial-solvent-drums-covered-storage.webp',
    alt: {
      en: 'Industrial solvent drums on plastic pallets in covered outdoor storage',
      id: 'Drum pelarut industri di atas palet plastik di area penyimpanan luar beratap',
      zh: '有顶棚户外仓储区内放在塑料托盘上的工业溶剂桶',
    },
  },
} satisfies Record<string, Photo>

type Key = keyof typeof PHOTOS
type Ids = Record<Key, number>

/** Facilities gallery on the About page, in order, with captions. */
const FACILITIES: { photo: Key; caption: Alt }[] = [
  { photo: 'warehouseForklift', caption: { en: 'Main warehouse', id: 'Gudang utama', zh: '主仓库' } },
  { photo: 'staging', caption: { en: 'Drum & pallet staging', id: 'Area persiapan drum & palet', zh: '桶装与托盘备货区' } },
  { photo: 'indoorStorage', caption: { en: 'Indoor chemical storage', id: 'Penyimpanan kimia dalam ruang', zh: '室内化学品仓储' } },
  { photo: 'ghsDrums', caption: { en: 'Covered outdoor storage', id: 'Penyimpanan luar beratap', zh: '有顶棚户外仓储' } },
  { photo: 'forklift', caption: { en: 'Forklift handling', id: 'Penanganan dengan forklift', zh: '叉车搬运' } },
  { photo: 'loadingArea', caption: { en: 'Loading area', id: 'Area muat', zh: '装卸区' } },
]

/** One photo per solution, in the order of the solutions list (printing ink, paint & coating, technical grade). */
const SOLUTION_PHOTOS: Key[] = ['coveredStorage', 'warehouseForklift', 'indoorStorage']

const DIR = path.resolve(process.cwd(), 'src', 'content', 'photos')

/** Cloud storage adds a random suffix, so `office.webp` is stored as `office-AbC123.webp` (sometimes several suffixes). */
const isStoredAs = (stored: string | null | undefined, file: string) => {
  if (!stored) return false
  const stem = file.replace(/\.webp$/, '')
  return stored === file || (stored.startsWith(`${stem}-`) && stored.endsWith('.webp') && /^[-A-Za-z0-9]+$/.test(stored.slice(stem.length + 1, -5)))
}

const findPhotoDocs = async (payload: Payload, file: string) => {
  const { docs } = await payload.find({ collection: 'media', where: { filename: { like: file.replace(/\.webp$/, '') } }, limit: 50, depth: 0, pagination: false })
  return docs.filter((doc) => isStoredAs(doc.filename, file))
}

/*
 * Media uploads deliberately get no `req`. The cloud storage plugin keeps the uploaded file on the request's context
 * and only sets it once, so uploads that share a request (as a migration's do) all store the first file.
 */

/** Uploads each photo once; a photo already in the Media Library is reused. */
const upload = async (payload: Payload): Promise<Ids> => {
  const ids = {} as Ids
  let created = 0
  for (const [key, photo] of Object.entries(PHOTOS) as [Key, Photo][]) {
    let id = (await findPhotoDocs(payload, photo.file))[0]?.id
    if (!id) {
      const doc = await payload.create({
        collection: 'media',
        locale: 'en',
        data: { alt: photo.alt.en, focalX: photo.focalX ?? 50, focalY: photo.focalY ?? 50 },
        filePath: path.join(DIR, photo.file),
        context: { disableRevalidate: true },
      })
      id = doc.id
      created++
    }
    for (const locale of LOCALES.filter((l) => l !== 'en')) {
      await payload.update({ collection: 'media', id, locale, data: { alt: photo.alt[locale] }, context: { disableRevalidate: true } })
    }
    ids[key] = id
  }
  const total = Object.keys(PHOTOS).length
  payload.logger.info(`Company photos: ${created} uploaded, ${total - created} already in the Media Library, ${total} in total.`)
  return ids
}

/**
 * Puts the right file back into every company photo in the Media Library. The first upload on Vercel stored the
 * building photo in all 16 records; the records, alt text and page placements were right, only the files were not.
 */
export const reuploadCompanyPhotos = async (payload: Payload) => {
  let fixed = 0
  for (const photo of Object.values(PHOTOS) as Photo[]) {
    for (const doc of await findPhotoDocs(payload, photo.file)) {
      await payload.update({ collection: 'media', id: doc.id, locale: 'en', data: { alt: photo.alt.en }, filePath: path.join(DIR, photo.file), context: { disableRevalidate: true } })
      fixed++
    }
  }
  payload.logger.info(`Company photos: uploaded the correct file again for ${fixed} photos.`)
}

const same = <T,>(value: T): Record<Locale, T> => ({ en: value, id: value, zh: value })

export const applyCompanyPhotos = async (payload: Payload, req?: Req) => {
  // On a brand-new database the pages are still empty; `npm run seed` fills them and then calls this.
  const home = (await payload.findGlobal({ slug: 'home-page', depth: 0, locale: 'en', req })) as unknown as { hero?: { title?: string } }
  if (!home.hero?.title) {
    payload.logger.info('Company photos: the pages are empty, so the seed will add the photos.')
    return
  }

  const ids = await upload(payload)

  await writeGlobal(payload, req, 'home-page', same({}), {
    hero: { image: ids.warehouse },
    why: { image: ids.staff },
    cta: { image: ids.forklift },
  })

  const facilities = (locale: Locale) => ({
    facilities: { images: FACILITIES.map(({ photo, caption }) => (locale === 'en' ? { image: ids[photo], caption: caption.en } : { caption: caption[locale] })) },
  })
  await writeGlobal(
    payload,
    req,
    'about-page',
    { en: facilities('en'), id: facilities('id'), zh: facilities('zh') },
    { hero: { image: ids.building }, story: { image: ids.office }, cta: { image: ids.staff } },
  )

  await writeGlobal(payload, req, 'solutions-page', same({}), { hero: { image: ids.hazardStorage }, cta: { image: ids.forklift } })
  await writeGlobal(payload, req, 'contact-page', same({}), { hero: { image: ids.reception } })

  const { docs } = await payload.find({ collection: 'product-categories', sort: '_order', limit: SOLUTION_PHOTOS.length, depth: 0, locale: 'en', req })
  for (const [i, doc] of docs.entries()) {
    await payload.update({
      collection: 'product-categories',
      id: doc.id,
      locale: 'en',
      req,
      data: { image: ids[SOLUTION_PHOTOS[i]], _status: 'published' },
      context: { disableRevalidate: true },
    })
  }

  payload.logger.info('Company photos: placed on Home, About, Solutions, Contact and the solution cards.')
}
