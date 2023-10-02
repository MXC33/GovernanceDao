#ifdef MAPFLOAT
uniform float material_opacity;
#endif
#ifdef MAPTEXTURE
uniform sampler2D texture_opacityMap;
#endif
//uniform float uTime;
void getOpacity() {
    dAlpha = 1.0;
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
   // float pointerWidth = 0.5;
   // float pointerPos = mod(uTime*pointerSpeed,uWorldSize*1.5);//mod(uTime*pointerSpeed,uWorldSize) - uWorldSize/2.0;//uWorldSize*sin(uTime*pointerSpeed)/2.0;
   // float pointerDist = abs(pow(vPositionW.x * vPositionW.x + vPositionW.z * vPositionW.z, 0.5) - pointerPos);// abs(vPositionW.x - pointerPos);
   // if(pointerDist < pointerWidth)
   //     dAlpha *= (0.75 + pow(1.0 - pointerDist/pointerWidth, 2.0)*2.25);
   // else
   //     dAlpha *= 0.75;

        
}
