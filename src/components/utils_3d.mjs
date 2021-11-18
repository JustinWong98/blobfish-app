const LEFT_FACE = 234;
const RIGHT_FACE = 454;
const TOP_FACE = 10;
const BOT_FACE = 152;

const NOSE_BASE = 2;
const NOSE_TIP = 1;

const getDiagonalDist = (p1, p2, imageX, imageY) => {
  return Math.sqrt(
    Math.pow((p1.x - p2.x) * imageX, 2) + Math.pow((p1.y - p2.y) * imageY, 2)
  );
};

export const getFaceWidth = (landmarks, imageX, imageY) => {
  const p1 = landmarks[454];
  const p2 = landmarks[234];
  return getDiagonalDist(p1, p2, imageX, imageY);
};

export const getFaceHeight = (landmarks, imageX, imageY) => {
  const p1 = landmarks[152];
  const p2 = landmarks[10];

  return getDiagonalDist(p1, p2, imageX, imageY);
};
