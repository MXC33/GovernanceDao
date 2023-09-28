varying vec2 vUv0;

uniform sampler2D colorBuffer;
uniform float magnitudeThreshold;

void main(void)
{
    vec4 color = texture2D(colorBuffer, vUv0);
    float magnitude = distance(vec4(0.0), color);
    if (magnitude < magnitudeThreshold) {
      discard;
    }
    //gl_FragColor = color;
    gl_FragColor = vec4(0.0);
}