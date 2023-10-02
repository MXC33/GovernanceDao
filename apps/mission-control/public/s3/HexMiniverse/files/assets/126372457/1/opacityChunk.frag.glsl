
#ifdef MAPFLOAT
uniform float material_opacity;
#endif
#ifdef MAPTEXTURE
uniform sampler2D texture_opacityMap;
#endif
uniform float iTime;
uniform float opacity;
uniform vec4 iAColor;
uniform vec4 iBColor;

vec4 draw_auroras_Opacity(vec4 color) {
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
}

void getOpacity() {

    vec4 color = vec4(0.0);
    color = draw_auroras_Opacity(color);
    dAlpha = color.a * opacity; // this looks better but is more expensive if not static.
    //dAlpha = vUv0.y * opacity;
    
    #ifdef MAPFLOAT
    dAlpha *= material_opacity;
    #endif
    #ifdef MAPTEXTURE
    dAlpha =  texture2D(texture_opacityMap, vPositionW.xz*1.0/uWorldSize - vec2(0.5), textureBias).$CH;
    #endif
    #ifdef MAPVERTEX
    dAlpha *= clamp(vVertexColor.$VC, 0.0, 1.0);
    #endif
    //dAlpha = 0.5;//pow(dAlpha, 0.5);
    //float pointerSpeed = 1.0;
    //float pointerWidth = 0.5;
    //float pointerPos = mod(uTime*pointerSpeed,uWorldSize*1.5);//mod(uTime*pointerSpeed,uWorldSize) - uWorldSize/2.0;//uWorldSize*sin(uTime*pointerSpeed)/2.0;
    //float pointerDist = abs(pow(vPositionW.x * vPositionW.x + vPositionW.z * vPositionW.z, 0.5) - pointerPos);// abs(vPositionW.x - pointerPos);
    //if(pointerDist < pointerWidth)
    //    dAlpha *= (0.75 + pow(1.0 - pointerDist/pointerWidth, 2.0)*2.25);
    //else
    //    dAlpha *= 0.75;

        
}