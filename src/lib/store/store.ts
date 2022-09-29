import microtime from 'microtime';
import { VARIANT_SEPARATOR } from '@lib/utils/string';
import { logger } from '@lib/utils/logger';
import { cache } from '@lib/utils/cache';
import {
  Store,
  StoreData,
  StoreSubset,
  StoreSubsetOptions,
} from './store.types';
import { unixEpochUniqueId } from './workDir';

// Instantiate the subset cache so it can be accessed faster.
const subsetCache = cache.bin<StoreSubset>('store-subset');

const initIndex = () => {
  return {
    url: new Map<string, any>(),
    uuid: new Map<string, any>(),
    custom: new Map<string, any>(),
  };
};

const initData = () => new Map<string, any>() as StoreData<string, any>;
export const store: Store = {
  uniqueId: unixEpochUniqueId,
  data: initData(),
  deleted: new Set<string>(),
  index: initIndex(),
};

store.data.subset = (options: StoreSubsetOptions): StoreSubset => {
  const startDate = microtime.now();

  // Merge provided options with default ones.
  const defaultOptions = {
    variant: '_main',
    ext: 'json',
    recursive: 'true',
  };
  const opts = { ...defaultOptions, ...options };

  let subset: StoreSubset = { filenames: [], items: [] };

  const dirWithTrimmedSlashes = opts.dir?.replace(/^\//, '').replace(/\/$/, '');
  const dirPart = dirWithTrimmedSlashes ? `${dirWithTrimmedSlashes}/` : '';

  let variantPart;
  if (opts.variant) {
    const recursiveGroup = opts.recursive ? '.' : '[^/]';
    variantPart =
      opts.variant === '_main'
        ? `((?!--)${recursiveGroup})+`
        : `${recursiveGroup}+${VARIANT_SEPARATOR}${opts.variant}`;
  } else {
    variantPart = '';
  }

  let extensionPart;
  if (opts.recursive) {
    extensionPart = opts.ext ? `.${opts.ext}` : '.+';
  } else {
    extensionPart = opts.ext ? `.${opts.ext}` : '[^/]+';
  }

  const pattern = `^${dirPart}${variantPart}${extensionPart}$`;
  logger.debug(`Store subset pattern: ${pattern}`);
  const cachedSubset = subsetCache.get(pattern);
  if (cachedSubset) {
    subset = cachedSubset;
    logger.debug(
      `Store subset obtained from cache in ${
        (microtime.now() - startDate) / 1000
      }ms. ${subset.items.length} items.`,
    );
  } else {
    const regex = new RegExp(pattern);
    const mapKeys = Array.from(store.data.keys());
    mapKeys.forEach(k => {
      if (k.match(regex)) {
        subset.filenames.push(k);
        subset.items.push(store.data.get(k));
      }
    });
    subsetCache.set(pattern, subset);
    logger.debug(
      `Store subset created in ${(microtime.now() - startDate) / 1000} ms. ${
        subset.items.length
      } items.`,
    );
  }

  return subset;
};

/**
 * Resets store and deletes all loaded data.
 */
export const resetStore = (): void => {
  store.uniqueId = unixEpochUniqueId;
  const previousSubset = store.data.subset;
  store.data = initData();
  store.data.subset = previousSubset;
  store.deleted.clear();
  store.index = initIndex();
};
