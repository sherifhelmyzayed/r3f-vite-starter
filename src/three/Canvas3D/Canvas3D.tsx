import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import { Box } from "@chakra-ui/react";
import { BakeShadows, Environment, Preload } from "@react-three/drei";

const Canvas3D = () => {
  return (
    <Box
      position={"fixed"}
      top={0}
      left={0}
      w={"full"}
      h={"full"}
      backgroundSize={"cover"}
    >
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
        }}
        camera={{ position: [22, 44.4, 25], fov: 35, far: 1000 }}
        gl={{
          antialias: false,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
          logarithmicDepthBuffer: true,
          toneMapping: ACESFilmicToneMapping,
        }}
      >
        <Environment
          preset="sunset"
          background
          backgroundIntensity={0.3}
          backgroundBlurriness={1}
          environmentIntensity={0.3}
        />

        <BakeShadows />
        <directionalLight
          color="#ffd7b5"
          intensity={1.4}
          position={[20, 30, 20]}
          castShadow
          shadow-mapSize={1024}
          shadow-normalBias={0.07}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, 10, -10, 0.01, 100000]}
          />
        </directionalLight>
        <ambientLight color={"white"} intensity={0.5} />
        <Preload all />
      </Canvas>
    </Box>
  );
};

export default Canvas3D;
