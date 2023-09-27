precision mediump float;

varying vec2 vUv0;
varying vec3 vNormal;

uniform sampler2D uDiffuseMap;

uniform vec4 colorA;
uniform vec4 colorB;
uniform float uTime;
uniform float opacity;

//https://github.com/playcanvas/engine/blob/main/src/platform/graphics/shader-utils.js

vec4 draw_auroras( vec4 color, vec2 uv) {
    //const vec4 aurora_color_a = vec4(0.0, 1.2, 0.5, 1.0);
    //const vec4 aurora_color_b = vec4(0.0, 0.4, 0.6, 1.0); 
    float t = sin(-uTime + uv.x * 100.0) * 0.075 + sin(uTime + uv.x * distance(uv.x, 0.5) * 100.0) * 0.1 - 0.5;
    t = 1.0 - smoothstep(uv.y - 4.0, uv.y * 2.0, t);
    if(t <= 0.2)
        discard;
    vec4 final_color = mix(colorA, colorB, clamp(1.0 - uv.y * t, 0.0, 1.0));
    final_color += final_color * final_color;
    color += final_color * t * (t + 0.5) * 0.75;
    return vec4(color);
}

void main(void)
{
    vec2 uv = vec2(1.0, 1.0) / vUv0.xy;
    vec4 color = vec4(0.0); 
    color = draw_auroras(color, vUv0);
    if (vNormal.y == 1.0)
        discard;

    //color = smoothstep(color, vec4(0.0, 0.0, 0.0, 0.0), color.a);
    gl_FragColor = vec4(color); 
    gl_FragColor.a *= opacity;

}