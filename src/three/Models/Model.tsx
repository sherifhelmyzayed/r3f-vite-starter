import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

const Model = () => {
  const { nodes } = useGLTF("/model.glb");

  console.log(nodes);

  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Front002 as Mesh).geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Torus001 as Mesh).geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Torusup002 as Mesh).geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.bck_lace003 as Mesh).geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.bck_lace004 as Mesh).geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cap_bdy002 as Mesh).geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes["ins-det002"] as Mesh).geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cap_panel as Mesh).geometry}
      />
    </group>
  );
};

export default Model;
