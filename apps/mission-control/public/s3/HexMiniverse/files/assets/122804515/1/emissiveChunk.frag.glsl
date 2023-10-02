
#ifdef MAPCOLOR
uniform vec3 material_emissive;
#endif
#ifdef MAPFLOAT
uniform float material_emissiveIntensity;
#endif
//varying vec2 vUv0;
uniform float uTime;
uniform vec3 aColor;
uniform vec3 bColor;

#define nsin(x) (sin(x) * 0.5 + 0.5)

//https://github.com/playcanvas/engine/blob/main/src/platform/graphics/shader-utils.js
//https://forum.playcanvas.com/t/shader-chunk-uvs/14329/2
//https://www.shadertoy.com/view/wtK3zG
vec3 draw_auroras(vec3 color) {
    vec2 uv = vUv0;// vec2($UV.xy);
    //const vec3 aurora_color_a = vec3(0.0, 1.2, 0.5);
    //const vec3 aurora_color_b = vec3(0.0, 0.4, 0.6);
    
    float t = sin(-uTime + uv.x * 100.0) * 0.075 + sin(uTime + uv.x * distance(uv.x, 0.5) * 100.0) * 0.1 - 0.5;
    t = 1.0 - smoothstep(uv.y - 4.0, uv.y * 2.0, t);
    //float t = sin(-uTime + uv.x * 100.0) * 0.075 + sin(uTime + uv.x * distance(uv.x, 0.8) * 100.0) * 0.5 - 0.5;
    //t = 1.0 - smoothstep(uv.y - 4.0, uv.y * 1.0, t);
    
    vec3 final_color = mix(aColor, bColor, clamp(1.0 - uv.y * t, 0.0, 1.0));
    final_color += final_color * final_color;
    color += final_color * t * (t + 0.5) * 0.75;
    //color += final_color * t * (t + 0.5) * 1.0;
    //return color;
    return vec3(color);
}

/*vec4 draw_auroras(vec4 color) {
    vec2 uv = vUv0;// vec2($UV.xy);
    //const vec3 aurora_color_a = vec3(0.0, 1.2, 0.5);
    //const vec3 aurora_color_b = vec3(0.0, 0.4, 0.6);
    
    float t = sin(-iTime + uv.x * 100.0) * 0.075 + sin(iTime + uv.x * distance(uv.x, 0.5) * 100.0) * 0.1 - 0.5;
    t = 1.0 - smoothstep(uv.y - 4.0, uv.y * 2.0, t);
    
    vec4 final_color = mix(iAColor, iBColor, clamp(1.0 - uv.y * t, 0.0, 1.0));
    final_color += final_color * final_color;
    color += final_color * t * (t + 0.5) * 0.75;
    //return color;
    return vec4(color);
}*/


void getEmission() {
    vec3 color = vec3(0.0);
    dEmission = draw_auroras(color);
    /*
    #ifdef MAPFLOAT
    dEmission *= material_emissiveIntensity;
    #endif
    #ifdef MAPCOLOR
    dEmission *= material_emissive;
    #endif
    #ifdef MAPTEXTURE
    dEmission *= $DECODE(texture2DBias($SAMPLER, $UV, textureBias)).$CH;
    #endif
    #ifdef MAPVERTEX
    dEmission *= gammaCorrectInput(saturate(vVertexColor.$VC));
    #endif*/
}

