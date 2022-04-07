import {REM_SIZE, SCALE_FACTOR_H, SCALE_FACTOR_W} from '@configs/themes/var';

export const rem = (r: number) => {
  return r * REM_SIZE;
};

export const scale = (s: number): number => {
  return s * SCALE_FACTOR_W;
};

export const scaleH = (s: number): number => {
  return s * SCALE_FACTOR_H;
};

export const remScale = (r: number): number => {
  return scale(rem(r));
};

export const remScaleH = (r: number): number => {
  // console.log('remScaleH', r, scaleH(rem(r)));
  return scaleH(rem(r));
};
