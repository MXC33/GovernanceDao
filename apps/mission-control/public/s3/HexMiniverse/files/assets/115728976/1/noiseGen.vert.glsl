#version 300 es
in vec2 aPosition;

out vec2 vUv0;

void main(void)
{
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vUv0 = (aPosition.xy + 1.0) * 0.5;
    //vUv0 = (aPosition.xy) * 0.5;
}
