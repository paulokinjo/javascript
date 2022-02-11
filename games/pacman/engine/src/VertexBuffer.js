'use strict';
let gSquareVertexBuffer = null;

const initSquareBuffer = () => {
  const verticesOfSquare = [
    0.5, 0.5, 0.0, -0.5, 0.5, 0.0, 0.5  , -0.5, 0.0, -0.5, -0.5, 0.0,
  ];

  gSquareVertexBuffer = gGL.createBuffer();

  gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);

  gGL.bufferData(
    gGL.ARRAY_BUFFER,
    new Float32Array(verticesOfSquare),
    gGL.STATIC_DRAW,
  );
};
