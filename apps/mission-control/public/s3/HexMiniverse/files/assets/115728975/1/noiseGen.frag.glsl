#version 300 es
precision highp float;

uniform sampler2D uColorBuffer;
in vec2 vUv0;
in vec3 vPositionW;
out vec4 fragColor;

#define PI 3.14159265358979


vec2 hash( in vec2 x ) 
{
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    x = x*k + k.yx;
    return -1.0 + 2.0*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
}

vec3 noised( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );

    vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
    vec2 du = 30.0*f*f*(f*(f-2.0)+1.0); 
    
    vec2 ga = hash( i + vec2(0.0,0.0) );
    vec2 gb = hash( i + vec2(1.0,0.0) );
    vec2 gc = hash( i + vec2(0.0,1.0) );
    vec2 gd = hash( i + vec2(1.0,1.0) );
    
    float va = dot( ga, f - vec2(0.0,0.0) );
    float vb = dot( gb, f - vec2(1.0,0.0) );
    float vc = dot( gc, f - vec2(0.0,1.0) );
    float vd = dot( gd, f - vec2(1.0,1.0) );

    return vec3( va + u.x*(vb-va) + u.y*(vc-va) + u.x*u.y*(va-vb-vc+vd),   // value
                 ga + u.x*(gb-ga) + u.y*(gc-ga) + u.x*u.y*(ga-gb-gc+gd) +  // derivatives
                 du * (u.yx*(va-vb-vc+vd) + vec2(vb,vc) - va));
}

vec3 erosion(in vec2 p, vec2 dir) {    
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    float f = 2.*PI;
    vec3 va = vec3(0.0);
   	float wt = 0.0;
    for (int i=-2; i<=1; i++) {
		for (int j=-2; j<=1; j++) {		
        	vec2 o = vec2(i, j);
        	vec2 h = hash(ip - o)*0.5;
            vec2 pp = fp +o - h;
            float d = dot(pp, pp);
            float w = exp(-d*2.0);
            wt +=w;
            float mag = dot(pp,dir);
            va += vec3(cos(mag*f), -sin(mag*f)*(pp+dir))*w;
        }
    }
    return va/wt;
}

//This is where the magic happens
vec3 mountain(vec2 p, float s) {
    //Should be uniforms:
    float uValley = 0.7;
    //int uErosion = 1;
    //End uniforms
    
    vec3 n = vec3(0.0);
    float nf = 1.0;
    float na = 0.6;
    for (int i=0;i<2;i++) {
       n+= noised(p*s*nf)*na*vec3(1.0, nf, nf);
       na *= 0.5;
       nf *= 2.0;
    }
    
    //take the curl of the normal to get the gradient facing down the slope
    vec2 dir = n.zy*vec2(1.0, -1.0);
    
    vec3 h = vec3(0.0);
    float a = uValley*(smoothstep(0.3, 0.5,n.x*0.5+0.5)); //smooth the valleys
    float f = 1.0;
    for (int i=0;i<0;i++) {
        h+= erosion(p*f, dir+h.zy*vec2(1.0, -1.0))*a*vec3(1.0, f, f);
        a*=0.4;
        f*=2.0;
    }
    return vec3(smoothstep(-1.0, 1.0, n.x)+h.x*0.05, (n.yz+h.yz)*0.5+0.5);
}

void main() {
    float scale = 40.0;
    float exp = 1.5;
    float offsetX = 0.0;
    float offsetY = 0.0;
    float lineThickness = 3.0;
    float uFrac = 10.0;

    //float h = pow(mountain(vUv0 + vec2(offsetX, offsetY), scale).x, exp);//vPositionW.xz*uWorldSize - vec2(0.5);
    float h = pow(mountain(vUv0 + vec2(offsetX, offsetY), scale).x, exp);//vPositionW.xz*uWorldSize - vec2(0.5);
    //fragColor = vec4(h, h, h, 1.0);
    
   
    float n = h;
    n = fract(n * uFrac);
    
    float heightFactor = round(h*uFrac)/uFrac;
    
    float pixelNoiseChange = fwidth(n * lineThickness);//*(uLineM + pow((1.0/max(heightFactor, stepSize)), uLineP)*uLineK));

    float heightLine = smoothstep(1.0-pixelNoiseChange, 1.0, n);
    heightLine += smoothstep(pixelNoiseChange, 0.0, n);

    fragColor = vec4(heightLine, heightFactor, 0.0, 1.0);

}
