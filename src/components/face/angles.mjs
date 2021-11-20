import { getFaceWidth, getFaceHeight } from '../utils_3d.mjs';

//FROM VLADMIR's human
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const rad2deg = (theta) => Math.round((theta * 180) / Math.PI);

export const calculateFaceAngle = (face, imageSize) => {
  // const degrees = (theta) => Math.abs(((theta * 180) / Math.PI) % 360);
  const normalize = (v) => {
    // normalize vector
    const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    v[0] /= length;
    v[1] /= length;
    v[2] /= length;
    return v;
  };
  const subVectors = (a, b) => {
    // vector subtraction (a - b)
    const x = a[0] - b[0];
    const y = a[1] - b[1];
    const z = a[2] - b[2];
    return [x, y, z];
  };
  const crossVectors = (a, b) => {
    // vector cross product (a x b)
    const x = a[1] * b[2] - a[2] * b[1];
    const y = a[2] * b[0] - a[0] * b[2];
    const z = a[0] * b[1] - a[1] * b[0];
    return [x, y, z];
  };
  // 3x3 rotation matrix to Euler angles based on https://www.geometrictools.com/Documentation/EulerAngles.pdf
  const rotationMatrixToEulerAngle = (r) => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [r00, r01, r02, r10, r11, r12, r20, r21, r22] = r;
    let thetaX;
    let thetaY;
    let thetaZ;
    if (r10 < 1) {
      // YZX calculation
      if (r10 > -1) {
        thetaZ = Math.asin(r10);
        thetaY = Math.atan2(-r20, r00);
        thetaX = Math.atan2(-r12, r11);
      } else {
        thetaZ = -Math.PI / 2;
        thetaY = -Math.atan2(r21, r22);
        thetaX = 0;
      }
    } else {
      thetaZ = Math.PI / 2;
      thetaY = Math.atan2(r21, r22);
      thetaX = 0;
    }
    if (isNaN(thetaX)) thetaX = 0;
    if (isNaN(thetaY)) thetaY = 0;
    if (isNaN(thetaZ)) thetaZ = 0;
    return { pitch: 2 * -thetaX, yaw: 2 * -thetaY, roll: 2 * -thetaZ };
  };
  // simple Euler angle calculation based existing 3D mesh
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const meshToEulerAngle = (mesh) => {
    const radians = (a1, a2, b1, b2) => Math.atan2(b2 - a2, b1 - a1);
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const angle = {
      // values are in radians in range of -pi/2 to pi/2 which is -90 to +90 degrees, value of 0 means center
      // pitch is face move up/down
      pitch: radians(mesh[10].y, mesh[10].z, mesh[152].y, mesh[152].z), // looking at y,z of top and bottom points of the face
      // yaw is face turn left/right
      yaw: radians(mesh[33].x, mesh[33].z, mesh[263].x, mesh[263].z), // looking at x,z of outside corners of leftEye and rightEye
      // roll is face lean left/right
      roll: radians(mesh[33].x, mesh[33].y, mesh[263].x, mesh[263].y), // looking at x,y of outside corners of leftEye and rightEye
    };
    return angle;
  };

  // initialize gaze and mesh
  const mesh = face;
  // const mesh = face.meshRaw;
  // const mesh = face.meshRaw;
  if (!mesh || mesh.length < 300)
    return {
      angle: { pitch: 0, yaw: 0, roll: 0 },
      matrix: [1, 0, 0, 0, 1, 0, 0, 0, 1],
    };

  const size = Math.max(
    getFaceWidth(face, imageSize[0], imageSize[1]) * 1.5,
    getFaceHeight(face, imageSize[0], imageSize[1])
  );
  // top, bottom, left, right
  const pts = [mesh[10], mesh[152], mesh[234], mesh[454]].map((pt) => [
    // make the xyz coordinates proportional, independent of the image/box size
    (pt.x * imageSize[0]) / size,
    (pt.y * imageSize[1]) / size,
    pt.z,
  ]);

  const y_axis = normalize(subVectors(pts[1], pts[0]));
  let x_axis = normalize(subVectors(pts[3], pts[2]));
  const z_axis = normalize(crossVectors(x_axis, y_axis));
  // adjust x_axis to make sure that all axes are perpendicular to each other
  x_axis = crossVectors(y_axis, z_axis);

  // Rotation Matrix from Axis Vectors - http://renderdan.blogspot.com/2006/05/rotation-matrix-from-axis-vectors.html
  // 3x3 rotation matrix is flatten to array in row-major order. Note that the rotation represented by this matrix is inverted.
  const matrix = [
    x_axis[0],
    x_axis[1],
    x_axis[2],
    y_axis[0],
    y_axis[1],
    y_axis[2],
    z_axis[0],
    z_axis[1],
    z_axis[2],
  ];
  const angle = rotationMatrixToEulerAngle(matrix);

  return { angle, matrix };
};
