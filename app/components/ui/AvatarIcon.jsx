import { createAvatar } from '@dicebear/core';
import { bottts } from '@dicebear/collection';

export const generateAvatar = (seed) => {
  return createAvatar(bottts, { seed }).toDataUri();
};