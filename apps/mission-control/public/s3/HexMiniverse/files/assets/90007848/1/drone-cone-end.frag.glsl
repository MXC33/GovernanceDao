    gl_FragColor.rgb = combineColor();
    gl_FragColor.rgb += dEmission;
    gl_FragColor.rgb = addFog(gl_FragColor.rgb);
    #ifndef HDR
    gl_FragColor.rgb = toneMap(gl_FragColor.rgb);
    gl_FragColor.rgb = gammaCorrectOutput(gl_FragColor.rgb);
    #endif

    //float noise = perlinNoise(vPositionW.x*uXZScale, vPositionW.y*vUv0.y - uTime*uTimeScale, vPositionW.z*uXZScale)*0.5 + 0.5;
    float outline =  (1.0 -pow(dot(dViewDirW, dNormalW), uNormExp));

    //Make an open cone to remove the last clamp
    float height = (1.0 - vUv0.y) * clamp(0.0, 1.0, vPositionW.y - uHeightCutoff);

    gl_FragColor.rgb *= height*outline;//vec3();//vec3(1.0  -pow(dot(dViewDirW, dNormalW), uNormExp));
    dAlpha *= height*outline;

    gl_FragColor.a = dAlpha;

