export default async (): Promise<void> => {
  await global.testEnviroment.app.close();
};
