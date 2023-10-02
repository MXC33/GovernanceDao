/*attribute vec3 aPosition;
attribute vec2 aUv0;

uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;

varying vec2 vUv0;

void main(void)
{
    vUv0 = aUv0;
    gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
}
*/
attribute vec3 aPosition;
attribute vec2 aUv0;
attribute vec3 aNormal;

uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;

varying vec2 vUv0;
varying vec3 vNormal;
varying vec3 vFragPos;

void main(void)
{
    vUv0 = aUv0;
    vNormal = aNormal;
    vFragPos = vec3(matrix_model * vec4(aPosition, 1.0));
    gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
}