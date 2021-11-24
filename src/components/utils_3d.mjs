const LEFT_FACE = 234;
const RIGHT_FACE = 454;
const TOP_FACE = 10;
const BOT_FACE = 152;

const getDiagonalDist = (p1, p2, imageX, imageY) => {
  return Math.sqrt(
    Math.pow((p1.x - p2.x) * imageX, 2) + Math.pow((p1.y - p2.y) * imageY, 2)
  );
};

export const getFaceWidth = (landmarks, imageX, imageY) => {
  const p1 = landmarks[RIGHT_FACE];
  const p2 = landmarks[LEFT_FACE];
  return getDiagonalDist(p1, p2, imageX, imageY);
};

export const getFaceHeight = (landmarks, imageX, imageY) => {
  const p1 = landmarks[BOT_FACE];
  const p2 = landmarks[TOP_FACE];

  return getDiagonalDist(p1, p2, imageX, imageY);
};

const LEFT_EYE_TOP = 386;
const LEFT_EYE_BOT = 374;

const RIGHT_EYE_TOP = 159;
const RIGHT_EYE_BOT = 145;

// const RIGHT_IRIS = [469, 470, 471, 472];
// const LEFT_IRIS = [474, 475, 476, 477];

const RIGHT_IRIS_V = [470, 472];
const LEFT_IRIS_V = [475, 477];

const TOP_LIP_BOTTOM = 13;
const BOTTOM_LIP_TOP = 14;

const LEFT_LIP_CORNER = 291;
const RIGHT_LIP_CORNER = 61;

const leftEyeHeight = (landmarks, imageX, imageY) => {
  const p1 = landmarks[LEFT_EYE_TOP];
  const p2 = landmarks[LEFT_EYE_BOT];
  return getDiagonalDist(p1, p2, imageX, imageY);
};
const rightEyeHeight = (landmarks, imageX, imageY) => {
  const p1 = landmarks[RIGHT_EYE_TOP];
  const p2 = landmarks[RIGHT_EYE_BOT];

  return getDiagonalDist(p1, p2, imageX, imageY);
};

const leftIrisHeight = (landmarks, imageX, imageY) => {
  const p1 = landmarks[LEFT_IRIS_V[0]];
  const p2 = landmarks[LEFT_IRIS_V[1]];

  return getDiagonalDist(p1, p2, imageX, imageY);
};

const rightIrisHeight = (landmarks, imageX, imageY) => {
  const p1 = landmarks[RIGHT_IRIS_V[0]];
  const p2 = landmarks[RIGHT_IRIS_V[1]];

  return getDiagonalDist(p1, p2, imageX, imageY);
};
export const leftEyeOpenRatio = (landmarks, imageX, imageY) => {
  return (
    leftEyeHeight(landmarks, imageX, imageY) /
    leftIrisHeight(landmarks, imageX, imageY)
  );
};
export const rightEyeOpenRatio = (landmarks, imageX, imageY) => {
  return (
    rightEyeHeight(landmarks, imageX, imageY) /
    rightIrisHeight(landmarks, imageX, imageY)
  );
};

const mouthMiddlePt = (landmarks) => {
  const p1 = landmarks[LEFT_LIP_CORNER];
  const p2 = landmarks[RIGHT_LIP_CORNER];

  const middle = {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
  return middle;
};

export const mouthDimensions = (landmarks, imageX, imageY) => {
  const left = landmarks[LEFT_LIP_CORNER];
  const right = landmarks[RIGHT_LIP_CORNER];

  const middle = {
    x: (left.x + right.x) / 2,
    y: (left.y + right.y) / 2,
  };

  const top = landmarks[TOP_LIP_BOTTOM];
  const bot = landmarks[BOTTOM_LIP_TOP];

  const midBotHeight = getDiagonalDist(middle, bot, imageX, imageY);
  const topBotHeight = getDiagonalDist(top, bot, imageX, imageY);

  const length = getDiagonalDist(left, right, imageX, imageY);
  return { length, midBotHeight, topBotHeight };
};

export const normMouthDimensions = (landmarks, imageX, imageY) => {
  const faceHeight = getFaceWidth(landmarks, imageX, imageY);
  const faceWidth = getFaceHeight(landmarks, imageX, imageY);

  const { length, midBotHeight, topBotHeight } = mouthDimensions(
    landmarks,
    imageX,
    imageY
  );
  return {
    length: (length / faceWidth) * 3,
    midBotHeight: (midBotHeight / faceHeight) * 6,
    topBotHeight: (topBotHeight / faceHeight) * 6,
  };
};

export const mouthHeight = (landmarks, imageX, imageY) => {
  const p1 = landmarks[TOP_LIP_BOTTOM];
  const p2 = landmarks[BOTTOM_LIP_TOP];
  return getDiagonalDist(p1, p2, imageX, imageY);
};
