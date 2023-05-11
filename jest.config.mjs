import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Fornece o caminho para o seu aplicativo Next.js para carregar next.config.js e arquivos .env em seu ambiente de teste
  dir: "./",
});

// Adiciona qualquer configuração personalizada para ser passada para o Jest
/** @type {import('jest').Config} */
const config = {
  // Adiciona mais opções de configuração antes de cada teste ser executado
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: "jest-environment-jsdom",
};
// createJestConfig é exportado desta forma para garantir que next/jest possa carregar a configuração Next.js que é assíncrona
export default createJestConfig(config);
