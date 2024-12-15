import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  DoubleSide,
  MeshStandardMaterial,
  RepeatWrapping,
  Texture,
  Vector2,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import CustomShaderMaterialImpl from "three-custom-shader-material/vanilla";
import { generateUUID } from "three/src/math/MathUtils.js";

/**
 *
 * @param geometry
 * @returns Dynamic material loader
 */

export default function Mat() {
  const [diffuse, normal] = useTexture(
    ["/diffuse.jpg", "/nrm.jpg"],
    (te: Texture[]) => {
      te.forEach((t) => {
        t.repeat.set(10, 10);
        t.wrapS = t.wrapT = RepeatWrapping;
        t.flipY = false;
      });
    }
  );

  // Refs
  const matRef = useRef<CustomShaderMaterialImpl>(null);

  /**
   * @description using useFrame to toggle and change uniform values
   *
   */
  const norm = useTexture("/norm.png");

  useFrame(() => {
    const material = matRef.current;
    if (!material) return;
  }, -1);

  return (
    <CustomShaderMaterial
      key={generateUUID()}
      ref={matRef}
      metalness={0}
      roughness={0.9}
      baseMaterial={MeshStandardMaterial}
      normalScale={new Vector2(1, 1)}
      side={DoubleSide}
      map={diffuse}
      normalMap={normal}
      uniforms={{
        isEmbelish: { value: false },
        uTexture: { value: diffuse }, // texture map
        uExtraNorm: { value: norm },
        uInitiNor: { value: normal },
        uUseExtNrm: { value: true },
      }}
      /**
       * Passing only values to vertex shader, no need to change default values
       */
      vertexShader={
        /* glsl */ `
                varying vec2 vUv;
                void main () {            
                    /**
                     * Pass to Fragment shader
                     */
                    vUv = uv;
                }
                `
      }
      /**
       * Fragment shader will load the basic map and add 2D assets and changes colors
       */
      fragmentShader={
        /* glsl */ `
                varying vec2 vUv;
                uniform sampler2D uTexture;
                uniform sampler2D uExtraNorm;
                uniform sampler2D uInitiNor;
                uniform bool uUseExtNrm;
                
                void main () {
    
                vec4 vInitialCol = csm_DiffuseColor;
                vec3 vInitialNorm = csm_FragNormal;
    
                /**
                 * uvScale here should be fetched from uniforms
                 * uvscale should be inverted depending on mesh bounding box and normal size
                 */
                vec2 uv;
                vec2 fUv;

                fUv = vUv;
    
                /**
                 * Loading texture 2D here
                 */
    
                // vec4 tex = clampToBorderTexture(texture2D(uTexture, uv), uv);
    
                /**
                 * Mixing output, assuming asset2D is png and has alpha
                 */
                // vec4 mixedOutput = mix(vInitialCol, tex, tex.a);

                // = vec3(fNormalTexture.x,fNormalTexture.y,fNormalTexture.z);
    
                // csm_DiffuseColor = mixedOutput;
                // csm_DiffuseColor = vec4(vec3(fNormalTexture), 1.);

                // vec4 dst = texture(darkSideTex, vUv);
                // float d = max(dot(geometry.normal, directionalLights[0].direction), 0.);

                // vec4 dst = texture(darkSideTex, vUv);
                // float d = max(dot(geometry.normal, directionalLights[0].direction), 0.);


                // vec3 vInitialNorm = csm_FragNormal.xyz * 2. - 1.;
                // vec4 fNormalTexture = texture2D(uExtraNorm, fUv) * 2. - 1.;

                vec3 n1 = texture2D(uInitiNor, fUv * 20.).xyz * 2. - 1.;
                vec3 n2 = texture2D(uExtraNorm, fUv).xyz * 2. - 1.;

                if(uUseExtNrm) {
                  vec3 r = normalize(vec3(n1.xy + n2.xy, 1.));
                  r.y *= -1.; 
                  csm_FragNormal.xy -= r.xy;
                }

            }
    `
      }
    />
  );
}
